// Grin combobox. Markup: .combobox[.multiple] > .combobox-control > input.combobox-input[aria-controls=list-id]
// and ul.combobox-list#list-id > li.combobox-option[data-value] (optional <small> second line, li.combobox-group titles).
// Typing filters and highlights; arrows move; Enter picks; Esc closes. In .multiple each pick becomes a tag, and
// Backspace on an empty field removes the last tag. A hidden input[name] (optional) receives the value(s), comma-separated.
// Select (no typing): add readonly to the input. The list opens on click, Enter or the arrows, and the field shows the choice.
// Motion: the list scales in and fades out; tags spring in and shrink out. All of it is off with reduced motion.
const fold = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function setup(box) {
  const input = box.querySelector('.combobox-input'), list = box.querySelector('.combobox-list');
  const control = box.querySelector('.combobox-control'), hidden = box.querySelector('input[type="hidden"]');
  const multiple = box.classList.contains('multiple');
  const options = [...list.querySelectorAll('.combobox-option')];
  // The label (everything before <small>) goes into its own span, so highlighting never touches the second line
  options.forEach((o, i) => {
    o.id ||= `${list.id}-o${i}`; o.setAttribute('role', 'option');
    const span = document.createElement('span'); span.className = 'combobox-label';
    const icon = o.querySelector(':scope > .combobox-icon');
    [...o.childNodes].filter((n) => n !== icon && n.nodeName !== 'SMALL').forEach((n) => span.append(n));
    o.insertBefore(span, o.querySelector(':scope > small')); o.dataset.label = span.textContent.trim();
    if (icon) o.classList.add('has-icon');
  });
  input.setAttribute('role', 'combobox'); input.setAttribute('aria-autocomplete', 'list'); input.setAttribute('aria-expanded', 'false');
  list.setAttribute('role', 'listbox'); if (multiple) list.setAttribute('aria-multiselectable', 'true');
  let active = -1;
  const visible = () => options.filter((o) => !o.hidden);
  const chosen = () => options.filter((o) => o.getAttribute('aria-selected') === 'true');
  const sync = () => {
    if (hidden) hidden.value = chosen().map((o) => o.dataset.value).join(',');
    if (!multiple && chosen()[0]) {
      input.value = chosen()[0].dataset.label;
      // the chosen option's icon also shows in the field
      control.querySelector(':scope > .combobox-icon')?.remove();
      const ic = chosen()[0].querySelector(':scope > .combobox-icon');
      if (ic) control.prepend(ic.cloneNode(true));
    }
    if (multiple) {
      control.querySelectorAll('.combobox-tag').forEach((t) => t.remove());
      chosen().forEach((o) => input.insertAdjacentHTML('beforebegin', `<span class="combobox-tag" data-value="${esc(o.dataset.value)}">${esc(o.dataset.label)}<button type="button" aria-label="Remover ${esc(o.dataset.label)}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button></span>`));
    }
  };
  const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const readonly = input.readOnly;
  if (readonly) box.classList.add('listbox');
  let closeTimer;
  const open = (on) => {
    if (on === box.classList.contains('open')) return;
    clearTimeout(closeTimer);
    input.setAttribute('aria-expanded', String(on));
    if (on) { box.classList.remove('closing'); box.classList.add('open'); return; }
    active = -1; input.removeAttribute('aria-activedescendant');
    box.classList.remove('open');
    if (!reduce()) { box.classList.add('closing'); closeTimer = setTimeout(() => box.classList.remove('closing'), 140); }
  };
  // A tag shrinks out before the choice is removed
  const removeTag = (o) => {
    const tag = [...control.querySelectorAll('.combobox-tag')].find((t) => t.dataset.value === o.dataset.value);
    if (!tag || reduce()) { pick(o); return; }
    tag.classList.add('leaving');
    setTimeout(() => pick(o), 140);
  };
  const filter = () => {
    const q = fold(input.value.trim());
    options.forEach((o) => {
      const hit = !q || fold(o.textContent).includes(q);
      o.hidden = !hit;
      const label = o.dataset.label, i = fold(label).indexOf(q);
      o.querySelector('.combobox-label').innerHTML = q && i >= 0 ? `${esc(label.slice(0, i))}<mark>${esc(label.slice(i, i + q.length))}</mark>${esc(label.slice(i + q.length))}` : esc(label);
    });
    list.querySelectorAll('.combobox-group').forEach((g) => { let n = g.nextElementSibling, any = false; while (n && !n.classList.contains('combobox-group')) { any ||= !n.hidden; n = n.nextElementSibling; } g.hidden = !any; });
    let empty = list.querySelector('.combobox-empty');
    if (!visible().length) { if (!empty) list.insertAdjacentHTML('beforeend', '<li class="combobox-empty">Nenhuma opção encontrada.</li>'); } else empty?.remove();
    move(visible().length ? 0 : -1, true);
  };
  const move = (i, absolute) => {
    const v = visible(); if (!v.length) return;
    active = absolute ? i : Math.max(0, Math.min(v.length - 1, active + i));
    options.forEach((o) => o.classList.toggle('active', o === v[active]));
    if (v[active]) { input.setAttribute('aria-activedescendant', v[active].id); v[active].scrollIntoView({ block: 'nearest' }); }
  };
  const pick = (o) => {
    if (multiple) o.setAttribute('aria-selected', String(o.getAttribute('aria-selected') !== 'true'));
    else { options.forEach((x) => x.setAttribute('aria-selected', String(x === o))); input.value = o.dataset.label; open(false); }
    if (multiple) { input.value = ''; filter(); }
    sync(); box.dispatchEvent(new CustomEvent('grin:change', { bubbles: true, detail: chosen().map((x) => x.dataset.value) }));
  };
  input.addEventListener('focus', () => { if (!readonly) { open(true); filter(); } });
  input.addEventListener('input', () => { open(true); filter(); });
  if (readonly) input.addEventListener('click', () => { const on = !box.classList.contains('open'); open(on); if (on) move(Math.max(0, visible().indexOf(chosen()[0])), true); });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); open(true); move(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
    else if (e.key === 'Enter' && box.classList.contains('open')) { e.preventDefault(); const o = visible()[active]; if (o) pick(o); }
    else if (e.key === 'Escape') open(false);
    else if (e.key === 'Backspace' && multiple && !input.value) { const last = chosen().at(-1); if (last) removeTag(last); }
    else if (readonly && (e.key === ' ' || (e.key === 'Enter' && !box.classList.contains('open')))) { e.preventDefault(); open(true); move(Math.max(0, visible().indexOf(chosen()[0])), true); }
  });
  list.addEventListener('mousedown', (e) => { const o = e.target.closest?.('.combobox-option'); if (o) { e.preventDefault(); pick(o); } });
  control.addEventListener('click', (e) => {
    const rm = e.target.closest?.('.combobox-tag button');
    if (rm) { const o = options.find((x) => x.dataset.value === rm.parentElement.dataset.value); if (o) removeTag(o); return; }
    if (!readonly) input.focus();
  });
  document.addEventListener('click', (e) => { if (!box.contains(e.target)) open(false); });
  sync();
}
// After DOMContentLoaded, so code samples read the original markup first
const start = () => document.querySelectorAll('.combobox').forEach(setup);
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true }); else start();
