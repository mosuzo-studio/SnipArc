# Source Inventory from Shotera v7.9.2

**Base commit**: `a2f7adf9787c623f19e16b91781dda76192bc0df`
**Tag**: `v7.9.2`
**Date**: Sat Oct 24 14:12:12 2026 +0800

## 15 Published Locales
- en (default, no prefix)
- zh-cn
- zh-tw, ja, pt-br, es, de, fr, it, ko, ru, ar, nl, pl, sv

## Routes & Pages
- `/` (index.astro) — homepage
- `/about` — about page
- `/faq` — FAQ page
- `/contact` — contact page
- `/changelog` — changelog page
- `/versions` — version comparison
- `/privacy` — privacy policy
- `/terms` — terms of service
- `[locale]/[...path].astro` — dynamic catch-all for other locales
- All locales have `/changelog.md` except en/zh-cn which have full pages

## Key Directories
- `src/assets/` — images, favicons, styles
- `src/components/` — UI components, widgets, localization
- `src/data/` — about-banner.ts, download-count.json
- `src/i18n/` — all localization data (site-content, ui, download, faq, home-features, locale-extras, versions-content)
- `src/icons/` — icon files
- `src/layouts/` — page layouts
- `src/pages/` — route pages
- `src/utils/` — utility functions (download.ts, permalinks, images, etc)
- `public/` — static files (robots, CNAME, fonts, _headers)
- `vendor/integration/` — custom Astro integration

## Technology Stack
- Astro 6.4.2
- Node.js >=22.12.0
- Tailwind CSS v4
- TypeScript 5.9.3
- Sharp 0.34.5 (image processing)

## Build Commands
- `npm run dev` — development server
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run check` — run astro/eslint/prettier checks
