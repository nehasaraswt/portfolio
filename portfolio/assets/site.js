/* Shared behaviour for the portfolio pages: video gate, poster play, Life tooltips, mobile menu. */
(function () {
  var KEY = 'ns-unlocked';
  var HASH = '2b5ed121c88c50b014477e2a9ea70f627448d14bee4e892a2065a623e03f6f9c';

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
    var css = document.createElement('style');
    css.textContent = '.ns-backtop{position:fixed;right:14px;bottom:calc(14px + env(safe-area-inset-bottom,0px));z-index:60;display:flex;align-items:center;gap:6px;height:30px;padding:0 9px;background:#F0EDE4;color:#974315;border:1px solid rgba(151,67,21,.35);border-radius:0;font:400 13px/1 "IBM Plex Mono",ui-monospace,monospace;cursor:pointer;opacity:0;visibility:hidden;transition:opacity .25s,visibility .25s,border-color .2s}'
      + '.ns-backtop::before{content:"";position:absolute;inset:-8px}'
      + '.ns-backtop.ns-on{opacity:.72;visibility:visible}'
      + '.ns-backtop.ns-on:hover,.ns-backtop.ns-on:focus-visible{opacity:1;border-color:#974315}'
      + '@media print{.ns-backtop{display:none}}';
    document.head.appendChild(css);
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'ns-backtop';
    btn.setAttribute('data-backtop', '');
    btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.25" fill="none" stroke="#974315" stroke-width="1.5"/><path data-moon fill="#974315" d="M8 1.75a6.25 6.25 0 0 0 0 12.5z"/></svg><span data-arrow>↑</span>';
    var moon = btn.querySelector('[data-moon]'), arrow = btn.querySelector('[data-arrow]');
    var saved = null, away = false, mode = 'up';
    function setMode(m) {
      mode = m;
      arrow.textContent = m === 'up' ? '↑' : '↓';
      moon.setAttribute('d', m === 'up' ? 'M8 1.75a6.25 6.25 0 0 0 0 12.5z' : 'M8 1.75a6.25 6.25 0 0 1 0 12.5z');
      btn.setAttribute('aria-label', m === 'up' ? 'Back to top of page' : 'Return to where you were');
      btn.title = m === 'up' ? 'Back to top' : 'Back down';
    }
    function update() {
      var y = window.scrollY || document.documentElement.scrollTop;
      var show = false;
      if (saved !== null) {
        if (y < 200) { away = true; show = true; if (mode !== 'down') setMode('down'); }
        else if (away) { saved = null; away = false; }
      }
      if (saved === null && y > 600) { show = true; if (mode !== 'up') setMode('up'); }
      btn.classList.toggle('ns-on', show);
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
