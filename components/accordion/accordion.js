// Grin accordion: animates opening and closing in every browser. Markup: .accordion > details > summary + .accordion-body.
// Opening: the panel grows from 0 to its height while its content fades in and rises 4 px; closing does the reverse.
// The chevron turns at the same time (CSS). Without this script the <details> still opens and closes, just without motion.
// details with the same name="" stay exclusive: opening one closes the other with the same animation.
const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const DUR = 240, EASE = 'cubic-bezier(0.2, 0.8, 0.2, 1)';
const running = new WeakMap();

function animate(details, open) {
  const body = details.querySelector(':scope > .accordion-body');
  if (!body || reduce()) { details.open = open; return; }
  running.get(details)?.cancel();
  const from = open ? 0 : body.offsetHeight;
  if (open) details.open = true;
  const to = open ? body.scrollHeight : 0;
  body.style.overflow = 'hidden';
  const a = body.animate(
    [{ height: `${from}px`, opacity: open ? 0 : 1, transform: `translateY(${open ? -4 : 0}px)` }, { height: `${to}px`, opacity: open ? 1 : 0, transform: `translateY(${open ? 0 : -4}px)` }],
    { duration: DUR, easing: EASE },
  );
  running.set(details, a);
  a.onfinish = () => { body.style.overflow = ''; running.delete(details); if (!open) details.open = false; };
  a.oncancel = () => { body.style.overflow = ''; };
}

document.addEventListener('click', (e) => {
  const summary = e.target.closest('.accordion summary');
  if (!summary) return;
  const details = summary.parentElement;
  e.preventDefault();
  const opening = !details.open || running.has(details) && details.dataset.closing === '1';
  if (opening && details.name) {
    details.closest('.accordion')?.querySelectorAll(`details[name="${CSS.escape(details.name)}"][open]`).forEach((d) => { if (d !== details) { d.dataset.closing = '1'; animate(d, false); } });
  }
  details.dataset.closing = opening ? '' : '1';
  animate(details, opening);
});
