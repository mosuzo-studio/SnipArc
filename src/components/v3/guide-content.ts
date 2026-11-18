export type GuideKind = 'start' | 'shortcuts' | 'troubleshooting';
export function getGuideContent(lang: string) {
  const zh = lang === 'zh-cn';
  return {
    title: zh ? '从第一张截图开始。' : 'Start with your first capture.',
    lead: zh
      ? '用几个简单步骤，把屏幕内容变成清楚的说明。'
      : 'Turn something on your screen into a clear explanation in a few steps.',
    nav: [
      {
        key: 'start' as GuideKind,
        path: '/guide',
        title: zh ? '快速开始' : 'Quick start',
        note: zh ? '运行、截图、标注与分享' : 'Run, capture, annotate, and share',
      },
      {
        key: 'shortcuts' as GuideKind,
        path: '/guide/shortcuts',
        title: zh ? '快捷键速查' : 'Keyboard shortcuts',
        note: zh ? '找到当前操作的按键' : 'Find the keys for your next action',
      },
      {
        key: 'troubleshooting' as GuideKind,
        path: '/guide/troubleshooting',
        title: zh ? '问题排查' : 'Troubleshooting',
        note: zh ? '按现象检查，再反馈问题' : 'Check the symptoms before reporting',
      },
    ],
    steps: zh
      ? [
          {
            title: '运行 SnipArc',
            text: '便携版需要先完整解压，再运行 SnipX.exe。程序运行后会提供托盘入口；具体安装包与系统要求以对应版本说明为准。',
          },
          {
            title: '按 F1，框选需要的内容',
            text: 'F1 是默认截图快捷键。拖动选出区域，检查边界是否包含需要说明的内容。若已自定义快捷键，请使用设置中的按键。',
          },
          {
            title: '用标注突出重点',
            text: '在选区工具栏选择矩形或箭头，圈出需要讨论的位置。先完成一两个重点标记，再决定是否需要更多说明。',
          },
          {
            title: '复制或保存',
            text: '普通截图状态下，按 Ctrl+C 复制截图，或按 Ctrl+S 选择保存位置。文字输入或 OCR 状态可能改变复制对象，请留意当前工具。',
          },
          {
            title: '需要对照时，试试贴图',
            text: '复制图片后，默认按 F3 将剪贴板图片贴到桌面。让参考图留在旁边，再继续手头的工作。',
          },
        ]
      : [
          {
            title: 'Run SnipArc',
            text: 'For a portable build, extract the complete package before running SnipX.exe. The running app provides a tray entry. Check the release information for package availability and system requirements.',
          },
          {
            title: 'Press F1 and select a region',
            text: 'F1 is the default capture shortcut. Drag to select an area and check that its boundaries include what you want to explain. Use your configured shortcut if you changed it.',
          },
          {
            title: 'Mark the important detail',
            text: 'Choose a rectangle or arrow from the selection toolbar. Start with one or two clear marks before adding more explanation.',
          },
          {
            title: 'Copy or save',
            text: 'During a normal capture, press Ctrl+C to copy the image, or Ctrl+S to choose a save location. Text editing and OCR can change what gets copied; check the active tool.',
          },
          {
            title: 'Keep a reference close',
            text: 'After copying an image, press F3, the default paste shortcut, to pin the clipboard image to your desktop and keep it beside your work.',
          },
        ],
    shortcuts: zh
      ? [
          { group: '全局', keys: ['F1'], action: '开始截图', note: '默认全局快捷键，可在设置中查看当前绑定。' },
          { group: '全局', keys: ['F3'], action: '贴图', note: '将剪贴板中的图片贴到桌面；剪贴板需有可用图片。' },
          {
            group: '截图中',
            keys: ['Ctrl', 'C'],
            action: '复制当前内容',
            note: '普通截图时复制图片；OCR 结果活动时可能复制识别文字。',
          },
          { group: '截图中', keys: ['Ctrl', 'S'], action: '保存截图', note: '需要先有有效选区，随后选择保存位置。' },
          {
            group: '截图中',
            keys: ['Ctrl', 'Shift', 'S'],
            action: '快捷保存',
            note: '使用软件配置的快捷保存位置；请先检查保存设置。',
          },
          {
            group: '截图中',
            keys: ['Esc'],
            action: '退出当前操作',
            note: '根据状态退出当前工具或取消截图；部分工具先退出编辑状态。',
          },
        ]
      : [
          {
            group: 'Global',
            keys: ['F1'],
            action: 'Start capture',
            note: 'Default global shortcut. Check settings for your current binding.',
          },
          {
            group: 'Global',
            keys: ['F3'],
            action: 'Pin from clipboard',
            note: 'Paste a clipboard image onto your desktop. A usable image must be on the clipboard.',
          },
          {
            group: 'During capture',
            keys: ['Ctrl', 'C'],
            action: 'Copy current content',
            note: 'Copies the image in a normal capture. Active OCR results may copy recognized text instead.',
          },
          {
            group: 'During capture',
            keys: ['Ctrl', 'S'],
            action: 'Save capture',
            note: 'Requires a valid selection, then lets you choose a save location.',
          },
          {
            group: 'During capture',
            keys: ['Ctrl', 'Shift', 'S'],
            action: 'Quick save',
            note: 'Uses the configured quick-save destination. Check save settings first.',
          },
          {
            group: 'During capture',
            keys: ['Esc'],
            action: 'Leave current operation',
            note: 'Leaves the active tool or cancels capture, depending on the current state.',
          },
        ],
    problems: zh
      ? [
          {
            id: 'launch',
            title: '程序无法启动',
            checks: [
              '确认已完整解压便携包，不要只运行压缩包里的 EXE。',
              '保留同目录的组件与资源，核对该版本要求的 Windows 环境。',
              '如果有错误提示，记录完整信息与软件版本；不要反复覆盖个人配置。',
            ],
          },
          {
            id: 'hotkey',
            title: '按快捷键没有反应',
            checks: [
              '先确认 SnipArc 已运行，再尝试从托盘入口开始截图。',
              '检查设置中的当前按键及注册状态，留意是否与其他截图工具冲突。',
              '可调整冲突按键后重试；提交反馈时说明托盘入口是否可用。',
            ],
          },
          {
            id: 'capture',
            title: '截图内容黑屏、错位或不完整',
            checks: [
              '比较普通桌面与目标窗口，确认是否只有特定应用出现问题。',
              '记录显示器数量、分辨率与缩放比例，并尝试在单个屏幕上复现。',
              '部分窗口可能限制捕获；不要为了截图关闭系统安全保护。',
            ],
          },
          {
            id: 'ocr',
            title: '无法提取文字或结果不理想',
            checks: [
              '确认当前版本包含所需的 OCR 组件与本地资源。',
              '使用清晰、字号足够大的文字区域，避开复杂背景和工具栏。',
              '记录原图语言、操作步骤和错误提示；识别后仍需人工核对结果。',
            ],
          },
          {
            id: 'recording',
            title: '录制无法开始或保存失败',
            checks: [
              '检查是否已经选择录制区域，以及当前录制状态。',
              '确认保存位置可写且磁盘有空间，先录制一小段中性测试内容。',
              '反馈时注明 MP4 或 GIF、录制设置和具体错误，不要发送私密录制内容。',
            ],
          },
        ]
      : [
          {
            id: 'launch',
            title: 'The app will not start',
            checks: [
              'Extract the complete portable package instead of running the EXE inside an archive.',
              'Keep companion components and resources together. Check the release requirements for your Windows environment.',
              'Record the complete error and app version. Avoid repeatedly overwriting your personal configuration.',
            ],
          },
          {
            id: 'hotkey',
            title: 'The capture shortcut does nothing',
            checks: [
              'Confirm SnipArc is running, then try starting capture from its tray entry.',
              'Check the configured key and its registration status. Look for conflicts with other capture tools.',
              'Try a different binding if there is a conflict. Note whether tray capture works when reporting the issue.',
            ],
          },
          {
            id: 'capture',
            title: 'A capture is black, offset, or incomplete',
            checks: [
              'Compare your desktop with the affected window to see whether the issue is limited to one app.',
              'Record the number of monitors, resolution, and display scaling. Try reproducing it on one screen.',
              'Some windows restrict capture. Do not disable system security protections to work around it.',
            ],
          },
          {
            id: 'ocr',
            title: 'Text extraction fails or is inaccurate',
            checks: [
              'Check that your build includes the required OCR components and local resources.',
              'Select clear, reasonably sized text and avoid complex backgrounds and toolbars.',
              'Record the text language, steps, and error. Review recognized text before relying on it.',
            ],
          },
          {
            id: 'recording',
            title: 'Recording cannot start or save',
            checks: [
              'Check that you have selected a recording area and review the current recording state.',
              'Check that the output folder is writable and disk space is available. Try a short, neutral test recording.',
              'Include MP4 or GIF, recording settings, and the exact error in your report. Avoid sharing private recordings.',
            ],
          },
        ],
  };
}
