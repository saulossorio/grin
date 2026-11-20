# Grin

Design system com tokens, componentes, padrões de uso e regras de acessibilidade. HTML, CSS e um pouco de JavaScript, sem framework e sem dependências.

**Documentação ao vivo:** https://saulossorio.github.io/grin/

## O que tem

- **Tokens** em três camadas (core, semântica, temas), em JSON, com gerador de CSS.
- **Temas** claro, escuro e alto contraste; **densidades** confortável (44 px, padrão) e compacta (36 px); fonte em 100%, 112,5% e 125%.
- **Cor:** seis escalas de 12 passos em OKLCH (gray, green, teal, blue, amber, red), em claro e escuro. Marca: `#8dc63f`, usada só como acento.
- **Tipografia:** Geist e Geist Mono, servidas pelo próprio repositório (`assets/fonts`, licença OFL).
- **16 componentes:** botão, campo, seleção, interruptor, controle segmentado, chip de filtro, selo, aviso, toast, cartão e indicador, tabela, abas, menu, diálogo, gaveta, estado vazio e a casca do app (barra lateral e topo).
- **Guias:** começar, fundamentos, componentes, padrões e acessibilidade. **Exemplos:** lista de dados, formulário e página de apresentação.
- **Verificações:** contraste nos três temas e coerência entre HTML, CSS e ícones.

## Usar numa ferramenta

Copie `styles/`, `scripts/`, `components/` e `assets/` e ponha no `<head>`:

```html
<script>/* evita piscar o tema errado: aplica a escolha salva antes de pintar */try{var r=document.documentElement,q=new URLSearchParams(location.search).get('theme'),t=q||localStorage.getItem('grin-theme');if(t&&t!=='system')r.dataset.theme=t;if(localStorage.getItem('grin-density')==='compact')r.dataset.density='compact';var s=localStorage.getItem('grin-scale');if(s&&s!=='100')r.dataset.scale=s;}catch(e){}</script>
<link rel="stylesheet" href="styles/fonts.css">
<link rel="stylesheet" href="styles/variables.css">
<link rel="stylesheet" href="styles/global.css">
<link rel="stylesheet" href="styles/components.css">
<script type="module" src="scripts/theme.js"></script>
```

| Atributo na tag `<html>` | Efeito |
|---|---|
| nenhum | Segue o sistema (claro, escuro ou alto contraste) |
| `data-theme="light"`, `"dark"`, `"hc"` | Fixa o tema |
| `data-density="compact"` | Controles de 36 px e texto de 14 px |
| `data-scale="112"` ou `"125"` | Fonte em 112,5% ou 125% |

`data-theme` e `data-density` também valem numa seção (qualquer elemento), por exemplo para mostrar um painel escuro dentro de uma página clara.

Comportamento opcional: `components/dialog/dialog.js` (diálogo e gaveta), `components/tabs/tabs.js`, `components/toast/toast.js`. Ícones: `<i data-icon="search"></i>` e `paintIcons()` de `scripts/utils.js`.

Ferramenta de arquivo único: cole o CSS num `<style>`, troque o `url()` das fontes por `data:font/woff2;base64,…` e cole os scripts num `<script type="module">`.

## Estrutura

```
index.html              visão geral
docs/                   getting-started, foundations, components, patterns, accessibility
examples/               dashboard, form, landing
tokens/
  core/                 colors.json (escalas), spacing.json (espaço, raio, medidas, sombras), typography.json (fontes, tipos, movimento)
  semantic/colors.json  o papel de cada cor; os componentes só usam estes
  themes/               light.json, dark.json, high-contrast.json
styles/
  fonts.css             @font-face de Geist e Geist Mono
  variables.css         GERADO a partir de tokens/; não edite
  global.css            reset, tipografia, foco, utilitários, animações
  components.css        importa o CSS de cada componente
  docs.css              só das páginas de documentação
  home.css              só da página inicial (index.html)
components/<nome>/      <nome>.html (exemplo comentado), <nome>.css, <nome>.js quando há comportamento
                        ("input" guarda os campos e "sidebar" guarda a casca do app)
scripts/                theme.js, utils.js (ícones, contraste), animations.js, docs-shell.js (só documentação)
assets/                 fonts/ (Geist, Geist Mono, OFL.txt) e favicon.svg
tools/                  build-tokens.mjs, check-contrast.mjs, check-markup.mjs
design/figma-link.txt   link do Figma, quando existir
```

## Convenções

- **Código em inglês, textos em português do Brasil.** Classes, variáveis, ícones e funções em inglês; documentação e textos de interface em português.
- **Classes:** bloco (`.card`), partes com hífen (`.card-header`), variações como classe a mais (`.btn.primary`, `.btn.xs`).
- **Tons:** sempre `crit`, `warn`, `info`, `ok`, `brand` (`.badge.crit`, `.alert.warn`, `.dot.ok`).
- **Estados no HTML:** `aria-current`, `aria-selected`, `aria-pressed`, `aria-invalid`, `disabled`, `hidden`.
- **Cor só por token semântico.** Nenhuma cor escrita direto num componente.

## Mudar algo

| Para | Faça |
|---|---|
| Mudar uma cor, medida ou fonte | Edite o JSON em `tokens/`, rode `node tools/build-tokens.mjs` e `node tools/check-contrast.mjs` |
| Criar um componente | Siga "Novo componente" em `docs/components.html` |
| Conferir antes de publicar | `node tools/check-contrast.mjs && node tools/check-markup.mjs` |

Anote cada mudança em `CHANGELOG.md`.

## Ver localmente

Os scripts são módulos ES, que o navegador não carrega por `file://`:

```
python3 -m http.server 8000
```

e abra http://localhost:8000. Para abrir num tema: `?theme=dark` (ou `light`, `hc`).

## Licença das fontes

Geist e Geist Mono: SIL Open Font License 1.1, em `assets/fonts/OFL.txt`.
