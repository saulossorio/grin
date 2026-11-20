// Grin accordion: animates opening and closing in every browser. Markup: .accordion > details > summary + .accordion-body.
// Opening: the panel grows from 0 to its height while its content fades in and rises 4 px; closing does the reverse.
// The chevron turns at the same time (CSS). Without this script the <details> still opens and closes, just without motion.
// details with the same name="" stay exclusive: opening one closes the other with the same animation.
const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const DUR = 240, EASE = 'cubic-bezier(0.2, 0.8, 0.2, 1)';
const running = new WeakMap();

// The whole <details> is animated (from the summary's height to summary + panel and back), not the panel itself:
// the panel has padding, so animating it to 0 left a 20 px jump at the end of every close.
function animate(details, open) {
  const summary = details.querySelector(':scope > summary');
  const body = details.querySelector(':scope > .accordion-body');
  if (!summary || !body || reduce()) { details.open = open; return; }
  const current = running.get(details);
  const from = details.getBoundingClientRect().height; // where it is now, even in the middle of another animation
  current?.forEach((a) => a.cancel());
  if (open) details.open = true;
  const to = open ? summary.offsetHeight + body.offsetHeight : summary.offsetHeight;
  details.style.overflow = 'hidden';
  const size = details.animate([{ height: `${from}px` }, { height: `${to}px` }], { duration: DUR, easing: EASE });
  const fade = body.animate(
    [{ opacity: open ? 0 : 1, transform: `translateY(${open ? -4 : 0}px)` }, { opacity: open ? 1 : 0, transform: `translateY(${open ? 0 : -4}px)` }],
    { duration: DUR, easing: EASE, fill: 'forwards' },
  );
  running.set(details, [size, fade]);
  size.onfinish = () => {
    details.style.overflow = '';
    running.delete(details);
    if (!open) details.open = false;
    fade.cancel(); // drop the end state so the next opening starts clean
  };
}

document.addEventListener('click', (e) => {
  const summary = e.target.closest('.accordion summary');
  if (!summary) return;
  const details = summary.parentElement;
  e.preventDefault();
  // Open and not closing → close; closed, or in the middle of closing → open
  const opening = !details.open || details.dataset.closing === '1';
  details.dataset.closing = opening ? '' : '1';
  if (opening && details.name) {
    details.closest('.accordion')?.querySelectorAll(`details[name="${CSS.escape(details.name)}"][open]`).forEach((d) => {
      if (d !== details && d.dataset.closing !== '1') { d.dataset.closing = '1'; animate(d, false); }
    });
  }
  animate(details, opening);
});
