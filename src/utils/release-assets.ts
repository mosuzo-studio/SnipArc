const DOWNLOAD_PREFIX = 'https://github.com/mosuzo-studio/SnipArc/releases/download/';
export const LATEST_RELEASE_API = 'https://api.github.com/repos/mosuzo-studio/SnipArc/releases/latest';

interface GitHubRelease {
  tag_name?: string;
  assets?: { name: string; browser_download_url: string }[];
}

export function readReleaseAssets(release: GitHubRelease) {
  const tag = release.tag_name;
  if (!tag || !/^v?\d+\.\d+\.\d+$/i.test(tag)) return { tag: null, setup: null, portable: null };
  const version = tag.replace(/^v/i, '');
  const assetUrl = (suffix: string) => {
    const name = `SnipArc-${version}-windows-x64-${suffix}`;
    const asset = release.assets?.find((asset) => asset.name === name);
    const expectedUrl = `${DOWNLOAD_PREFIX}${tag}/${name}`;
    return asset?.browser_download_url === expectedUrl ? expectedUrl : null;
  };
  return { tag, setup: assetUrl('setup.exe'), portable: assetUrl('portable.7z') };
}
