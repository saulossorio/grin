/* Grin 2.21 · comportamentos em JavaScript; inclua com <script src="grin.js" defer> · https://github.com/saulossorio/grin
   Gerado por tools/bundle.mjs a partir dos arquivos do repositório. Não edite à mão. */
'use strict';
const Grin = (window.Grin = window.Grin || {});
Grin.version = '2.21';

// ---------- scripts/utils.js ----------
{
// Grin: utilities. Icons (2 px stroke, Lucide drawings), WCAG contrast (hex, rgb and oklch) and token reading.

const ICONS = {
  // navigation and layout
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  'chevron-up': '<path d="m18 15-6-6-6 6"/>',
  'chevron-left': '<path d="m15 18-6-6 6-6"/>',
  'chevron-right': '<path d="m9 18 6-6-6-6"/>',
  sidebar: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/>',
  'layout-grid': '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
  table: '<path d="M12 3v18"/><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/>',
  columns: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="M15 3v18"/>',
  monitor: '<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>',
  play: '<polygon points="6 3 20 12 6 21 6 3"/>',
  book: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>',
  palette: '<circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>',
  accessibility: '<circle cx="16" cy="4" r="1"/><path d="m18 19 1-7-6 1"/><path d="m5 8 3-3 5.5 3-2.36 3.5"/><path d="M4.24 14.5a5 5 0 0 0 6.88 6"/><path d="M13.76 17.5a5 5 0 0 0-6.88-6"/>',
  workflow: '<rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/>',
  // entities
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  building: '<rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>',
  'clipboard-check': '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
  copy: '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
  // actions
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
  pencil: '<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>',
  trash: '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>',
  undo: '<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"/>',
  filter: '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
  merge: '<path d="m8 6 4-4 4 4"/><path d="M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22"/><path d="m20 22-5-5"/>',
  'more-horizontal': '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
  'external-link': '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
  'trending-up': '<path d="M22 7 13.5 15.5 8.5 10.5 2 17"/><path d="M16 7h6v6"/>',
  // status
  'alert-circle': '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',
  'alert-triangle': '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  'check-circle': '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  // preferences
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  contrast: '<circle cx="12" cy="12" r="10"/><path d="M12 18a6 6 0 0 0 0-12v12z"/>',
  // tutorials and help
  sliders: '<path d="M21 4h-7"/><path d="M10 4H3"/><path d="M21 12h-9"/><path d="M8 12H3"/><path d="M21 20h-5"/><path d="M12 20H3"/><path d="M14 2v4"/><path d="M8 10v4"/><path d="M16 18v4"/>',
  'corner-down-left': '<path d="M20 4v7a4 4 0 0 1-4 4H4"/><path d="m9 10-5 5 5 5"/>',
  keyboard: '<path d="M10 8h.01"/><path d="M12 12h.01"/><path d="M14 8h.01"/><path d="M16 12h.01"/><path d="M18 8h.01"/><path d="M6 8h.01"/><path d="M7 16h10"/><path d="M8 12h.01"/><rect width="20" height="16" x="2" y="4" rx="2"/>',
  eye: '<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>',
  pointer: '<path d="M14 4.1 12 6"/><path d="m5.1 8-2.9-.8"/><path d="m6 12-1.9 2"/><path d="M7.2 2.2 8 5.1"/><path d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z"/>',
  type: '<path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/>',
  pause: '<rect x="14" y="4" width="4" height="16" rx="1"/><rect x="6" y="4" width="4" height="16" rx="1"/>',
  'zoom-in': '<circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/>',
  // data origin
  'shield-check': '<path d="M12 3l7 3v6c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6z"/><path d="M9 12l2.2 2.2L15.5 10"/>',
  approx: '<path d="M4 9.5c2.7-2.6 5.3-2.6 8 0s5.3 2.6 8 0"/><path d="M4 15.5c2.7-2.6 5.3-2.6 8 0s5.3 2.6 8 0"/>',
  dice: '<rect x="4" y="4" width="16" height="16" rx="3.5"/><path d="M8.5 8.5h.01M15.5 15.5h.01M12 12h.01M15.5 8.5h.01M8.5 15.5h.01" stroke-width="2.6"/>',
  ruler: '<path d="M3.5 16.5 16.5 3.5l4 4-13 13z"/><path d="M7.5 12.5l2 2M10.5 9.5l2 2M13.5 6.5l2 2"/>',
  calculator: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8"/><path d="M8.5 11h.01M12 11h.01M15.5 11h.01M8.5 14.5h.01M12 14.5h.01M15.5 14.5h.01M8.5 18h.01M12 18h3.5"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  'help-circle': '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
  'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  'arrow-left': '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  lightbulb: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
  'book-open': '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
  map: '<path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/><path d="M15 5.764v15"/><path d="M9 3.236v15"/>',
};

// SVG string for an icon. Decorative by default (aria-hidden); the meaning comes from the text next to it.
const icon = (name, size = 16) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name] ?? ''}</svg>`;

// Replaces every <i data-icon="name" data-size="14"></i> under root with its SVG.
function paintIcons(root = document) {
  root.querySelectorAll('i[data-icon]').forEach((el) => { el.outerHTML = icon(el.dataset.icon, +(el.dataset.size || 16)); });
}

/* ---------- WCAG 2 contrast ---------- */
function oklchToLinear(L, C, H) {
  const h = (H * Math.PI) / 180, a = C * Math.cos(h), b = C * Math.sin(h);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s]
    .map((v) => Math.min(1, Math.max(0, v)));
}
const toLinear = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const toGamma = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);

// Any CSS color (hex, rgb(), oklch()) as linear [r, g, b] from 0 to 1. Alpha is ignored. null when unknown.
function parseColor(color) {
  const s = String(color).trim();
  let m = s.match(/^oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)/i);
  if (m) return oklchToLinear(m[2] ? m[1] / 100 : +m[1], +m[3], +m[4]);
  m = s.match(/^#([0-9a-f]{6})$/i);
  if (m) return [0, 2, 4].map((i) => toLinear(parseInt(m[1].slice(i, i + 2), 16) / 255));
  m = s.match(/^#([0-9a-f]{3})$/i);
  if (m) return [...m[1]].map((c) => toLinear(parseInt(c + c, 16) / 255));
  m = s.match(/^rgba?\(\s*([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)/i);
  if (m) return [m[1], m[2], m[3]].map((v) => toLinear(v / 255));
  return null;
}
const luminance = ([r, g, b]) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

// Contrast ratio between two colors (1 to 21), or null if a color can't be read.
function contrast(a, b) {
  const ca = parseColor(a), cb = parseColor(b);
  if (!ca || !cb) return null;
  const [hi, lo] = [luminance(ca), luminance(cb)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
const toHex = (color) => {
  const c = parseColor(color);
  return c ? '#' + c.map((v) => Math.round(toGamma(v) * 255).toString(16).padStart(2, '0')).join('') : color;
};

// Current value of a CSS custom property (without the leading --).
const token = (name, el = document.documentElement) => getComputedStyle(el).getPropertyValue(`--${name}`).trim();
Object.assign(Grin, { ICONS, icon, paintIcons, parseColor, contrast, toHex, token });
}

// ---------- scripts/theme.js ----------
{
// Grin: theme, contrast, density and font scale. The person's choice is kept in localStorage.
// Theme: 'system' (no attribute: follows the OS), 'light' or 'dark'.
// Contrast is separate and works with either theme: 'system' (no attribute: follows prefers-contrast), 'more' or 'normal'.
// Markup hooks (no extra JS needed):
//   <select data-theme-select>               options: system, light, dark
//   <button data-set-theme="dark">           sets a theme
//   <button data-theme-toggle>               toggles light/dark; shows a sun ("Tema claro") in the dark theme and a moon ("Tema escuro") in the light theme
//   <button data-contrast-toggle>            turns high contrast on/off; aria-pressed shows the state (or a checkbox switch: checked)
//   <input type="radio" data-set-density value="comfortable|compact">
//   <input type="radio" data-set-scale value="100|112|125">  or  <input type="range" class="slider" data-set-scale min="100" max="125" data-stops="100,112.5,125">
//   (the slider moves freely while dragged and the font size changes once, on release, after it settles on a stop)
// ?theme=dark and ?contrast=more in the URL set them on load (handy to share a preview). ?theme=hc = high contrast.
// To avoid a flash of the wrong theme, also put the inline snippet from README.md in <head>.

const { icon } = Grin;
const KEY = 'grin';
const read = (k, fallback) => { try { return localStorage.getItem(`${KEY}-${k}`) ?? fallback; } catch { return fallback; } };
const write = (k, v) => { try { localStorage.setItem(`${KEY}-${k}`, v); } catch { /* private mode: lasts for this visit */ } };
const root = document.documentElement;
const announce = () => root.dispatchEvent(new CustomEvent('grin:theme', { detail: { theme: effectiveTheme(), contrast: effectiveContrast() } }));

const getTheme = () => read('theme', 'system');
const getContrast = () => read('contrast', 'system');
const effectiveTheme = () => {
  const t = getTheme();
  if (t !== 'system') return t;
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};
const effectiveContrast = () => {
  const c = getContrast();
  if (c !== 'system') return c;
  return matchMedia('(prefers-contrast: more)').matches ? 'more' : 'normal';
};

function setTheme(theme) {
  if (theme === 'system') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', theme);
  write('theme', theme);
  sync(); announce();
}
function setContrast(contrast) {
  if (contrast === 'system') root.removeAttribute('data-contrast'); else root.setAttribute('data-contrast', contrast);
  write('contrast', contrast);
  sync(); announce();
}
function setDensity(density) {
  if (density === 'compact') root.setAttribute('data-density', 'compact'); else root.removeAttribute('data-density');
  write('density', density);
  sync();
}
function setScale(scale) {
  if (scale === '100') root.removeAttribute('data-scale'); else root.setAttribute('data-scale', scale);
  write('scale', scale);
  sync();
}

// Brings every control on the page in line with the current choice.
function sync() {
  const t = getTheme(), d = read('density', 'comfortable'), s = read('scale', '100');
  document.querySelectorAll('[data-theme-select]').forEach((el) => { el.value = t; });
  document.querySelectorAll('button[data-set-theme]').forEach((el) => el.setAttribute('aria-pressed', String(el.dataset.setTheme === t)));
  document.querySelectorAll('[data-contrast-toggle]').forEach((el) => { if (el.matches('input')) el.checked = effectiveContrast() === 'more'; else el.setAttribute('aria-pressed', String(effectiveContrast() === 'more')); });
  document.querySelectorAll('input[data-set-density]').forEach((el) => { el.checked = el.value === d; });
  document.querySelectorAll('input[data-set-scale]').forEach((el) => {
    // 'input' only repaints the slider; a 'change' here would call setScale again, in a loop
    if (el.type === 'range') { el.value = s === '112' ? '112.5' : s; el.dispatchEvent(new Event('input', { bubbles: true })); } else el.checked = el.value === s;
  });
  const dark = effectiveTheme() === 'dark';
  document.querySelectorAll('[data-theme-toggle]').forEach((el) => {
    const label = dark ? 'Tema claro' : 'Tema escuro';
    const text = el.querySelector('.label'); if (text) text.textContent = label; else el.setAttribute('aria-label', label);
    const ic = el.querySelector('svg, i[data-icon]');
    if (ic) { const size = +(ic.getAttribute('width') || ic.dataset.size || 16); ic.outerHTML = icon(dark ? 'sun' : 'moon', size); }
  });
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
document.addEventListener('click', (e) => {
  const c = e.target.closest?.('[data-contrast-toggle]');
  if (c) { setContrast(effectiveContrast() === 'more' ? 'normal' : 'more'); return; }
  const el = e.target.closest?.('button[data-set-theme], [data-theme-toggle]');
  if (!el) return;
  setTheme(el.hasAttribute('data-theme-toggle') ? (effectiveTheme() === 'dark' ? 'light' : 'dark') : el.dataset.setTheme);
});
for (const q of ['(prefers-color-scheme: dark)', '(prefers-contrast: more)']) {
  matchMedia(q).addEventListener('change', () => { sync(); announce(); });
}
Object.assign(Grin, { getTheme, getContrast, effectiveTheme, effectiveContrast, setTheme, setContrast, setDensity, setScale, sync });
}

// ---------- scripts/animations.js ----------
{
// Grin: reusable motion. Rules: short (120 to 220 ms), only as a response to an action, never hiding content.
// With "reduce motion" on, nothing moves and the end state shows at once.
const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const cssVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
const duration = () => parseInt(cssVar('--dur'), 10) || 160;
const easing = () => cssVar('--ease') || 'ease-out';

// Briefly highlights something that changed (a saved row, a recalculated value).
function flash(el) {
  if (reducedMotion() || !el) return;
  el.animate([{ backgroundColor: cssVar('--highlight') }, { backgroundColor: 'transparent' }], { duration: 900, easing: 'ease-out' });
}

// Entrance of a new element (toast, item added to a list).
function enter(el, { y = 6 } = {}) {
  if (reducedMotion() || !el) return;
  el.animate([{ opacity: 0, transform: `translateY(${y}px)` }, { opacity: 1, transform: 'none' }], { duration: duration(), easing: easing() });
}

// Scrolls to an element, smooth only when motion is allowed.
function scrollToElement(el) {
  el?.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });
}

// Closes a menu or any floating layer with the exit animation, then hides or removes it.
// closeMenu(el) hides it (el.hidden = true); closeMenu(el, { remove: true }) takes it out of the page.
function closeMenu(el, { remove = false } = {}) {
  if (!el) return;
  const done = () => { el.classList.remove('closing'); if (remove) el.remove(); else el.hidden = true; };
  if (reducedMotion()) { done(); return; }
  el.classList.add('closing');
  setTimeout(done, 140);
}
Object.assign(Grin, { reducedMotion, flash, enter, scrollToElement, closeMenu });
}

// ---------- components/popover/popover.js ----------
{
// Grin tooltip, popover and term.
// Tooltip: any element with data-tooltip="text" (usually an icon button that already has the same aria-label).
// Popover: <button data-popover="id" aria-expanded="false"> opens <div class="popover" id="id" role="dialog" aria-label="…">.
//   Click outside or Esc closes it; focus goes back to the button. The .term and .help-button use the same hook.
const GAP = 8;
// The visible area excludes the scrollbar (innerWidth includes it, and the panel ended up under it)
function place(el, anchor) {
  const a = anchor.getBoundingClientRect(), r = el.getBoundingClientRect();
  const vw = document.documentElement.clientWidth, vh = document.documentElement.clientHeight;
  let top = a.bottom + GAP;
  if (top + r.height > vh - GAP && a.top - r.height - GAP > GAP) top = a.top - r.height - GAP;
  const left = Math.min(Math.max(GAP, a.left + a.width / 2 - r.width / 2), vw - r.width - GAP);
  el.style.top = `${Math.round(top)}px`; el.style.left = `${Math.round(left)}px`;
}

let tip;
function showTip(target) {
  if (!tip) { tip = Object.assign(document.createElement('div'), { className: 'tooltip' }); tip.setAttribute('role', 'tooltip'); tip.id = 'grin-tooltip'; document.body.append(tip); }
  tip.textContent = target.dataset.tooltip;
  place(tip, target);
  tip.classList.add('show');
}
const hideTip = () => tip?.classList.remove('show');
document.addEventListener('pointerover', (e) => { const t = e.target.closest?.('[data-tooltip]'); if (t) showTip(t); });
document.addEventListener('pointerout', (e) => { if (e.target.closest?.('[data-tooltip]')) hideTip(); });
document.addEventListener('focusin', (e) => { const t = e.target.closest?.('[data-tooltip]'); if (t && t.matches(':focus-visible')) showTip(t); });
document.addEventListener('focusout', hideTip);

let open = null;
function close(returnFocus = false) {
  if (!open) return;
  // fades out before hiding (instant with reduced motion)
  const panel = open.panel;
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) { panel.classList.add('closing'); setTimeout(() => panel.classList.remove('closing'), 140); }
  panel.classList.remove('open');
  open.button.setAttribute('aria-expanded', 'false');
  if (returnFocus) open.button.focus();
  open = null;
}
document.addEventListener('click', (e) => {
  const button = e.target.closest?.('[data-popover]');
  if (button) {
    const panel = document.getElementById(button.dataset.popover);
    const same = open?.button === button;
    close();
    if (same || !panel) return;
    panel.classList.add('open'); button.setAttribute('aria-expanded', 'true');
    place(panel, button);
    open = { panel, button };
    hideTip();
    return;
  }
  if (open && !open.panel.contains(e.target)) close();
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { hideTip(); close(true); } });
addEventListener('scroll', () => { if (open) place(open.panel, open.button); }, true);
addEventListener('resize', () => { if (open) place(open.panel, open.button); });
}

// ---------- components/slider/slider.js ----------
{
// Grin slider. For every input.slider: paints the filled part of the track (--fill), writes the value in the
// <output for="id"> next to it (data-format="percent" adds %) and marks the matching tick in .slider-ticks (data-value).
// Stepped slider: data-stops="100,112.5,125". The thumb follows the pointer freely while dragging (smooth, no jumps);
// on release it glides to the nearest stop. Arrow keys jump from stop to stop. The value read on "change" is
// always a stop: use nearestStop(el) or read el.value after the change event.
const stopsOf = (el) => (el.dataset.stops ? el.dataset.stops.split(',').map(Number) : null);
const nearestStop = (el, v = +el.value) => {
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
const paintSliders = (root = document) => root.querySelectorAll('input.slider').forEach((el) => {
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
Object.assign(Grin, { nearestStop, paintSliders });
}

// ---------- components/sidebar/sidebar.js ----------
{
// Grin sidebar: collapse to icons and expand again.
// Markup: <div class="app"><nav class="sidebar">…</nav>…</div>. The script adds a round toggle on the sidebar edge
// (or uses any [data-sidebar-toggle] button), remembers the choice (localStorage "grin-sidebar"), and collapses on its
// own below 1100 px when the person never chose. Collapsed, each item shows its name as a tooltip (popover.js).
// On phones (760 px and below) it becomes a drawer opened by a menu button at the top left.

const { icon } = Grin;
const KEY = 'grin-sidebar';
const read = () => { try { return localStorage.getItem(KEY); } catch { return null; } };
const write = (v) => { try { localStorage.setItem(KEY, v); } catch { /* private mode */ } };

const phone = () => matchMedia('(max-width: 760px)').matches; // there the sidebar is a strip or a drawer, never icons only
function apply(sidebar, wanted) {
  const collapsed = wanted && !phone();
  sidebar.classList.toggle('collapsed', collapsed);
  sidebar.closest('.app')?.classList.toggle('sidebar-collapsed', collapsed);
  sidebar.querySelectorAll('.nav-item, .account').forEach((el) => {
    const name = el.querySelector('.label, b, span')?.textContent.trim() || el.getAttribute('aria-label');
    if (collapsed && name) { el.dataset.tooltip = name; if (!el.textContent.trim() || el.querySelector('.label')) el.setAttribute('aria-label', name); } else delete el.dataset.tooltip;
  });
  document.querySelectorAll('.sidebar-toggle, [data-sidebar-toggle]').forEach((b) => {
    b.setAttribute('aria-expanded', String(!collapsed));
    b.setAttribute('aria-label', collapsed ? 'Expandir barra lateral' : 'Recolher barra lateral');
    const label = b.querySelector('.label'); if (label) label.textContent = collapsed ? 'Expandir barra' : 'Recolher barra';
  });
}

// Pages that build their sidebar with a script call initSidebar() after building it
let started = false;
function initSidebar() {
  const sidebar = document.querySelector('.app > .sidebar');
  if (!sidebar || started) return;
  started = true;
  if (!document.querySelector('[data-sidebar-toggle]')) {
    const b = Object.assign(document.createElement('button'), { type: 'button', className: 'sidebar-toggle' });
    b.innerHTML = icon('chevron-left', 16);
    b.setAttribute('aria-controls', sidebar.id || (sidebar.id = 'app-sidebar'));
    sidebar.after(b);
  }
  // Phones: a menu button opens the sidebar as a drawer (the documentation has its own button)
  if (!sidebar.matches('[data-docs-nav]')) {
    const m = Object.assign(document.createElement('button'), { type: 'button', className: 'sidebar-menu-button' });
    m.innerHTML = icon('sidebar', 20); m.setAttribute('aria-label', 'Abrir menu'); m.setAttribute('aria-expanded', 'false'); m.setAttribute('aria-controls', sidebar.id || (sidebar.id = 'app-sidebar'));
    sidebar.before(m);
    const openMenu = (on) => { sidebar.classList.toggle('open', on); document.body.classList.toggle('sidebar-open', on); m.setAttribute('aria-expanded', String(on)); m.setAttribute('aria-label', on ? 'Fechar menu' : 'Abrir menu'); };
    m.addEventListener('click', () => openMenu(!sidebar.classList.contains('open')));
    document.addEventListener('click', (e) => { if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && !m.contains(e.target)) openMenu(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && sidebar.classList.contains('open')) { openMenu(false); m.focus(); } });
  }
  const saved = read();
  apply(sidebar, saved ? saved === 'collapsed' : matchMedia('(max-width: 1100px)').matches);
  document.addEventListener('click', (e) => {
    if (!e.target.closest?.('.sidebar-toggle, [data-sidebar-toggle]')) return;
    const collapsed = !sidebar.classList.contains('collapsed');
    write(collapsed ? 'collapsed' : 'expanded');
    apply(sidebar, collapsed);
  });
  matchMedia('(max-width: 1100px)').addEventListener('change', (m) => { if (!read()) apply(sidebar, m.matches); });
  matchMedia('(max-width: 760px)').addEventListener('change', () => apply(sidebar, read() ? read() === 'collapsed' : matchMedia('(max-width: 1100px)').matches));
}
// data-sidebar="manual" on the sidebar turns off the automatic start: the page calls initSidebar() (Grin.initSidebar() in dist/grin.js) when it is ready
const auto = () => { if (!document.querySelector('[data-docs-nav], .sidebar[data-sidebar="manual"]')) initSidebar(); };
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', auto, { once: true }); else auto();
Object.assign(Grin, { initSidebar });
}

// ---------- components/dialog/dialog.js ----------
{
// Grin dialog and drawer behavior, for any <dialog class="dialog|drawer">.
// [data-open="id"] opens it as modal, [data-close] closes the dialog it is in. Esc and a click on the backdrop also close.
document.addEventListener('click', (e) => {
  const opener = e.target.closest?.('[data-open]');
  if (opener) { document.getElementById(opener.dataset.open)?.showModal(); return; }
  const closer = e.target.closest?.('[data-close]');
  if (closer) { closer.closest('dialog')?.close(); return; }
  if (e.target.tagName === 'DIALOG') e.target.close(); // click on the backdrop
});
}

// ---------- components/tabs/tabs.js ----------
{
// Grin tabs. Markup: [role=tablist] > button[role=tab][aria-controls=id]; panels [role=tabpanel][id].
// Click or Left/Right/Home/End selects a tab and shows its panel. A white piece (.tabs-indicator) slides to the chosen tab.
// Tabs as links (navigation between pages): <nav class="tabs"><a class="tab" href="…" aria-current="page">. No role, no panels;
// the indicator marks the current page.
document.addEventListener('click', (e) => { const tab = e.target.closest?.('[role="tab"]'); if (tab) select(tab); });
document.addEventListener('keydown', (e) => {
  const tab = e.target.closest?.('[role="tab"]');
  if (!tab || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
  const tabs = [...tab.closest('[role="tablist"]').querySelectorAll('[role="tab"]')];
  const i = tabs.indexOf(tab);
  const next = { ArrowLeft: tabs[(i - 1 + tabs.length) % tabs.length], ArrowRight: tabs[(i + 1) % tabs.length], Home: tabs[0], End: tabs.at(-1) }[e.key];
  e.preventDefault(); select(next); next.focus();
});
function select(tab) {
  const list = tab.closest('[role="tablist"]');
  for (const t of list.querySelectorAll('[role="tab"]')) {
    const on = t === tab;
    t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1;
    const panel = document.getElementById(t.getAttribute('aria-controls'));
    if (panel) panel.hidden = !on;
  }
  place(list);
}
function place(list) {
  const on = list.querySelector('[role="tab"][aria-selected="true"], a.tab[aria-current="page"]');
  let bar = list.querySelector('.tabs-indicator');
  if (!on || !list.classList.contains('tabs')) return;
  if (!bar) { bar = document.createElement('span'); bar.className = 'tabs-indicator'; bar.setAttribute('aria-hidden', 'true'); list.prepend(bar); list.classList.add('tabs-ready'); }
  bar.style.width = `${on.offsetWidth}px`; bar.style.height = `${on.offsetHeight}px`;
  bar.style.transform = `translate(${on.offsetLeft}px, ${on.offsetTop}px)`;
}
const placeAll = () => document.querySelectorAll('.tabs').forEach(place);
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', placeAll, { once: true }); else placeAll();
addEventListener('resize', placeAll);
document.fonts?.ready.then(placeAll);
}

// ---------- components/toast/toast.js ----------
{
// Grin toast. toast('Text', { type: 'ok' | 'crit' | 'warn' | 'info', action: 'Desfazer', onAction: fn, duration: 5000 })
// Creates the .toasts region (role="status") on first use, so screen readers announce each message.
const { icon } = Grin;
const ICON = { ok: 'check-circle', crit: 'alert-circle', warn: 'alert-triangle', info: 'info' };

function toast(text, { type = 'ok', action, onAction, duration = 5000 } = {}) {
  let region = document.querySelector('.toasts');
  if (!region) {
    region = Object.assign(document.createElement('div'), { className: 'toasts' });
    region.setAttribute('role', 'status');
    document.body.append(region);
  }
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `${icon(ICON[type] ?? 'info')}<div class="toast-text"></div>${action ? '<button type="button" class="link"></button>' : ''}<button type="button" class="btn icon xs ghost" aria-label="Fechar aviso">${icon('x', 14)}</button>`;
  el.querySelector('.toast-text').textContent = text;
  // Fades out before leaving; with reduced motion the animation is off, so remove right away
  const close = () => { if (!el.isConnected) return; el.classList.add('leaving'); setTimeout(() => el.remove(), matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 220); };
  if (action) {
    const b = el.querySelector('.link');
    b.textContent = action;
    b.addEventListener('click', () => { onAction?.(); close(); });
  }
  el.querySelector('.btn').addEventListener('click', close);
  region.append(el);
  setTimeout(close, duration);
  return el;
}
Object.assign(Grin, { toast });
}

// ---------- components/accordion/accordion.js ----------
{
// Grin accordion and disclosure: animate opening and closing in every browser. Markup: .accordion > details > summary
// + .accordion-body, or details.disclosure > summary + one content element.
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
  const body = details.querySelector(':scope > .accordion-body') || details.querySelector(':scope > :not(summary)');
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
  const summary = e.target.closest?.('.accordion summary, details.disclosure > summary');
  if (!summary) return;
  const details = summary.parentElement;
  e.preventDefault();
  // Open and not closing → close; closed, or in the middle of closing → open
  const opening = !details.open || details.dataset.closing === '1';
  details.dataset.closing = opening ? '' : '1';
  if (opening && details.name) {
    (details.closest('.accordion') || details.parentElement)?.querySelectorAll(`details[name="${CSS.escape(details.name)}"][open]`).forEach((d) => {
      if (d !== details && d.dataset.closing !== '1') { d.dataset.closing = '1'; animate(d, false); }
    });
  }
  animate(details, opening);
});
}

// ---------- components/appearance/appearance.js ----------
{
// Grin appearance panel (also: acessibilidade, preferências de tela, settings). The same four controls in every tool:
// theme, high contrast, density and font size. Markup: an empty <div class="popover appearance" id="…" data-appearance>
// opened by a button with data-popover="…" (popover.js). This script fills it; theme.js and slider.js make it work.
// Every tool built with Grin has this panel, in the top bar or in the sidebar footer next to the theme button.
const { paintSliders } = Grin;
const { sync } = Grin;
let n = 0;
function mountAppearance(root = document) {
  root.querySelectorAll('[data-appearance]:not([data-ready])').forEach((panel) => {
    const k = `grin-ap${n++}`;
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Aparência');
    panel.innerHTML = `<span class="popover-title">Aparência</span>
      <div class="field"><label class="field-label" for="${k}-theme">Tema</label><select class="select" id="${k}-theme" data-theme-select><option value="system">Do sistema</option><option value="light">Claro</option><option value="dark">Escuro</option></select></div>
      <label class="switch"><input type="checkbox" role="switch" data-contrast-toggle>Alto contraste</label>
      <div class="field"><span class="field-label" id="${k}-dl">Densidade</span><div class="segmented" role="radiogroup" aria-labelledby="${k}-dl">
        <label><input type="radio" name="${k}-density" value="comfortable" data-set-density><span>Confortável</span></label>
        <label><input type="radio" name="${k}-density" value="compact" data-set-density><span>Compacta</span></label>
      </div></div>
      <div class="slider-field">
        <div class="slider-head"><label class="field-label" for="${k}-scale">Tamanho da fonte</label><output for="${k}-scale" data-format="percent">100%</output></div>
        <div class="slider-row"><span class="slider-end small" aria-hidden="true">A</span><input class="slider" type="range" id="${k}-scale" min="100" max="125" step="any" data-stops="100,112.5,125" value="100" data-set-scale><span class="slider-end large" aria-hidden="true">A</span></div>
        <div class="slider-ticks" aria-hidden="true"><span data-value="100">100%</span><span data-value="112.5">112,5%</span><span data-value="125">125%</span></div>
      </div>`;
    panel.dataset.ready = '';
  });
  sync();
  paintSliders(root);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => mountAppearance(), { once: true }); else mountAppearance();
Object.assign(Grin, { mountAppearance });
}

// ---------- components/combobox/combobox.js ----------
{
// Grin combobox. Markup: .combobox[.multiple] > .combobox-control > input.combobox-input[aria-controls=list-id]
// and ul.combobox-list#list-id > li.combobox-option[data-value] (optional <small> second line, li.combobox-group titles).
// Typing filters and highlights; arrows move; Enter picks; Esc closes. In .multiple each pick becomes a tag, and
// Backspace on an empty field removes the last tag. A hidden input[name] (optional) receives the value(s), comma-separated.
// Select (no typing): add readonly to the input. The list opens on click, Enter or the arrows, and the field shows the choice.
// Motion: the list scales in and fades out; tags spring in and shrink out. All of it is off with reduced motion.
const fold = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function setup(box) {
  const input = box.querySelector('.combobox-input'), list = box.querySelector('.combobox-list');
  const control = box.querySelector('.combobox-control'), hidden = box.querySelector('input[type="hidden"]');
  const multiple = box.classList.contains('multiple');
  const options = [...list.querySelectorAll('.combobox-option')];
  // The label (everything before <small>) goes into its own span, so highlighting never touches the second line
  options.forEach((o, i) => {
    o.id ||= `${list.id}-o${i}`; o.setAttribute('role', 'option');
    const span = document.createElement('span'); span.className = 'combobox-label';
    const icon = o.querySelector(':scope > .combobox-icon');
    [...o.childNodes].filter((n) => n !== icon && n.nodeName !== 'SMALL').forEach((n) => span.append(n));
    o.insertBefore(span, o.querySelector(':scope > small')); o.dataset.label = span.textContent.trim();
    if (icon) o.classList.add('has-icon');
  });
  input.setAttribute('role', 'combobox'); input.setAttribute('aria-autocomplete', 'list'); input.setAttribute('aria-expanded', 'false');
  list.setAttribute('role', 'listbox'); if (multiple) list.setAttribute('aria-multiselectable', 'true');
  let active = -1;
  const visible = () => options.filter((o) => !o.hidden);
  const chosen = () => options.filter((o) => o.getAttribute('aria-selected') === 'true');
  const sync = () => {
    if (hidden) hidden.value = chosen().map((o) => o.dataset.value).join(',');
    if (!multiple && chosen()[0]) {
      input.value = chosen()[0].dataset.label;
      // the chosen option's icon also shows in the field
      control.querySelector(':scope > .combobox-icon')?.remove();
      const ic = chosen()[0].querySelector(':scope > .combobox-icon');
      if (ic) control.prepend(ic.cloneNode(true));
    }
    if (multiple) {
      control.querySelectorAll('.combobox-tag').forEach((t) => t.remove());
      chosen().forEach((o) => input.insertAdjacentHTML('beforebegin', `<span class="combobox-tag" data-value="${esc(o.dataset.value)}">${esc(o.dataset.label)}<button type="button" aria-label="Remover ${esc(o.dataset.label)}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button></span>`));
    }
  };
  const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const readonly = input.readOnly;
  if (readonly) box.classList.add('listbox');
  let closeTimer;
  const open = (on) => {
    if (on === box.classList.contains('open')) return;
    clearTimeout(closeTimer);
    input.setAttribute('aria-expanded', String(on));
    if (on) { box.classList.remove('closing'); box.classList.add('open'); return; }
    active = -1; input.removeAttribute('aria-activedescendant');
    box.classList.remove('open');
    if (!reduce()) { box.classList.add('closing'); closeTimer = setTimeout(() => box.classList.remove('closing'), 140); }
  };
  // A tag shrinks out before the choice is removed
  const removeTag = (o) => {
    const tag = [...control.querySelectorAll('.combobox-tag')].find((t) => t.dataset.value === o.dataset.value);
    if (!tag || reduce()) { pick(o); return; }
    tag.classList.add('leaving');
    setTimeout(() => pick(o), 140);
  };
  const filter = () => {
    const q = fold(input.value.trim());
    options.forEach((o) => {
      const hit = !q || fold(o.textContent).includes(q);
      o.hidden = !hit;
      const label = o.dataset.label, i = fold(label).indexOf(q);
      o.querySelector('.combobox-label').innerHTML = q && i >= 0 ? `${esc(label.slice(0, i))}<mark>${esc(label.slice(i, i + q.length))}</mark>${esc(label.slice(i + q.length))}` : esc(label);
    });
    list.querySelectorAll('.combobox-group').forEach((g) => { let n = g.nextElementSibling, any = false; while (n && !n.classList.contains('combobox-group')) { any ||= !n.hidden; n = n.nextElementSibling; } g.hidden = !any; });
    let empty = list.querySelector('.combobox-empty');
    if (!visible().length) { if (!empty) list.insertAdjacentHTML('beforeend', '<li class="combobox-empty">Nenhuma opção encontrada.</li>'); } else empty?.remove();
    move(visible().length ? 0 : -1, true);
  };
  const move = (i, absolute) => {
    const v = visible(); if (!v.length) return;
    active = absolute ? i : Math.max(0, Math.min(v.length - 1, active + i));
    options.forEach((o) => o.classList.toggle('active', o === v[active]));
    if (v[active]) { input.setAttribute('aria-activedescendant', v[active].id); v[active].scrollIntoView({ block: 'nearest' }); }
  };
  const pick = (o) => {
    if (multiple) o.setAttribute('aria-selected', String(o.getAttribute('aria-selected') !== 'true'));
    else { options.forEach((x) => x.setAttribute('aria-selected', String(x === o))); input.value = o.dataset.label; open(false); }
    if (multiple) { input.value = ''; filter(); }
    sync(); box.dispatchEvent(new CustomEvent('grin:change', { bubbles: true, detail: chosen().map((x) => x.dataset.value) }));
  };
  input.addEventListener('focus', () => { if (!readonly) { open(true); filter(); } });
  input.addEventListener('input', () => { open(true); filter(); });
  if (readonly) input.addEventListener('click', () => { const on = !box.classList.contains('open'); open(on); if (on) move(Math.max(0, visible().indexOf(chosen()[0])), true); });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); open(true); move(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
    else if (e.key === 'Enter' && box.classList.contains('open')) { e.preventDefault(); const o = visible()[active]; if (o) pick(o); }
    else if (e.key === 'Escape') open(false);
    else if (e.key === 'Backspace' && multiple && !input.value) { const last = chosen().at(-1); if (last) removeTag(last); }
    else if (readonly && (e.key === ' ' || (e.key === 'Enter' && !box.classList.contains('open')))) { e.preventDefault(); open(true); move(Math.max(0, visible().indexOf(chosen()[0])), true); }
  });
  list.addEventListener('mousedown', (e) => { const o = e.target.closest?.('.combobox-option'); if (o) { e.preventDefault(); pick(o); } });
  control.addEventListener('click', (e) => {
    const rm = e.target.closest?.('.combobox-tag button');
    if (rm) { const o = options.find((x) => x.dataset.value === rm.parentElement.dataset.value); if (o) removeTag(o); return; }
    if (!readonly) input.focus();
  });
  document.addEventListener('click', (e) => { if (!box.contains(e.target)) open(false); });
  sync();
}
// After DOMContentLoaded, so code samples read the original markup first
const start = () => document.querySelectorAll('.combobox').forEach(setup);
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true }); else start();
}

