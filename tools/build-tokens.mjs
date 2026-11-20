// Gera styles/variables.css a partir de tokens/. Rode na raiz do projeto: node tools/build-tokens.mjs
// Os JSON em tokens/ são a fonte de verdade; variables.css é gerado e nunca se edita à mão.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));
const core = { ...read('tokens/core/colors.json'), ...read('tokens/core/spacing.json'), ...read('tokens/core/typography.json') };
const semantic = read('tokens/semantic/colors.json');
const themes = { dark: read('tokens/themes/dark.json'), hc: read('tokens/themes/high-contrast.json') };

// {color.gray.11} -> valor do token core
const lookup = (path) => {
  const node = path.split('.').reduce((o, k) => (o ? o[k] : undefined), core);
  if (!node || node.$value === undefined) throw new Error(`Token inexistente: {${path}}`);
  return node.$value;
};
const resolve = (v) => String(v).replace(/\{([^}]+)\}/g, (_, p) => resolve(lookup(p)));
const leaves = (obj, prefix) => Object.entries(obj)
  .filter(([k]) => !k.startsWith('$'))
  .flatMap(([k, v]) => (v && typeof v === 'object' && !('$value' in v) ? leaves(v, `${prefix}-${k}`) : [[`${prefix}-${k}`, v.$value]]));

const names = Object.keys(semantic).filter((k) => !k.startsWith('$'));
for (const [theme, t] of Object.entries(themes)) {
  for (const k of Object.keys(t)) if (!k.startsWith('$') && !semantic[k]) throw new Error(`Tema ${theme}: "${k}" não existe em tokens/semantic/colors.json`);
  for (const k of names) if (!(k in t)) throw new Error(`Tema ${theme}: falta "${k}"`);
}
const block = (override, indent = '  ') => names.map((k) => `${indent}--${k}: ${resolve(override?.[k] ?? semantic[k].$value)};`).join('\n');

const fixed = [
  ...leaves(core.space, '--space'), ...leaves(core.radius, '--radius'), ...leaves(core.size, '--size'),
  ['--font-sans', core.font.family.sans.$value], ['--font-mono', core.font.family.mono.$value],
  ...leaves(core.font.size, '--text'), ...leaves(core.font.weight, '--weight'), ...leaves(core.font.tracking, '--tracking'),
  ...leaves(core.font['line-height'], '--leading'),
  ['--dur-fast', core.motion.duration.fast.$value], ['--dur', core.motion.duration.base.$value], ['--dur-slow', core.motion.duration.slow.$value],
  ['--ease', core.motion.easing.out.$value], ['--ease-in-out', core.motion.easing['in-out'].$value],
  ['--control-h', 'var(--size-control-compact)'], ['--control-text', 'var(--text-sm)'],
].map(([k, v]) => `  ${k}: ${v};`).join('\n');

const css = `/* Grin: variáveis geradas por tools/build-tokens.mjs a partir de tokens/. Não edite à mão. */

/* Tema claro (padrão) e tokens que não mudam com o tema */
:root {
  color-scheme: light;
${fixed}
${block()}
}

/* Densidade. Vale na raiz ou numa seção (data-density em qualquer elemento). Compacta: 32 px e texto de 14 px; confortável: 40 px e 16 px */
:root[data-density="comfortable"], [data-density="comfortable"] { --control-h: var(--size-control-comfortable); --control-text: var(--text-base); }
[data-density="compact"] { --control-h: var(--size-control-compact); --control-text: var(--text-sm); }

/* Tema claro numa seção, dentro de uma página escura */
[data-theme="light"]:not(:root) {
  color-scheme: light;
${block()}
}

/* Tema escuro: escolhido pela pessoa, pelo sistema quando não há escolha, ou numa seção */
:root[data-theme="dark"], [data-theme="dark"] {
  color-scheme: dark;
${block(themes.dark)}
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    color-scheme: dark;
${block(themes.dark, '    ')}
  }
}

/* Alto contraste: escolhido pela pessoa, pedido pelo sistema, ou numa seção */
:root[data-theme="hc"], [data-theme="hc"] {
  color-scheme: light;
${block(themes.hc)}
}
@media (prefers-contrast: more) {
  :root:not([data-theme]) {
    color-scheme: light;
${block(themes.hc, '    ')}
  }
}
`;
writeFileSync(join(root, 'styles/variables.css'), css);
console.log(`styles/variables.css: ${names.length} tokens semânticos em 3 temas`);
