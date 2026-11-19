// Grin tabs. Markup: [role=tablist] > button[role=tab][aria-controls=id]; panels [role=tabpanel][id].
// Click or Left/Right/Home/End selects a tab and shows its panel.
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
  for (const t of tab.closest('[role="tablist"]').querySelectorAll('[role="tab"]')) {
    const on = t === tab;
    t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1;
    const panel = document.getElementById(t.getAttribute('aria-controls'));
    if (panel) panel.hidden = !on;
  }
}
