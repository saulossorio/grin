/* Grin 2.44 · comportamentos em JavaScript; inclua com <script src="grin.js" defer> · https://github.com/saulossorio/grin
   Gerado por tools/bundle.mjs a partir dos arquivos do repositório. Não edite à mão. */
'use strict';
const Grin = (window.Grin = window.Grin || {});
Grin.version = '2.44';

// ---------- scripts/utils.js ----------
{
// Grin: utilities. Icons (2 px stroke, Lucide drawings), WCAG contrast (hex, rgb and oklch) and token reading.
// The icon drawings come from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Contributors.

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
  redo: '<path d="m15 14 5-5-5-5"/><path d="M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13"/>',
  'arrow-up': '<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
  'arrow-down': '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
  'arrow-up-down': '<path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/>',
  'arrow-right-left': '<path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/>',
  'arrow-up-right': '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
  rows: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M21 9H3"/><path d="M21 15H3"/>',
  'rotate-ccw': '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
  history: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/>',
  refresh: '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
  wand: '<path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72"/><path d="m14 7 3 3"/><path d="M5 6v4"/><path d="M19 14v4"/><path d="M10 2v2"/><path d="M7 8H3"/><path d="M21 16h-4"/><path d="M11 3H9"/>',
  sparkles: '<path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/>',
  inbox: '<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
  file: '<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/>',
  'file-text': '<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
  save: '<path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path d="M7 3v4a1 1 0 0 0 1 1h7"/>',
  unlink: '<path d="m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71"/><path d="m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71"/><line x1="8" x2="8" y1="2" y2="5"/><line x1="2" x2="5" y1="8" y2="8"/><line x1="16" x2="16" y1="19" y2="22"/><line x1="19" x2="22" y1="16" y2="16"/>',
  menu: '<path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/>',
  'more-vertical': '<circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>',
  calendar: '<path d="M8 2v3"/><path d="M16 2v3"/><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
  lock: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  message: '<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/>',
  list: '<path d="M3 5h.01"/><path d="M3 12h.01"/><path d="M3 19h.01"/><path d="M8 5h13"/><path d="M8 12h13"/><path d="M8 19h13"/>',
  database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>',
  ban: '<circle cx="12" cy="12" r="10"/><path d="M4.929 4.929 19.07 19.071"/>',
  layers: '<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/>',
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
// Only applies a saved choice. With no choice it leaves data-theme as it is, so a tool that set its own theme
// before this script ran keeps it.
const t0 = getTheme(); if (t0 !== 'system') root.setAttribute('data-theme', t0);
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
// Controls drawn later by a script (a redrawn sidebar, a dialog) get the current state as soon as they appear.
// sync() replaces only the icon inside the button, which never matches the selector, so it does not loop.
const CONTROLS = '[data-theme-toggle], [data-theme-select], button[data-set-theme], [data-contrast-toggle], input[data-set-density], input[data-set-scale]';
let syncQueued = false;
const startObserver = () => new MutationObserver((list) => {
  if (syncQueued || !list.some((r) => [...r.addedNodes].some((n) => n.nodeType === 1 && (n.matches(CONTROLS) || n.querySelector(CONTROLS))))) return;
  syncQueued = true;
  queueMicrotask(() => { syncQueued = false; sync(); });
}).observe(document.body, { childList: true, subtree: true });
if (document.body) startObserver(); else document.addEventListener('DOMContentLoaded', startObserver, { once: true });
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
//   It hides on pointer out, focus out, click and scroll; a page that redraws under the pointer can call hideTip().
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
// A click, a scroll or a redraw that removes the element also hides the tooltip
document.addEventListener('pointerdown', hideTip);
window.addEventListener('scroll', hideTip, { passive: true, capture: true });

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
Object.assign(Grin, { hideTip });
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
// On phones (760 px and below) it becomes a drawer opened by a menu button at the top left; choosing an item closes it.
// A tool that redraws the sidebar (or the whole .app) with a script keeps all of this: the script watches the page,
// puts the toggle and the menu button back when they are gone, and applies the current state to the new sidebar.
// The tool does not set .collapsed itself.

const { icon } = Grin;
const KEY = 'grin-sidebar';
const read = () => { try { return localStorage.getItem(KEY); } catch { return null; } };
const write = (v) => { try { localStorage.setItem(KEY, v); } catch { /* private mode */ } };

const bar = () => document.querySelector('.app > .sidebar');
const phone = () => matchMedia('(max-width: 760px)').matches; // there the sidebar is a strip or a drawer, never icons only
const wanted = () => (read() ? read() === 'collapsed' : matchMedia('(max-width: 1100px)').matches);
let menuOpen = false;

function apply() {
  const sidebar = bar(); if (!sidebar) return;
  const collapsed = wanted() && !phone();
  sidebar.classList.toggle('collapsed', collapsed);
  sidebar.classList.toggle('open', menuOpen);
  sidebar.closest('.app')?.classList.toggle('sidebar-collapsed', collapsed);
  sidebar.querySelectorAll('.nav-item, .account, .sidebar-action').forEach((el) => {
    const name = el.querySelector('.label, b, span')?.textContent.trim() || el.getAttribute('aria-label');
    if (collapsed && name) { el.dataset.tooltip = name; if (!el.textContent.trim() || el.querySelector('.label')) el.setAttribute('aria-label', name); } else delete el.dataset.tooltip;
  });
  document.querySelectorAll('.sidebar-toggle, [data-sidebar-toggle]').forEach((b) => {
    b.setAttribute('aria-expanded', String(!collapsed));
    b.setAttribute('aria-label', collapsed ? 'Expandir barra lateral' : 'Recolher barra lateral');
    const label = b.querySelector('.label'); if (label) label.textContent = collapsed ? 'Expandir barra' : 'Recolher barra';
  });
  const m = document.querySelector('.sidebar-menu-button');
  if (m) { m.setAttribute('aria-expanded', String(menuOpen)); m.setAttribute('aria-label', menuOpen ? 'Fechar menu' : 'Abrir menu'); }
  document.body.classList.toggle('sidebar-open', menuOpen);
}

// Adds the round toggle and, outside the documentation, the phone menu button, when the page does not have them
function addParts() {
  const sidebar = bar(); if (!sidebar) return;
  const id = sidebar.id || (sidebar.id = 'app-sidebar');
  if (!document.querySelector('.sidebar-toggle, [data-sidebar-toggle]')) {
    const b = Object.assign(document.createElement('button'), { type: 'button', className: 'sidebar-toggle' });
    b.innerHTML = icon('chevron-left', 16);
    b.setAttribute('aria-controls', id);
    sidebar.after(b);
  }
  if (!sidebar.matches('[data-docs-nav]') && !document.querySelector('.sidebar-menu-button')) {
    const m = Object.assign(document.createElement('button'), { type: 'button', className: 'sidebar-menu-button' });
    m.innerHTML = icon('sidebar', 20); m.setAttribute('aria-controls', id);
    sidebar.before(m);
  }
}

const openMenu = (on) => { menuOpen = on; apply(); };

// Pages that build their sidebar with a script call initSidebar() after building it
let started = false;
function initSidebar() {
  if (!bar() || started) return;
  started = true;
  addParts(); apply();
  document.addEventListener('click', (e) => {
    const t = e.target;
    if (t.closest?.('.sidebar-toggle, [data-sidebar-toggle]')) {
      write(bar()?.classList.contains('collapsed') ? 'expanded' : 'collapsed');
      apply(); return;
    }
    if (t.closest?.('.sidebar-menu-button')) { openMenu(!menuOpen); return; }
    // The drawer closes when the person clicks outside it or chooses a place in it (the small footer buttons, such as theme and Aparência, keep it open)
    if (menuOpen && (!t.closest?.('.sidebar') || t.closest('.sidebar .nav-item:not(.small), .sidebar .account, .sidebar .app-logo'))) openMenu(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOpen) { openMenu(false); document.querySelector('.sidebar-menu-button')?.focus(); }
  });
  matchMedia('(max-width: 1100px)').addEventListener('change', () => { if (!read()) apply(); });
  matchMedia('(max-width: 760px)').addEventListener('change', apply);
  // Redrawn sidebar: only additions inside or of the sidebar, or a removed toggle, call for a new pass.
  // apply() changes attributes only, so it never triggers the observer again.
  const touches = (n) => n.nodeType === 1 && (n.matches('.sidebar, .sidebar-toggle, .sidebar-menu-button') || n.querySelector('.sidebar') || n.closest('.sidebar'));
  let queued = false;
  new MutationObserver((list) => {
    if (queued || !list.some((r) => [...r.addedNodes, ...r.removedNodes].some(touches) || r.target.closest?.('.sidebar'))) return;
    queued = true;
    queueMicrotask(() => { queued = false; addParts(); apply(); });
  }).observe(document.body, { childList: true, subtree: true });
}
// data-sidebar="manual" on the sidebar turns off the automatic start: the page calls initSidebar() (Grin.initSidebar() in dist/grin.js) when it is ready
// A sidebar drawn by a script after the page loads starts as soon as it appears.
const auto = () => {
  if (document.querySelector('[data-docs-nav], .sidebar[data-sidebar="manual"]')) return;
  if (bar()) { initSidebar(); return; }
  const wait = new MutationObserver(() => { if (!bar()) return; wait.disconnect(); if (!document.querySelector('.sidebar[data-sidebar="manual"]')) initSidebar(); });
  wait.observe(document.body, { childList: true, subtree: true });
};
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
// Every tool built with Grin has this panel on every screen, in the top bar or in the sidebar footer next to the theme button.
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
// Grin tour. startTour(steps, { onEnd }) → { end, go, target }
// Each step: { title, text, target, action, click, done }.
//   target: selector, function returning an element, or a list of them in order of preference; none = card in the center.
//   action: what the person does on the screen ("Clique em Empresas"). With it, the step can wait:
//   click: true waits for a click on the target, which goes on to the page; done: () => true when the task is done.
// A first step without target is the presentation: it is not counted and offers Começar and Agora não.
// The tour never changes the screen by itself. Outside the cut-out, clicks are held: the card shakes and says what to do.
// A target in the sidebar opens the sidebar drawer on a phone. On a narrow screen the card is a sheet at the bottom or top.
// The cut-out follows the page while the person works. Arrow keys move, Esc leaves, Tab stays in the card.
const { icon } = Grin;
function startTour(steps, { onEnd } = {}) {
  const intro = !steps[0]?.target && steps.length > 1;
  const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const drawer = () => matchMedia('(max-width: 760px)').matches; // the sidebar becomes a drawer, as in sidebar.js
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const visible = (el) => !!el && el.isConnected && el.getClientRects().length > 0 && el.getBoundingClientRect().width > 0;
  const list = (s) => (s.target == null ? [] : [].concat(s.target));
  const resolve = (t) => (typeof t === 'function' ? t() : document.querySelector(t));
  const find = (s) => { for (const t of list(s)) { const el = resolve(t); if (visible(el)) return el; } return null; };
  const inSidebar = (s) => list(s).some((t) => resolve(t)?.closest?.('.sidebar'));
  const sidebarOpen = () => document.body.classList.contains('sidebar-open');
  const toggleSidebar = (open) => { if (sidebarOpen() !== open) document.querySelector('.sidebar-menu-button')?.click(); };

  const root = document.createElement('div');
  root.className = 'tour';
  root.innerHTML = `${['top', 'right', 'bottom', 'left', 'hole'].map((k) => `<div class="tour-block" data-side="${k}"></div>`).join('')}<div class="tour-spot none"></div>
    <section class="tour-card" role="dialog" aria-modal="true" aria-labelledby="tour-title" aria-describedby="tour-text">
      <div class="tour-top"><span class="tour-count"></span><button type="button" class="btn icon xs ghost" data-tour="end" aria-label="Sair do tour">${icon('x', 16)}</button></div>
      <div class="progress sm" aria-hidden="true"><i></i></div>
      <h2 id="tour-title" tabindex="-1"></h2><p id="tour-text"></p>
      <p class="tour-action" hidden></p>
      <div class="tour-msg" aria-live="polite"><div><p></p></div></div>
      <div class="tour-actions"><button type="button" class="link" data-tour="skip"></button><span class="spacer"></span>
        <button type="button" class="btn xs" data-tour="prev">${icon('arrow-left', 16)}Voltar</button><button type="button" class="btn xs" data-tour="retry" hidden>Tentar de novo</button><button type="button" class="btn xs primary" data-tour="next"></button></div>
    </section>`;
  document.body.append(root);
  document.body.classList.add('tour-open');
  const $ = (s) => root.querySelector(s);
  const spot = $('.tour-spot'), card = $('.tour-card'), before = document.activeElement;
  const T = { i: 0, seq: 0, el: null, side: null, done: false, menu: false, timer: 0, msgTimer: 0, frame: 0 };
  const live = (seq) => T.seq === seq && root.isConnected;
  const waiting = () => { const s = steps[T.i]; return !!(s.click || s.done) && !!T.el && !T.done; };

  async function findLater(s, seq) {
    for (let t = 0; t < 3000; t += 80) { if (!live(seq)) return null; const el = find(s); if (el) return el; await wait(80); }
    return null;
  }
  // waits for scrolling and transitions to stop before cutting the target out
  async function settle(el, seq) {
    let last = '', same = 0;
    for (let t = 0; t < 900 && same < 3; t += 16) {
      if (!live(seq)) return;
      await new Promise((r) => requestAnimationFrame(r));
      const r = el.getBoundingClientRect(), k = [r.top, r.left, r.width, r.height].map(Math.round).join();
      same = k === last ? same + 1 : 0; last = k;
    }
  }
  function message(text, tone = 'info') {
    const m = $('.tour-msg'); clearTimeout(T.msgTimer);
    if (!text) { m.classList.remove('show'); return; }
    m.className = `tour-msg show ${tone}`;
    m.querySelector('p').innerHTML = icon(tone === 'crit' ? 'alert-triangle' : tone === 'ok' ? 'check' : 'info', 16);
    m.querySelector('p').append(Object.assign(document.createElement('span'), { textContent: text }));
    if (tone === 'info') T.msgTimer = setTimeout(() => m.classList.remove('show'), 3200);
  }
  function nudge() {
    card.classList.remove('nudge'); void card.offsetWidth; card.classList.add('nudge');
    const a = steps[T.i].action || '';
    message(waiting() ? `Para continuar, faça o que o quadro pede na área destacada: ${a.charAt(0).toLowerCase() + a.slice(1)}.`
      : 'Durante o tour, use Próximo e Voltar para navegar. Para explorar a tela livremente, pule o tour.');
  }

  function place() {
    const s = steps[T.i], vw = document.documentElement.clientWidth, vh = innerHeight, m = 16, pad = 8;
    if (T.el && !T.el.isConnected) T.el = find(s); // the page may have been redrawn
    const r = T.el ? T.el.getBoundingClientRect() : null;
    const f = r ? { x: r.left - pad, y: r.top - pad, w: r.width + 2 * pad, h: r.height + 2 * pad } : { x: vw / 2, y: vh / 2, w: 0, h: 0 };
    if (r) { const x2 = Math.min(vw - 4, f.x + f.w), y2 = Math.min(vh - 4, f.y + f.h); f.x = Math.max(4, f.x); f.y = Math.max(4, f.y); f.w = Math.max(0, x2 - f.x); f.h = Math.max(0, y2 - f.y); }
    spot.classList.toggle('none', !r);
    Object.assign(spot.style, { left: `${f.x}px`, top: `${f.y}px`, width: `${f.w}px`, height: `${f.h}px` });
    // four strips around the cut-out hold the clicks; the cut-out itself lets clicks through only while the step waits for an action
    const px = (k, x, y, w, h) => Object.assign($(`[data-side="${k}"]`).style, { left: `${x}px`, top: `${y}px`, width: `${Math.max(0, w)}px`, height: `${Math.max(0, h)}px` });
    px('top', 0, 0, vw, f.y); px('bottom', 0, f.y + f.h, vw, vh - f.y - f.h); px('left', 0, f.y, f.x, f.h); px('right', f.x + f.w, f.y, vw - f.x - f.w, f.h);
    if ((s.click || s.done) && r) px('hole', 0, 0, 0, 0); else px('hole', f.x, f.y, f.w, f.h);
    // card: below, above, right or left of the target, where it fits; on a narrow screen, a sheet at the bottom or top
    const sheet = vw < 600; card.classList.toggle('sheet', sheet);
    if (sheet) { card.style.left = `${m}px`; card.style.right = `${m}px`; } else card.style.right = 'auto';
    const cw = card.offsetWidth, ch = card.offsetHeight, clamp = (v, a, b) => Math.min(Math.max(v, a), Math.max(a, b));
    let x, y;
    if (sheet) { if (!T.side) T.side = r && f.y + f.h / 2 > vh / 2 ? 'top' : 'bottom'; x = m; y = T.side === 'top' ? m : vh - ch - m; } // the side stays fixed for the step
    else if (!r) { x = (vw - cw) / 2; y = (vh - ch) / 2; }
    else if (vh - (f.y + f.h) >= ch + 2 * m) { x = clamp(f.x + f.w / 2 - cw / 2, m, vw - cw - m); y = f.y + f.h + 14; }
    else if (f.y >= ch + 2 * m) { x = clamp(f.x + f.w / 2 - cw / 2, m, vw - cw - m); y = f.y - ch - 14; }
    else if (vw - (f.x + f.w) >= cw + 2 * m) { x = f.x + f.w + 14; y = clamp(f.y + f.h / 2 - ch / 2, m, vh - ch - m); }
    else if (f.x >= cw + 2 * m) { x = f.x - cw - 14; y = clamp(f.y + f.h / 2 - ch / 2, m, vh - ch - m); }
    else { x = vw - cw - m; y = vh - ch - m; }
    card.style.left = `${x}px`; card.style.top = `${y}px`;
  }
  function replace() { cancelAnimationFrame(T.frame); T.frame = requestAnimationFrame(place); }
  // the sheet covers part of a phone screen: scroll so the target sits in the space left
  async function clear(el, seq) {
    if (!card.classList.contains('sheet')) return false;
    const r = el.getBoundingClientRect(), top = parseFloat(card.style.top) || 0, m = 16;
    const d = T.side === 'top' ? Math.min(0, r.top - (top + card.offsetHeight + m)) : Math.max(0, r.bottom - (top - m));
    if (Math.abs(d) < 2) return false;
    scrollBy({ top: d, behavior: reduce() ? 'auto' : 'smooth' });
    await settle(el, seq);
    return live(seq);
  }

  async function show(i) {
    if (i < 0 || i >= steps.length || !root.isConnected) return;
    const s = steps[i], seq = ++T.seq;
    T.i = i; T.el = null; T.side = null; clearInterval(T.timer);
    card.classList.add('swap'); message('');
    if (drawer()) { const want = inSidebar(s); if (want || T.menu) { toggleSidebar(want); T.menu = want; } }
    const el = s.target ? await findLater(s, seq) : null;
    if (!live(seq)) return;
    if (el) { el.scrollIntoView({ block: 'center', inline: 'nearest', behavior: reduce() ? 'auto' : 'smooth' }); await settle(el, seq); if (!live(seq)) return; }
    T.el = el; T.done = !!(s.done && s.done());
    const n = steps.length - (intro ? 1 : 0), k = i + (intro ? 0 : 1), last = i === steps.length - 1, failed = !!s.target && !el;
    $('.tour-count').textContent = intro && i === 0 ? 'Tour guiado' : `Passo ${k} de ${n}`;
    $('.progress i').style.width = `${(intro ? i / (steps.length - 1) : k / n) * 100}%`;
    $('#tour-title').textContent = s.title; $('#tour-text').textContent = s.text || '';
    const ac = $('.tour-action'); ac.hidden = !(s.action && el); ac.innerHTML = s.action ? icon('pointer', 16) : ''; if (s.action) ac.append(s.action);
    // Voltar only when the previous step is on the screen now: the tour does not undo what the person navigated
    $('[data-tour="prev"]').hidden = i === 0 || (!!steps[i - 1].target && !find(steps[i - 1]));
    $('[data-tour="retry"]').hidden = !failed;
    const next = $('[data-tour="next"]');
    next.innerHTML = intro && i === 0 ? `Começar${icon('arrow-right', 16)}` : last ? `${icon('check', 16)}Concluir` : `Próximo${icon('arrow-right', 16)}`;
    next.classList.toggle('waiting', waiting());
    $('[data-tour="skip"]').textContent = intro && i === 0 ? 'Agora não' : 'Pular tour';
    if (failed) message('Não foi possível mostrar esta parte agora. Clique em Tentar de novo ou siga para o próximo passo.', 'crit');
    spot.classList.toggle('pulse', waiting());
    place();
    if (el && await clear(el, seq)) place();
    if (!live(seq)) return;
    // the screen changes while the person works: the cut-out follows it, and a task is checked until it is done
    T.timer = setInterval(() => {
      if (!live(seq)) return;
      replace();
      if (s.done && !T.done && s.done()) finish(seq);
    }, 250);
    requestAnimationFrame(() => {
      if (!live(seq)) return;
      card.classList.remove('swap');
      // in a task, the cursor goes to the first empty field of the highlighted area
      const fields = s.done && el && !T.done ? [...el.querySelectorAll('input:not([type="hidden"]), select, textarea')] : [];
      (fields.find((x) => !x.value) || fields[0] || $('#tour-title')).focus({ preventScroll: true });
    });
  }
  function finish(seq) {
    T.done = true;
    spot.classList.remove('pulse'); $('[data-tour="next"]').classList.remove('waiting');
    message('Isso mesmo. Seguindo para o próximo passo…', 'ok');
    setTimeout(() => { if (live(seq)) show(T.i + 1); }, reduce() ? 600 : 1100);
  }
  function next() { if (T.i >= steps.length - 1) return end(); if (waiting()) return nudge(); show(T.i + 1); }

  function end() {
    if (!root.isConnected || root.classList.contains('leaving')) return;
    T.seq++; clearInterval(T.timer); clearTimeout(T.msgTimer);
    document.removeEventListener('click', onClick, true); document.removeEventListener('keydown', keys, true);
    removeEventListener('resize', replace); removeEventListener('scroll', replace, true);
    if (T.menu) toggleSidebar(false);
    root.classList.add('leaving'); root.classList.remove('show'); document.body.classList.remove('tour-open');
    setTimeout(() => root.remove(), reduce() ? 0 : 220);
    (before?.isConnected ? before : document.body).focus?.({ preventScroll: true });
    onEnd?.();
  }
  // on a click step, the click on the target goes on to the page and moves the tour forward
  function onClick(e) {
    const s = steps[T.i];
    if (!s.click || !T.el || !T.el.contains(e.target)) return;
    const seq = T.seq; setTimeout(() => { if (live(seq)) show(T.i + 1); }, 0);
  }
  function keys(e) {
    if (document.querySelector('dialog[open]:modal, .dialog[open]')) return; // a dialog the person opened keeps its keys
    const s = steps[T.i], field = /INPUT|TEXTAREA|SELECT/.test(e.target.tagName);
    // a menu the person opened closes with Esc before the tour does
    if (e.key === 'Escape' && document.querySelector('[aria-haspopup][aria-expanded="true"], [data-popover][aria-expanded="true"]')) return;
    if (T.el?.contains(e.target) && s.done && e.key !== 'Escape') return; // in a task, the keyboard belongs to the person inside the target
    if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); return end(); }
    if (e.key === 'ArrowRight' && !field) { e.preventDefault(); return next(); }
    if (e.key === 'ArrowLeft' && !field && T.i > 0 && !$('[data-tour="prev"]').hidden) { e.preventDefault(); return show(T.i - 1); }
    if (e.key === 'Tab') {
      const fs = [...card.querySelectorAll('button:not([hidden])')].filter((x) => x.offsetParent !== null);
      const at = fs.indexOf(document.activeElement);
      if (!card.contains(e.target) || (e.shiftKey && at <= 0) || (!e.shiftKey && at === fs.length - 1)) { e.preventDefault(); fs[e.shiftKey ? fs.length - 1 : 0]?.focus(); }
    }
  }
  root.addEventListener('click', (e) => {
    const b = e.target.closest?.('[data-tour]');
    if (b) { e.stopPropagation(); ({ end, skip: end, prev: () => show(T.i - 1), next, retry: () => show(T.i) })[b.dataset.tour](); return; }
    if (e.target.classList.contains('tour-block')) { e.stopPropagation(); nudge(); }
  });
  document.addEventListener('click', onClick, true); document.addEventListener('keydown', keys, true);
  addEventListener('resize', replace); addEventListener('scroll', replace, true);
  root.getBoundingClientRect(); // commit the hidden state so the fade-in runs
  root.classList.add('show'); show(0);
  return { end, go: (i) => show(i), target: () => T.el };
}
Object.assign(Grin, { startTour });
}

// Ícones: troca <i data-icon> pelos desenhos quando a página termina de carregar
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => Grin.paintIcons(), { once: true }); else Grin.paintIcons();
