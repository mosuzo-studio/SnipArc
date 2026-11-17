import { getV3Copy } from './copy-intl';
import type { V3Copy } from './copy';

/** Home-only copy; preserves the English fallback for the other 13 locales. */
export function getHomeCopy(lang: string): V3Copy {
  const base = getV3Copy(lang);
  if (lang !== 'en' && lang !== 'zh-cn') return base;
  const zh = lang === 'zh-cn';
  const result: V3Copy = {
    ...base,
    hero: {
      ...base.hero,
      announce: zh ? '为 Windows 打造的截图工具' : 'Screen capture, made for Windows',
      h1: zh
        ? [[{ text: '截下所见，' }], [{ text: '把想法说清楚。', hl: true }]]
        : [[{ text: 'Capture a moment.' }], [{ text: 'Make your point.', hl: true }]],
      sub: zh
        ? '框选、标注、复制，让一张截图清楚传达你的想法。需要时，还能贴图对照、录制操作或提取图片中的文字。'
        : 'Select, annotate, and copy. Turn what’s on your screen into something worth sharing—with pinned references, recording, and text extraction when you need them.',
      primary: zh ? '下载 Windows 版' : 'Download for Windows',
      secondary: zh ? '探索功能' : 'Explore the features',
      metaStrong: 'Windows',
      metaRest: zh ? '安装版与便携版' : 'Installer and portable editions',
      modes: [
        {
          key: 'capture',
          label: zh ? '截图与标注' : 'Capture',
          caption: zh ? '真实 SnipX 界面 · 选区与标注工具栏' : 'Actual SnipX capture interface · Chinese UI shown',
        },
        {
          key: 'ai',
          label: zh ? '文字提取' : 'Extract text',
          caption: zh ? '真实 SnipX 界面 · 识别图片中的文字' : 'Actual SnipX text extraction · Chinese UI shown',
        },
      ],
    },
    trust: zh
      ? [
          { value: '截图', label: '框选与标注' },
          { value: '贴图', label: '随手对照' },
          { value: '录屏', label: '分享操作过程' },
          { value: 'OCR', label: '提取图片文字' },
        ]
      : [
          { value: 'Capture', label: 'and annotate' },
          { value: 'Pin', label: 'a reference' },
          { value: 'Record', label: 'a walkthrough' },
          { value: 'OCR', label: 'to extract text' },
        ],
    modesSection: {
      ...base.modesSection,
      eyebrow: zh ? '从日常任务出发' : 'A simpler daily workflow',
      title: zh ? '不只是截下来，更是用起来。' : 'From a quick capture to a clearer conversation.',
      lead: zh
        ? '解释问题、对照资料、分享操作，选择适合当下的方式。'
        : 'Explain an issue, keep a reference close, or show someone how it’s done.',
      bestFor: zh ? '适合：' : 'FOR: ',
      cards: zh
        ? [
            {
              icon: 'capture',
              title: '把问题说明白',
              one: '比起一大段描述，圈出问题更直接。',
              steps: ['截取需要讨论的区域', '用箭头或矩形标出重点', '复制到对话或文档中'],
              bestFor: '问题反馈、文档说明',
            },
            {
              icon: 'pin',
              title: '把参考放眼前',
              one: '对照内容时，让需要的信息留在旁边。',
              steps: ['截取一张参考图', '将它贴在桌面上', '边看边完成手头工作'],
              bestFor: '资料对照、设计参考',
            },
            {
              icon: 'record',
              title: '把过程演示出来',
              one: '需要解释连续步骤时，用录制呈现操作。',
              steps: ['确定要展示的区域', '录制一次操作过程', '按当前版本支持的格式保存'],
              bestFor: '操作指引、问题复现',
            },
          ]
        : [
            {
              icon: 'capture',
              title: 'Explain an issue',
              one: 'A marked-up screenshot gives the conversation a clear starting point.',
              steps: [
                'Capture the relevant area',
                'Mark the detail with an arrow or rectangle',
                'Copy it into a conversation or document',
              ],
              bestFor: 'Bug reports and documentation',
            },
            {
              icon: 'pin',
              title: 'Keep a reference close',
              one: 'Keep the information you need beside the task you are working on.',
              steps: ['Capture a reference', 'Pin it to your desktop', 'Keep working with it in view'],
              bestFor: 'Reference material and design work',
            },
            {
              icon: 'record',
              title: 'Show the steps',
              one: 'Use a recording when the sequence of actions tells the story.',
              steps: ['Choose the area to show', 'Record the workflow', 'Save in a format supported by your version'],
              bestFor: 'Walkthroughs and reproducing issues',
            },
          ],
    },
    features: zh
      ? [
          {
            image: 'capture',
            eyebrow: '01 / 截图',
            title: '选中需要的，留下重点。',
            lead: '在真实桌面上框选区域，用随选区出现的工具栏继续操作。',
            rows: ['区域选择与边界调整', '标注、复制与保存', '快捷键提示随时可见'],
          },
          {
            image: 'modes',
            eyebrow: '01 / 截图与标注',
            title: '截下来，标清楚，直接分享。',
            lead: '用矩形与箭头标出重点，让反馈、说明和操作指引更直观。',
            rows: ['用矩形圈出关键区域', '用箭头指向需要关注的位置', '在截图过程中直接完成标注'],
            reversed: true,
          },
          {
            image: 'ai',
            eyebrow: '02 / 文字提取',
            title: '图片里的文字，也能复制。',
            lead: '识别选区中的文字，在结果面板中查看并复制，减少手动录入。',
            rows: ['从图片选区提取文字', '在独立结果面板中查看', '复制文字，接着完成手头的工作'],
          },
        ]
      : [
          {
            image: 'capture',
            eyebrow: '01 / CAPTURE',
            title: 'Keep exactly what matters.',
            lead: 'Select a region on your desktop, then work from the toolbar that follows your selection.',
            rows: ['Select and adjust a region', 'Annotate, copy, or save', 'Keyboard hints stay within reach'],
          },
          {
            image: 'modes',
            eyebrow: '01 / CAPTURE & ANNOTATE',
            title: 'Capture it. Mark it. Share it.',
            lead: 'Point to the detail with rectangles and arrows. Make feedback and instructions easier to follow.',
            rows: ['Frame the important area', 'Point out a detail with an arrow', 'Annotate right inside the capture'],
            reversed: true,
          },
          {
            image: 'ai',
            eyebrow: '02 / EXTRACT TEXT',
            title: 'Take the words out of the image.',
            lead: 'Recognize text in a selected region, review the result, and copy it into your next task.',
            rows: [
              'Extract text from a selection',
              'Review it in a separate panel',
              'Copy the result and keep working',
            ],
          },
        ],
    cta: {
      ...base.cta,
      eyebrow: zh ? '开始使用 SnipX' : 'YOUR NEXT SCREENSHOT',
      title: zh ? '让下一张截图，更有用。' : 'Make your next screenshot count.',
      lead: zh ? '选择适合你的 Windows 版本，开始截图。' : 'Choose the Windows edition that fits your workflow.',
      primary: zh ? '下载 Windows 版' : 'Download for Windows',
      note: zh ? '也可以选择免安装的便携版' : 'Prefer no installation? Choose the portable edition.',
    },
  };
  return { ...result, features: result.features.filter((feature) => feature.image !== 'capture') };
}
