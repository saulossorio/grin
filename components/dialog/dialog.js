// Grin dialog and drawer behavior, for any <dialog class="dialog|drawer">.
// [data-open="id"] opens it as modal, [data-close] closes the dialog it is in. Esc and a click on the backdrop also close.
document.addEventListener('click', (e) => {
  const opener = e.target.closest?.('[data-open]');
  if (opener) { document.getElementById(opener.dataset.open)?.showModal(); return; }
  const closer = e.target.closest?.('[data-close]');
  if (closer) { closer.closest('dialog')?.close(); return; }
  if (e.target.tagName === 'DIALOG') e.target.close(); // click on the backdrop
});
