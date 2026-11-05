import puppeteer from 'puppeteer-core';
import fs from 'fs';

const OUT = '/Users/neha/Documents/port123/.claude/worktrees/portfolio-pages-build-cf0e66/';
const R = JSON.parse(fs.readFileSync(new URL('./results.json', import.meta.url)));
const HASH = '2b5ed121c88c50b014477e2a9ea70f627448d14bee4e892a2065a623e03f6f9c';

const PAGES = [
  ['Case QuickBooks Desktop.dc.html', 'portfolio/quickbooks-desktop'],
  ['Case FP&A.dc.html', 'portfolio/fpa'],
  ['Case Expert Platform.dc.html', 'portfolio/expert-platform'],
  ['Case Appointments.dc.html', 'portfolio/appointments'],
  ['Case Design Organization.dc.html', 'portfolio/design-organization'],
  ['Case Walmart Assortment.dc.html', 'portfolio/walmart-assortment'],
  ['Case Walmart Apps.dc.html', 'portfolio/walmart-com'],
  ['Case Micorza.dc.html', 'portfolio/micorza'],
  ['Note Building with AI.dc.html', 'portfolio/building-with-ai'],
  ['Case Jifflenow.dc.html', 'portfolio/jifflenow'],
  ['Life.dc.html', 'life'],
  ['Portfolio 3a v3.dc.html', 'portfolio'],
];

const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
const p = await b.newPage();

