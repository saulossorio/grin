# Mudanças

## 2.15 · 20/11/2026
- Select do Grin: um combobox com `input[readonly]` mostra a lista no estilo do Grin no lugar da lista do sistema, com a opção marcada e teclado.
- Revisão do movimento dos elementos novos. A lista do combobox entra crescendo e sai esmaecendo, e as tags entram com um pequeno salto e saem encolhendo.
- O ícone da aba do navegador passa a ser pedido com `?v=2`, para os navegadores que guardaram o ícone antigo mostrarem o triângulo.
- O link "ver mais" abre e fecha com animação de altura. O medidor muda de nível com transição.
- O arquivo escolhido no upload e o banner aparecem com transição. O item marcado no menu ganha um visto animado.

## 2.14 · 20/11/2026
Revisão dos elementos usados nas ferramentas que vão adotar o Grin. Os que faltavam foram criados ou viraram variantes.
- Novos componentes: campo com prefixo e sufixo, combobox (com busca, grupos e várias escolhas em tags), upload de arquivo, banner, card de ação, medidor, gráfico (legenda e lista de barras), fórmula e cálculo e histórico. Total de 35.
- Campo de formulário com valor original (`.field-original`), lista editável (`.repeater`) e rodapé fixo (`.form-footer`).
- Tabela com coluna fixa ao rolar de lado, indicador de ordenação, contagem de filtro no cabeçalho, alça para redimensionar, cabeçalho de linha, célula derivada, célula com diferença, link na célula, linha excluída, linha aberta, rolagem com altura fixa, aviso para marcar todos os resultados e linhas por página.
- Menu com segunda linha e itens de escolha. Modal largo (`.dialog.wide`). Botão de alternar (`aria-pressed`). Opção desativada no controle segmentado. Link "ver mais" (`details.disclosure`). Tela de carregamento (`.loading-overlay`).
- Barra superior com busca e botão da conta (`.user-button`). Painel lateral fixo ao lado de um formulário (`.with-aside`).
- No celular, a barra lateral vira um drawer com botão de menu.
- Estilos de impressão que escondem a navegação e as camadas flutuantes.

## 2.13 · 20/11/2026
- Estrutura da tela em Padrões dividida em cabeçalho e corpo.
- Esquema do cabeçalho com nomes genéricos, indicando o que é obrigatório e o que é opcional.
- Cinco tipos de tela em abas (lista, formulário, painel de números, detalhe de um item, conteúdo e ajuda), cada um com esquema numerado, uso e exemplo.
- Checklist de acessibilidade com o requisito e, abaixo, como implementar ou testar.
- Revisão do tom dos textos de Início, Instalação, Fundamentos, Padrões e Acessibilidade.
- Seção Linguagem em AGENTS.md, com regras e exemplos recusados. CLAUDE.md, README, Instalação, Padrões e Componentes apontam para ela.

## 2.12 · 20/11/2026
- Padrões refeito com exemplos visuais. A estrutura da tela aparece num esquema numerado, e busca, formulários, mensagens de erro, confirmação, estados da tela, gráficos e escrita aparecem com componentes reais e pares de faça e evite.
- Números, datas e escrita viram tabelas de "assim" e "não assim".
- Acessibilidade refeita. O checklist fica dividido em quatro grupos e mostra quantos itens já foram conferidos.
- O contraste de cada par de cores aparece num cartão com amostra, razão e resultado, e "O que já vem pronto" aparece em cartões.

## 2.11 · 20/11/2026
- O Início mostra as novidades da última versão e os blocos visuais de todas as partes do Grin.
- As novidades vêm do registro de mudanças e se atualizam sozinhas a cada versão.
- A página Resumo saiu do menu e redireciona para o Início.
- Os textos da documentação seguem uma regra de tom em AGENTS.md, com frases diretas e sem enumerações dentro da frase.

## 2.10 · 20/11/2026
Documentação reorganizada para quem chega pela primeira vez.
- **Início** vira uma introdução sem jargão: o que é o Grin, para que serve, como ele é, como o site está organizado e por onde começar (designer, desenvolvedor, quem escreve os textos).
- **Resumo** (`docs/overview.html`, novo): os blocos visuais que estavam no Início.
- **Instalação** (`docs/installation.html`, substitui "Começar"): botões para baixar o .zip e abrir o GitHub, requisitos e navegadores, pastas necessárias, o que incluir no `<head>`, página mínima completa, uso direto sem baixar, tabela de todos os comportamentos em JavaScript, tema e preferências com a API, uso com React/Vue, como mudar tokens, estrutura e convenções. `docs/getting-started.html` redireciona para ela.
- Todo bloco de código dos guias tem botão Copiar.
- A busca inclui Início, Resumo e Instalação.

