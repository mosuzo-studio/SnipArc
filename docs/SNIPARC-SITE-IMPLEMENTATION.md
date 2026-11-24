# SnipArc Site Implementation Record

## Source Information

| Field | Value |
|-------|-------|
| Source project | Shotera (read-only reference) |
| Base commit SHA | `a2f7adf9787c623f19e16b91781dda76192bc0df` |
| Base tag | `v7.9.2` |
| Base commit date | 2026-10-24 |
| Implementation date | 2026-11-17 |
| SnipArc version | `v7.20.8` |
| Program verified | Windows executable v7.20.8, Qt 6.8.3, build: 2026-11-16 |

## Implementation Directory

`D:\project\research_mosuzo\mosuzo-site\SnipArc-Site`

## Git History

- **Commit 1** `dee55a7` — `chore: initialize site from Shotera v7.9.2`
  - Pristine export of Shotera v7.9.2 source via `git archive`
  - 311 source files, no history, no remotes, no credentials

- **Commit 2** `006595e` — `feat: adapt website for SnipArc`
  - All SnipArc branding, content, and verification changes
  - See commit message for full details

## Major Changes

### Brand & Identity
- Product name: Shotera → SnipArc in all 15 locales
- Domain: shotera.mosuzo.com → sniparc.mosuzo.com
- Site title: Updated for EN and zh-CN to match verified capabilities
- Download repo: mosuzo-studio/Shotera → mosuzo-studio/SnipArc
- Fallback version: 7.9.2 → 7.20.8
- Download count reset to 0

### Production Bindings Removed
- Umami Analytics tracking ID (from `src/components/common/Analytics.astro`)
- Google Site Verification ID (set to `null` in `src/config.yaml`)
- CNAME updated from `shotera.mosuzo.com` to `sniparc.mosuzo.com`

### Changelog Reset
- All 15 locale changelogs cleared of Shotera version history
- Single entry for SnipArc v7.20.8 (2026-11-16) added to all locales
- EN and zh-CN: full first-launch description
- 13 other locales: minimal entry with link to English version

### Privacy Policy Corrections
- Removed unverified cloud translation API data-handling claim
- Updated on-device AI section to match verified SnipArc capabilities
- Preserved Mosuzo Studio attribution

### Screenshots & Assets
- Added `public/screenshots/real/20261116-105925-986.png` (3840×2400)
- Added `public/screenshots/real/20261116-110432-968.png` (3840×2400)
- These are actual captures from SnipArc v7.20.8 from the history directory

## Language Coverage

| Locale | Status |
|--------|--------|
| en (default) | ✅ Full rebrand + verified content |
| zh-cn | ✅ Full rebrand + verified content |
| zh-tw, ja, pt-br, es, de, fr, it, ko, ru, ar, nl, pl, sv | ✅ Brand/URL/version replacement, body text preserved |

All 15 published locales confirmed accessible in dev server.
Routing, language switcher, and legal page fallbacks preserved.

## Feature Evidence Index

See `docs/SNIPARC-FEATURE-VERIFICATION.md` for the complete feature-by-feature verification.

### Verified Features (evidence-backed)
- Screenshot capture with native overlay (logs confirm active sessions)
- Region selection (probe logs show gesture data)
- Annotation tools (layer cache logs, draw gesture logs)
- Clipboard integration (copy-to-clipboard log confirmed)
- Global hotkeys (startup log: `snip_ok=true`)
- System tray (startup log: `initializing tray and hotkeys`)
- Portable distribution (`portable.marker` file present)

### Available but Not Interactively Tested
- OCR — PP-OCRv6_small model files present in `resources/OCR/`
- AI Cutout — U2Net model present in `resources/cutout/`
- AI Erase — MIGAN v2 model present in `resources/erase/`
- Recording — config section present, settings show 30fps/4K tier

## Asset Sources

| Asset | Source | Status |
|-------|--------|--------|
| Logo/favicon | Inherited Shotera assets | ⚠️ Pending replacement with SnipArc logo |
| Homepage screenshots | SnipArc history snapshots (3840×2400) | ✅ |
| Feature demo images | Inherited Shotera UI captures | ⚠️ Noted as placeholder |
| Fonts | Instrument Sans (unchanged) | ✅ |

## Pending Configuration Items

1. **SnipArc GitHub Repository** — `mosuzo-studio/SnipArc` is set but may not exist yet. Download buttons fall back to the Releases page URL gracefully.
2. **Microsoft Store ID** — set to placeholder `TBD_SNIPARC_STORE_ID`. Update in `src/utils/download.ts` once available.
3. **Logo and Favicon** — the Shotera SVG/PNG/ICO are still in place. No vector logo was found in the SnipArc distribution. Replace `src/assets/favicons/` and `src/components/Logo.astro` once official assets are available.
4. **Feature hero images** — the site still uses Shotera interface screenshots for feature sections. These should be replaced with SnipArc-specific captures from a UI session.
5. **Official domain confirmation** — `sniparc.mosuzo.com` is assumed; update `src/config.yaml` and `public/CNAME` if the actual domain differs.

## Build & Check Results

| Check | Result |
|-------|--------|
| `astro check` | ✅ 0 errors, 0 warnings, 4 hints (all pre-existing) |
| `eslint` | ⚠️ 4 inherited errors (unused vars + JSX parent in Shotera base) |
| Build | ✅ 109 pages built successfully |
| Dev server | ✅ Running on http://127.0.0.1:4321/ |

The 4 ESLint errors are present in the Shotera v7.9.2 base commit and are not introduced by this adaptation.

## Preview

```bash
# Start dev server
cd D:\project\research_mosuzo\mosuzo-site\SnipArc-Site
npm run dev -- --host 127.0.0.1 --port 4321

# Production build preview
npm run build
npm run preview -- --host 127.0.0.1 --port 4321
```

**Running addresses:**
- English: http://127.0.0.1:4321/
- Simplified Chinese: http://127.0.0.1:4321/zh-cn

**Stop the server:**
Press `Ctrl+C` in the terminal where `npm run dev` is running.
