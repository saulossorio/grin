// Grin tour. startTour([{ target: '#selector' | null, title: 'Text', text: 'Text' }, …], { onEnd })
// Each step lights up its target (null = no target, the card goes to the center) and shows a card with
// "Passo n de N", a progress bar, Voltar / Próximo / Concluir. Arrow keys move, Esc leaves. Focus goes to the card title.
import { icon } from '../../scripts/utils.js';

export function startTour(steps, { onEnd } = {}) {
  let i = 0;
  const root = document.createElement('div');
  root.className = 'tour';
  root.innerHTML = `<div class="tour-spot"></div><section class="tour-card" role="dialog" aria-modal="true" aria-labelledby="tour-title">
    <div class="tour-top"><span class="tour-count"></span><button type="button" class="btn icon xs ghost" data-tour="end" aria-label="Sair do tour">${icon('x', 16)}</button></div>
    <div class="progress sm" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-label="Progresso do tour"><i></i></div>
    <h2 id="tour-title" tabindex="-1"></h2><p></p>
    <div class="tour-actions"><button type="button" class="btn xs" data-tour="prev">${icon('arrow-left', 16)}Voltar</button><span class="spacer"></span><button type="button" class="btn xs primary" data-tour="next"></button></div>
  </section>`;
  document.body.append(root);
  const spot = root.querySelector('.tour-spot'), card = root.querySelector('.tour-card');
  const before = document.activeElement;

  function position() {
    const s = steps[i], el = s.target ? document.querySelector(s.target) : null;
    const c = card.getBoundingClientRect();
    if (!el) {
      spot.classList.add('none');
      Object.assign(spot.style, { top: '50%', left: '50%', width: '0px', height: '0px' });
      Object.assign(card.style, { top: `${(innerHeight - c.height) / 2}px`, left: `${(innerWidth - c.width) / 2}px` });
      return;
    }
    spot.classList.remove('none');
    const r = el.getBoundingClientRect(), pad = 6;
    Object.assign(spot.style, { top: `${r.top - pad}px`, left: `${r.left - pad}px`, width: `${r.width + pad * 2}px`, height: `${r.height + pad * 2}px` });
    let top = r.bottom + 16;
    if (top + c.height > innerHeight - 16) top = Math.max(16, r.top - c.height - 16);
    const left = Math.min(Math.max(16, r.left), innerWidth - c.width - 16);
    Object.assign(card.style, { top: `${top}px`, left: `${left}px` });
  }
  function show() {
    const s = steps[i];
    const el = s.target ? document.querySelector(s.target) : null;
    el?.scrollIntoView({ block: 'nearest', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    card.classList.add('swap');
    setTimeout(() => {
      card.querySelector('.tour-count').textContent = `Passo ${i + 1} de ${steps.length}`;
      const pct = Math.round(((i + 1) / steps.length) * 100);
      card.querySelector('.progress').setAttribute('aria-valuenow', pct);
      card.querySelector('.progress i').style.width = `${pct}%`;
      card.querySelector('h2').textContent = s.title;
      card.querySelector('p').textContent = s.text;
      card.querySelector('[data-tour="prev"]').hidden = i === 0;
      card.querySelector('[data-tour="next"]').innerHTML = i === steps.length - 1 ? `${icon('check', 16)}Concluir` : `Próximo${icon('arrow-right', 16)}`;
      position();
      card.classList.remove('swap');
      card.querySelector('h2').focus();
    }, 120);
  }
  function end() {
    removeEventListener('keydown', keys); removeEventListener('resize', position); removeEventListener('scroll', position, true);
    root.classList.remove('show');
    setTimeout(() => root.remove(), 220);
    before?.focus?.();
    onEnd?.();
  }
  function go(d) { const n = i + d; if (n < 0) return; if (n >= steps.length) { end(); return; } i = n; show(); }
  function keys(e) {
    if (e.key === 'Escape') end();
    else if (e.key === 'ArrowRight') go(1);
    else if (e.key === 'ArrowLeft') go(-1);
  }
  root.addEventListener('click', (e) => {
    const b = e.target.closest('[data-tour]'); if (!b) return;
    ({ end, prev: () => go(-1), next: () => go(1) })[b.dataset.tour]();
  });
  addEventListener('keydown', keys); addEventListener('resize', position); addEventListener('scroll', position, true);
  root.getBoundingClientRect(); // commit the hidden state so the fade-in runs
  root.classList.add('show'); show();
  return { end };
}
