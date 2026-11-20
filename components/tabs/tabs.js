// Grin tabs. Markup: [role=tablist] > button[role=tab][aria-controls=id]; panels [role=tabpanel][id].
// Click or Left/Right/Home/End selects a tab and shows its panel. A white piece (.tabs-indicator) slides to the chosen tab.
document.addEventListener('click', (e) => { const tab = e.target.closest('[role="tab"]'); if (tab) select(tab); });
document.addEventListener('keydown', (e) => {
  const tab = e.target.closest('[role="tab"]');
  if (!tab || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
  const tabs = [...tab.closest('[role="tablist"]').querySelectorAll('[role="tab"]')];
  const i = tabs.indexOf(tab);
  const next = { ArrowLeft: tabs[(i - 1 + tabs.length) % tabs.length], ArrowRight: tabs[(i + 1) % tabs.length], Home: tabs[0], End: tabs.at(-1) }[e.key];
  e.preventDefault(); select(next); next.focus();
});
function select(tab) {
  const list = tab.closest('[role="tablist"]');
  for (const t of list.querySelectorAll('[role="tab"]')) {
    const on = t === tab;
    t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1;
    const panel = document.getElementById(t.getAttribute('aria-controls'));
    if (panel) panel.hidden = !on;
  }
  place(list);
}
function place(list) {
  const on = list.querySelector('[role="tab"][aria-selected="true"]');
  let bar = list.querySelector('.tabs-indicator');
  if (!on || !list.classList.contains('tabs')) return;
  if (!bar) { bar = document.createElement('span'); bar.className = 'tabs-indicator'; bar.setAttribute('aria-hidden', 'true'); list.prepend(bar); list.classList.add('tabs-ready'); }
  bar.style.width = `${on.offsetWidth}px`; bar.style.height = `${on.offsetHeight}px`;
  bar.style.transform = `translate(${on.offsetLeft}px, ${on.offsetTop}px)`;
}
const placeAll = () => document.querySelectorAll('.tabs[role="tablist"]').forEach(place);
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', placeAll, { once: true }); else placeAll();
addEventListener('resize', placeAll);
document.fonts?.ready.then(placeAll);
