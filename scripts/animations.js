// Grin: reusable motion. Rules: short (120 to 220 ms), only as a response to an action, never hiding content.
// With "reduce motion" on, nothing moves and the end state shows at once.
export const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const cssVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
const duration = () => parseInt(cssVar('--dur'), 10) || 160;
const easing = () => cssVar('--ease') || 'ease-out';

// Briefly highlights something that changed (a saved row, a recalculated value).
export function flash(el) {
  if (reducedMotion() || !el) return;
  el.animate([{ backgroundColor: cssVar('--highlight') }, { backgroundColor: 'transparent' }], { duration: 900, easing: 'ease-out' });
}

// Entrance of a new element (toast, item added to a list).
export function enter(el, { y = 6 } = {}) {
  if (reducedMotion() || !el) return;
  el.animate([{ opacity: 0, transform: `translateY(${y}px)` }, { opacity: 1, transform: 'none' }], { duration: duration(), easing: easing() });
}

// Scrolls to an element, smooth only when motion is allowed.
export function scrollToElement(el) {
  el?.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });
}

// Closes a menu or any floating layer with the exit animation, then hides or removes it.
// closeMenu(el) hides it (el.hidden = true); closeMenu(el, { remove: true }) takes it out of the page.
export function closeMenu(el, { remove = false } = {}) {
  if (!el) return;
  const done = () => { el.classList.remove('closing'); if (remove) el.remove(); else el.hidden = true; };
  if (reducedMotion()) { done(); return; }
  el.classList.add('closing');
  setTimeout(done, 140);
}
