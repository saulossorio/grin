// Confere o contraste dos pares que importam, nos três temas. Rode: node tools/check-contrast.mjs
// Texto: 4,5:1 (claro e escuro) e 7:1 (alto contraste). Elementos de interface (borda de campo, foco, ícone): 3:1.
import { readFileSync } from 'node:fs';
globalThis.document = { addEventListener() {} };
const { contraste } = await import('../scripts/utils.js');
const css = readFileSync(new URL('../styles/variables.css', import.meta.url), 'utf8');
const bloco = (sel) => {
  const i = css.indexOf(sel + ' {');
  const corpo = css.slice(i, css.indexOf('}', i));
  return Object.fromEntries([...corpo.matchAll(/--([\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
};
const claro = bloco(':root');
const temas = { claro, escuro: { ...claro, ...bloco(':root[data-theme="dark"]') }, 'alto contraste': { ...claro, ...bloco(':root[data-theme="hc"]') } };
const texto = [['foreground', 'background'], ['foreground', 'surface'], ['foreground', 'popover'], ['muted-foreground', 'background'], ['muted-foreground', 'muted'],
  ['muted-foreground', 'table-head'], ['sidebar-foreground', 'sidebar'], ['foreground', 'sidebar-active'], ['primary-foreground', 'primary'], ['link', 'background'],
  ['brand-fg', 'brand-bg'], ['crit-fg', 'crit-bg'], ['crit-fg', 'background'], ['crit-on', 'crit-solid'], ['warn-fg', 'warn-bg'], ['info-fg', 'info-bg'], ['ok-fg', 'ok-bg'],
  ['foreground', 'row-selected'], ['foreground', 'row-hover'], ['foreground', 'highlight']];
const ui = [['input', 'background'], ['input', 'field'], ['ring', 'background'], ['chart-1', 'background'], ['chart-2', 'background']];
let falhas = 0;
for (const [nome, t] of Object.entries(temas)) {
  const minTexto = nome === 'alto contraste' ? 7 : 4.5;
  const linhas = [];
  for (const [lista, min] of [[texto, minTexto], [ui, 3]]) for (const [a, b] of lista) {
    const r = contraste(t[a], t[b]);
    const ok = r !== null && r >= min;
    if (!ok) falhas++;
    linhas.push(`${ok ? '  ok ' : 'FALHA'} ${(r ?? 0).toFixed(2).padStart(5)}:1  ${a} sobre ${b} (mín. ${min})`);
  }
  console.log(`\n${nome}\n${linhas.join('\n')}`);
}
console.log(falhas ? `\n${falhas} par(es) abaixo do mínimo.` : '\nTodos os pares passam.');
process.exit(falhas ? 1 : 0);
