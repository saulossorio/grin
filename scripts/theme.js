// Grin: theme, density and font scale. The person's choice is kept in localStorage.
// Theme: 'system' (no attribute: follows the OS), 'light', 'dark' or 'hc' (high contrast).
// Markup hooks (no extra JS needed):
//   <select data-theme-select>               options: system, light, dark, hc
//   <button data-set-theme="dark">           sets a theme
//   <button data-theme-toggle>               toggles light/dark; updates its .label text
//   <input type="radio" data-set-density value="compact|comfortable">
//   <input type="radio" data-set-scale value="100|112|125">
// ?theme=dark in the URL sets the theme on load (handy to share a preview).
// To avoid a flash of the wrong theme, also put the inline snippet from README.md in <head>.

const KEY = 'grin';
const read = (k, fallback) => { try { return localStorage.getItem(`${KEY}-${k}`) ?? fallback; } catch { return fallback; } };
const write = (k, v) => { try { localStorage.setItem(`${KEY}-${k}`, v); } catch { /* private mode: lasts for this visit */ } };
const root = document.documentElement;

export const getTheme = () => read('theme', 'system');
export const effectiveTheme = () => {
  const t = getTheme();
  if (t !== 'system') return t;
  if (matchMedia('(prefers-contrast: more)').matches) return 'hc';
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export function setTheme(theme) {
  if (theme === 'system') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', theme);
  write('theme', theme);
  sync();
  root.dispatchEvent(new CustomEvent('grin:theme', { detail: effectiveTheme() }));
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
  document.querySelectorAll('input[data-set-density]').forEach((el) => { el.checked = el.value === d; });
  document.querySelectorAll('input[data-set-scale]').forEach((el) => { el.checked = el.value === s; });
  document.querySelectorAll('[data-theme-toggle] .label').forEach((el) => { el.textContent = effectiveTheme() === 'dark' ? 'Tema claro' : 'Tema escuro'; });
}

// Apply on load
const fromUrl = new URLSearchParams(location.search).get('theme');
if (['light', 'dark', 'hc', 'system'].includes(fromUrl)) write('theme', fromUrl);
const t0 = getTheme(); if (t0 !== 'system') root.setAttribute('data-theme', t0);
if (read('density', 'comfortable') === 'compact') root.setAttribute('data-density', 'compact');
const s0 = read('scale', '100'); if (s0 !== '100') root.setAttribute('data-scale', s0);

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', sync, { once: true }); else sync();
document.addEventListener('change', (e) => {
  const el = e.target;
  if (el.matches('[data-theme-select]')) setTheme(el.value);
  else if (el.matches('input[data-set-density]')) setDensity(el.value);
  else if (el.matches('input[data-set-scale]')) setScale(el.value);
});
document.addEventListener('click', (e) => {
  const el = e.target.closest('button[data-set-theme], [data-theme-toggle]');
  if (!el) return;
  setTheme(el.hasAttribute('data-theme-toggle') ? (effectiveTheme() === 'dark' ? 'light' : 'dark') : el.dataset.setTheme);
});
for (const q of ['(prefers-color-scheme: dark)', '(prefers-contrast: more)']) {
  matchMedia(q).addEventListener('change', () => {
    if (getTheme() !== 'system') return;
    sync();
    root.dispatchEvent(new CustomEvent('grin:theme', { detail: effectiveTheme() }));
  });
}
