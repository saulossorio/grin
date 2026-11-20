# Mudanças

## 2.3 · 20/11/2026
- Busca na documentação: botão no topo e na barra lateral, atalho <kbd>⌘K</kbd> (ou <kbd>/</kbd>). Acha componentes, seções, tokens, classes (por exemplo `.btn`) e exemplos; o índice é lido das próprias páginas, então nunca fica desatualizado.
- Tema, alto contraste, densidade e tamanho da fonte saem do topo e vão para um único menu "Aparência".
- Página inicial com 14 blocos novos: campo, aviso e toast, navegação, diálogo, menu, passos e progresso, tour, termo, seções que abrem, estado vazio, ícones, raio e sombra, acessibilidade (contraste calculado no tema atual) e tela de referência.
- Busca: sem texto, mostra tudo agrupado na ordem da barra lateral (Componentes, Fundamentos, Padrões, Acessibilidade, Começar, Exemplos) e em ordem alfabética dentro de cada grupo; com texto, primeiro os títulos que começam com a busca, depois os que a contêm, depois classes e texto. Todas as linhas com a mesma altura (título e uma linha de detalhe).
- Menu Aparência não sai mais da tela com a fonte em 125%.
- `theme.js`: `[data-contrast-toggle]` também funciona num interruptor (checkbox). Ícones novos: `sliders`, `corner-down-left`.

## 2.2 · 20/11/2026
**Tela de referência: 1200 px.** Tudo é desenhado e conferido primeiro nesta largura.
- Barra lateral de 248 px (era 272): sobram 952 px para o conteúdo. Quatro indicadores cabem numa linha e a tabela de seis colunas não rola de lado.
- Novos tokens `--size-screen` (1200 px), `--size-content` (1120 px, conteúdo para de crescer em telas maiores) e `--size-prose` (72ch).
- Tabela com margens internas de 12 px (20 px nas bordas) e `td.wrap` para texto longo que pode quebrar linha.
- Título e ações da página lado a lado na tela de referência.

**Tipografia.** Nova seção "Hierarquia" em Fundamentos: cada nível (sobretítulo, título da página, descrição, seção, diálogo, subseção, texto, rótulo, dica, número, código) com tag, tamanho, peso, entrelinha, cor e exemplo, e as regras de uso dos títulos. `.text-sm` passa a 14 px (era 12) e entra `.lead`.

**Componentes para tutoriais e ajuda** (8 novos, total 24):
- Texto longo (`.prose`): largura de leitura, espaço entre títulos, listas, citação, código, figura e lista de definições.
- Passos (`.steps`, vertical e horizontal), com estados feito e atual.
- Seções que abrem (`.accordion`), com `details` nativo e altura animada.
- Progresso (`.progress`, com valor ou sem fim conhecido).
- Dica de ferramenta (`data-tooltip`), popover com botão de ajuda (`.help-button`) e termo com definição (`.term`), em `popover.js`.
- Glossário (`.glossary`) com índice de letras fixo e busca, em `glossary.js`.
- Índice da página (`.toc`) que marca a seção sendo lida, em `toc.js`.
- Tour guiado (`startTour()` em `tour.js`): véu com recorte no ponto mostrado, cartão com passo, barra de progresso, voltar e próximo, teclado e Esc.
- Novo exemplo: `examples/tutorial.html`. Novos ícones: `help-circle`, `arrow-left`, `arrow-right`, `lightbulb`, `book-open`, `map`, `clock`.

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
