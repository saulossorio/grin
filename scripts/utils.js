// Auxiliares: ícones (traço 2 px, estilo Lucide), contraste WCAG e trechos de código da documentação.

export const ICONES = {
  busca: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  mais: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  baixo: '<path d="m6 9 6 6 6-6"/>',
  dir: '<path d="m9 18 6-6-6-6"/>',
  painel: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/>',
  tabela: '<path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>',
  pessoas: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  empresa: '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>',
  revisao: '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
  importar: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>',
  exportar: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
  grafico: '<path d="M22 7 13.5 15.5 8.5 10.5 2 17"/><path d="M16 7h6v6"/>',
  lixo: '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>',
  desfazer: '<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"/>',
  lapis: '<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>',
  crit: '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',
  warn: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  ok: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  sol: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  lua: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  contraste: '<circle cx="12" cy="12" r="10"/><path d="M12 18a6 6 0 0 0 0-12v12z"/>',
  copiar: '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
  filtro: '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
  colunas: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="M15 3v18"/>',
  livro: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>',
  paleta: '<circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>',
  componentes: '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
  acesso: '<circle cx="16" cy="4" r="1"/><path d="m18 19 1-7-6 1"/><path d="m5 8 3-3 5.5 3-2.36 3.5"/><path d="M4.24 14.5a5 5 0 0 0 6.88 6"/><path d="M13.76 17.5a5 5 0 0 0-6.88-6"/>',
  exemplo: '<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>',
};
export const ic = (nome, tam = 16) => `<svg width="${tam}" height="${tam}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONES[nome] ?? ''}</svg>`;

// Preenche <i data-ic="nome"> com o SVG
export function pintarIcones(raiz = document) {
  raiz.querySelectorAll('i[data-ic]').forEach((i) => { i.outerHTML = ic(i.dataset.ic, +(i.dataset.size || 16)); });
}

/* ---------- Contraste WCAG, com suporte a oklch() ---------- */
function oklchParaRgb(L, C, H) {
  const h = (H * Math.PI) / 180, a = C * Math.cos(h), b = C * Math.sin(h);
  const l_ = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m_ = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s_ = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const lin = [4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_, -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_, -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_];
  return lin.map((v) => Math.min(1, Math.max(0, v)));
}
const gama = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
const linear = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);

// Converte qualquer cor CSS (hex, rgb, oklch) em [r, g, b] linear de 0 a 1, ignorando alfa
export function corLinear(cor) {
  const s = cor.trim();
  let m = s.match(/^oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)/i);
  if (m) return oklchParaRgb(m[2] ? m[1] / 100 : +m[1], +m[3], +m[4]);
  m = s.match(/^#([0-9a-f]{6})$/i);
  if (m) return [0, 2, 4].map((i) => linear(parseInt(m[1].slice(i, i + 2), 16) / 255));
  m = s.match(/^#([0-9a-f]{3})$/i);
  if (m) return [...m[1]].map((c) => linear(parseInt(c + c, 16) / 255));
  m = s.match(/^rgba?\(\s*([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)/i);
  if (m) return [m[1], m[2], m[3]].map((v) => linear(v / 255));
  return null;
}
export const luminancia = ([r, g, b]) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
export function contraste(a, b) {
  const ca = corLinear(a), cb = corLinear(b);
  if (!ca || !cb) return null;
  const [l1, l2] = [luminancia(ca), luminancia(cb)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}
export const hexDe = (cor) => { const c = corLinear(cor); return c ? '#' + c.map((v) => Math.round(gama(v) * 255).toString(16).padStart(2, '0')).join('') : cor; };
export const token = (nome, el = document.documentElement) => getComputedStyle(el).getPropertyValue(`--${nome}`).trim();

/* ---------- Trechos de código da documentação ---------- */
const escapar = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function recuar(html) {
  const linhas = html.replace(/^\n+|\s+$/g, '').split('\n');
  const min = Math.min(...linhas.filter((l) => l.trim()).map((l) => l.match(/^\s*/)[0].length));
  return linhas.map((l) => l.slice(min)).join('\n');
}
// Cada .demo[data-code] ganha embaixo o HTML do próprio exemplo, com botão de copiar
export function mostrarCodigo(raiz = document) {
  raiz.querySelectorAll('.demo[data-code]').forEach((demo) => {
    const alvo = demo.querySelector('.demo-stage') ?? demo;
    const html = recuar(alvo.innerHTML.replace(/ data-demo-only[^>]*?(?=>)/g, ''));
    const box = document.createElement('details');
    box.className = 'demo-code';
    box.innerHTML = `<summary>Ver código</summary><div class="code"><button type="button" class="btn xs copy">${ic('copiar', 14)}Copiar</button><pre><code>${escapar(html)}</code></pre></div>`;
    demo.after(box);
  });
}
document.addEventListener('click', async (e) => {
  const b = e.target.closest('.copy');
  if (!b) return;
  const texto = b.parentElement.querySelector('code').textContent;
  try { await navigator.clipboard.writeText(texto); b.lastChild.textContent = 'Copiado'; }
  catch { const r = document.createRange(); r.selectNodeContents(b.parentElement.querySelector('code')); getSelection().removeAllRanges(); getSelection().addRange(r); b.lastChild.textContent = 'Selecionado'; }
  setTimeout(() => { b.lastChild.textContent = 'Copiar'; }, 1600);
});
