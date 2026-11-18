/* eslint-disable @typescript-eslint/no-require-imports */
// Integration checks against production output. Run after npm run build.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const read = (route) => fs.readFileSync(path.join('dist', route, 'index.html'), 'utf8');
let pages = 0;
let links = 0;
for (const prefix of ['', 'zh-cn/']) {
  for (const route of [
    '',
    'download',
    'versions',
    'faq',
    'about',
    'contact',
    'changelog',
    'guide',
    'guide/shortcuts',
    'guide/troubleshooting',
  ]) {
    const current = prefix + route;
    const html = read(current);
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${current}: single h1`);
    assert(html.includes('v3-refresh'), `${current}: shared styling`);
    assert(!html.includes('TBD_SNIPARC_STORE_ID'), `${current}: store placeholder`);
    assert(!/SnipX(?!\.exe)/.test(html), `${current}: old brand`);
    assert(!/snipx\.mosuzo\.com/i.test(html), `${current}: old domain`);
    assert(html.includes('data-v3-studio-trigger'), `${current}: studio menu trigger`);
    assert(
      html.includes('https://github.com/mosuzo-studio/Shotera/releases'),
      `${current}: Shotera releases fallback`
    );
    assert(html.includes('https://sniparc.mosuzo.com'), `${current}: production canonical domain`);
    const header = html.match(/<header[\s\S]*?<\/header>/)?.[0] || '';
    assert.equal((header.match(/class="v3-navlink"/g) || []).length, 3, `${current}: primary navigation`);
    for (const match of html.matchAll(/href="([^"?#]*)(?:\?[^"#]*)?(?:#([^"]+))?"/g)) {
      const pathname = match[1];
      if ((!pathname.startsWith('/') && pathname !== '') || pathname.startsWith('//')) continue;
      const target = pathname ? pathname.replace(/^\//, '').replace(/\/$/, '') : current;
      let targetFile = path.join('dist', target);
      if (!path.extname(targetFile) || (fs.existsSync(targetFile) && fs.statSync(targetFile).isDirectory())) {
        targetFile = path.join(targetFile, 'index.html');
      }
      assert(fs.existsSync(targetFile), `${current}: missing target ${targetFile}`);
      if (match[2] && targetFile.endsWith('.html')) {
        assert(
          fs.readFileSync(targetFile, 'utf8').includes(`id="${match[2]}"`),
          `${current}: missing fragment ${match[0]}`
        );
      }
      links++;
    }
    for (const match of html.matchAll(/<img[^>]+src="([^"]+)"/g)) {
      if (match[1].startsWith('/')) assert(fs.existsSync(path.join('dist', match[1])), `${current}: missing image`);
    }
    pages++;
  }
  const home = read(prefix);
  assert(home.includes('sx-image-dialog'), `${prefix}: image viewer`);
  assert.equal((home.match(/<details /g) || []).length, 5, `${prefix}: pre-download help`);
  assert.equal(
    (home.match(/class="v3-section is-tight v3-anchor"/g) || []).length,
    2,
    `${prefix}: consolidated feature sections`
  );
  assert(!home.includes('class="v3-trust"'), `${prefix}: duplicate summary removed`);
  const download = read(prefix + 'download');
  assert(
    download.includes('https://github.com/mosuzo-studio/SnipArc/releases'),
    `${prefix}: confirmed release destination`
  );
  assert(!download.includes('apps.microsoft.com'), `${prefix}: unverified store listing hidden`);
  assert(!download.includes('/ja/download'), `${prefix}: language fallback for new page`);
  const shortcuts = read(prefix + 'guide/shortcuts');
  assert.equal((shortcuts.match(/<tr data-shortcut-row/g) || []).length, 6, `${prefix}: shortcut rows`);
  assert(shortcuts.includes('sx-shortcut-search'), `${prefix}: searchable shortcuts`);
  assert(!shortcuts.includes('/ja/guide'), `${prefix}: guide language fallback`);
  const help = read(prefix + 'faq');
  for (const route of ['guide', 'guide/shortcuts', 'guide/troubleshooting'])
    assert(help.includes(`href="/${prefix}${route}"`), `${prefix}: help entry ${route}`);
}
for (const lang of ['ja', 'de', 'zh-tw', 'ar', 'fr', 'es', 'it', 'ko', 'nl', 'pl', 'pt-br', 'ru', 'sv']) {
  assert(!read(lang).includes('v3-refresh'), `${lang}: legacy design retained`);
}
console.log(JSON.stringify({ pagesChecked: pages, localLinksChecked: links, otherLocalesPreserved: 13 }, null, 2));
