// Grin appearance panel (also: acessibilidade, preferências de tela, settings). The same four controls in every tool:
// theme, high contrast, density and font size. Markup: an empty <div class="popover appearance" id="…" data-appearance>
// opened by a button with data-popover="…" (popover.js). This script fills it; theme.js and slider.js make it work.
// Every tool built with Grin has this panel on every screen, in the top bar or in the sidebar footer next to the theme button.
import { paintSliders } from '../slider/slider.js';
import { sync } from '../../scripts/theme.js';

let n = 0;
export function mountAppearance(root = document) {
  root.querySelectorAll('[data-appearance]:not([data-ready])').forEach((panel) => {
    const k = `grin-ap${n++}`;
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Aparência');
    panel.innerHTML = `<span class="popover-title">Aparência</span>
      <div class="field"><label class="field-label" for="${k}-theme">Tema</label><select class="select" id="${k}-theme" data-theme-select><option value="system">Do sistema</option><option value="light">Claro</option><option value="dark">Escuro</option></select></div>
      <label class="switch"><input type="checkbox" role="switch" data-contrast-toggle>Alto contraste</label>
      <div class="field"><span class="field-label" id="${k}-dl">Densidade</span><div class="segmented" role="radiogroup" aria-labelledby="${k}-dl">
        <label><input type="radio" name="${k}-density" value="comfortable" data-set-density><span>Confortável</span></label>
        <label><input type="radio" name="${k}-density" value="compact" data-set-density><span>Compacta</span></label>
      </div></div>
      <div class="slider-field">
        <div class="slider-head"><label class="field-label" for="${k}-scale">Tamanho da fonte</label><output for="${k}-scale" data-format="percent">100%</output></div>
        <div class="slider-row"><span class="slider-end small" aria-hidden="true">A</span><input class="slider" type="range" id="${k}-scale" min="100" max="125" step="any" data-stops="100,112.5,125" value="100" data-set-scale><span class="slider-end large" aria-hidden="true">A</span></div>
        <div class="slider-ticks" aria-hidden="true"><span data-value="100">100%</span><span data-value="112.5">112,5%</span><span data-value="125">125%</span></div>
      </div>`;
    panel.dataset.ready = '';
  });
  sync();
  paintSliders(root);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => mountAppearance(), { once: true }); else mountAppearance();
