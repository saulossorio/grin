// Abre e fecha diálogos e gavetas: [data-open="id"] abre, [data-close] fecha o <dialog> onde está. Esc e o clique no véu também fecham.
document.addEventListener('click', (e) => {
  const abrir = e.target.closest('[data-open]');
  if (abrir) { document.getElementById(abrir.dataset.open)?.showModal(); return; }
  const fechar = e.target.closest('[data-close]');
  if (fechar) { fechar.closest('dialog')?.close(); return; }
  if (e.target.tagName === 'DIALOG') e.target.close(); // clique no véu
});
