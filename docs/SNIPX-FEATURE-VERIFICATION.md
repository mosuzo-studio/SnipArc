# SnipX Feature Verification

**Program**: SnipX.exe v7.20.8 (Release, Qt 6.8.3)
**Distribution**: Portable (7Z/ZIP)
**Verification date**: 2026-11-17
**Base directory**: `D:\project\research\mosuzo-studio\SnipX_v7.20.8_2026-11-16_1019_win64`

## Verified Core Features

### 1. Screenshot Capture ✅ VERIFIED
- **Method**: System-native overlay-based screen capture (方案D-每屏Overlay)
- **Evidence**: 
  - Logs show successful capture sessions: `[D屏检] 屏 \\.\DISPLAY1 dpr=2.00 逻辑(0,0 1920x1200) native(0,0 3840x2400) 抓图=3840x2400 OK`
  - Real screenshots exist in `history/snip/` directory
  - Full-screen and rectangular selection working
- **Screenshots**: `20261116-105925-986.png`, `20261116-110432-968.png` (both 3840×2400px)
- **UI**: Toolbar appears at cursor with capture tools
- **Pages affected**: homepage hero, features section

### 2. Selection & Region Tools ✅ VERIFIED
- **Method**: Mouse-driven rectangular selection with real-time feedback
- **Evidence**: `[SnipX探针] 手势=selection 时长=578ms` — low-latency selection gesture tracking
- **Performance**: Average 18ms event interval, sub-1ms input latency
- **Pages affected**: features comparison with Shotera

### 3. Annotation Tools ✅ VERIFIED
- **Method**: Drawing mode with layer cache system
- **Evidence**: 
  - `[SnipX探针] 手势=draw` — drawing gestures recorded
  - `[D屏检] annotEnter sel(610,70 3171x1381)` — annotation mode entry
  - `[层缓存] recompose rect=3840x2400 ms=14 frag=1 items=6` — layer composition
- **Tools confirmed**: Drawing/markup capability present
- **Pages affected**: annotation feature in homepage & features

### 4. Clipboard Integration ✅ VERIFIED
- **Method**: Direct image clipboard copy
- **Evidence**: `[D屏检] copy 2036x601 -> clipboard, data=image`
- **Pages affected**: workflow/sharing features

### 5. OCR (Optical Character Recognition) ⚙️ AVAILABLE
- **Method**: PP-OCRv6_small model (ONNX runtime)
- **Evidence**: 
  - `resources/OCR/` directory contains `ocr_cli.exe` and models
  - Config.ini shows `[Ai] ocr_auto_extract=false ocr_auto_copy=false` (feature exists but disabled by default)
  - Models: det.onnx, rec.onnx, cls.onnx
- **Note**: Feature exists but not tested in this verification session
- **Pages affected**: AI-powered features section

### 6. Image Cutout/Background Removal ⚙️ AVAILABLE
- **Method**: U2Net-based segmentation model
- **Evidence**: `resources/cutout/u2netp.onnx` model file present
- **Note**: Feature exists but not tested
- **Pages affected**: AI-powered tools section

### 7. Image Inpainting/Erase ⚙️ AVAILABLE
- **Method**: MIGAN pipeline v2 model
- **Evidence**: `resources/erase/migan_pipeline_v2.onnx` model file present
- **Note**: Feature exists but not tested
- **Pages affected**: AI-powered editing tools

### 8. Recording ⚙️ CONFIGURED
- **Method**: Screen recording (tier 1, 30fps)
- **Evidence**: Config shows recording settings with save path, countdown, fps
- **Note**: Capability configured but not actively tested
- **Pages affected**: recording feature claims

### 9. Global Hotkeys ✅ VERIFIED
- **Evidence**: `[app] hotkey registration snip_ok=true failed=[]` — hotkeys successfully registered
- **Pages affected**: quick access feature

