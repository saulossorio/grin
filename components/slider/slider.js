// Grin slider. For every input.slider: paints the filled part of the track (--fill), writes the value in the
// <output for="id"> next to it (data-format="percent" adds %) and marks the matching tick in .slider-ticks (data-value).
// Stepped slider: data-stops="100,112.5,125". The thumb follows the pointer freely while dragging (smooth, no jumps);
// on release it glides to the nearest stop. Arrow keys jump from stop to stop. The value read on "change" is
// always a stop: use nearestStop(el) or read el.value after the change event.
const stopsOf = (el) => (el.dataset.stops ? el.dataset.stops.split(',').map(Number) : null);
export const nearestStop = (el, v = +el.value) => {
  const stops = stopsOf(el);
  return stops ? stops.reduce((a, b) => (Math.abs(b - v) < Math.abs(a - v) ? b : a)) : v;
};
const fmt = (v, out) => `${String(Math.round(v * 10) / 10).replace('.', ',')}${out?.dataset.format === 'percent' ? '%' : ''}`;

function paint(el, v = +el.value) {
  const min = +el.min || 0, max = +el.max || 100;
  el.style.setProperty('--fill', `${((v - min) / (max - min)) * 100}%`);
  const field = el.closest('.slider-field');
  const shown = nearestStop(el, v);
  const out = field?.querySelector(`output[for="${el.id}"]`);
  if (out) out.textContent = fmt(shown, out);
  field?.querySelectorAll('.slider-ticks [data-value]').forEach((t) => t.setAttribute('aria-current', String(+t.dataset.value === shown)));
}

// Glide to a value in 180 ms (or jump, with reduced motion)
function glide(el, to) {
  const from = +el.value;
  if (from === to || matchMedia('(prefers-reduced-motion: reduce)').matches) { el.value = to; paint(el); return; }
  const t0 = performance.now(), dur = 180;
  const step = (now) => {
    const k = Math.min(1, (now - t0) / dur), e = 1 - (1 - k) ** 3;
    const v = from + (to - from) * e;
    el.value = v; paint(el, v);
    if (k < 1) requestAnimationFrame(step); else { el.value = to; paint(el); }
  };
  requestAnimationFrame(step);
}

// Stepped sliders need step="any" to move freely; set it in the markup, this is only the fallback
export const paintSliders = (root = document) => root.querySelectorAll('input.slider').forEach((el) => {
  if (stopsOf(el)) el.step = 'any';
  paint(el);
});
document.addEventListener('input', (e) => { if (e.target.matches?.('input.slider')) paint(e.target); });
// Capture phase: the snap happens before any other "change" listener reads the value
document.addEventListener('change', (e) => {
  const el = e.target;
  if (!el.matches?.('input.slider')) return;
  if (stopsOf(el)) { const to = nearestStop(el); glide(el, to); el.value = to; } else paint(el);
}, true);
document.addEventListener('keydown', (e) => {
  const el = e.target;
  if (!el.matches?.('input.slider[data-stops]') || !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(e.key)) return;
  e.preventDefault();
  const stops = stopsOf(el), i = stops.indexOf(nearestStop(el));
  const next = { Home: 0, End: stops.length - 1 }[e.key] ?? Math.max(0, Math.min(stops.length - 1, i + (['ArrowRight', 'ArrowUp'].includes(e.key) ? 1 : -1)));
  glide(el, stops[next]);
  el.value = stops[next];
  el.dispatchEvent(new Event('change', { bubbles: true }));
});
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => paintSliders(), { once: true }); else paintSliders();
