// Checks that the HTML only uses what exists: every class used in pages, examples and component samples
// is defined in some CSS file, and every <i data-icon="…"> / icon('…') name exists in scripts/utils.js.
// Run from the project root: node tools/check-markup.mjs   (exits with code 1 on problems)
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const walk = (dir) => readdirSync(dir).flatMap((f) => {
  const p = join(dir, f);
  if (f.startsWith('.') || f === 'node_modules') return [];
  return statSync(p).isDirectory() ? walk(p) : [p];
});
const files = walk('.');
// Global CSS files, plus each page's own <style> blocks (only for that page)
const css = files.filter((f) => extname(f) === '.css').map((f) => readFileSync(f, 'utf8')).join('\n');
const classesIn = (text) => new Set([...text.matchAll(/\.([a-zA-Z][\w-]*)/g)].map((m) => m[1]));
const defined = classesIn(css);
const stripComments = (src) => src.replace(/<!--[\s\S]*?-->/g, '').replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
globalThis.document = undefined;
const { ICONS } = await import('../scripts/utils.js');

const markup = files.filter((f) => ['.html', '.js'].includes(extname(f)) && !f.startsWith('tools'));
const problems = [];
for (const f of markup) {
  const raw = readFileSync(f, 'utf8');
  const local = classesIn([...raw.matchAll(/<style>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n'));
  const src = stripComments(raw);
  for (const m of src.matchAll(/class="([^"$`{}]*)"/g)) {
    for (const c of m[1].split(/\s+/).filter(Boolean)) if (!defined.has(c) && !local.has(c)) problems.push(`${f}: class "${c}" is not defined in any CSS`);
  }
  for (const m of src.matchAll(/data-icon="([^"]+)"/g)) if (!ICONS[m[1]]) problems.push(`${f}: icon "${m[1]}" does not exist`);
  for (const m of src.matchAll(/icon\('([\w-]+)'/g)) if (!ICONS[m[1]]) problems.push(`${f}: icon "${m[1]}" does not exist`);
}
console.log(problems.length ? [...new Set(problems)].join('\n') : `OK: ${markup.length} files, every class and icon exists.`);
process.exit(problems.length ? 1 : 0);
