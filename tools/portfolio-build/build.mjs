import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const SRC = '/Users/neha/Documents/port123/design_handoff_portfolio/';
const OUT = '/Users/neha/Documents/port123/.claude/worktrees/portfolio-pages-build-cf0e66/';

const PAGES = [
  { file: 'Case QuickBooks Desktop.dc.html', slug: 'quickbooks-desktop' },
  { file: 'Case FP&A.dc.html', slug: 'fpa' },
  { file: 'Case Expert Platform.dc.html', slug: 'expert-platform' },
  { file: 'Case Appointments.dc.html', slug: 'appointments' },
  { file: 'Case Design Organization.dc.html', slug: 'design-organization' },
  { file: 'Case Walmart Assortment.dc.html', slug: 'walmart-assortment' },
  { file: 'Case Walmart Apps.dc.html', slug: 'walmart-com' },
  { file: 'Case Micorza.dc.html', slug: 'micorza' },
  { file: 'Note Building with AI.dc.html', slug: 'building-with-ai' },
  { file: 'Case Jifflenow.dc.html', slug: 'jifflenow' },
  { file: 'Life.dc.html', slug: null, out: 'life', life: true },
  { file: 'Portfolio 3a v3.dc.html', slug: null, out: 'portfolio', home: true },
];
const ROUTE = {};
for (const p of PAGES) ROUTE[p.file] = p.home ? '/portfolio/' : p.life ? '/life/' : `/portfolio/${p.slug}/`;

// local images -> /portfolio/assets/img
const IMG = {
  '96721ic68dc3d1622a6d2f-mw0fmynz-ee4p.webp': 'qbd-bank-feeds.webp',
  '96721ic68dc3d1622a6d2f-mw0fmcwt-e18d.webp': 'qbd-bank-feeds.webp',
  'images-1793805247556-64w7.png': 'qbd-ready-for-online.png',
  'group-1125087497-mw2cixmr-v36j.png': 'd4-on-stage.webp',
  'screenshot-2026-11-04-at-10-00-14-pm-mw2c1zi4-em8q.png': 'micorza-screen.png',
};
fs.mkdirSync(OUT + 'portfolio/assets/img', { recursive: true });
const cp = (a, b) => fs.copyFileSync(SRC + a, OUT + 'portfolio/assets/img/' + b);
cp('96721ic68dc3d1622a6d2f-mw0fmynz-ee4p.webp', 'qbd-bank-feeds.webp');
cp('uploads/images-1793805247556-64w7.png', 'qbd-ready-for-online.png');
// d4-on-stage.webp is supplied directly in portfolio/assets/img (replaces the handoff PNG)
cp('screenshot-2026-11-04-at-10-00-14-pm-mw2c1zi4-em8q.png', 'micorza-screen.png');

const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });

async function open(file, unlocked) {
  const ctx = unlocked ? await b.createBrowserContext() : b.defaultBrowserContext();
  const p = await ctx.newPage();
  await p.setViewport({ width: 1400, height: 900 });
  if (unlocked) await p.evaluateOnNewDocument(() => { try { localStorage.setItem('ns-unlocked', '1'); } catch (e) {} });
  p.on('pageerror', (e) => console.log(file, 'PAGEERR', e.message));
  await p.goto('file://' + encodeURI(SRC + file), { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1000));
  return p;
}

