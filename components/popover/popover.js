// Grin tooltip, popover and term.
// Tooltip: any element with data-tooltip="text" (usually an icon button that already has the same aria-label).
//   It hides on pointer out, focus out, click and scroll; a page that redraws under the pointer can call hideTip().
// Popover: <button data-popover="id" aria-expanded="false"> opens <div class="popover" id="id" role="dialog" aria-label="…">.
//   Click outside or Esc closes it; focus goes back to the button. The .term and .help-button use the same hook.
const GAP = 8;
// The visible area excludes the scrollbar (innerWidth includes it, and the panel ended up under it)
function place(el, anchor) {
  const a = anchor.getBoundingClientRect(), r = el.getBoundingClientRect();
  const vw = document.documentElement.clientWidth, vh = document.documentElement.clientHeight;
  let top = a.bottom + GAP;
  if (top + r.height > vh - GAP && a.top - r.height - GAP > GAP) top = a.top - r.height - GAP;
  const left = Math.min(Math.max(GAP, a.left + a.width / 2 - r.width / 2), vw - r.width - GAP);
  el.style.top = `${Math.round(top)}px`; el.style.left = `${Math.round(left)}px`;
}

let tip;
function showTip(target) {
  if (!tip) { tip = Object.assign(document.createElement('div'), { className: 'tooltip' }); tip.setAttribute('role', 'tooltip'); tip.id = 'grin-tooltip'; document.body.append(tip); }
  tip.textContent = target.dataset.tooltip;
  place(tip, target);
  tip.classList.add('show');
}
export const hideTip = () => tip?.classList.remove('show');
document.addEventListener('pointerover', (e) => { const t = e.target.closest?.('[data-tooltip]'); if (t) showTip(t); });
document.addEventListener('pointerout', (e) => { if (e.target.closest?.('[data-tooltip]')) hideTip(); });
document.addEventListener('focusin', (e) => { const t = e.target.closest?.('[data-tooltip]'); if (t && t.matches(':focus-visible')) showTip(t); });
document.addEventListener('focusout', hideTip);
// A click, a scroll or a redraw that removes the element also hides the tooltip
document.addEventListener('pointerdown', hideTip);
window.addEventListener('scroll', hideTip, { passive: true, capture: true });

let open = null;
function close(returnFocus = false) {
  if (!open) return;
  // fades out before hiding (instant with reduced motion)
  const panel = open.panel;
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) { panel.classList.add('closing'); setTimeout(() => panel.classList.remove('closing'), 140); }
  panel.classList.remove('open');
  open.button.setAttribute('aria-expanded', 'false');
  if (returnFocus) open.button.focus();
  open = null;
}
document.addEventListener('click', (e) => {
  const button = e.target.closest?.('[data-popover]');
  if (button) {
    const panel = document.getElementById(button.dataset.popover);
    const same = open?.button === button;
    close();
    if (same || !panel) return;
    panel.classList.add('open'); button.setAttribute('aria-expanded', 'true');
    place(panel, button);
    open = { panel, button };
    hideTip();
    return;
  }
  if (open && !open.panel.contains(e.target)) close();
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { hideTip(); close(true); } });
addEventListener('scroll', () => { if (open) place(open.panel, open.button); }, true);
addEventListener('resize', () => { if (open) place(open.panel, open.button); });
