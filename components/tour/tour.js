// Grin tour. startTour(steps, { onEnd }) → { end, go, target }
// Each step: { title, text, target, action, click, done }.
//   target: selector, function returning an element, or a list of them in order of preference; none = card in the center.
//   action: what the person does on the screen ("Clique em Empresas"). With it, the step can wait:
//   click: true waits for a click on the target, which goes on to the page; done: () => true when the task is done.
// A first step without target is the presentation: it is not counted and offers Começar and Agora não.
// The tour never changes the screen by itself. Outside the cut-out, clicks are held: the card shakes and says what to do.
// A target in the sidebar opens the sidebar drawer on a phone. On a narrow screen the card is a sheet at the bottom or top.
// The cut-out follows the page while the person works. Arrow keys move, Esc leaves, Tab stays in the card.
import { icon } from '../../scripts/utils.js';

export function startTour(steps, { onEnd } = {}) {
  const intro = !steps[0]?.target && steps.length > 1;
  const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const drawer = () => matchMedia('(max-width: 760px)').matches; // the sidebar becomes a drawer, as in sidebar.js
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const visible = (el) => !!el && el.isConnected && el.getClientRects().length > 0 && el.getBoundingClientRect().width > 0;
  const list = (s) => (s.target == null ? [] : [].concat(s.target));
  const resolve = (t) => (typeof t === 'function' ? t() : document.querySelector(t));
  const find = (s) => { for (const t of list(s)) { const el = resolve(t); if (visible(el)) return el; } return null; };
  const inSidebar = (s) => list(s).some((t) => resolve(t)?.closest?.('.sidebar'));
  const sidebarOpen = () => document.body.classList.contains('sidebar-open');
  const toggleSidebar = (open) => { if (sidebarOpen() !== open) document.querySelector('.sidebar-menu-button')?.click(); };

  const root = document.createElement('div');
  root.className = 'tour';
  root.innerHTML = `${['top', 'right', 'bottom', 'left', 'hole'].map((k) => `<div class="tour-block" data-side="${k}"></div>`).join('')}<div class="tour-spot none"></div>
    <section class="tour-card" role="dialog" aria-modal="true" aria-labelledby="tour-title" aria-describedby="tour-text">
      <div class="tour-top"><span class="tour-count"></span><button type="button" class="btn icon xs ghost" data-tour="end" aria-label="Sair do tour">${icon('x', 16)}</button></div>
      <div class="progress sm" aria-hidden="true"><i></i></div>
      <h2 id="tour-title" tabindex="-1"></h2><p id="tour-text"></p>
      <p class="tour-action" hidden></p>
      <div class="tour-msg" aria-live="polite"><div><p></p></div></div>
      <div class="tour-actions"><button type="button" class="link" data-tour="skip"></button><span class="spacer"></span>
        <button type="button" class="btn xs" data-tour="prev">${icon('arrow-left', 16)}Voltar</button><button type="button" class="btn xs" data-tour="retry" hidden>Tentar de novo</button><button type="button" class="btn xs primary" data-tour="next"></button></div>
    </section>`;
  document.body.append(root);
  document.body.classList.add('tour-open');
  const $ = (s) => root.querySelector(s);
  const spot = $('.tour-spot'), card = $('.tour-card'), before = document.activeElement;
  const T = { i: 0, seq: 0, el: null, side: null, done: false, menu: false, timer: 0, msgTimer: 0, frame: 0 };
  const live = (seq) => T.seq === seq && root.isConnected;
  const waiting = () => { const s = steps[T.i]; return !!(s.click || s.done) && !!T.el && !T.done; };

  async function findLater(s, seq) {
    for (let t = 0; t < 3000; t += 80) { if (!live(seq)) return null; const el = find(s); if (el) return el; await wait(80); }
    return null;
  }
  // waits for scrolling and transitions to stop before cutting the target out
  async function settle(el, seq) {
    let last = '', same = 0;
    for (let t = 0; t < 900 && same < 3; t += 16) {
      if (!live(seq)) return;
      await new Promise((r) => requestAnimationFrame(r));
      const r = el.getBoundingClientRect(), k = [r.top, r.left, r.width, r.height].map(Math.round).join();
      same = k === last ? same + 1 : 0; last = k;
    }
  }
  function message(text, tone = 'info') {
    const m = $('.tour-msg'); clearTimeout(T.msgTimer);
    if (!text) { m.classList.remove('show'); return; }
    m.className = `tour-msg show ${tone}`;
    m.querySelector('p').innerHTML = icon(tone === 'crit' ? 'alert-triangle' : tone === 'ok' ? 'check' : 'info', 16);
    m.querySelector('p').append(Object.assign(document.createElement('span'), { textContent: text }));
    if (tone === 'info') T.msgTimer = setTimeout(() => m.classList.remove('show'), 3200);
  }
  function nudge() {
    card.classList.remove('nudge'); void card.offsetWidth; card.classList.add('nudge');
    const a = steps[T.i].action || '';
    message(waiting() ? `Para continuar, faça o que o quadro pede na área destacada: ${a.charAt(0).toLowerCase() + a.slice(1)}.`
      : 'Durante o tour, use Próximo e Voltar para navegar. Para explorar a tela livremente, pule o tour.');
  }

  function place() {
    const s = steps[T.i], vw = document.documentElement.clientWidth, vh = innerHeight, m = 16, pad = 8;
    if (T.el && !T.el.isConnected) T.el = find(s); // the page may have been redrawn
    const r = T.el ? T.el.getBoundingClientRect() : null;
    const f = r ? { x: r.left - pad, y: r.top - pad, w: r.width + 2 * pad, h: r.height + 2 * pad } : { x: vw / 2, y: vh / 2, w: 0, h: 0 };
    if (r) { const x2 = Math.min(vw - 4, f.x + f.w), y2 = Math.min(vh - 4, f.y + f.h); f.x = Math.max(4, f.x); f.y = Math.max(4, f.y); f.w = Math.max(0, x2 - f.x); f.h = Math.max(0, y2 - f.y); }
    spot.classList.toggle('none', !r);
    Object.assign(spot.style, { left: `${f.x}px`, top: `${f.y}px`, width: `${f.w}px`, height: `${f.h}px` });
    // four strips around the cut-out hold the clicks; the cut-out itself lets clicks through only while the step waits for an action
    const px = (k, x, y, w, h) => Object.assign($(`[data-side="${k}"]`).style, { left: `${x}px`, top: `${y}px`, width: `${Math.max(0, w)}px`, height: `${Math.max(0, h)}px` });
    px('top', 0, 0, vw, f.y); px('bottom', 0, f.y + f.h, vw, vh - f.y - f.h); px('left', 0, f.y, f.x, f.h); px('right', f.x + f.w, f.y, vw - f.x - f.w, f.h);
    if ((s.click || s.done) && r) px('hole', 0, 0, 0, 0); else px('hole', f.x, f.y, f.w, f.h);
    // card: below, above, right or left of the target, where it fits; on a narrow screen, a sheet at the bottom or top
    const sheet = vw < 600; card.classList.toggle('sheet', sheet);
    if (sheet) { card.style.left = `${m}px`; card.style.right = `${m}px`; } else card.style.right = 'auto';
    const cw = card.offsetWidth, ch = card.offsetHeight, clamp = (v, a, b) => Math.min(Math.max(v, a), Math.max(a, b));
    let x, y;
    if (sheet) { if (!T.side) T.side = r && f.y + f.h / 2 > vh / 2 ? 'top' : 'bottom'; x = m; y = T.side === 'top' ? m : vh - ch - m; } // the side stays fixed for the step
    else if (!r) { x = (vw - cw) / 2; y = (vh - ch) / 2; }
    else if (vh - (f.y + f.h) >= ch + 2 * m) { x = clamp(f.x + f.w / 2 - cw / 2, m, vw - cw - m); y = f.y + f.h + 14; }
    else if (f.y >= ch + 2 * m) { x = clamp(f.x + f.w / 2 - cw / 2, m, vw - cw - m); y = f.y - ch - 14; }
    else if (vw - (f.x + f.w) >= cw + 2 * m) { x = f.x + f.w + 14; y = clamp(f.y + f.h / 2 - ch / 2, m, vh - ch - m); }
    else if (f.x >= cw + 2 * m) { x = f.x - cw - 14; y = clamp(f.y + f.h / 2 - ch / 2, m, vh - ch - m); }
    else { x = vw - cw - m; y = vh - ch - m; }
    card.style.left = `${x}px`; card.style.top = `${y}px`;
  }
  function replace() { cancelAnimationFrame(T.frame); T.frame = requestAnimationFrame(place); }
  // the sheet covers part of a phone screen: scroll so the target sits in the space left
  async function clear(el, seq) {
    if (!card.classList.contains('sheet')) return false;
    const r = el.getBoundingClientRect(), top = parseFloat(card.style.top) || 0, m = 16;
    const d = T.side === 'top' ? Math.min(0, r.top - (top + card.offsetHeight + m)) : Math.max(0, r.bottom - (top - m));
    if (Math.abs(d) < 2) return false;
    scrollBy({ top: d, behavior: reduce() ? 'auto' : 'smooth' });
    await settle(el, seq);
    return live(seq);
  }

  async function show(i) {
    if (i < 0 || i >= steps.length || !root.isConnected) return;
    const s = steps[i], seq = ++T.seq;
    T.i = i; T.el = null; T.side = null; clearInterval(T.timer);
    card.classList.add('swap'); message('');
    if (drawer()) { const want = inSidebar(s); if (want || T.menu) { toggleSidebar(want); T.menu = want; } }
    const el = s.target ? await findLater(s, seq) : null;
    if (!live(seq)) return;
    if (el) { el.scrollIntoView({ block: 'center', inline: 'nearest', behavior: reduce() ? 'auto' : 'smooth' }); await settle(el, seq); if (!live(seq)) return; }
    T.el = el; T.done = !!(s.done && s.done());
    const n = steps.length - (intro ? 1 : 0), k = i + (intro ? 0 : 1), last = i === steps.length - 1, failed = !!s.target && !el;
    $('.tour-count').textContent = intro && i === 0 ? 'Tour guiado' : `Passo ${k} de ${n}`;
    $('.progress i').style.width = `${(intro ? i / (steps.length - 1) : k / n) * 100}%`;
    $('#tour-title').textContent = s.title; $('#tour-text').textContent = s.text || '';
    const ac = $('.tour-action'); ac.hidden = !(s.action && el); ac.innerHTML = s.action ? icon('pointer', 16) : ''; if (s.action) ac.append(s.action);
    // Voltar only when the previous step is on the screen now: the tour does not undo what the person navigated
    $('[data-tour="prev"]').hidden = i === 0 || (!!steps[i - 1].target && !find(steps[i - 1]));
    $('[data-tour="retry"]').hidden = !failed;
    const next = $('[data-tour="next"]');
    next.innerHTML = intro && i === 0 ? `Começar${icon('arrow-right', 16)}` : last ? `${icon('check', 16)}Concluir` : `Próximo${icon('arrow-right', 16)}`;
    next.classList.toggle('waiting', waiting());
    $('[data-tour="skip"]').textContent = intro && i === 0 ? 'Agora não' : 'Pular tour';
    if (failed) message('Não foi possível mostrar esta parte agora. Clique em Tentar de novo ou siga para o próximo passo.', 'crit');
    spot.classList.toggle('pulse', waiting());
    place();
    if (el && await clear(el, seq)) place();
    if (!live(seq)) return;
    // the screen changes while the person works: the cut-out follows it, and a task is checked until it is done
    T.timer = setInterval(() => {
      if (!live(seq)) return;
      replace();
      if (s.done && !T.done && s.done()) finish(seq);
    }, 250);
    requestAnimationFrame(() => {
      if (!live(seq)) return;
      card.classList.remove('swap');
      // in a task, the cursor goes to the first empty field of the highlighted area
      const fields = s.done && el && !T.done ? [...el.querySelectorAll('input:not([type="hidden"]), select, textarea')] : [];
      (fields.find((x) => !x.value) || fields[0] || $('#tour-title')).focus({ preventScroll: true });
    });
  }
  function finish(seq) {
    T.done = true;
    spot.classList.remove('pulse'); $('[data-tour="next"]').classList.remove('waiting');
    message('Isso mesmo. Seguindo para o próximo passo…', 'ok');
    setTimeout(() => { if (live(seq)) show(T.i + 1); }, reduce() ? 600 : 1100);
  }
  function next() { if (T.i >= steps.length - 1) return end(); if (waiting()) return nudge(); show(T.i + 1); }

  function end() {
    if (!root.isConnected || root.classList.contains('leaving')) return;
    T.seq++; clearInterval(T.timer); clearTimeout(T.msgTimer);
    document.removeEventListener('click', onClick, true); document.removeEventListener('keydown', keys, true);
    removeEventListener('resize', replace); removeEventListener('scroll', replace, true);
    if (T.menu) toggleSidebar(false);
    root.classList.add('leaving'); root.classList.remove('show'); document.body.classList.remove('tour-open');
    setTimeout(() => root.remove(), reduce() ? 0 : 220);
    (before?.isConnected ? before : document.body).focus?.({ preventScroll: true });
    onEnd?.();
  }
  // on a click step, the click on the target goes on to the page and moves the tour forward
  function onClick(e) {
    const s = steps[T.i];
    if (!s.click || !T.el || !T.el.contains(e.target)) return;
    const seq = T.seq; setTimeout(() => { if (live(seq)) show(T.i + 1); }, 0);
  }
  function keys(e) {
    if (document.querySelector('dialog[open]:modal, .dialog[open]')) return; // a dialog the person opened keeps its keys
    const s = steps[T.i], field = /INPUT|TEXTAREA|SELECT/.test(e.target.tagName);
    // a menu the person opened closes with Esc before the tour does
    if (e.key === 'Escape' && document.querySelector('[aria-haspopup][aria-expanded="true"], [data-popover][aria-expanded="true"]')) return;
    if (T.el?.contains(e.target) && s.done && e.key !== 'Escape') return; // in a task, the keyboard belongs to the person inside the target
    if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); return end(); }
    if (e.key === 'ArrowRight' && !field) { e.preventDefault(); return next(); }
    if (e.key === 'ArrowLeft' && !field && T.i > 0 && !$('[data-tour="prev"]').hidden) { e.preventDefault(); return show(T.i - 1); }
    if (e.key === 'Tab') {
      const fs = [...card.querySelectorAll('button:not([hidden])')].filter((x) => x.offsetParent !== null);
      const at = fs.indexOf(document.activeElement);
      if (!card.contains(e.target) || (e.shiftKey && at <= 0) || (!e.shiftKey && at === fs.length - 1)) { e.preventDefault(); fs[e.shiftKey ? fs.length - 1 : 0]?.focus(); }
    }
  }
  root.addEventListener('click', (e) => {
    const b = e.target.closest?.('[data-tour]');
    if (b) { e.stopPropagation(); ({ end, skip: end, prev: () => show(T.i - 1), next, retry: () => show(T.i) })[b.dataset.tour](); return; }
    if (e.target.classList.contains('tour-block')) { e.stopPropagation(); nudge(); }
  });
  document.addEventListener('click', onClick, true); document.addEventListener('keydown', keys, true);
  addEventListener('resize', replace); addEventListener('scroll', replace, true);
  root.getBoundingClientRect(); // commit the hidden state so the fade-in runs
  root.classList.add('show'); show(0);
  return { end, go: (i) => show(i), target: () => T.el };
}
