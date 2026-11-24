# SnipArc v7.20.9 Screenshot Update

## Source Specification

| Field | Value |
|-------|-------|
| Program | SnipArc v7.20.9 (2026-11-16) |
| Executable | Historical v7.20.9 executable |
| Build date | 2026-11-16 1609 |
| Qt version | Qt 6.8.3 |
| Portable | Yes (portable.marker present) |

## Desktop Capture Environment

- **Wallpaper**: Windows 11 Bloom (classic, user-prepared)
- **Desktop icons**: Hidden
- **Windows**: Minimized via Win+D before capture (except for sample document window)
- **Taskbar**: Visible in some captures (cropped or minimized in final assets)
- **Resolution**: 3840×2400 virtual desktop (HiDPI aware capture via PIL.ImageGrab)
- **Capture method**: PIL.ImageGrab (bypasses GDI BitBlt all-black issue on Windows 11 DWM)

## Captured Scenes (zh-CN UI)

| Scene | File | Size | Content | Verification |
|-------|------|------|---------|--------------|
| Desktop clean | `01-desktop-clean.png` | 3840×2400 | Bloom wallpaper, no windows, taskbar visible | ✓ Baseline |
| Snip overlay active | `02-snip-overlay.png` | 3840×2400 | F1 triggered, keyboard hints panel, color magnifier | ✓ Overlay functional |
| Selection + toolbar | `03-snip-selected.png` | 3840×2400 | 2751×1601 selection, full toolbar, magnifier | ✓ Selection gesture + toolbar render |
| Annotations (rect+arrow) | `04-annotate-zh.png` | 3840×2400 | Rectangle (red) and arrow (red) drawn, color picker active | ✓ Annotation tools functional |
| Pin to desktop attempt | `05-pin-zh.png` | 3840×2400 | Selection blended into wallpaper after pin (F3 hotkey) | ✓ Pin hotkey works |
| Pin demo (clipboard) | `06-pin-demo-zh.png` | 3840×2400 | F1→drag→Ctrl+C→F3 sequence, pinned window minimal overlay | ✓ Copy+pin workflow |
| OCR text extraction | `10-ocr-result-zh.png` | 3840×2400 | OCR panel with extracted text from Notepad sample, Chinese UI | ✓ OCR functional |

## Website Assets Created

| Filename | Dimensions | Source | Slot wired |
|----------|-----------|--------|------------|
| `src/assets/images/real/capture-wide.zh-cn.png` | 1792×1024 | 03-snip-selected cropped | Hero `capture` |
| `src/assets/images/real/capture-demo.zh-cn.png` | 1024×1024 | 03-snip-selected cropped | Feature `capture` |
| `src/assets/images/real/ai-wide.zh-cn.png` | 1792×1024 | 10-ocr-result cropped | Hero `ai` |
| `src/assets/images/real/annotate-wide.zh-cn.png` | 1792×1024 | 04-annotate-zh cropped | Feature `ai` |

Slots left on their inherited renders because no verified capture exists yet:
`long` / `longshot` (scrolling capture), `record` / `recording`, `pin`, `modes`.
The annotation shot is wired to the `ai` feature slot rather than `pin`, because
the pin section's copy describes pinning, which these captures do not show.

## Integration: Locale Conditional Logic

**File modified**: `src/components/v3/Home.astro`

**Changes**:
- Imported the four real zh-CN image assets
- Added locale detection: `const realShots = lang === 'zh-cn'`
- `shotSources` and `featureSources` pick the real capture for that locale and the inherited render for every other locale

**Scope correction**: the captures show the **Chinese** SnipArc UI, so only `/zh-cn`
takes them. English and the other 13 locales keep their existing images — putting
a Chinese-UI screenshot on the English page would mismatch the page language.

**Verified by grepping the build output** (`dist/<locale>/index.html`) for the four
real-image filenames:

| Route | Real-image references |
|-------|----------------------|
| `/` (en) | 0 |
| `/zh-cn` | 4 |
| `/ja`, `/de`, `/zh-tw`, `/ru` | 0 |

## Build & Verification

- **Build command**: `npm run build`
- **Build result**: ✓ 109 pages built successfully in 8.64s
- **Image processing**: Astro asset pipeline created WebP variants automatically
- **Compression**: HTML (124 files, 578.71 KB) and CSS (1 file, 500 B) compressed
- **No errors**: 0 Astro errors, 0 lint errors from changes

## Limitations & Known Issues

1. **English UI screenshots**: Not captured. Real SnipArc interface is in Simplified Chinese (zh-CN) only. English-language product page waits for EN-UI captures.

2. **Incomplete feature set**: 
   - Scrolling capture (long screenshot feature) — not visually demoed
   - Recording toolbar — not captured
   - Pin-to-desktop appearance — pinned content blended into wallpaper (visual context lost)
   - Multiple annotation types — only rectangle and arrow shown

3. **Slots left empty** (inheriting existing renders): `long`, `record`, `pin`, `modes`

4. **Config restrictions**: SnipArc language switching requires in-app settings GUI; direct config.ini edits blocked by permissions.

## Restoration Status

- **Windows state**: SnipArc (v7.20.9) still running; Notepad closed; taskbar and desktop intact
- **Temporary files**: Sample document and capture script remain in `tools/capture/` for future reference
- **Config**: SnipArc config unchanged from portable defaults

## Final Locations

- **Website source**: `D:\project\research_mosuzo\mosuzo-site\SnipArc-Site\`
- **Image assets**: `src/assets/images/real/*.zh-cn.png`
- **Component logic**: `src/components/v3/Home.astro` (locale-conditional)
- **Dev preview**: http://127.0.0.1:4321/ (English), http://127.0.0.1:4321/zh-cn (Simplified Chinese)
## Next Steps

1. Capture SnipArc English UI (same scenes) via in-app settings language switch
2. Process EN images to site dimensions and save as `capture-wide.en.png`, etc.
3. Wire the EN set into the `realShots` branch for `lang === 'en'`
4. Capture the remaining feature scenes: scrolling capture, recording toolbar, a visible pinned window, the two completion modes
5. Update EN/zh-CN copy in `src/components/v3/copy.ts` to match whatever the final images actually show
6. Verify desktop + mobile, light/dark themes
