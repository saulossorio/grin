// toast('Texto', { tipo: 'ok' | 'crit' | 'warn' | 'info', acao: 'Desfazer', aoAgir: fn, ms: 5000 })
// Cria a região .toasts (role=status) na primeira chamada; o leitor de tela anuncia cada aviso.
export function toast(texto, { tipo = 'ok', acao, aoAgir, ms = 5000 } = {}) {
  let regiao = document.querySelector('.toasts');
  if (!regiao) { regiao = Object.assign(document.createElement('div'), { className: 'toasts' }); regiao.setAttribute('role', 'status'); document.body.append(regiao); }
  const icones = { ok: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>', crit: '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>', warn: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>', info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>' };
  const el = document.createElement('div');
  el.className = `toast ${tipo}`;
  el.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icones[tipo]}</svg><div></div>${acao ? '<button type="button" class="link"></button>' : ''}<button type="button" class="btn icon xs ghost" aria-label="Fechar aviso">✕</button>`;
  el.querySelector('div').textContent = texto;
  const fechar = () => el.remove();
  if (acao) { const b = el.querySelector('.link'); b.textContent = acao; b.addEventListener('click', () => { aoAgir?.(); fechar(); }); }
  el.querySelector('.btn').addEventListener('click', fechar);
  regiao.append(el);
  setTimeout(fechar, ms);
  return el;
}