// ---- in-page transform: runs on the tree's root element
const TRANSFORM = (kind, k, meta) => {
  const root = document.body.firstElementChild;
  const style = (el, fn) => el.setAttribute('style', fn(el.getAttribute('style') || ''));
  const mkEl = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };

  // wrapper sizing
  const widthRe = /width:\s*\d+px;?/;
  if (kind === 'life') {
    style(root, (s) => s.replace(widthRe, 'width: 100%; max-width: 1600px; margin: 0px auto;'));
    root.classList.add('pg', 'pg-life');
  } else if (kind === 'home') {
    if (k === 'd') { style(root, (s) => s.replace(widthRe, 'width: 100%; max-width: 1200px; margin: 0px auto;')); root.classList.add('hd'); }
    else { style(root, (s) => s.replace(widthRe, 'width: 100%; margin: 0px auto;')); root.classList.add('hm'); }
  } else {
    style(root, (s) => s.replace(widthRe, 'width: 100%; max-width: 1200px; margin: 0px auto;'));
    root.classList.add('pg');
  }

  // logo/home links and nav
  const home = '/portfolio/';
  root.querySelectorAll('a').forEach((a) => {
    const t = a.textContent.trim();
    const h = a.getAttribute('href');
    if (kind !== 'home' && /^\/portfolio\/$/.test(h || '') && a.closest('header, nav')) {
      if (t === 'Work') a.setAttribute('href', home + '#work');
      if (t === 'Voice') a.setAttribute('href', home + '#voice');
      if (t === 'About') a.setAttribute('href', home + '#about');
    }
    if (t === 'Leadership' && a.closest('nav')) a.remove();            // no target yet
    if (h === '#' && /Neha Saraswat/.test(t) && a.closest('header')) a.setAttribute('href', home);
    if (/how they shaped me/.test(t)) {                                // future page
      const m = t.match(/^(20\d\d–20\d\d)/);
      if (m) { const sp = document.createElement('span'); sp.setAttribute('style', a.getAttribute('style') || ''); sp.textContent = m[1]; a.replaceWith(sp); }
      else a.remove();
    }
  });

  if (kind === 'home') {
    root.innerHTML = root.innerHTML; // no-op normalisation
    const fix = (s) => s.replace(/5d-/g, '');
    root.querySelectorAll('[id]').forEach((e) => { if (k === 'd') e.id = fix(e.id); });
    root.querySelectorAll('a[href^="#5d-"]').forEach((a) => a.setAttribute('href', fix(a.getAttribute('href'))));
    if (k === 'm') {
      const kids = [...root.children];
      const find = (re) => kids.find((c) => re.test(c.textContent.replace(/\s+/g, ' ').trim().slice(0, 60)));
      const w = find(/^Intuit & Walmart/), a = find(/^I've always made things up/), v = find(/^Speaking at design/);
      if (w) w.id = 'm-work'; if (a) a.id = 'm-about'; if (v) v.id = 'm-voice';
      // menu
      const menu = root.querySelector('header a:last-child');
      if (menu && /Menu/.test(menu.textContent)) {
        menu.setAttribute('data-menu', ''); menu.setAttribute('role', 'button'); menu.setAttribute('aria-expanded', 'false');
        const nav = mkEl(`<nav data-menu-panel hidden style="display:flex;flex-direction:column;gap:14px;padding:18px 16px;background:#E3D6C5;font-family:'IBM Plex Mono',monospace;font-size:14px"><a href="#m-work">Work</a><a href="#m-voice">Voice</a><a href="#m-about">About</a></nav>`);
        root.querySelector('header').after(nav);
      }
    }
  }

  // ---- password gates
  const panels = [...root.querySelectorAll('[data-gate]')];
  if (panels.length || root.querySelector('[data-play]')) {
    const gates = meta.gates;
    const poster = root.querySelector('[data-play]');
    const list = poster ? gates.slice(1) : gates;
    panels.forEach((pnl, i) => {
      const g = list[i]; if (!g) return;
      pnl.setAttribute('data-src', g.src); pnl.setAttribute('data-title', g.title || '');
      pnl.setAttribute('data-istyle', g.style || '');
    });
    if (poster) {
      const g = gates[0];
      const tpl = panels[0].cloneNode(true);
      tpl.setAttribute('data-src', g.src); tpl.setAttribute('data-title', g.title || ''); tpl.setAttribute('data-istyle', g.style || '');
      const wrap = document.createElement('div');
      wrap.setAttribute('data-play-target', ''); wrap.hidden = true; wrap.setAttribute('style', 'position:absolute;inset:0');
      wrap.append(tpl);
      poster.after(wrap);
    }
  }

  // ---- Life: tooltips + scroller
  if (kind === 'life') {
    const chart = [...root.children].find((c) => /height:\s*520px/.test(c.getAttribute('style') || ''));
    chart.querySelectorAll('[data-tip]').forEach(() => {});
    const kids = [...chart.children];
    meta.tips.out.forEach((t) => {
      const el = kids[t.i]; if (!el) return;
      el.setAttribute('data-tip', ''); el.setAttribute('data-tip-x', t.x); el.setAttribute('data-tip-y', t.y);
      el.setAttribute('data-tip-title', t.title); el.setAttribute('data-tip-meta', t.meta); if (t.cta) el.setAttribute('data-tip-cta', '');
    });
    chart.append(mkEl(`<div data-tip-box hidden style="position:absolute;z-index:5;background:#F0EDE4;color:#1f1a15;padding:12px 14px;display:flex;flex-direction:column;gap:4px;pointer-events:none;min-width:160px;box-shadow:0 8px 24px rgba(0,0,0,.35)"><span data-tt style="font-weight:500;font-size:16px"></span><span data-tm style="font-family:'IBM Plex Mono',monospace;font-size:12px;color:#5a4f47"></span><span data-tc hidden style="font-family:'IBM Plex Mono',monospace;font-size:12px;color:#974315">Open the case →</span></div>`));
    // scroller around the four chart bands
    const ch = [...root.children];
    const from = ch.indexOf(chart), to = ch.findIndex((c) => c.tagName === 'P');
    const sc = mkEl('<div class="life-scroll" style="overflow-x:auto;padding-bottom:8px"><div style="width:1504px;display:flex;flex-direction:column;gap:24px"></div></div>');
    chart.before(sc);
    const inner = sc.firstElementChild;
    ch.slice(from, to).forEach((c) => inner.append(c));
  }
  return root.outerHTML;
};

