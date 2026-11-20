// Grin glossary. Markup: .glossary > .letter-index (buttons with data-letter, plus one with data-letter="" for all)
// and .glossary-group[data-letter] > .glossary-item. Optional search: <input data-glossary-search>.
document.querySelectorAll('.glossary').forEach((g) => {
  const groups = [...g.querySelectorAll('.glossary-group')];
  const search = g.querySelector('[data-glossary-search]');
  let letter = '';
  const apply = () => {
    const q = (search?.value ?? '').trim().toLowerCase();
    for (const grp of groups) {
      let any = false;
      for (const item of grp.querySelectorAll('.glossary-item')) {
        const show = (!letter || grp.dataset.letter === letter) && (!q || item.textContent.toLowerCase().includes(q));
        item.hidden = !show; any ||= show;
      }
      grp.hidden = !any;
    }
    g.querySelectorAll('.letter-index button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.letter === letter)));
  };
  g.querySelectorAll('.letter-index button').forEach((b) => {
    if (b.dataset.letter && !groups.some((grp) => grp.dataset.letter === b.dataset.letter)) b.disabled = true;
    b.addEventListener('click', () => { letter = b.dataset.letter; apply(); });
  });
  search?.addEventListener('input', apply);
  apply();
});
