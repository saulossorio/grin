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
