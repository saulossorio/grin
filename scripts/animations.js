// Movimento reutilizável. Regras: curto (160 a 200 ms), só como resposta a uma ação, nunca para esconder conteúdo.
// Com "reduzir movimento" ligado no sistema, nada se mexe e o resultado aparece direto.
export const reduzir = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const css = (nome) => getComputedStyle(document.documentElement).getPropertyValue(nome).trim();
export const duracao = () => parseInt(css('--dur'), 10) || 160;
export const curva = () => css('--ease') || 'ease-out';

// Destaca rapidamente um elemento que mudou (linha salva, valor recalculado)
export function destacar(el) {
  if (reduzir() || !el) return;
  el.animate([{ backgroundColor: css('--highlight') }, { backgroundColor: 'transparent' }], { duration: 900, easing: 'ease-out' });
}

// Entrada de um elemento novo (toast, item adicionado à lista)
export function entrar(el, { y = 6 } = {}) {
  if (reduzir() || !el) return;
  el.animate([{ opacity: 0, transform: `translateY(${y}px)` }, { opacity: 1, transform: 'none' }], { duration: duracao(), easing: curva() });
}

// Rolagem suave até um elemento, respeitando a preferência
export function rolarAte(el) {
  el?.scrollIntoView({ behavior: reduzir() ? 'auto' : 'smooth', block: 'start' });
}
