# Mudanças

## 1.1.1 · 19/11/2026
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
