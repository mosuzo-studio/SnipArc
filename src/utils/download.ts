import { LATEST_RELEASE_API, readReleaseAssets } from './release-assets';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

/** Releases list page — also the fallback target when resolution fails. */
export const RELEASES_URL = 'https://github.com/mosuzo-studio/SnipArc/releases';

/** Microsoft Store listing for the app; hidden until a real listing exists. */
export const STORE_URL = 'https://apps.microsoft.com/detail/TBD_SNIPARC_STORE_ID';

const LATEST_RELEASE_URL = `${RELEASES_URL}/latest`;

const FETCH_TIMEOUT_MS = 8000;

/** Shown in copy when the release lookup fails; bump alongside real releases. */
const FALLBACK_DISPLAY_VERSION = '8.0.0';

export type AssetKind = 'setup' | 'msi' | 'portable';

export interface ReleaseDownloads {
  /** Release tag, e.g. `v7.3.0`; null when it could not be resolved. */
  tag: string | null;
  /** Version without the leading `v`, e.g. `7.3.0`; null when unresolved. */
  version: string | null;
  /** Public asset URLs with a release page fallback. */
  urls: Record<AssetKind, string>;
  /** Public download URLs for the Lite edition, same behaviour. */
  liteUrls: Record<AssetKind, string>;
  /** True when `urls` are verified direct asset links rather than the Releases page. */
  resolved: boolean;
}

const FALLBACK: ReleaseDownloads = {
  tag: null,
  version: null,
  urls: { setup: LATEST_RELEASE_URL, msi: RELEASES_URL, portable: LATEST_RELEASE_URL },
  liteUrls: { setup: RELEASES_URL, msi: RELEASES_URL, portable: RELEASES_URL },
  resolved: false,
};

/**
 * Node's `fetch` ignores the usual proxy env vars, so on a build machine that
 * reaches GitHub through a proxy the lookup would time out and every button
 * would fall back to the Releases page. When a proxy is configured, route the
 * lookup through it; without undici installed, keep going direct.
 */
const installProxyDispatcher = async (): Promise<void> => {
  const proxy = process.env.HTTPS_PROXY || process.env.HTTP_PROXY;
  if (!proxy) return;

  try {
    const { ProxyAgent, setGlobalDispatcher } = await import('undici');
    setGlobalDispatcher(new ProxyAgent(proxy));
    console.info(`[download] Routing the release lookup through ${proxy}.`);
  } catch {
    console.warn(`[download] ${proxy} is set but undici is unavailable; trying a direct connection.`);
  }
};

const resolveLatestRelease = async (): Promise<ReleaseDownloads> => {
  const response = await fetch(LATEST_RELEASE_API, {
    headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'sniparc-site-build' },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
  if (!response.ok) throw new Error(`GitHub status ${response.status}`);

  const { tag, setup, portable } = readReleaseAssets(await response.json());
  if (!tag) return FALLBACK;

  return {
    tag,
    version: tag.replace(/^v/i, ''),
    urls: { setup: setup ?? LATEST_RELEASE_URL, portable: portable ?? LATEST_RELEASE_URL, msi: RELEASES_URL },
    liteUrls: FALLBACK.liteUrls,
    resolved: Boolean(setup && portable),
  };
};

const fetchLatestRelease = async (): Promise<ReleaseDownloads> => {
  await installProxyDispatcher();

  let lastReason = 'unknown error';

  // Two attempts: a single timeout on a slow network should not cost the
  // buttons their direct asset links.
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      return await resolveLatestRelease();
    } catch (error) {
      lastReason = error instanceof Error ? error.message : String(error);
    }
  }

  console.warn(
    `[download] Could not resolve the latest release (${lastReason}); linking to the Releases page instead.`
  );
  return FALLBACK;
};

/** Build-time cache: resolved once, not once per page. */
let cached: Promise<ReleaseDownloads> | null = null;

/** Latest release metadata and asset URLs, resolved once per build. */
export const getReleaseDownloads = (): Promise<ReleaseDownloads> => {
  cached ??= fetchLatestRelease();
  return cached;
};

