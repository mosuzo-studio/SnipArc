export function getSupportCopy(lang: string) {
  const zh = lang === 'zh-cn';
  return {
    title: zh ? '下载前，你可能想知道' : 'A few things before you download',
    lead: zh ? '从选择下载包到开始第一张截图。' : 'From choosing a package to taking your first screenshot.',
    items: zh
      ? [
          {
            id: 'windows',
            q: '应该下载哪个 Windows 版本？',
            a: '日常使用可优先选择发行页提供的安装包；希望解压后直接运行，可以选择便携包。具体格式与系统要求以对应版本的发行说明为准。',
          },
          {
            id: 'start',
            q: '如何开始截图？',
            a: '运行 SnipArc 后，默认按 F1 开始截图。框选区域后，在工具栏中标注、复制或保存。若快捷键已被修改，请在软件设置中查看。',
          },
          {
            id: 'offline',
            q: '基础截图需要联网吗？',
            a: '截图、标注与复制使用本机功能。文字提取需要对应的本地识别资源；图片翻译是否联网取决于所选服务，使用前请查看软件中的服务设置。',
          },
          {
            id: 'portable',
            q: '安装版和便携版有什么区别？',
            a: '安装版通过安装向导设置软件；便携版解压后运行 SnipArc.exe。它们描述的是分发方式，不能据此推断功能或授权差异。',
          },
          {
            id: 'feedback',
            q: '遇到问题，应该提供什么信息？',
            a: '请记录软件版本、Windows 版本和复现步骤，并在方便时附上截图。发送前请检查图片中是否包含个人信息。',
          },
        ]
      : [
          {
            id: 'windows',
            q: 'Which Windows download should I choose?',
            a: 'For everyday use, choose an installer offered on the release page. Prefer to extract and run the app? Choose a portable package. Available formats and system requirements are listed with each release.',
          },
          {
            id: 'start',
            q: 'How do I take my first screenshot?',
            a: 'Run SnipArc and press F1, the default capture shortcut. Select a region, then annotate, copy, or save from the toolbar. If you changed the shortcut, check the app’s settings.',
          },
          {
            id: 'offline',
            q: 'Do basic screenshots need an internet connection?',
            a: 'Capture, annotation, and copying use local functionality. Text extraction requires the corresponding local recognition resources. Image translation may connect to a service, depending on your selected provider; check the service settings before use.',
          },
          {
            id: 'portable',
            q: 'What is the difference between installer and portable?',
            a: 'An installer sets up the app through a wizard. A portable package is extracted before running SnipArc.exe. These are distribution formats, rather than a statement about features or licensing.',
          },
          {
            id: 'feedback',
            q: 'What should I include in a bug report?',
            a: 'Include your SnipArc version, Windows version, and steps to reproduce the problem. A screenshot can help, but check it for personal information before sharing.',
          },
        ],
  };
}
