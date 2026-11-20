// Grin sidebar: collapse to icons and expand again.
// Markup: <div class="app"><nav class="sidebar">…</nav>…</div>. The script adds a round toggle on the sidebar edge
// (or uses any [data-sidebar-toggle] button), remembers the choice (localStorage "grin-sidebar"), and collapses on its
// own below 1100 px when the person never chose. Collapsed, each item shows its name as a tooltip (popover.js).
import '../popover/popover.js';
import { icon } from '../../scripts/utils.js';

const KEY = 'grin-sidebar';
const read = () => { try { return localStorage.getItem(KEY); } catch { return null; } };
const write = (v) => { try { localStorage.setItem(KEY, v); } catch { /* private mode */ } };

const phone = () => matchMedia('(max-width: 760px)').matches; // there the sidebar is a strip or a drawer, never icons only
function apply(sidebar, wanted) {
  const collapsed = wanted && !phone();
  sidebar.classList.toggle('collapsed', collapsed);
  sidebar.closest('.app')?.classList.toggle('sidebar-collapsed', collapsed);
  sidebar.querySelectorAll('.nav-item, .account, .docs-search-side').forEach((el) => {
    const name = el.querySelector('.label, b, span')?.textContent.trim() || el.getAttribute('aria-label');
    if (collapsed && name) { el.dataset.tooltip = name; if (!el.textContent.trim() || el.querySelector('.label')) el.setAttribute('aria-label', name); } else delete el.dataset.tooltip;
  });
  document.querySelectorAll('.sidebar-toggle, [data-sidebar-toggle]').forEach((b) => {
    b.setAttribute('aria-expanded', String(!collapsed));
    b.setAttribute('aria-label', collapsed ? 'Expandir barra lateral' : 'Recolher barra lateral');
    const label = b.querySelector('.label'); if (label) label.textContent = collapsed ? 'Expandir barra' : 'Recolher barra';
  });
}

// Pages that build their sidebar with a script (the documentation) call initSidebar() after building it
let started = false;
export function initSidebar() {
  const sidebar = document.querySelector('.app > .sidebar');
  if (!sidebar || started) return;
  started = true;
  if (!document.querySelector('[data-sidebar-toggle]')) {
    const b = Object.assign(document.createElement('button'), { type: 'button', className: 'sidebar-toggle' });
    b.innerHTML = icon('chevron-left', 16);
    b.setAttribute('aria-controls', sidebar.id || (sidebar.id = 'app-sidebar'));
    sidebar.after(b);
  }
  const saved = read();
  apply(sidebar, saved ? saved === 'collapsed' : matchMedia('(max-width: 1100px)').matches);
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.sidebar-toggle, [data-sidebar-toggle]')) return;
    const collapsed = !sidebar.classList.contains('collapsed');
    write(collapsed ? 'collapsed' : 'expanded');
    apply(sidebar, collapsed);
  });
  matchMedia('(max-width: 1100px)').addEventListener('change', (m) => { if (!read()) apply(sidebar, m.matches); });
  matchMedia('(max-width: 760px)').addEventListener('change', () => apply(sidebar, read() ? read() === 'collapsed' : matchMedia('(max-width: 1100px)').matches));
}
const auto = () => { if (!document.querySelector('[data-docs-nav]')) initSidebar(); };
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', auto, { once: true }); else auto();
