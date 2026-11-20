// Grin: theme, contrast, density and font scale. The person's choice is kept in localStorage.
// Theme: 'system' (no attribute: follows the OS), 'light' or 'dark'.
// Contrast is separate and works with either theme: 'system' (no attribute: follows prefers-contrast), 'more' or 'normal'.
// Markup hooks (no extra JS needed):
//   <select data-theme-select>               options: system, light, dark
//   <button data-set-theme="dark">           sets a theme
//   <button data-theme-toggle>               toggles light/dark; updates its .label text
//   <button data-contrast-toggle>            turns high contrast on/off; aria-pressed shows the state (or a checkbox switch: checked)
//   <input type="radio" data-set-density value="comfortable|compact">
//   <input type="radio" data-set-scale value="100|112|125">  or  <input type="range" class="slider" data-set-scale min="100" max="125" step="12.5">
// ?theme=dark and ?contrast=more in the URL set them on load (handy to share a preview). ?theme=hc = high contrast.
// To avoid a flash of the wrong theme, also put the inline snippet from README.md in <head>.

const KEY = 'grin';
const read = (k, fallback) => { try { return localStorage.getItem(`${KEY}-${k}`) ?? fallback; } catch { return fallback; } };
const write = (k, v) => { try { localStorage.setItem(`${KEY}-${k}`, v); } catch { /* private mode: lasts for this visit */ } };
const root = document.documentElement;
const announce = () => root.dispatchEvent(new CustomEvent('grin:theme', { detail: { theme: effectiveTheme(), contrast: effectiveContrast() } }));

export const getTheme = () => read('theme', 'system');
export const getContrast = () => read('contrast', 'system');
export const effectiveTheme = () => {
  const t = getTheme();
  if (t !== 'system') return t;
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};
export const effectiveContrast = () => {
  const c = getContrast();
  if (c !== 'system') return c;
  return matchMedia('(prefers-contrast: more)').matches ? 'more' : 'normal';
};

export function setTheme(theme) {
  if (theme === 'system') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', theme);
  write('theme', theme);
  sync(); announce();
}
export function setContrast(contrast) {
  if (contrast === 'system') root.removeAttribute('data-contrast'); else root.setAttribute('data-contrast', contrast);
  write('contrast', contrast);
  sync(); announce();
}
export function setDensity(density) {
  if (density === 'compact') root.setAttribute('data-density', 'compact'); else root.removeAttribute('data-density');
  write('density', density);
  sync();
}
export function setScale(scale) {
  if (scale === '100') root.removeAttribute('data-scale'); else root.setAttribute('data-scale', scale);
  write('scale', scale);
  sync();
}

// Brings every control on the page in line with the current choice.
export function sync() {
  const t = getTheme(), d = read('density', 'comfortable'), s = read('scale', '100');
  document.querySelectorAll('[data-theme-select]').forEach((el) => { el.value = t; });
  document.querySelectorAll('button[data-set-theme]').forEach((el) => el.setAttribute('aria-pressed', String(el.dataset.setTheme === t)));
  document.querySelectorAll('[data-contrast-toggle]').forEach((el) => { if (el.matches('input')) el.checked = effectiveContrast() === 'more'; else el.setAttribute('aria-pressed', String(effectiveContrast() === 'more')); });
  document.querySelectorAll('input[data-set-density]').forEach((el) => { el.checked = el.value === d; });
  document.querySelectorAll('input[data-set-scale]').forEach((el) => {
    if (el.type === 'range') { el.value = s === '112' ? '112.5' : s; el.dispatchEvent(new Event('change', { bubbles: true })); } else el.checked = el.value === s;
  });
  document.querySelectorAll('[data-theme-toggle] .label').forEach((el) => { el.textContent = effectiveTheme() === 'dark' ? 'Tema claro' : 'Tema escuro'; });
}

// Apply on load. The old 'hc' theme value becomes light + high contrast.
const params = new URLSearchParams(location.search);
const fromUrl = params.get('theme');
if (fromUrl === 'hc') { write('theme', 'light'); write('contrast', 'more'); } else if (['light', 'dark', 'system'].includes(fromUrl)) write('theme', fromUrl);
if (['more', 'normal', 'system'].includes(params.get('contrast'))) write('contrast', params.get('contrast'));
if (getTheme() === 'hc') { write('theme', 'light'); write('contrast', 'more'); }
const t0 = getTheme(); if (t0 !== 'system') root.setAttribute('data-theme', t0); else root.removeAttribute('data-theme');
const c0 = getContrast(); if (c0 !== 'system') root.setAttribute('data-contrast', c0);
if (read('density', 'comfortable') === 'compact') root.setAttribute('data-density', 'compact');
const s0 = read('scale', '100'); if (s0 !== '100') root.setAttribute('data-scale', s0);

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', sync, { once: true }); else sync();
document.addEventListener('change', (e) => {
  const el = e.target;
  if (el.matches('[data-theme-select]')) setTheme(el.value);
  else if (el.matches('input[data-set-density]')) setDensity(el.value);
  else if (el.matches('input[data-set-scale]')) setScale(String(Math.floor(+el.value)));
});
// A range applies the font size while it is dragged, not only on release
document.addEventListener('input', (e) => { if (e.target.matches?.('input[type="range"][data-set-scale]')) setScale(String(Math.floor(+e.target.value))); });
document.addEventListener('click', (e) => {
  const c = e.target.closest('[data-contrast-toggle]');
  if (c) { setContrast(effectiveContrast() === 'more' ? 'normal' : 'more'); return; }
  const el = e.target.closest('button[data-set-theme], [data-theme-toggle]');
  if (!el) return;
  setTheme(el.hasAttribute('data-theme-toggle') ? (effectiveTheme() === 'dark' ? 'light' : 'dark') : el.dataset.setTheme);
});
for (const q of ['(prefers-color-scheme: dark)', '(prefers-contrast: more)']) {
  matchMedia(q).addEventListener('change', () => { sync(); announce(); });
}
