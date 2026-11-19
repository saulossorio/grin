// Gera styles/variables.css a partir de tokens/. Rode: node tools/build-tokens.mjs
// Os tokens em JSON são a fonte de verdade; variables.css nunca se edita à mão.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const ler = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));
const core = { ...ler('tokens/core/colors.json'), ...ler('tokens/core/spacing.json'), ...ler('tokens/core/typography.json') };
const semantic = ler('tokens/semantic/colors.json');
const temas = { dark: ler('tokens/themes/dark.json'), hc: ler('tokens/themes/high-contrast.json') };

const busca = (caminho) => {
  const v = caminho.split('.').reduce((o, k) => (o ? o[k] : undefined), core);
  if (!v || v.$value === undefined) throw new Error(`Token inexistente: {${caminho}}`);
  return v.$value;
};
const resolver = (v) => String(v).replace(/\{([^}]+)\}/g, (_, c) => resolver(busca(c)));
const folhas = (obj, prefixo) => Object.entries(obj)
  .filter(([k]) => !k.startsWith('$'))
  .flatMap(([k, v]) => (v && typeof v === 'object' && !('$value' in v) ? folhas(v, `${prefixo}-${k}`) : [[`${prefixo}-${k}`, v.$value]]));

const cores = Object.entries(semantic).filter(([k]) => !k.startsWith('$'));
const bloco = (sobre) => cores.map(([k, v]) => `  --${k}: ${resolver(sobre?.[k] ?? v.$value)};`).join('\n');
for (const [nome, t] of Object.entries(temas)) for (const k of Object.keys(t)) if (!k.startsWith('$') && !semantic[k]) throw new Error(`Tema ${nome}: token ${k} não existe em semantic`);

const fixos = [
  ...folhas(core.space, '--space'), ...folhas(core.radius, '--radius'), ...folhas(core.size, '--size'),
  ['--font-sans', core.font.family.sans.$value], ['--font-mono', core.font.family.mono.$value],
  ...folhas(core.font.size, '--text'), ...folhas(core.font.weight, '--weight'), ...folhas(core.font.tracking, '--tracking'),
  ...folhas(core.font['line-height'], '--leading'),
  ['--dur', core.motion.duration.base.$value], ['--dur-slow', core.motion.duration.slow.$value], ['--ease', core.motion.easing.out.$value],
  ['--control-h', 'var(--size-control-compact)'], ['--control-text', 'var(--text-md)'],
].map(([k, v]) => `  ${k}: ${v};`).join('\n');

const css = `/* Canis Design System: variáveis geradas por tools/build-tokens.mjs a partir de tokens/. Não edite à mão. */

/* Tema claro (padrão) e tokens que não mudam com o tema */
:root {
  color-scheme: light;
${fixos}
${bloco()}
}

/* Densidade confortável (Vezen): controles de 40 px e texto de 15 px */
:root[data-density="comfortable"] { --control-h: var(--size-control-comfortable); --control-text: 0.9375rem; }

/* Tema escuro: escolhido pela pessoa ou pelo sistema (quando não há escolha) */
:root[data-theme="dark"] {
  color-scheme: dark;
${bloco(temas.dark)}
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    color-scheme: dark;
${bloco(temas.dark).replace(/^/gm, '  ')}
  }
}

/* Alto contraste: escolhido pela pessoa ou pedido pelo sistema */
:root[data-theme="hc"] {
  color-scheme: light;
${bloco(temas.hc)}
}
@media (prefers-contrast: more) {
  :root:not([data-theme]) {
    color-scheme: light;
${bloco(temas.hc).replace(/^/gm, '  ')}
  }
}
`;
writeFileSync(join(root, 'styles/variables.css'), css);
console.log(`styles/variables.css: ${cores.length} cores semânticas, 3 temas`);
