// Checks the color pairs that matter, in all four themes (light, dark and the high-contrast version of each). Run from the project root: node tools/check-contrast.mjs
// Text: 4.5:1 in light and dark, 7:1 in high contrast. UI parts (field border, focus ring, chart lines): 3:1.
// Exits with code 1 when any pair falls short, so it can gate a commit.
import { readFileSync } from 'node:fs';
const { contrast } = await import('../scripts/utils.js');
const css = readFileSync(new URL('../styles/variables.css', import.meta.url), 'utf8');
const block = (selector) => {
  const i = css.indexOf(`${selector} {`);
  const body = css.slice(i, css.indexOf('}', i));
  return Object.fromEntries([...body.matchAll(/--([\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
};
const light = block(':root');
const dark = { ...light, ...block(':root[data-theme="dark"], [data-theme="dark"]') };
const themes = {
  light, dark,
  'high contrast, light': { ...light, ...block(':root[data-contrast="more"]:not([data-theme="dark"]), [data-contrast="more"]:not([data-theme="dark"])') },
  'high contrast, dark': { ...dark, ...block(':root[data-theme="dark"][data-contrast="more"], [data-theme="dark"][data-contrast="more"]') },
};
const TEXT = [
  ['foreground', 'background'], ['foreground', 'surface'], ['foreground', 'popover'], ['foreground', 'sidebar'], ['foreground', 'muted'],
  ['muted-foreground', 'background'], ['muted-foreground', 'surface'], ['muted-foreground', 'muted'], ['muted-foreground', 'table-head'],
  ['sidebar-foreground', 'sidebar'], ['foreground', 'sidebar-active'], ['link', 'sidebar-active'], ['primary-foreground', 'primary'], ['primary-foreground', 'primary-hover'],
  ['link', 'background'], ['link', 'surface'], ['brand-fg', 'brand-bg'], ['foreground', 'row-selected'], ['foreground', 'row-hover'], ['foreground', 'highlight'],
  ['crit-fg', 'crit-bg'], ['crit-fg', 'background'], ['crit-on', 'crit-solid'], ['warn-fg', 'warn-bg'], ['warn-fg', 'background'],
  ['info-fg', 'info-bg'], ['ok-fg', 'ok-bg'], ['ok-fg', 'background'],
];
const UI = [['input', 'background'], ['input', 'field'], ['ring', 'background'], ['ring', 'surface'], ['chart-1', 'background'], ['chart-2', 'background'], ['crit-fg', 'crit-bg']];
let failures = 0;
for (const [name, t] of Object.entries(themes)) {
  const minText = name.startsWith('high contrast') ? 7 : 4.5;
  const lines = [];
  for (const [pairs, min] of [[TEXT, minText], [UI, 3]]) {
    for (const [a, b] of pairs) {
      const r = contrast(t[a], t[b]);
      const ok = r !== null && r >= min;
      if (!ok) failures++;
      lines.push(`${ok ? '  ok ' : 'FAIL '} ${(r ?? 0).toFixed(2).padStart(5)}:1  ${a} on ${b} (min ${min})`);
    }
  }
  console.log(`\n${name}\n${lines.join('\n')}`);
}
console.log(failures ? `\n${failures} pair(s) below the minimum.` : '\nAll pairs pass.');
process.exit(failures ? 1 : 0);
