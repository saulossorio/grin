// Grin toast. toast('Text', { type: 'ok' | 'crit' | 'warn' | 'info', action: 'Desfazer', onAction: fn, duration: 5000 })
// Creates the .toasts region (role="status") on first use, so screen readers announce each message.
import { icon } from '../../scripts/utils.js';

const ICON = { ok: 'check-circle', crit: 'alert-circle', warn: 'alert-triangle', info: 'info' };

export function toast(text, { type = 'ok', action, onAction, duration = 5000 } = {}) {
  let region = document.querySelector('.toasts');
  if (!region) {
    region = Object.assign(document.createElement('div'), { className: 'toasts' });
    region.setAttribute('role', 'status');
    document.body.append(region);
  }
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `${icon(ICON[type] ?? 'info')}<div class="toast-text"></div>${action ? '<button type="button" class="link"></button>' : ''}<button type="button" class="btn icon xs ghost" aria-label="Fechar aviso">${icon('x', 14)}</button>`;
  el.querySelector('.toast-text').textContent = text;
  // Fades out before leaving; with reduced motion the animation is off, so remove right away
  const close = () => { if (!el.isConnected) return; el.classList.add('leaving'); setTimeout(() => el.remove(), matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 220); };
  if (action) {
    const b = el.querySelector('.link');
    b.textContent = action;
    b.addEventListener('click', () => { onAction?.(); close(); });
  }
  el.querySelector('.btn').addEventListener('click', close);
  region.append(el);
  setTimeout(close, duration);
  return el;
}
