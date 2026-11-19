// Casca das páginas de documentação: barra lateral, topo com tema/densidade/fonte e ícones.
// Uso: <nav class="side" data-ds-nav data-base="../" data-here="foundations"></nav> e <header class="top" data-ds-top></header>.
import { ic, pintarIcones, mostrarCodigo } from './utils.js';
import './theme.js';

const PAGINAS = [
  { grupo: null, itens: [['index', 'index.html', 'Visão geral', 'livro']] },
  { grupo: 'Guia', itens: [
    ['foundations', 'docs/foundations.html', 'Fundamentos', 'paleta'],
    ['components', 'docs/components.html', 'Componentes', 'componentes'],
    ['patterns', 'docs/patterns.html', 'Padrões', 'colunas'],
    ['accessibility', 'docs/accessibility.html', 'Acessibilidade', 'acesso'],
  ] },
  { grupo: 'Exemplos', itens: [
    ['ex-dashboard', 'examples/dashboard.html', 'Lista de dados', 'tabela'],
    ['ex-form', 'examples/form.html', 'Formulário', 'lapis'],
    ['ex-landing', 'examples/landing.html', 'Página de apresentação', 'exemplo'],
  ] },
];

function montar() {
  const nav = document.querySelector('[data-ds-nav]');
  if (nav) {
    const base = nav.dataset.base ?? '';
    const aqui = nav.dataset.here;
    nav.setAttribute('aria-label', 'Navegação do design system');
    nav.innerHTML = `<a class="logo" href="${base}index.html"><span class="logo-c" aria-hidden="true">G</span><span>Grin</span><span class="tag">1.0</span></a>`
      + PAGINAS.map(({ grupo, itens }) => (grupo ? `<div class="nav-group">${grupo}</div>` : '') + itens.map(([id, href, rot, icone]) =>
        `<a class="nav" href="${base}${href}"${id === aqui ? ' aria-current="page"' : ''}>${ic(icone)}<span class="lbl">${rot}</span></a>`).join('')).join('')
      + `<div class="side-foot"><a class="nav small" href="https://github.com/saulossorio/grin">${ic('exportar')}<span class="lbl">Repositório</span></a>`
      + `<button type="button" class="nav small" data-theme-toggle>${ic('contraste')}<span class="lbl">Tema escuro</span></button></div>`;
  }
  const top = document.querySelector('[data-ds-top]');
  if (top) {
    top.innerHTML = `<span class="sub">${top.dataset.title ?? ''}</span><div class="sp"></div><div class="ds-top-tools">
      <label class="vh" for="ds-tema">Tema</label>
      <select class="select" id="ds-tema" data-theme-select><option value="system">Tema do sistema</option><option value="light">Claro</option><option value="dark">Escuro</option><option value="hc">Alto contraste</option></select>
      <div class="seg" role="radiogroup" aria-label="Densidade">
        <label><input type="radio" name="ds-dens" value="compact" data-set-density><span>Compacta</span></label>
        <label><input type="radio" name="ds-dens" value="comfortable" data-set-density><span>Confortável</span></label>
      </div>
      <div class="seg" role="radiogroup" aria-label="Tamanho da fonte">
        <label><input type="radio" name="ds-esc" value="100" data-set-scale><span>A</span></label>
        <label><input type="radio" name="ds-esc" value="112" data-set-scale><span style="font-size:1.06em">A</span></label>
        <label><input type="radio" name="ds-esc" value="125" data-set-scale><span style="font-size:1.14em">A</span></label>
      </div></div>`;
  }
  pintarIcones();
  mostrarCodigo();
  document.dispatchEvent(new Event('DOMContentLoaded')); // ressincroniza os controles de tema recém-criados
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montar, { once: true }); else montar();
