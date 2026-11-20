// Grin slider. For every input.slider: paints the filled part of the track (--fill), writes the value in the
// <output for="id"> next to it (data-format="percent" adds %) and marks the matching tick in .slider-ticks (data-value).
const paint = (el) => {
  const min = +el.min || 0, max = +el.max || 100, v = +el.value;
  el.style.setProperty('--fill', `${((v - min) / (max - min)) * 100}%`);
  const field = el.closest('.slider-field');
  const out = field?.querySelector(`output[for="${el.id}"]`);
  if (out) out.textContent = `${String(v).replace('.', ',')}${out.dataset.format === 'percent' ? '%' : ''}`;
  field?.querySelectorAll('.slider-ticks [data-value]').forEach((t) => t.setAttribute('aria-current', String(+t.dataset.value === v)));
};
export const paintSliders = (root = document) => root.querySelectorAll('input.slider').forEach(paint);
document.addEventListener('input', (e) => { if (e.target.matches?.('input.slider')) paint(e.target); });
document.addEventListener('change', (e) => { if (e.target.matches?.('input.slider')) paint(e.target); });
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => paintSliders(), { once: true }); else paintSliders();
