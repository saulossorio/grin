// Grin documentation shell: sidebar, top bar with theme / density / font controls, icons and code samples.
// Only for the documentation pages. Markup: <nav class="sidebar" data-docs-nav data-base="../" data-here="foundations"></nav>
// and <header class="topbar" data-docs-top data-title="Fundamentos"></header>.
import { icon, paintIcons } from './utils.js';
import { sync } from './theme.js';
import '../components/popover/popover.js';
import '../components/slider/slider.js';
import { initSidebar } from '../components/sidebar/sidebar.js';

const PAGES = [
  { heading: null, items: [['index', 'index.html', 'Início', 'book'], ['install', 'docs/installation.html', 'Instalação', 'download']] },
  { heading: 'Guia', items: [
    ['foundations', 'docs/foundations.html', 'Fundamentos', 'palette'],
    ['components', 'docs/components.html', 'Componentes', 'layout-grid'],
    ['patterns', 'docs/patterns.html', 'Padrões', 'workflow'],
    ['accessibility', 'docs/accessibility.html', 'Acessibilidade', 'accessibility'],
  ] },
  { heading: 'Exemplos', items: [
    ['ex-dashboard', 'examples/dashboard.html', 'Lista de dados', 'table'],
    ['ex-form', 'examples/form.html', 'Formulário', 'pencil'],
    ['ex-tutorial', 'examples/tutorial.html', 'Tutorial', 'book-open'],
    ['ex-landing', 'examples/landing.html', 'Apresentação', 'monitor'],
  ] },
];
// Grin mark: an equilateral triangle, 2/3 of the cap height of the word (Geist cap height = 0.71em), sitting on the baseline
export const GRIN_MARK = '<svg class="app-logo-mark" viewBox="0 0 100 86.6025" aria-hidden="true" focusable="false"><path d="M0 86.6025 50 0 100 86.6025Z"/></svg>';
export const VERSION = '2.20';

function buildNav(nav) {
  const base = nav.dataset.base ?? '';
  const here = nav.dataset.here;
  nav.setAttribute('aria-label', 'Navegação da documentação');
  nav.id = 'docs-nav';
  nav.innerHTML = `<a class="app-logo" href="${base}index.html">${GRIN_MARK}<span>Grin</span><span class="tag">${VERSION}</span></a>`
    + PAGES.map(({ heading, items }) => (heading ? `<div class="nav-heading">${heading}</div>` : '') + items.map(([id, href, label, ic]) =>
      `<a class="nav-item" href="${base}${href}"${id === here ? ' aria-current="page"' : ''}>${icon(ic)}<span class="label">${label}</span></a>`).join('')).join('')
    + `<div class="sidebar-footer"><a class="nav-item small" href="https://github.com/saulossorio/grin">${icon('external-link')}<span class="label">Repositório</span></a>`
    + `<button type="button" class="nav-item small" data-theme-toggle>${icon('contrast')}<span class="label">Tema escuro</span></button></div>`;
}

function buildTop(top) {
  const base = document.querySelector('[data-docs-nav]')?.dataset.base ?? '';
  top.innerHTML = `<button type="button" class="btn icon ghost docs-menu-button" id="docs-menu-button" aria-expanded="false" aria-controls="docs-nav" aria-label="Abrir navegação">${icon('sidebar')}</button><span class="docs-crumb">${top.dataset.title ?? ''}</span><span class="spacer"></span>
    <button type="button" class="docs-search-button" id="docs-search-open" data-base="${base}">${icon('search')}<span>Buscar no Grin</span><kbd>⌘K</kbd></button>
    <button type="button" class="btn icon" aria-label="Aparência" data-tooltip="Aparência" aria-expanded="false" data-popover="docs-appearance">${icon('sliders')}</button>
    <div class="popover docs-appearance" id="docs-appearance" role="dialog" aria-label="Aparência">
      <span class="popover-title">Aparência</span>
      <div class="field"><label class="field-label" for="docs-theme">Tema</label><select class="select" id="docs-theme" data-theme-select><option value="system">Do sistema</option><option value="light">Claro</option><option value="dark">Escuro</option></select></div>
      <label class="switch"><input type="checkbox" role="switch" data-contrast-toggle>Alto contraste</label>
      <div class="field"><span class="field-label" id="docs-density-label">Densidade</span><div class="segmented" role="radiogroup" aria-labelledby="docs-density-label">
        <label><input type="radio" name="docs-density" value="comfortable" data-set-density><span>Confortável</span></label>
        <label><input type="radio" name="docs-density" value="compact" data-set-density><span>Compacta</span></label>
      </div></div>
      <div class="slider-field">
        <div class="slider-head"><label class="field-label" for="docs-scale">Tamanho da fonte</label><output for="docs-scale" data-format="percent">100%</output></div>
        <div class="slider-row"><span class="slider-end" style="font-size:12px" aria-hidden="true">A</span><input class="slider" type="range" id="docs-scale" min="100" max="125" step="any" data-stops="100,112.5,125" value="100" data-set-scale><span class="slider-end" style="font-size:18px" aria-hidden="true">A</span></div>
        <div class="slider-ticks" aria-hidden="true"><span data-value="100">100%</span><span data-value="112.5">112,5%</span><span data-value="125">125%</span></div>
      </div>
    </div>`;
}

