// Grin sidebar: collapse to icons and expand again.
// Markup: <div class="app"><nav class="sidebar">…</nav>…</div>. The script adds a round toggle on the sidebar edge
// (or uses any [data-sidebar-toggle] button), remembers the choice (localStorage "grin-sidebar"), and collapses on its
// own below 1100 px when the person never chose. Collapsed, each item shows its name as a tooltip (popover.js).
// On phones (760 px and below) it becomes a drawer opened by a menu button at the top left.
// A tool that redraws the sidebar (or the whole .app) with a script keeps all of this: the script watches the page,
// puts the toggle and the menu button back when they are gone, and applies the current state to the new sidebar.
// The tool does not set .collapsed itself.
import '../popover/popover.js';
import { icon } from '../../scripts/utils.js';

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
  sidebar.querySelectorAll('.nav-item, .account').forEach((el) => {
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
export function initSidebar() {
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
    if (menuOpen && !t.closest?.('.sidebar')) openMenu(false);
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