/**
 * Last download total that resolved, kept in the repo so a lookup that times
 * out or hits the rate limit still shows a real number. The build refreshes
 * this file whenever the API answers.
 */
/* Resolved from the project root: the module is bundled during a build, so
   import.meta.url would point into dist instead of the source tree. */
const COUNT_CACHE_PATH = resolve(process.cwd(), 'src/data/download-count.json');

interface DownloadCountCache {
  total: number;
  fetchedAt: string;
}

const readCountCache = (): DownloadCountCache | null => {
  try {
    const parsed = JSON.parse(readFileSync(COUNT_CACHE_PATH, 'utf8')) as Partial<DownloadCountCache>;
    return typeof parsed.total === 'number' ? { total: parsed.total, fetchedAt: parsed.fetchedAt ?? '' } : null;
  } catch {
    return null;
  }
};

const writeCountCache = (total: number): void => {
  try {
    const previous = readCountCache();
    if (previous?.total === total) return;
    writeFileSync(
      COUNT_CACHE_PATH,
      `${JSON.stringify({ total, fetchedAt: new Date().toISOString() }, null, 2)}\n`,
      'utf8'
    );
    console.info(`[download] Cached the download total ${previous?.total ?? '—'} → ${total}.`);
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    console.warn(`[download] Could not cache the download total (${reason}).`);
  }
};

/** One page is enough while the project stays under 100 releases. */
const RELEASES_API_URL = 'https://api.github.com/repos/mosuzo-studio/SnipArc/releases?per_page=100';

interface ReleaseAsset {
  name?: string;
  download_count?: number;
}

interface Release {
  assets?: ReleaseAsset[];
}

/** Every asset download GitHub reports, packages and updater metadata alike. */
const sumDownloads = (releases: Release[]): number =>
  releases.reduce(
    (total, release) => total + (release.assets ?? []).reduce((sum, asset) => sum + (asset.download_count ?? 0), 0),
    0
  );

const fetchTotalDownloads = async (): Promise<number> => {
  await installProxyDispatcher();

  const response = await fetch(RELEASES_API_URL, {
    headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'sniparc-site-build' },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });

  if (!response.ok) throw new Error(`status ${response.status}`);

  const total = sumDownloads((await response.json()) as Release[]);
  if (!total) throw new Error('no downloads in the response');

  writeCountCache(total);

  return total;
};

let cachedDownloads: Promise<number | null> | null = null;

/**
 * Total downloads GitHub reports across every release. The site is static, so
 * this is the number the build bakes in; the homepage refreshes it from the
 * same endpoint in the visitor's browser. A failed lookup falls back to the
 * last cached value, and to nothing when there is no positive cache to fall
 * back to (a new repository starts at zero, which would otherwise look like a
 * real figure on the trust bar).
 */
export const getTotalDownloads = (): Promise<number | null> => {
  cachedDownloads ??= fetchTotalDownloads().catch((error: unknown) => {
    const reason = error instanceof Error ? error.message : String(error);
    const cached = readCountCache();
    console.warn(
      `[download] Could not read the download totals (${reason}); using the last cached count${
        cached?.total ? ` (${cached.total})` : ' — none cached yet'
      }.`
    );
    return cached?.total ? cached.total : null;
  });
  return cachedDownloads;
};

/**
 * Direct download URL for the latest Windows x64 `.exe` installer.
 * Resolves to {@link RELEASES_URL} when the asset cannot be determined.
 */
export const getSetupDownloadUrl = async (): Promise<string> => (await getReleaseDownloads()).urls.setup;

/**
 * Latest release version for display, e.g. `7.3.1`.
 *
 * Callers interpolate this into copy that already supplies the surrounding
 * `v` and `+`, so this returns the bare number. Falls back to the last known
 * release when the lookup fails, keeping the announcement readable offline.
 */
export const getLatestVersion = async (): Promise<string> => {
  const { version } = await getReleaseDownloads();
  return version ?? FALLBACK_DISPLAY_VERSION;
};
