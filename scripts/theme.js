// Tema, densidade e tamanho da fonte. Guarda a escolha da pessoa no navegador.
// Tema: 'system' (sem atributo, segue o sistema), 'light', 'dark' ou 'hc' (alto contraste).
// Uso: <button data-set-theme="dark">, <button data-theme-toggle>, <select data-theme-select>, <input type="radio" name="..." data-set-density value="comfortable">.
const CHAVE = 'grin';
const ler = (k, padrao) => { try { return localStorage.getItem(`${CHAVE}-${k}`) ?? padrao; } catch { return padrao; } };
const gravar = (k, v) => { try { localStorage.setItem(`${CHAVE}-${k}`, v); } catch { /* navegação privada: vale só nesta visita */ } };
const raiz = document.documentElement;

export const temaAtual = () => ler('tema', 'system');
export const temaEfetivo = () => {
  const t = temaAtual();
  if (t !== 'system') return t;
  if (matchMedia('(prefers-contrast: more)').matches) return 'hc';
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export function aplicarTema(t) {
  if (t === 'system') raiz.removeAttribute('data-theme'); else raiz.setAttribute('data-theme', t);
  gravar('tema', t);
  sincronizar();
  raiz.dispatchEvent(new CustomEvent('tema', { detail: temaEfetivo() }));
}
export function aplicarDensidade(d) {
  if (d === 'comfortable') raiz.setAttribute('data-density', d); else raiz.removeAttribute('data-density');
  gravar('densidade', d); sincronizar();
}
export function aplicarEscala(e) {
  if (e === '100') raiz.removeAttribute('data-scale'); else raiz.setAttribute('data-scale', e);
  gravar('escala', e); sincronizar();
}

function sincronizar() {
  const t = temaAtual(), d = ler('densidade', 'compact'), e = ler('escala', '100');
  document.querySelectorAll('[data-theme-select]').forEach((s) => { s.value = t; });
  document.querySelectorAll('[data-set-theme]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.setTheme === t)));
  document.querySelectorAll('input[data-set-theme]').forEach((i) => { i.checked = i.value === t; });
  document.querySelectorAll('input[data-set-density]').forEach((i) => { i.checked = i.value === d; });
  document.querySelectorAll('input[data-set-scale]').forEach((i) => { i.checked = i.value === e; });
  document.querySelectorAll('[data-theme-toggle] .lbl').forEach((l) => { l.textContent = temaEfetivo() === 'dark' ? 'Tema claro' : 'Tema escuro'; });
}

// ?tema=dark (ou light, hc) na URL força o tema sem guardar: útil para compartilhar uma prévia
const daUrl = new URLSearchParams(location.search).get('tema');
if (['light', 'dark', 'hc'].includes(daUrl)) { try { localStorage.setItem(`${CHAVE}-tema`, daUrl); } catch { /* sem armazenamento */ } }

// Aplica já na carga (o <script> fica no <head> para não piscar o tema errado)
const t0 = temaAtual(); if (t0 !== 'system') raiz.setAttribute('data-theme', t0);
if (ler('densidade', 'compact') === 'comfortable') raiz.setAttribute('data-density', 'comfortable');
const e0 = ler('escala', '100'); if (e0 !== '100') raiz.setAttribute('data-scale', e0);

document.addEventListener('DOMContentLoaded', sincronizar);
document.addEventListener('change', (ev) => {
  const el = ev.target;
  if (el.matches('[data-theme-select]') || el.matches('input[data-set-theme]')) aplicarTema(el.value);
  else if (el.matches('input[data-set-density]')) aplicarDensidade(el.value);
  else if (el.matches('input[data-set-scale]')) aplicarEscala(el.value);
});
document.addEventListener('click', (ev) => {
  const b = ev.target.closest('button[data-set-theme], [data-theme-toggle]');
  if (!b) return;
  aplicarTema(b.hasAttribute('data-theme-toggle') ? (temaEfetivo() === 'dark' ? 'light' : 'dark') : b.dataset.setTheme);
});
for (const q of ['(prefers-color-scheme: dark)', '(prefers-contrast: more)']) matchMedia(q).addEventListener('change', () => { if (temaAtual() === 'system') { sincronizar(); raiz.dispatchEvent(new CustomEvent('tema', { detail: temaEfetivo() })); } });