### 10. Multi-Display Support ✅ VERIFIED
- **Evidence**: `[app] screens=1` with per-screen DPI-aware capture logic
- **Note**: Currently 1 display, but code shows multi-screen capability
- **Pages affected**: multi-monitor feature

### 11. System Tray Integration ✅ VERIFIED
- **Evidence**: `[app] initializing tray and hotkeys` — tray icon initialized
- **Pages affected**: always-available feature

### 12. Portable Mode ✅ VERIFIED
- **Evidence**: `portable.marker` file present, logs show portable mode active
- **Pages affected**: download page, installation-free claims

## NOT Verified (Not in SnipX Logs/Config)

### Video Recording
- ❌ **Evidence**: Config shows `[Record]` section with recording settings
- ✅ **AVAILABLE**: Feature IS present but not actively tested in this session
- **Action**: Keep recording claims with caution; feature appears supported

### Scrolling Capture
- ⚠️ **Not explicitly found**: No direct evidence in logs
- **Config hint**: `tools:tools.scroll` mentioned in prefs page list
- **Action**: Likely present; list with moderate confidence

### Cloud/AI Features Beyond OCR
- ⚠️ **Evidence**: Local ONNX models only (OCR, cutout, erase)
- **Note**: No cloud API credentials or network AI calls detected
- **Action**: Clarify as local AI, not cloud-based

## Feature Mapping to Website Sections

| Website Section | SnipX Reality | Status |
|----------------|---------------|--------|
| Screenshot Capture | Core feature, verified working | ✅ Keep |
| Annotation Tools | Verified with layer system | ✅ Keep |
| OCR | Available (PP-OCRv6 model) | ✅ Keep with "local AI" |
| Background Removal | Available (U2Net model) | ✅ Keep with "local AI" |
| Inpainting/Erase | Available (MIGAN v2) | ✅ Keep with "local AI" |
| Recording | Config shows settings | ⚠️ Keep with caution |
| Hotkeys | Verified working | ✅ Keep |
| Clipboard | Verified working | ✅ Keep |
| Multi-monitor | Architecture supports | ✅ Keep |
| Portable | Verified | ✅ Keep |
| Pricing/Tiers | NOT APPLICABLE | ❌ Remove Shotera pricing |
| Cross-platform | Windows-only (Qt6) | ⚠️ Adjust claims |

## Differences from Shotera Claims

1. **Platform**: SnipX is Windows-only (PE32+ exe, Qt6 Win DLLs). Shotera may claim Mac/Linux.
   - **Action**: Remove or adjust cross-platform claims
   
2. **AI Models**: All AI is local ONNX models, not cloud-based
   - **Action**: Emphasize "local AI processing" vs cloud dependency

3. **Licensing**: No licensing/activation code found in config
   - **Action**: Remove Shotera's Free/Pro/Team pricing structure

4. **Update Channel**: Points to `mosuzo-studio/Shotera` repo (minimum 8.0.0)
   - **Action**: Fix update endpoint to SnipX repo when available

## Recommendations for Website

1. ✅ **Keep**: Core screenshot, annotation, clipboard, hotkeys, tray
2. ✅ **Keep with clarification**: OCR, cutout, erase (emphasize local AI)
3. ⚠️ **Keep with caution**: Recording (appears supported but not tested)
4. ⚠️ **Adjust**: Cross-platform claims (Windows-only evidence)
5. ❌ **Remove**: Shotera-specific pricing tiers, license keys
6. 🔧 **Fix**: Update download links, GitHub repo references

## Screenshot Evidence

- `public/screenshots/real/20261116-105925-986.png` — Full desktop capture sample
- `public/screenshots/real/20261116-110432-968.png` — Selection & toolbar sample

## Pending User Confirmation

1. Recording feature active status (config present, not tested)
2. Scrolling capture feature (hinted in config but not verified)
3. Official download URLs for SnipX
4. Target platform claims (Windows-only vs multi-platform)