## 2.9 · 20/11/2026
- Barra lateral com dois níveis de importância: os lugares do produto em cima; ajuda, ajustes e conta embaixo, separados por uma linha, em texto menor e mais discreto (`.sidebar-footer` com `.nav-item.small`).
- Novos: `.nav-divider` (separa grupos sem título) e `.nav-sub` (subitens com trilho fino e o atual marcado em verde, como Tutoriais › Importar convidados).

## 2.8 · 20/11/2026
- Slider com marcas (`data-stops`): o botão acompanha o arraste sem saltos e, ao soltar, desliza em 180 ms até a marca mais próxima; as setas do teclado pulam de marca em marca. Antes ele pulava de 12,5 em 12,5 e o tamanho da fonte mudava a cada movimento, o que travava a página.
- Tamanho da fonte (menu Aparência) muda uma vez, ao soltar o slider.
- Correção: `theme.js` disparava "change" no slider ao sincronizar e podia entrar em repetição.
- Uma busca só: fica o campo do topo (e ⌘K); saiu o da barra lateral.

## 2.7 · 20/11/2026
- Barra lateral recolhível como comportamento do componente (`components/sidebar/sidebar.js`): botão redondo na borda (ou qualquer `[data-sidebar-toggle]`), largura animada, escolha guardada em `grin-sidebar`, nome de cada item como tooltip quando recolhida, títulos de grupo viram uma linha. Abaixo de 1100 px se recolhe sozinha se a pessoa não escolheu; no celular nunca fica só com ícones.
- Em 1024 px, com a barra recolhida, a tabela do exemplo de lista cabe inteira.
- Vale na documentação e nos exemplos (lista, formulário, tutorial).

## 2.6 · 20/11/2026
Revisão de todas as páginas em 390, 768, 1024, 1200, 1440, 1920 e 2560 px.
- Telas grandes: o conteúdo do app cresce até 1440 px (`--size-content`, era 1120) e depois fica centralizado; páginas de leitura param em 1120 px, também centralizadas. Antes ficava tudo encostado à esquerda.
- Quatro indicadores nunca ficam 3 + 1: uma linha de quatro, ou duas de dois abaixo de 1100 px.
- Página inicial entre 960 e 1100 px: dois blocos por linha.
- Celular: tabelas da documentação viram blocos empilhados (nada cortado); a tabela do bloco da página inicial mostra só nome e situação; o topo do exemplo de apresentação cabe em 375 px.
- Exemplo de apresentação usava `.steps` próprio, que agora colide com o stepper do Grin: renomeado para `.how`.

## 2.5 · 20/11/2026
- Novo componente: slider (`input.slider[type=range]`, `slider.js`), com valor ao lado, pontas "A" pequena e grande e marcas por passo. Total: 25 componentes.
- Menu Aparência: o tamanho da fonte agora é um slider (100%, 112,5%, 125%) que aplica enquanto arrasta.
- Popovers e menus calculam o espaço sem a barra de rolagem: o menu Aparência não fica mais cortado embaixo dela.

## 2.4 · 20/11/2026
- Nomes de componentes pelos termos que designers e desenvolvedores usam: Acordeão (era "Seções que abrem"), Stepper (Passos), Texto corrido (Texto longo), Modal e drawer (Diálogo e gaveta), Alerta (Aviso), Badge, status e avatar (Selo), Card e indicador (Cartão), Campo de formulário, Checkbox, rádio e interruptor (Seleção), Tooltip, popover e termo, Barra de progresso. As classes não mudam.
- Cada componente mostra "Também chamado:" com os outros nomes conhecidos (FAQ, collapse, modal, dropdown, snackbar, stepper, onboarding…), e a busca acha por qualquer um deles.
- Acordeão com animação em todos os navegadores (`accordion.js`): a altura abre e fecha, o conteúdo aparece com um leve deslize, a seta gira e a linha escurece ao tocar. `details[name]` abre um por vez. Com "reduzir movimento", abre direto.
- Correção: ao fechar, o acordeão dava um salto de 20 px no fim. Agora a animação é no `details` inteiro (da altura do título até título + painel), a seta gira já no começo do fechamento e um clique no meio do fechamento reabre de onde está.

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