/* Search: ⌘K or "/" opens it. The index is read from the documentation pages themselves (every section with an id,
   its title, the classes listed under it and its first line of text), so it never goes out of date. Examples are added by hand.
   Without a query the list shows everything, grouped in the order of the sidebar and alphabetical inside each group.
   With a query: titles that start with it, then titles that contain it, then classes and text; alphabetical within each. */
const SEARCH_PAGES = [['docs/installation.html', 'Instalação'], ['docs/foundations.html', 'Fundamentos'], ['docs/components.html', 'Componentes'], ['docs/patterns.html', 'Padrões'], ['docs/accessibility.html', 'Acessibilidade']];
const SEARCH_GROUPS = ['Componentes', 'Fundamentos', 'Padrões', 'Acessibilidade', 'Instalação', 'Páginas', 'Exemplos'];
const SEARCH_EXTRA = [['index.html', 'Início', 'Novidades e todas as partes do Grin em blocos visuais', 'Páginas'], ['examples/dashboard.html', 'Lista de dados', 'Indicadores, tabela, filtros, gaveta e ações em massa'], ['examples/form.html', 'Formulário', 'Cadastro com seções e validação'], ['examples/tutorial.html', 'Tutorial', 'Índice, passos, termos, perguntas, glossário e tour'], ['examples/landing.html', 'Página de apresentação', 'Apresentação de um produto com gráfico']];
let searchIndex = null;
const fold = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const byTitle = (a, b) => a.title.localeCompare(b.title, 'pt-BR');
async function buildIndex(base) {
  const entries = SEARCH_EXTRA.map(([href, title, sub, group = 'Exemplos']) => ({ href: base + href, title, group, sub, words: sub }));
  await Promise.all(SEARCH_PAGES.map(async ([href, group]) => {
    try {
      const doc = new DOMParser().parseFromString(await (await fetch(base + href)).text(), 'text/html');
      doc.querySelectorAll('section[id], .docs-sub[id]').forEach((sec) => {
        const h = sec.querySelector('h2, h3'); if (!h) return;
        const classes = [...sec.querySelectorAll('.class-list code')].map((c) => c.textContent).join(' ');
        const text = (sec.querySelector('header p, p, li, td')?.textContent ?? '').replace(/\s+/g, ' ').trim();
        entries.push({ href: `${base}${href}#${sec.id}`, title: h.textContent.trim(), group, sub: classes || text || group, mono: Boolean(classes), words: `${classes} ${text}` });
      });
    } catch { /* offline or file:// — that page is left out */ }
  }));
  return entries;
}
function ensureSearch() {
  let dlg = document.getElementById('docs-search');
  if (dlg) return dlg;
  dlg = document.createElement('dialog');
  dlg.className = 'dialog docs-search'; dlg.id = 'docs-search'; dlg.setAttribute('aria-label', 'Buscar no Grin');
  dlg.innerHTML = `<div class="docs-search-field">${icon('search', 20)}<input id="docs-search-input" type="search" placeholder="Componente, token, classe ou página" aria-label="Buscar" autocomplete="off" role="combobox" aria-expanded="true" aria-controls="docs-search-results"><kbd>Esc</kbd></div>
    <ul class="docs-search-results" id="docs-search-results" role="listbox" aria-label="Resultados"></ul>
    <div class="docs-search-foot"><span><kbd>↑</kbd> <kbd>↓</kbd> escolher</span><span><kbd>↵</kbd> abrir</span></div>`;
  document.body.append(dlg);
  const input = dlg.querySelector('input'), list = dlg.querySelector('ul');
  let active = 0, results = [];
  const item = (e, i) => `<li role="option" id="ds-${i}" aria-selected="${i === active}"><a href="${e.href}"><span class="docs-search-title">${e.title}</span><span class="docs-search-page">${e.group}</span><span class="docs-search-sub${e.mono ? ' mono' : ''}">${e.sub}</span></a></li>`;
  const render = () => {
    const q = fold(input.value.trim());
    const all = searchIndex ?? [];
    if (q) {
      const rank = (e) => (fold(e.title).startsWith(q) ? 0 : fold(e.title).includes(q) ? 1 : 2);
      results = all.filter((e) => fold(`${e.title} ${e.group} ${e.words}`).includes(q)).sort((a, b) => rank(a) - rank(b) || byTitle(a, b));
    } else {
      results = SEARCH_GROUPS.flatMap((g) => all.filter((e) => e.group === g).sort(byTitle));
    }
    active = Math.min(active, Math.max(0, results.length - 1));
    list.classList.toggle('grouped', !q); // the group is already the heading, so the label on the right is hidden
    if (searchIndex === null) list.innerHTML = '<li class="docs-search-empty">Carregando…</li>';
    else if (!results.length) list.innerHTML = `<li class="docs-search-empty">Nada encontrado para “${input.value.replace(/[<>&]/g, '')}”. Tente o nome em português ou a classe, como <code>.btn</code>.</li>`;
    else if (q) list.innerHTML = results.map(item).join('');
    else list.innerHTML = results.map((e, i) => (i === 0 || results[i - 1].group !== e.group ? `<li class="docs-search-group" role="presentation">${e.group}</li>` : '') + item(e, i)).join('');
    input.setAttribute('aria-activedescendant', results.length ? `ds-${active}` : '');
  };
  input.addEventListener('input', () => { active = 0; render(); });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); active = (active + (e.key === 'ArrowDown' ? 1 : -1) + results.length) % Math.max(1, results.length); render(); list.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' }); }
    if (e.key === 'Enter' && results[active]) { e.preventDefault(); location.href = results[active].href; dlg.close(); }
  });
  list.addEventListener('click', (e) => { if (e.target.closest?.('a')) dlg.close(); });
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
  dlg.render = render;
  return dlg;
}
async function openSearch() {
  const base = document.getElementById('docs-search-open')?.dataset.base ?? '';
  const dlg = ensureSearch();
  dlg.showModal();
  const input = dlg.querySelector('input'); input.value = ''; input.focus();
  dlg.render();
  if (!searchIndex) { searchIndex = await buildIndex(base); dlg.render(); }
}
document.addEventListener('click', (e) => { if (e.target.closest?.('#docs-search-open, [data-docs-search]')) openSearch(); });
document.addEventListener('keydown', (e) => {
  const typing = e.target.closest?.('input, textarea, select, [contenteditable]');
  if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) { e.preventDefault(); openSearch(); }
});

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
  // Every code block of the guides gets a copy button too
  root.querySelectorAll('pre.code-block').forEach((pre) => {
    const wrap = document.createElement('div');
    wrap.className = 'code-wrap';
    pre.before(wrap); wrap.append(pre);
    wrap.insertAdjacentHTML('beforeend', `<button type="button" class="btn xs copy-code">${icon('copy', 14)}<span>Copiar</span></button>`);
  });
}
document.addEventListener('click', async (e) => {
  const b = e.target.closest?.('.copy-code');
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
  if (e.target.closest?.('#docs-menu-button')) toggleNav(!document.getElementById('docs-nav').classList.contains('open'));
  else if (document.body.classList.contains('docs-nav-open') && !e.target.closest?.('#docs-nav')) toggleNav(false);
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && document.body.classList.contains('docs-nav-open')) { toggleNav(false); document.getElementById('docs-menu-button')?.focus(); } });

// The same footer on every page: version, author, changes and repository
export const AUTHOR = 'Saúl Ossorio';
function buildFooter() {
  const base = document.querySelector('[data-docs-nav]')?.dataset.base ?? '';
  let f = document.querySelector('.docs-footer');
  if (!f) { f = Object.assign(document.createElement('footer'), { className: 'docs-footer' }); document.querySelector('.docs-main')?.append(f); }
  f.innerHTML = `<span class="docs-signature"><b>Grin ${VERSION}</b> · Design system por ${AUTHOR}</span><span class="spacer"></span>`
    + `<a href="${base}index.html">Início</a><a href="https://github.com/saulossorio/grin/blob/main/CHANGELOG.md">Mudanças</a><a href="https://github.com/saulossorio/grin">Repositório</a>`;
}

function init() {
  // Code panels read the markup before icons are painted, so samples show <i data-icon> and not raw SVG
  showCode();
  const nav = document.querySelector('[data-docs-nav]'); if (nav) buildNav(nav);
  const top = document.querySelector('[data-docs-top]'); if (top) buildTop(top);
  buildFooter();
  paintIcons();
  sync();
  initSidebar();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true }); else init();
