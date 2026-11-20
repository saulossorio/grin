// Grin documentation shell: sidebar, top bar with theme / density / font controls, icons and code samples.
// Only for the documentation pages. Markup: <nav class="sidebar" data-docs-nav data-base="../" data-here="foundations"></nav>
// and <header class="topbar" data-docs-top data-title="Fundamentos"></header>.
import { icon, paintIcons } from './utils.js';
import { sync } from './theme.js';

const PAGES = [
  { heading: null, items: [['index', 'index.html', 'Início', 'book'], ['start', 'docs/getting-started.html', 'Começar', 'play']] },
  { heading: 'Guia', items: [
    ['foundations', 'docs/foundations.html', 'Fundamentos', 'palette'],
    ['components', 'docs/components.html', 'Componentes', 'layout-grid'],
    ['patterns', 'docs/patterns.html', 'Padrões', 'workflow'],
    ['accessibility', 'docs/accessibility.html', 'Acessibilidade', 'accessibility'],
  ] },
  { heading: 'Exemplos', items: [
    ['ex-dashboard', 'examples/dashboard.html', 'Lista de dados', 'table'],
    ['ex-form', 'examples/form.html', 'Formulário', 'pencil'],
    ['ex-landing', 'examples/landing.html', 'Página de apresentação', 'monitor'],
  ] },
];
// Grin mark: an equilateral triangle, 2/3 of the cap height of the word (Geist cap height = 0.71em), sitting on the baseline
export const GRIN_MARK = '<svg class="grin-mark" viewBox="0 0 100 86.6025" aria-hidden="true" focusable="false"><path d="M0 86.6025 50 0 100 86.6025Z"/></svg>';
export const VERSION = '1.1.1';

function buildNav(nav) {
  const base = nav.dataset.base ?? '';
  const here = nav.dataset.here;
  nav.setAttribute('aria-label', 'Navegação da documentação');
  nav.id = 'docs-nav';
  nav.innerHTML = `<a class="app-logo grin-logo" href="${base}index.html">${GRIN_MARK}<span>Grin</span><span class="tag">${VERSION}</span></a>`
    + PAGES.map(({ heading, items }) => (heading ? `<div class="nav-heading">${heading}</div>` : '') + items.map(([id, href, label, ic]) =>
      `<a class="nav-item" href="${base}${href}"${id === here ? ' aria-current="page"' : ''}>${icon(ic)}<span class="label">${label}</span></a>`).join('')).join('')
    + `<div class="sidebar-footer"><a class="nav-item small" href="https://github.com/saulossorio/grin">${icon('external-link')}<span class="label">Repositório</span></a>`
    + `<button type="button" class="nav-item small" data-theme-toggle>${icon('contrast')}<span class="label">Tema escuro</span></button></div>`;
}

function buildTop(top) {
  top.innerHTML = `<button type="button" class="btn icon ghost docs-menu-button" id="docs-menu-button" aria-expanded="false" aria-controls="docs-nav" aria-label="Abrir navegação">${icon('sidebar')}</button><span class="docs-crumb">${top.dataset.title ?? ''}</span><span class="spacer"></span><div class="docs-controls">
    <label class="sr-only" for="docs-theme">Tema</label>
    <select class="select" id="docs-theme" data-theme-select><option value="system">Tema do sistema</option><option value="light">Claro</option><option value="dark">Escuro</option><option value="hc">Alto contraste</option></select>
    <div class="segmented" role="radiogroup" aria-label="Densidade">
      <label><input type="radio" name="docs-density" value="compact" data-set-density><span>Compacta</span></label>
      <label><input type="radio" name="docs-density" value="comfortable" data-set-density><span>Confortável</span></label>
    </div>
    <div class="segmented" role="radiogroup" aria-label="Tamanho da fonte">
      <label><input type="radio" name="docs-scale" value="100" data-set-scale><span aria-label="100%">A</span></label>
      <label><input type="radio" name="docs-scale" value="112" data-set-scale><span aria-label="112,5%" style="font-size:1.07em">A</span></label>
      <label><input type="radio" name="docs-scale" value="125" data-set-scale><span aria-label="125%" style="font-size:1.15em">A</span></label>
    </div></div>`;
}

/* Every .demo[data-code] gets a "Ver código" panel with its own HTML and a copy button. */
const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function dedent(html) {
  const lines = html.replace(/^\n+|\s+$/g, '').split('\n');
  const min = Math.min(...lines.filter((l) => l.trim()).map((l) => l.match(/^\s*/)[0].length));
  return lines.map((l) => l.slice(min)).join('\n');
}
export function showCode(root = document) {
  root.querySelectorAll('.demo[data-code]').forEach((demo) => {
    const stage = demo.querySelector('.demo-stage') ?? demo;
    const box = document.createElement('details');
    box.className = 'demo-code';
    box.innerHTML = `<summary>Ver código</summary><div class="demo-code-body"><button type="button" class="btn xs copy-code">${icon('copy', 14)}<span>Copiar</span></button><pre><code>${escapeHtml(dedent(stage.innerHTML))}</code></pre></div>`;
    demo.append(box);
  });
}
document.addEventListener('click', async (e) => {
  const b = e.target.closest('.copy-code');
  if (!b) return;
  const code = b.parentElement.querySelector('code');
  const label = b.querySelector('span');
  try { await navigator.clipboard.writeText(code.textContent); label.textContent = 'Copiado'; }
  catch { const r = document.createRange(); r.selectNodeContents(code); getSelection().removeAllRanges(); getSelection().addRange(r); label.textContent = 'Selecionado'; }
  setTimeout(() => { label.textContent = 'Copiar'; }, 1600);
});

// Phones: the sidebar becomes a drawer opened from the top bar
function toggleNav(open) {
  const nav = document.getElementById('docs-nav'), button = document.getElementById('docs-menu-button');
  if (!nav || !button) return;
  nav.classList.toggle('open', open);
  document.body.classList.toggle('docs-nav-open', open);
  button.setAttribute('aria-expanded', String(open));
  button.setAttribute('aria-label', open ? 'Fechar navegação' : 'Abrir navegação');
}
document.addEventListener('click', (e) => {
  if (e.target.closest('#docs-menu-button')) toggleNav(!document.getElementById('docs-nav').classList.contains('open'));
  else if (document.body.classList.contains('docs-nav-open') && !e.target.closest('#docs-nav')) toggleNav(false);
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && document.body.classList.contains('docs-nav-open')) { toggleNav(false); document.getElementById('docs-menu-button')?.focus(); } });

function init() {
  // Code panels read the markup before icons are painted, so samples show <i data-icon> and not raw SVG
  showCode();
  const nav = document.querySelector('[data-docs-nav]'); if (nav) buildNav(nav);
  const top = document.querySelector('[data-docs-top]'); if (top) buildTop(top);
  paintIcons();
  sync();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true }); else init();