function head({ title, desc, css, scp, life, home }) {
  const bodyBg = life ? '#1a1612' : '#F0EDE4';
  const fixed = css
    .replace('background:#d6cfc4', `background:${bodyBg}`)
    .replace('[data-screen-label][style*="width: 1200px"]', '.pg')
    .replace('[data-m~=case]', '.pg');
  const extra = `
html{scroll-behavior:smooth}
html,body{overflow-x:clip}
@media (prefers-reduced-motion: reduce){html{scroll-behavior:auto}*{transition:none!important}}
[hidden]{display:none!important}
${home ? `.hm{display:none!important}
@media (max-width:760px){.hd{display:none!important}.hm{display:flex!important}.hm a[data-menu]{cursor:pointer}}` : ''}
${life ? `@media (max-width:760px){
.pg-life{padding:16px!important;gap:20px!important}
.pg-life h1{font-size:64px!important}
.pg-life [style*="7fr 5fr"]{grid-template-columns:minmax(0,1fr)!important;gap:20px!important;padding:24px 0 8px!important}
.pg-life header nav{gap:14px!important;font-size:14px!important}
.pg-life footer{flex-direction:column!important;gap:12px!important;align-items:flex-start!important}
}` : ''}`;
  const moon = encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><circle cx='16' cy='16' r='11' fill='none' stroke='#974315' stroke-width='2.5'/><path d='M16 5a11 11 0 0 0 0 22z' fill='#974315'/></svg>");
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="theme-color" content="${bodyBg}">
<link rel="icon" href="data:image/svg+xml,${moon}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600&amp;family=Caveat:wght@500;600&amp;family=IBM+Plex+Mono:wght@400;500&amp;display=swap" rel="stylesheet">
<style>
${fixed}
${scp.join('\n')}
${extra}
</style>
</head>
<body>
`;
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const report = [];
for (const [file, dir] of PAGES) {
  const v = R[file];
  const kind = file === 'Life.dc.html' ? 'life' : file.startsWith('Portfolio') ? 'home' : 'case';
  const outs = [];
  for (const t of v.trees) {
    await p.setContent('<body>' + t.html + '</body>');
    outs.push(await p.evaluate(TRANSFORM, kind, t.k, { gates: v.gates, tips: t.tips }));
  }
  let body = outs.join('\n');
  body = body.replace(/Bricolage Grotesque|Instrument Sans/g, 'Hanken Grotesk');
  // title + description
  const h1 = (body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || 'Portfolio';
  const h1t = h1.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  let title, desc;
  if (kind === 'home') { title = 'Neha Saraswat — Product design leader'; desc = 'Ideas are free and expensive at the same time. I make the out-of-reach ones available, watch them unfold into products, and build teams who catch them more often.'; }
  else if (kind === 'life') { title = 'Life — Neha Saraswat'; desc = 'Life and work, on one line.'; }
  else {
    title = `${h1t} — Neha Saraswat`;
    const lead = (body.match(/<p[^>]*font-size: ?2[678]px[^>]*>([\s\S]*?)<\/p>/) || [])[1] || '';
    desc = lead.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().slice(0, 200);
  }
  let html = head({ title: esc(title), desc: esc(desc), css: v.css.css, scp: v.css.scp, life: kind === 'life', home: kind === 'home' })
    + body + `\n<script src="/portfolio/assets/site.js" defer></script>\n</body>\n</html>\n`;
  // Walmart.com: the Gen Z search and Shop with friends feature cards are removed (their images were replaced by search typeahead and results)
  if (dir === 'portfolio/walmart-com') {
    for (const t of ['Search like Gen Z\\.', 'Shop with friends\\.'])
      html = html.replace(new RegExp('<div[^>]*><span[^>]*></span><span[^>]*>' + t + '</span><span[^>]*>[^<]*</span></div>'), '');
  }
  // Appointments: Neha's correction (5 Nov 2026) - booking is open to the top-tier SKUs, not every QBO subscriber
  if (dir === 'portfolio/appointments') {
    html = html.replace('Booking is now open to every QuickBooks Online subscriber, to offer to their own customers.', 'Booking is now open to all top-tier QuickBooks SKUs (Advanced, Accountant and Enterprise Suite), to offer to their own customers.');
  }
  // Corrections settled by Neha's own notes (5 Nov 2026 hotfix). QuickBooks Desktop is intentionally left as designed.
  const FIXES = {
    'portfolio/walmart-assortment': [
      ['Senior Manager, Design', 'Senior Design Manager'],
      ['>$6B</span>', '>&gt;$5B</span>'],
      ['price improvement it contributed to', 'in attributed profits'],
    ],
    'portfolio/walmart-com': [['Senior Manager, Design', 'Senior Design Manager']],
    'portfolio/appointments': [['Clear slots, not manual blocks.', 'Clear slots, booked automatically.']],
    'portfolio/expert-platform': [['One platform, not many tools.', 'One end-to-end platform.']],
    'portfolio/design-organization': [['Grow managers, not only teams.', 'Grow managers and teams.']],
  };
  for (const [from, to] of FIXES[dir] || []) html = html.split(from).join(to);
  // relative URLs so the pages also work when opened straight from disk
  const pre = '../'.repeat(dir.split('/').length);
  html = html.replace(/(src|href)="\/(?!\/)([^"]*)"/g, (m, a, p) => {
    const i = p.indexOf('#');
    let path = i < 0 ? p : p.slice(0, i);
    const hash = i < 0 ? '' : p.slice(i);
    if (path === '' || path.endsWith('/')) path += 'index.html';
    return `${a}="${pre}${path}${hash}"`;
  });
  fs.mkdirSync(OUT + dir, { recursive: true });
  fs.writeFileSync(OUT + dir + '/index.html', html);
  report.push(`${dir}/index.html ${(html.length / 1024).toFixed(0)}KB  "${title}"`);
}
await b.close();
console.log(report.join('\n'));

// ---- shared script
const SITE_JS = `/* Shared behaviour for the portfolio pages: video gate, poster play, Life tooltips, mobile menu. */
(function () {
  var KEY = 'ns-unlocked';
  var HASH = '${HASH}';

  function isUnlocked() { try { return localStorage.getItem(KEY) === '1'; } catch (e) { return false; } }

  function swapGates() {
    if (!isUnlocked()) return;
    document.querySelectorAll('[data-gate]').forEach(function (panel) {
      if (panel.closest('[hidden]')) return;
      var f = document.createElement('iframe');
      f.src = panel.getAttribute('data-src');
      f.title = panel.getAttribute('data-title') || 'Video';
      f.setAttribute('allow', 'autoplay; fullscreen');
      f.setAttribute('allowfullscreen', '');
      f.setAttribute('loading', 'lazy');
      f.setAttribute('style', panel.getAttribute('data-istyle') || 'width:100%;height:100%;border:0;display:block');
      panel.replaceWith(f);
    });
  }

  function sha256(text) {
    if (!window.crypto || !crypto.subtle) return Promise.resolve('');
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)).then(function (buf) {
      return Array.prototype.map.call(new Uint8Array(buf), function (x) { return ('0' + x.toString(16)).slice(-2); }).join('');
    });
  }

  document.addEventListener('submit', function (e) {
    var form = e.target.closest && e.target.closest('[data-gate-form]');
    if (!form) return;
    e.preventDefault();
    var pw = (form.elements.pw.value || '').trim().toLowerCase();
    sha256(pw).then(function (h) {
      var panel = form.closest('[data-gate]');
      var err = panel && panel.querySelector('[data-pwerr]');
      if (h && h === HASH) {
        try { localStorage.setItem(KEY, '1'); } catch (x) {}
        swapGates();
      } else if (err) { err.hidden = false; }
    });
  });

  window.addEventListener('storage', function (e) { if (e.key === KEY && e.newValue === '1') swapGates(); });

  document.addEventListener('click', function (e) {
    var play = e.target.closest && e.target.closest('[data-play]');
    if (play) {
      var wrap = play.parentElement.querySelector('[data-play-target]');
      play.style.display = 'none';
      if (wrap) { wrap.hidden = false; swapGates(); }
      return;
    }
    var m = e.target.closest && e.target.closest('[data-menu]');
    if (m) {
      e.preventDefault();
      var panel = document.querySelector('[data-menu-panel]');
      var open = panel.hidden;
      panel.hidden = !open;
      m.setAttribute('aria-expanded', String(open));
      return;
    }
    if (e.target.closest && e.target.closest('[data-menu-panel] a')) document.querySelector('[data-menu-panel]').hidden = true;
  });

  // Life tooltips
  var box = document.querySelector('[data-tip-box]');
  if (box) {
    var tt = box.querySelector('[data-tt]'), tm = box.querySelector('[data-tm]'), tc = box.querySelector('[data-tc]');
    var show = function (el) {
      tt.textContent = el.getAttribute('data-tip-title');
      tm.textContent = el.getAttribute('data-tip-meta');
      tc.hidden = !el.hasAttribute('data-tip-cta');
      box.style.left = el.getAttribute('data-tip-x');
      box.style.top = el.getAttribute('data-tip-y');
      box.hidden = false;
    };
    var hide = function () { box.hidden = true; };
    document.addEventListener('mouseover', function (e) { var el = e.target.closest && e.target.closest('[data-tip]'); if (el) show(el); });
    document.addEventListener('mouseout', function (e) { var el = e.target.closest && e.target.closest('[data-tip]'); if (el && !(e.relatedTarget && el.contains(e.relatedTarget))) hide(); });
    document.addEventListener('focusin', function (e) { var el = e.target.closest && e.target.closest('[data-tip]'); if (el) show(el); });
    document.addEventListener('focusout', hide);
  }

  // "Ask me" / "Write to me" open the visitor's email client, addressed to Neha with the subject filled in.
  var title = document.title.split(' — ')[0];
  document.querySelectorAll('a').forEach(function (a) {
    if (!/ask me|write to me/i.test(a.textContent)) return;
    var subject = 'Hello from your portfolio';
    if (a.closest('[data-gate]')) subject = 'Video password request: ' + title;
    else if (a.closest('aside')) subject = 'About ' + title;
    else if (location.pathname.indexOf('/life') >= 0) subject = 'The story behind the graph';
    a.href = 'mailto:neha.biti@gmail.com?subject=' + encodeURIComponent(subject) + '&body=Hi%20Neha%2C%0A%0A';
    a.removeAttribute('target');
  });

  // Floating "Back to top" on every page. At the top it turns into "Back down" to return to where the visitor was.
  (function () {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('data-backtop', '');
    var s = btn.style;
    s.position = 'fixed'; s.right = '16px'; s.bottom = 'calc(16px + env(safe-area-inset-bottom, 0px))';
    s.zIndex = '60'; s.minHeight = '44px'; s.minWidth = '44px'; s.padding = '0 16px';
    s.background = '#974315'; s.color = '#F0EDE4'; s.border = '1px solid #F0EDE4'; s.borderRadius = '22px';
    s.font = '500 13px/1 "IBM Plex Mono", ui-monospace, monospace'; s.cursor = 'pointer';
    s.boxShadow = '0 2px 10px rgba(31,26,21,.25)'; s.opacity = '0'; s.visibility = 'hidden';
    s.transition = 'opacity .2s, visibility .2s';
    var saved = null, away = false, mode = 'up';
    function setMode(m) {
      mode = m;
      btn.textContent = m === 'up' ? 'Back to top \\u2191' : 'Back down \\u2193';
      btn.setAttribute('aria-label', m === 'up' ? 'Back to top of page' : 'Return to where you were');
    }
    function update() {
      var y = window.scrollY || document.documentElement.scrollTop;
      var show = false;
      if (saved !== null) {
        if (y < 200) { away = true; show = true; if (mode !== 'down') setMode('down'); }
        else if (away) { saved = null; away = false; }
      }
      if (saved === null && y > 600) { show = true; if (mode !== 'up') setMode('up'); }
      btn.style.opacity = show ? '1' : '0';
      btn.style.visibility = show ? 'visible' : 'hidden';
    }
    btn.addEventListener('click', function () {
      var y = window.scrollY || document.documentElement.scrollTop;
      if (mode === 'up') {
        saved = y; away = false;
        window.scrollTo({ top: 0 });
      } else {
        var back = saved; saved = null; away = false;
        window.scrollTo({ top: back });
      }
    });
    setMode('up');
    document.body.appendChild(btn);
    window.addEventListener('scroll', update, { passive: true });
    update();
  })();

  swapGates();
})();
`;
fs.writeFileSync(OUT + 'portfolio/assets/site.js', SITE_JS);
