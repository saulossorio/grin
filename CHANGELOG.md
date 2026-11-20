# Mudanças

## 2.1 · 20/11/2026
- Alto contraste separado do tema: `data-contrast="more"` funciona no claro e no escuro (novo `tokens/themes/high-contrast-dark.json`). Trocar entre claro e escuro mantém o alto contraste. `data-contrast="normal"` desliga mesmo se o sistema pedir mais contraste.
- `theme.js`: `setContrast()`, `getContrast()`, `effectiveContrast()` e o botão `[data-contrast-toggle]`. O antigo `data-theme="hc"` (e `?theme=hc`) vira claro com alto contraste.
- Página inicial com painel de blocos feitos com os componentes reais.
- `check-contrast.mjs` confere os quatro temas.

## 2.0 · 20/11/2026
Novo visual, mais amplo e legível.

**Fundamentos**
- Neutros quase sem matiz (antes com viés verde), no claro e no escuro. O verde da marca fica para ação principal, item atual e marca.
- Densidade confortável passa a ser o padrão: controles de 44 px e texto de 16 px. A compacta (36 px, 14 px) vale com `data-density="compact"`.
- Raios maiores: 6, 10, 12, 16 e 20 px (`--radius-xl` é novo). Sombras mais suaves e a nova `--shadow-control` (leve relevo na base dos botões).
- Títulos maiores: h1 32 px, h2 24 px, h3 18 px.
- Movimento: 140, 220 e 320 ms e a nova curva `--ease-spring`, que passa um pouco do ponto e volta. Desligado com "reduzir movimento".
- Sai a faixa verde do topo (`.brand-bar`).

**Componentes**
- Abas como trilho com uma peça branca que desliza até a aba escolhida (`tabs.js`); no celular quebram em duas colunas em vez de rolar de lado.
- Casinha de marcar e rádio próprios, com o visto desenhado com um pequeno salto; interruptor maior.
- Indicador com ícone em destaque (`.stat-icon`) e comparação em pílula (`.delta`).
- Novos: avatar com iniciais (`.avatar`), célula principal com avatar e segunda linha (`.cell-main`), cabeçalho e barra de ferramentas da tabela (`.table-header`, `.table-toolbar`), páginas numeradas (`.pages`), tabela que vira lista de cartões no celular (`.table-cards`), resumo de números do registro (`.facts`), ícone do diálogo (`.dialog-icon`), cartão da conta na barra lateral (`.account`), trilha de navegação (`.breadcrumb`) e descrição da página (`.page-description`).
- Tabela dentro de um cartão, com linhas de 64 px; gaveta flutuante com cantos arredondados; véu desfocado atrás de diálogo e gaveta; toast que entra com salto e sai suavemente.
- Logotipo: o triângulo fica centrado na altura das maiúsculas.

## 1.1.1 · 19/11/2026
- Marca do Grin: triângulo equilátero verde antes da palavra, com altura de 2/3 da altura das maiúsculas (0,473 em), apoiado na linha de base. Substitui o quadrado com G, também no favicon.
- Tipografia: base de 16 px e só tamanhos pares (10, 12, 14, 16, 18, 20, 24, 32, 40). Saíram 11, 13, 15 e 30 px; `--text-md` e `--text-body` deixaram de existir. Controles: 14 px na densidade compacta, 16 px na confortável.
- Página inicial volta ao formato das demais páginas da documentação: o que é, conteúdo, instalação e princípios.
- Documentação no celular: a barra lateral virou uma gaveta aberta pelo botão do topo, em vez de uma faixa de links.
- Tema e densidade por seção: `data-theme` e `data-density` agora valem em qualquer elemento, não só na raiz.

## 1.1 · 19/11/2026
Revisão completa de design e de organização.

**Visual**
- Tipografia: Geist e Geist Mono (variáveis, com algarismos tabulares), servidas do próprio repositório em `assets/fonts`. Saiu a Public Sans.
- Cor: seis escalas de 12 passos em OKLCH (gray, green, teal, blue, amber, red), em claro e escuro, com papéis fixos por passo. Neutros quase cinza com leve viés verde. Tema escuro quase preto. A marca continua `#8dc63f`.
- Raios 4, 6, 8 e 12 px; quatro níveis de sombra; três durações de movimento.
- Componentes refinados: botões com sombra leve e hover mais claro, campos com hover, chips em pílula, selos menores, tabela com linhas de 40 px e números tabulares, diálogo com rodapé destacado, menus e toasts mais compactos. Faixa da marca de 6 para 3 px.
- Novos componentes: abas (com teclado) e interruptor. Novos: grupo de botões, opção com descrição, filtro de gravidade, barra de paginação.

**Organização**
- Classes renomeadas para um padrão único em inglês (bloco, partes com hífen, variações como classe extra; tons `crit`, `warn`, `info`, `ok`, `brand`).
- JavaScript e nomes de ícones em inglês (`icon()`, `paintIcons()`, `setTheme()`, `toast(text, { type, action, onAction })`). Tema guardado em `grin-theme`; `?theme=` na URL.
- Documentação reorganizada: visão geral, Começar (novo), Fundamentos com valores ao vivo e escalas, Componentes com exemplo, código, classes e quando usar, Padrões e Acessibilidade.
- Nova verificação `tools/check-markup.mjs`: toda classe usada existe no CSS e todo ícone existe.
- `AGENTS.md` com as regras para agentes de IA; `CLAUDE.md` passa a apontar para ele.

## 1.0 · 19/11/2026
- Primeira versão: tokens em três camadas, temas claro, escuro e alto contraste, duas densidades, 14 componentes, 3 exemplos e 4 guias.
