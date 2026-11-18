# 帮助页面预览

新增中英文快速开始、快捷键速查、问题排查，原 FAQ 页面升级为统一帮助入口。下载页、页脚同步增加指南入口；顶部导航保持功能、下载、帮助。404 页面提供首页、下载与帮助三条恢复路径。

## 页面

| 内容 | 英文 | 简体中文 |
| --- | --- | --- |
| 帮助中心 | `/faq` | `/zh-cn/faq` |
| 快速开始 | `/guide` | `/zh-cn/guide` |
| 快捷键速查 | `/guide/shortcuts` | `/zh-cn/guide/shortcuts` |
| 问题排查 | `/guide/troubleshooting` | `/zh-cn/guide/troubleshooting` |

快捷键页提供搜索、无结果提示、匹配数量与浏览器打印。输入框支持键盘操作，指南导航标明当前页面，手机端导航移到正文上方。问题排查提供启动、热键、捕获、OCR、录制五类检查顺序，不将通用建议表述为已验证修复。

## 快捷键证据

仅只读核对 `D:\project\research\SnipX`，没有修改软件。

- `src/core/AppSettings.cpp`：`snipHotkeyText()` 默认 F1，`pasteHotkeyText()` 默认 F3。
- `src/capture/OverlayController.cpp`：有效选区下 Ctrl+S 保存，Ctrl+Shift+S 快捷保存；`QKeySequence::Copy` 根据 OCR 状态复制识别文字或截图。
- `src/capture/MaskWindow.cpp` 和 `OverlayController.cpp`：Esc 与当前状态有关，部分工具先退出编辑操作。
- 头文件中的“截图并复制默认 F2”注释与 CPP 的默认未绑定实现不一致，网站没有照抄该键位。

快速开始页复用已有 v7.20.9 中文实机图，英文明确标注 Chinese UI。未重新运行程序或拍摄新素材，也没有把网站通用排查建议标成当前版本实测结论。

## 范围与检查

其余 13 种语言不新增翻译；切换到这些语言的指南地址时回退英文页面，避免 404。本轮没有改写隐私政策与许可条款，其数据收集、翻译服务和绝对化承诺仍需事实核对后另行修改。

验收命令：`npm run check:astro`、`npm run build`、`node tools/verify-site-refresh.cjs`。浏览器视觉与交互验收未完成，最终观感以用户本机预览为准。

本轮保留工作区修改，供先预览；未自动提交或发布。
