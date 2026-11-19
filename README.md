# Canis Design System

Tokens, componentes e regras de interface das ferramentas da família Canis: **Canis** (banco de dados de eventos), **Laika** (revisão de planilhas do Sirius, também chamado Canis Lite) e **Vezen** (estimativa do investimento em TI).

As três nasceram com o mesmo visual: a fonte Public Sans, o verde da 4Network (`#8dc63f`), cinzas levemente esverdeados e tema escuro. Este repositório junta o que já era comum, decide as diferenças e documenta tudo.

**Documentação ao vivo:** https://saulossorio.github.io/canis-design-system/

## Como usar numa ferramenta

```html
<link rel="stylesheet" href="styles/variables.css">
<link rel="stylesheet" href="styles/global.css">
<link rel="stylesheet" href="styles/components.css">
```

- **Tema:** sem atributo, segue o sistema. `data-theme="light"`, `"dark"` ou `"hc"` (alto contraste) na tag `<html>` fixa a escolha. `scripts/theme.js` cuida disso e guarda a escolha.
- **Densidade:** compacta (32 px) é o padrão; `data-density="comfortable"` passa para 40 px.
- **Tamanho da fonte:** `data-scale="112"` ou `"125"`.
- **Ferramentas de arquivo único** (Laika, Vezen): cole o conteúdo das três folhas dentro de um `<style>` e embuta a fonte em base64.

## Estrutura

```
index.html            documentação visual com exemplos ao vivo e troca de tema
styles/
  variables.css       todos os tokens em CSS (gerado; não edite à mão)
  global.css          base: reset, tipografia, foco, utilitários, animações
  components.css      importa o CSS de todos os componentes
  docs.css            estilos só das páginas de documentação
scripts/
  theme.js            tema (sistema, claro, escuro, alto contraste), densidade e fonte
  animations.js       destacar, entrar, rolar; respeita "reduzir movimento"
  utils.js            ícones, cálculo de contraste (inclusive oklch), trechos de código
  docs-shell.js       casca das páginas de documentação
tokens/
  core/               valores brutos: colors.json, spacing.json, typography.json
  semantic/colors.json  o significado de cada cor (usado pelos componentes)
  themes/             light.json, dark.json, high-contrast.json
components/<nome>/    <nome>.html (estrutura), <nome>.css e, se precisar, <nome>.js
examples/             form.html, dashboard.html, landing.html
docs/                 foundations.html, components.html, patterns.html, accessibility.html
design/figma-link.txt
tools/                build-tokens.mjs e check-contrast.mjs
```

## Mudar um token

1. Edite o JSON em `tokens/` (nunca o `variables.css`).
2. `node tools/build-tokens.mjs` gera `styles/variables.css`.
3. `node tools/check-contrast.mjs` confere os pares de texto e interface nos três temas; sai com erro se algum ficar abaixo do mínimo.

Componentes usam só tokens semânticos (`var(--primary)`, `var(--crit-fg)`). Cor escrita direto num componente é erro.

## Regras principais

- Verde só como acento: barra de 6 px no topo, item de menu ativo, chip de filtro ativo, botão primário e foco.
- Nunca só cor: todo estado tem texto, e ícone quando pede atenção.
- Sucesso é azul petróleo (`--ok-fg`), não o verde da marca.
- Texto a 4,5:1 nos temas claro e escuro, 7:1 no alto contraste; bordas de campo e foco a 3:1.
- Movimento de 160 a 200 ms, só como resposta a uma ação; nada com "reduzir movimento".

Detalhes, a tradução dos tokens antigos do Laika e do Vezen e as decisões estão em `docs/foundations.html`.

## Ver localmente

Os scripts são módulos ES, que o navegador não carrega por `file://`. Sirva a pasta:

```
python3 -m http.server 8000
```

e abra http://localhost:8000.
