// Gera em dist/ o Grin em poucos arquivos, para copiar para outro projeto. Rode na raiz: node tools/bundle.mjs
//   dist/grin.css         todo o CSS (fontes, tokens, base e componentes) num arquivo; as fontes ficam em dist/fonts/
//   dist/grin.inline.css  o mesmo CSS com as fontes dentro do arquivo, para ferramentas de um único HTML
//   dist/grin.js          todos os comportamentos num script comum (sem import), com as funções em window.Grin
//   dist/fonts/           Geist, Geist Mono e a licença OFL
// Os arquivos em dist/ são gerados; nunca edite à mão. Rode de novo depois de mudar CSS, JS ou tokens.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');
const version = read('scripts/docs-shell.js').match(/VERSION = '([^']+)'/)[1];
const header = (what) => `/* Grin ${version} · ${what} · https://github.com/saulossorio/grin\n   Gerado por tools/bundle.mjs a partir dos arquivos do repositório. Não edite à mão. */\n`;
mkdirSync(join(root, 'dist/fonts'), { recursive: true });

// ---------- CSS: fonts + variables + global + every component, in the order of styles/components.css ----------
const imports = [...read('styles/components.css').matchAll(/@import url\('\.\.\/(components\/[^']+)'\);/g)].map((m) => m[1]);
const parts = [['styles/fonts.css'], ['styles/variables.css'], ['styles/global.css'], ...imports.map((p) => [p])];
const body = parts.map(([p]) => `/* ---------- ${p} ---------- */\n${read(p).trim()}\n`).join('\n');
const fonts = ['geist.woff2', 'geist-mono.woff2'];
for (const f of [...fonts, 'OFL.txt']) copyFileSync(join(root, 'assets/fonts', f), join(root, 'dist/fonts', f));
writeFileSync(join(root, 'dist/grin.css'), header('CSS; fontes em fonts/') + body.replace(/url\('\.\.\/assets\/fonts\//g, "url('fonts/"));
let inline = body;
for (const f of fonts) {
  const b64 = readFileSync(join(root, 'assets/fonts', f)).toString('base64');
  inline = inline.replace(`url('../assets/fonts/${f}')`, `url('data:font/woff2;base64,${b64}')`);
}
writeFileSync(join(root, 'dist/grin.inline.css'), header('CSS com as fontes dentro (Geist e Geist Mono, licença SIL OFL 1.1)') + inline);

// ---------- JS: each module in its own block, imports read from window.Grin, exports written to it ----------
const MODULES = [
  'scripts/utils.js', 'scripts/theme.js', 'scripts/animations.js',
  'components/popover/popover.js', 'components/slider/slider.js', 'components/sidebar/sidebar.js',
  'components/dialog/dialog.js', 'components/tabs/tabs.js', 'components/toast/toast.js', 'components/accordion/accordion.js',
  'components/combobox/combobox.js', 'components/dropzone/dropzone.js', 'components/glossary/glossary.js',
  'components/toc/toc.js', 'components/tour/tour.js',
];
const blocks = MODULES.map((p) => {
  const exported = [];
  const src = read(p)
    .replace(/^import\s+'[^']+';\s*$/gm, '')
    .replace(/^import\s*\{([^}]+)\}\s*from\s*'[^']+';\s*$/gm, (_, names) => `const {${names}} = Grin;`)
    .replace(/^export\s+(const|function)\s+([A-Za-z_$][\w$]*)/gm, (_, kind, name) => { exported.push(name); return `${kind} ${name}`; });
  if (/^\s*(import|export)\b/m.test(src)) throw new Error(`${p}: import ou export que o empacotador não entende`);
  return `// ---------- ${p} ----------\n{\n${src.trim()}\n${exported.length ? `Object.assign(Grin, { ${exported.join(', ')} });\n` : ''}}\n`;
});
const js = header('comportamentos em JavaScript; inclua com <script src="grin.js" defer>')
  + "'use strict';\nconst Grin = (window.Grin = window.Grin || {});\nGrin.version = '" + version + "';\n\n"
  + blocks.join('\n')
  + "\n// Ícones: troca <i data-icon> pelos desenhos quando a página termina de carregar\n"
  + "if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => Grin.paintIcons(), { once: true }); else Grin.paintIcons();\n";
writeFileSync(join(root, 'dist/grin.js'), js);
console.log(`dist/: grin.css, grin.inline.css, grin.js e fonts/ (Grin ${version}, ${MODULES.length} módulos)`);
