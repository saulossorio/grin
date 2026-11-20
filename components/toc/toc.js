// Grin table of contents. Marks with aria-current="true" the link of the section being read.
// Markup: <nav class="toc" aria-label="Nesta página"><a href="#id">…</a></nav>; the sections need those ids.
document.querySelectorAll('.toc').forEach((toc) => {
  const links = [...toc.querySelectorAll('a[href^="#"]')];
  const sections = links.map((a) => document.getElementById(decodeURIComponent(a.hash.slice(1)))).filter(Boolean);
  const mark = (id) => links.forEach((a) => a.setAttribute('aria-current', String(a.hash.slice(1) === id)));
  const io = new IntersectionObserver((entries) => {
    const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    if (visible[0]) mark(visible[0].target.id);
  }, { rootMargin: '0px 0px -70% 0px' });
  sections.forEach((s) => io.observe(s));
  if (sections[0]) mark(sections[0].id);
});
