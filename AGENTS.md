# Grin: instruções para agentes de IA

Leia este arquivo inteiro antes de mudar qualquer coisa. O README.md explica o projeto para pessoas; aqui estão as regras de trabalho.

## O que é

Grin é um design system independente, feito do zero. HTML, CSS e JavaScript puros, sem framework, sem build além de `tools/build-tokens.mjs`. Publicado no GitHub Pages a partir da branch `main`: https://saulossorio.github.io/grin/

Textos da documentação: diretos e descritivos, sem frases de marketing nem slogans (títulos são nomes de seção: "Temas", "Cor"). Não cite outras ferramentas ou empresas como origem do Grin na documentação, nos exemplos, nos tokens ou nos comentários. Os exemplos usam produtos e dados fictícios ("Agenda", "Prumo", "Norte Sul").

## Fontes de verdade

1. `tokens/*.json`: cores, medidas, tipos, movimento. `styles/variables.css` é gerado; nunca edite à mão.
2. `components/<nome>/<nome>.css`: o estilo de cada componente. `styles/components.css` só importa.
3. `docs/components.html`: a documentação de cada componente (exemplo ao vivo, classes, quando usar).

## Regras

- Componentes usam só tokens semânticos (`var(--crit-fg)`), nunca cor literal nem token de escala.
- Nomes: classes, variáveis CSS, ícones e funções JS em inglês. Textos de interface e documentação em português do Brasil.
- Classes: bloco, partes com hífen (`.card-header`), variações como classe extra (`.btn.primary`). Tons: `crit`, `warn`, `info`, `ok`, `brand`. Estados por atributos ARIA, não por classe.
- Nenhuma informação só por cor. Texto a 4,5:1 (7:1 no alto contraste), interface a 3:1.
- Movimento só como resposta a uma ação, de 120 a 220 ms, sempre desligado por `prefers-reduced-motion`.
- Não apague nem renomeie arquivos: o repositório tem um hook que bloqueia commits com remoções (proteção da cópia no Proton Drive do dono). Se precisar remover, pergunte ao dono.
- Não troque a fonte, a cor da marca (`#8dc63f`) ou o nome sem o dono pedir.

## Antes de commitar

```
node tools/build-tokens.mjs      # se mexeu em tokens/
node tools/check-contrast.mjs    # contraste nos três temas
node tools/check-markup.mjs      # toda classe usada existe no CSS e todo ícone existe
```

Depois confira as páginas num servidor local (`python3 -m http.server`) nos temas claro e escuro, cada um com e sem alto contraste (`?theme=dark`, `?theme=light&contrast=more`, `?theme=dark&contrast=more`) e numa largura de celular. Anote a mudança em `CHANGELOG.md` e, se a versão mudar, em `scripts/docs-shell.js` (`VERSION`) e nos rodapés.

## Tarefas comuns

- **Mudar uma cor:** escolha o passo certo da escala em `tokens/core/colors.json` (papéis dos passos na descrição do arquivo), mude o mapeamento em `tokens/semantic/colors.json` e nos dois temas em `tokens/themes/`, gere e confira o contraste.
- **Novo componente:** siga "Novo componente" em `docs/components.html`.
- **Novo ícone:** acrescente o desenho (viewBox 24, traço 2, estilo Lucide) em `ICONS` de `scripts/utils.js`.