// runs in page: processes a clone of `sel` and returns html
const EXTRACT = (sel, ROUTE, IMG, opts) => {
  const live = document.querySelector(sel);
  const el = live.cloneNode(true);
  el.querySelectorAll('.sc-interp').forEach((s) => s.replaceWith(...s.childNodes));
  [el, ...el.querySelectorAll('*')].forEach((n) => {
    n.removeAttribute('data-dc-tpl');
    n.removeAttribute('style-hover');
    [...n.attributes].forEach((a) => { if (a.name.startsWith('hint-')) n.removeAttribute(a.name); });
  });
  // image slots
  el.querySelectorAll('image-slot').forEach((s) => {
    let src = s.getAttribute('src');
    if (!src && opts.slotimg[s.id]) src = './' + opts.slotimg[s.id];
    if (!src) { s.remove(); return; }
    const figcap = s.closest('figure') && s.closest('figure').querySelector('figcaption');
    if (figcap && figcap.textContent.trim() === 'Caption' && opts.captionFix[s.id]) figcap.textContent = opts.captionFix[s.id];
    if (figcap && opts.captionOverride[s.id]) figcap.textContent = opts.captionOverride[s.id];
    const img = document.createElement('img');
    const base = src.split('/').pop();
    img.setAttribute('src', '/portfolio/assets/img/' + (IMG[base] || base));
    img.setAttribute('alt', (figcap && figcap.textContent.trim().length <= 60 && figcap.textContent.trim()) || (s.getAttribute('placeholder') || '').replace(/^Drop:\s*/, '').replace(/^./, (c) => c.toUpperCase()));
    img.setAttribute('loading', 'lazy');
    img.setAttribute('style', 'display:block;width:100%;height:100%;object-fit:contain;' + (s.getAttribute('style') || ''));
    const par = s.parentElement;
    if (par && par.style.aspectRatio && !(s.getAttribute('style') || '').includes('aspect-ratio')) {
      const pad = par.style.paddingTop || '0px';
      par.style.position = 'relative'; par.style.overflow = 'hidden';
      img.setAttribute('style', `position:absolute;top:${pad};left:${pad};width:calc(100% - 2 * ${pad});height:calc(100% - 2 * ${pad});object-fit:contain;display:block;`);
    }
    s.replaceWith(img);
  });
  // fixed-size artboard wrappers from the design file: let them size to their content
  el.querySelectorAll('[style*="width: 1152px"]').forEach((n) => { if (n.style.position !== 'relative') { n.style.width = '100%'; n.style.height = 'auto'; } });
  // other imgs
  el.querySelectorAll('img').forEach((i) => {
    let s = i.getAttribute('src') || '';
    if (s.startsWith('./')) s = '/portfolio/assets/img/' + (IMG[s.split('/').pop()] || s.split('/').pop());
    s = s.replace('https://nehasaraswat.in/', '/');
    i.setAttribute('src', s);
    if (!i.hasAttribute('loading')) i.setAttribute('loading', 'lazy');
    if (!i.hasAttribute('alt')) i.setAttribute('alt', '');
  });
  // links
  el.querySelectorAll('a').forEach((a) => {
    let h = a.getAttribute('href');
    if (h == null) return;
    if (h === '' || h === 'undefined') {
      const sp = document.createElement('span');
      sp.setAttribute('style', a.getAttribute('style') || '');
      sp.append(...a.childNodes);
      [...a.attributes].forEach((x) => { if (x.name.startsWith('data-')) sp.setAttribute(x.name, x.value); });
      a.replaceWith(sp);
      return;
    }
    const m = h.match(/^(.*?\.dc\.html)(#.*)?$/);
    if (m && ROUTE[m[1]]) h = ROUTE[m[1]];
    h = h.replace('https://nehasaraswat.in/', '/');
    a.setAttribute('href', h);
    if (/^https?:/.test(h)) { a.setAttribute('rel', 'noopener'); }
  });
  // password gates
  const panels = [];
  el.querySelectorAll('form').forEach((f) => {
    if (!f.querySelector('input[name=pw]')) return;
    const panel = f.parentElement;
    f.removeAttribute('onsubmit');
    f.setAttribute('data-gate-form', '');
    const err = document.createElement('span');
    err.setAttribute('data-pwerr', '');
    err.hidden = true;
    err.setAttribute('style', "font-family:'IBM Plex Mono',monospace;font-size:12px;color:#E2582E");
    err.textContent = 'Not quite. Try again.';
    panel.append(err);
    panel.setAttribute('data-gate', '');
    panels.push(panel);
  });
  // poster button
  const poster = el.querySelector('button[aria-label="Play the vision video"]');
  el.querySelectorAll('button').forEach((x) => x.removeAttribute('onclick'));
  if (poster) poster.setAttribute('data-play', '');
  return { html: el.outerHTML, nPanels: panels.length, hasPoster: !!poster };
};

// collects tooltip data on Life
async function lifeTips(p) {
  return p.evaluate(async () => {
    const chart = document.querySelector('[data-screen-label="Life"] div[style*="height: 520px"]');
    const cands = [...chart.children].filter((c) => c.tagName !== 'SPAN' || c.style.color === 'rgb(226, 88, 46)');
    const out = [];
    const all = [...chart.querySelectorAll('div,a,span')].filter((n) => n.parentElement === chart);
    for (let i = 0; i < all.length; i++) {
      const n = all[i];
      n.dispatchEvent(new MouseEvent('mouseenter', { bubbles: false }));
      n.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
      await new Promise((r) => setTimeout(r, 20));
      const tip = [...chart.children].find((c) => c.style.zIndex === '5');
      if (tip) {
        const kids = [...tip.children];
        out.push({ i, x: tip.style.left, y: tip.style.top, title: kids[0].textContent, meta: kids[1].textContent, cta: kids.length > 2 });
      }
      n.dispatchEvent(new MouseEvent('mouseleave', { bubbles: false }));
      n.dispatchEvent(new MouseEvent('mouseout', { bubbles: true }));
      await new Promise((r) => setTimeout(r, 20));
    }
    return { n: all.length, out };
  });
}

const CSS_GET = () => {
  const styles = [...document.head.querySelectorAll('style')];
  const main = styles.reverse().find((s) => s.textContent.includes('cursor:url'));
  const scp = [...document.styleSheets].flatMap((s) => { try { return [...s.cssRules].map((r) => r.cssText); } catch (e) { return []; } }).filter((t) => t.startsWith('.scp'));
  const title = document.querySelector('h1')?.textContent || '';
  return { css: main ? main.textContent : '', scp, title };
};

const OPTS = { slotimg: JSON.parse(fs.readFileSync(new URL('./slotimg.json', import.meta.url))), captionFix: { 'wm-shipped-3': 'Draw strategy, settings' }, captionOverride: { 'com-genz': 'Search typeahead - images are representative', 'com-friends': 'Search results - images are representative' } };
const results = {};
for (const pg of PAGES) {
  console.log('building', pg.file);
  const p = await open(pg.file, false);
  const css = await p.evaluate(CSS_GET);
  let trees = [];
  if (pg.home) {
    const d = await p.evaluate(EXTRACT, '[id="5d"] [data-screen-label]', ROUTE, IMG, OPTS);
    const m = await p.evaluate(EXTRACT, '[id="5f"] [data-screen-label]', ROUTE, IMG, OPTS);
    trees = [{ k: 'd', ...d }, { k: 'm', ...m }];
  } else {
    let tips = null;
    if (pg.life) tips = await lifeTips(p);
    const t = await p.evaluate(EXTRACT, '[data-screen-label]', ROUTE, IMG, OPTS);
    trees = [{ k: 'x', ...t, tips }];
  }
  // gate data
  let gates = [];
  let posterWrap = null;
  if (trees[0].nPanels || trees[0].hasPoster) {
    const pl = await open(pg.file, false);
    const pu = await open(pg.file, true);
    if (trees[0].hasPoster) {
      await pl.evaluate(() => document.querySelector('button[aria-label="Play the vision video"]').click());
      await pu.evaluate(() => document.querySelector('button[aria-label="Play the vision video"]').click());
      await new Promise((r) => setTimeout(r, 400));
    }
    const lockedPanels = await pl.evaluate(() => [...document.querySelectorAll('input[name=pw]')].map((i) => i.closest('form').parentElement.outerHTML.length));
    const ifr = await pu.evaluate(() => [...document.querySelectorAll('iframe')].map((i) => ({ src: i.getAttribute('src'), title: i.getAttribute('title'), style: i.getAttribute('style') })));
    if (trees[0].hasPoster) {
      posterWrap = await pl.evaluate(() => {
        const f = document.querySelector('input[name=pw]').closest('form');
        const panel = f.parentElement, wrap = panel.parentElement;
        return { wrapStyle: wrap.getAttribute('style') };
      });
    }
    gates = ifr;
    console.log('  gates: panels', lockedPanels.length, 'iframes', ifr.length, 'poster', trees[0].hasPoster);
    await pl.close(); await pu.close();
  }
  await p.close();
  results[pg.file] = { css, trees, gates, posterWrap };
}
await b.close();
fs.writeFileSync(new URL('./results.json', import.meta.url), JSON.stringify(results));
console.log('done');