// ---------- components/dropzone/dropzone.js ----------
{
// Grin dropzone. Markup: <label class="dropzone"> … <input type="file" accept=".csv,.xlsx"> … </label>.
// Marks .over while a file is dragged on top and fires "grin:files" with the File list (from drop or from the picker).
document.querySelectorAll('.dropzone').forEach((zone) => {
  const input = zone.querySelector('input[type="file"]');
  const send = (files) => { if (files?.length) zone.dispatchEvent(new CustomEvent('grin:files', { bubbles: true, detail: [...files] })); };
  ['dragenter', 'dragover'].forEach((t) => zone.addEventListener(t, (e) => { e.preventDefault(); zone.classList.add('over'); }));
  ['dragleave', 'dragend'].forEach((t) => zone.addEventListener(t, (e) => { if (!zone.contains(e.relatedTarget)) zone.classList.remove('over'); }));
  zone.addEventListener('drop', (e) => { e.preventDefault(); zone.classList.remove('over'); send(e.dataTransfer.files); });
  input?.addEventListener('change', () => send(input.files));
});
}

// ---------- components/glossary/glossary.js ----------
{
// Grin glossary. Markup: .glossary > .letter-index (buttons with data-letter, plus one with data-letter="" for all)
// and .glossary-group[data-letter] > .glossary-item. Optional search: <input data-glossary-search>.
document.querySelectorAll('.glossary').forEach((g) => {
  const groups = [...g.querySelectorAll('.glossary-group')];
  const search = g.querySelector('[data-glossary-search]');
  let letter = '';
  const apply = () => {
    const q = (search?.value ?? '').trim().toLowerCase();
    for (const grp of groups) {
      let any = false;
      for (const item of grp.querySelectorAll('.glossary-item')) {
        const show = (!letter || grp.dataset.letter === letter) && (!q || item.textContent.toLowerCase().includes(q));
        item.hidden = !show; any ||= show;
      }
      grp.hidden = !any;
    }
    g.querySelectorAll('.letter-index button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.letter === letter)));
  };
  g.querySelectorAll('.letter-index button').forEach((b) => {
    if (b.dataset.letter && !groups.some((grp) => grp.dataset.letter === b.dataset.letter)) b.disabled = true;
    b.addEventListener('click', () => { letter = b.dataset.letter; apply(); });
  });
  search?.addEventListener('input', apply);
  apply();
});
}

// ---------- components/toc/toc.js ----------
{
// Grin table of contents. Marks with aria-current="true" the link of the section being read.
// Markup: <nav class="toc" aria-label="Nesta página"><a href="#id">…</a></nav>; the sections need those ids.
document.querySelectorAll('.toc').forEach((toc) => {
  const links = [...toc.querySelectorAll('a[href^="#"]')];
  const sections = links.map((a) => document.getElementById(decodeURIComponent(a.hash.slice(1)))).filter(Boolean);
  const mark = (id) => links.forEach((a) => a.setAttribute('aria-current', String(a.hash.slice(1) === id)));
  const io = new IntersectionObserver((entries) => {
    const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    if (visible[0]) mark(visible[0].target.id);
  }, { rootMargin: '0px 0px -70% 0px' });
  sections.forEach((s) => io.observe(s));
  if (sections[0]) mark(sections[0].id);
});
}

// ---------- components/tour/tour.js ----------
{
// Grin tour. startTour([{ target: '#selector' | null, title: 'Text', text: 'Text' }, …], { onEnd })
// Each step lights up its target (null = no target, the card goes to the center) and shows a card with
// "Passo n de N", a progress bar, Voltar / Próximo / Concluir. Arrow keys move, Esc leaves. Focus goes to the card title.
const { icon } = Grin;
function startTour(steps, { onEnd } = {}) {
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
    const b = e.target.closest?.('[data-tour]'); if (!b) return;
    ({ end, prev: () => go(-1), next: () => go(1) })[b.dataset.tour]();
  });
  addEventListener('keydown', keys); addEventListener('resize', position); addEventListener('scroll', position, true);
  root.getBoundingClientRect(); // commit the hidden state so the fade-in runs
  root.classList.add('show'); show();
  return { end };
}
Object.assign(Grin, { startTour });
}

// Ícones: troca <i data-icon> pelos desenhos quando a página termina de carregar
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => Grin.paintIcons(), { once: true }); else Grin.paintIcons();
