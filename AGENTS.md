# Grin: instruções para agentes de IA

Leia este arquivo inteiro antes de mudar qualquer coisa. O README.md explica o projeto para pessoas; aqui estão as regras de trabalho. A seção **Linguagem** vale para qualquer texto que você escrever.

## O que é

Grin é um design system independente, feito do zero. Arquivos HTML, CSS e módulos JavaScript; o único passo de geração é `tools/build-tokens.mjs`. Publicado no GitHub Pages a partir da branch `main`: https://saulossorio.github.io/grin/

Os exemplos usam produtos e dados fictícios ("Agenda", "Prumo", "Norte Sul"). Todo texto segue a seção **Linguagem**, logo abaixo.

## Linguagem (obrigatório)

Leia esta seção antes de escrever qualquer texto. Ela vale para a documentação, o README, o CHANGELOG, os comentários no código, os textos alternativos e as descrições de componentes. O dono rejeitou várias vezes textos fora destas regras.

### Regras

1. Diga o que a coisa é, o que faz e como usar. Nada além disso.
2. Use termos técnicos simples e os nomes que designers e desenvolvedores já conhecem (modal, tooltip, acordeão, stepper).
3. Escreva frases completas, curtas e afirmativas, em voz ativa.
4. Não use linguagem de marketing. Isso inclui slogans, promessas, benefícios ("sem trabalho extra", "pronto para usar", "pensado para quem…") e ênfases ("puro", "simples", "poderoso", "elegante", "moderno").
5. Não use metáforas nem figuras ("peças", "telas de trabalho", "num relance", "se recolhe sozinha", "a pessoa esquece").
6. Não use tom de conversa nem de vendedor. Sem "você vai…", "Quem usa X recebe Y", exclamações ou perguntas retóricas.
7. Não use dois-pontos para abrir uma enumeração dentro da frase, nem listas numeradas dentro de uma frase ("1. … 2. …"). Uma lista de verdade vai num `<ul>`, `<ol>` ou numa tabela.
8. Não enumere o que a pessoa não precisa. Cite só o necessário.
9. Títulos são nomes de seção ("Temas", "Recursos dos componentes"), nunca frases de efeito.
10. Instruções e checklists falam com quem desenha ou programa a tela. Cada item diz o requisito e, se ajudar, como implementar ou testar. Não escreva como instrução para o usuário final.
11. Documentação em português do Brasil, código em inglês. Maiúscula só no início da frase e em nomes próprios.
12. Não cite outras ferramentas ou empresas como origem do Grin.

### Exemplos reais já recusados

| Evite | Use |
|---|---|
| Clareza para telas cheias de dados. | (sem slogan; título "Grin" e uma frase descritiva) |
| Um conjunto de regras, peças e exemplos para construir telas de trabalho… | Grin é um design system para interfaces web. |
| Design system para interfaces web: tokens, 25 componentes, padrões… | Ele reúne os tokens de estilo, os componentes e as regras de uso e de acessibilidade. |
| HTML, CSS e JavaScript puros, sem dependências e sem etapa de build. | (remover; dizer só o necessário para instalar) |
| 1. Baixe os arquivos. 2. Copie as pastas. 3. Adicione… | Como baixar o Grin e usá-lo num projeto. |
| O que já vem pronto | Recursos dos componentes |
| Quem usa os componentes do Grin recebe isto sem trabalho extra. | Comportamentos de acessibilidade implementados nos componentes do Grin. |
| Seções que abrem | Acordeão |
| A barra se recolhe sozinha abaixo de 1100 px. | Abaixo de 1100 px, a barra recolhe automaticamente. |
| Toda ação funciona pelo teclado, numa ordem lógica. (checklist) | Garanta que todas as ações funcionem pelo teclado, com o foco na ordem de leitura. |

### Exceção

Os textos de interface dentro dos exemplos fictícios (por exemplo, os botões e mensagens do produto "Agenda") seguem a seção Escrita de `docs/patterns.html`, porque simulam o texto de um produto.

### Antes de commitar texto

Releia cada frase nova contra as regras acima. Se uma frase tiver dois-pontos seguidos de lista, um adjetivo de valor, uma metáfora ou falar com o usuário final, reescreva.

## Fontes de verdade

1. `tokens/*.json`: cores, medidas, tipos, movimento. `styles/variables.css` é gerado; nunca edite à mão.
2. `components/<nome>/<nome>.css`: o estilo de cada componente. `styles/components.css` só importa.
3. `docs/components.html`: a documentação de cada componente (exemplo ao vivo, classes, quando usar).

## Regras

- Componentes usam só tokens semânticos (`var(--crit-fg)`), nunca cor literal nem token de escala.
- Nomes: classes, variáveis CSS, ícones e funções JS em inglês. Textos de interface e documentação em português do Brasil.
- Classes: bloco, partes com hífen (`.card-header`), variações como classe extra (`.btn.primary`). Tons: `crit`, `warn`, `info`, `ok`, `brand`. Estados por atributos ARIA, não por classe.
- Nenhuma informação só por cor. Texto a 4,5:1 (7:1 no alto contraste), interface a 3:1.
- Movimento só como resposta a uma ação, de 140 a 320 ms, sempre desligado por `prefers-reduced-motion`.
- Não apague nem renomeie arquivos: o repositório tem um hook que bloqueia commits com remoções (proteção da cópia no Proton Drive do dono). Se precisar remover, pergunte ao dono.
- Não troque a fonte, a cor da marca (`#8dc63f`) ou o nome sem o dono pedir.

## Antes de commitar

```
node tools/build-tokens.mjs      # se mexeu em tokens/
node tools/check-contrast.mjs    # contraste nos quatro temas
node tools/check-markup.mjs      # toda classe usada existe no CSS e todo ícone existe
node tools/bundle.mjs            # regenera dist/ (sempre que mudar CSS, JS ou tokens)
```

Depois confira as páginas num servidor local (`python3 -m http.server`) nos temas claro e escuro, cada um com e sem alto contraste (`?theme=dark`, `?theme=light&contrast=more`, `?theme=dark&contrast=more`) e numa largura de celular. Anote a mudança em `CHANGELOG.md` e, se a versão mudar, em `scripts/docs-shell.js` (`VERSION`) e nos rodapés.

## Tarefas comuns

- **Mudar uma cor:** escolha o passo certo da escala em `tokens/core/colors.json` (papéis dos passos na descrição do arquivo), mude o mapeamento em `tokens/semantic/colors.json` e nos dois temas em `tokens/themes/`, gere e confira o contraste.
- **Novo componente:** siga "Novo componente" em `docs/components.html`. Se tiver JavaScript, inclua o arquivo em `MODULES` de `tools/bundle.mjs`.
- **Partes obrigatórias em toda ferramenta feita com o Grin:** barra lateral do Grin com `sidebar.js` e o botão redondo de recolher (nunca um botão próprio), versão no logo (`.tag`), desenho do logo dentro de um quadrado de 24 × 24 px, centralizado e sem distorcer, botão de tema com sol e lua (`data-theme-toggle`), painel Aparência (`data-appearance`: tema, alto contraste, densidade e fonte), tela inicial com `.start-screen` (coluna centralizada de 680 px, `--size-start`, conteúdo no centro vertical, ver Padrões › Tela inicial), assinatura `.app-footer` só na tela inicial e nas páginas de documentação ou ajuda (nunca nas telas de trabalho), como último elemento do conteúdo: a tela tem pelo menos `100vh`, então com pouco conteúdo a assinatura fica no fim da janela e com mais conteúdo rola junto (nunca `position: fixed` ou `sticky`), ícones do Grin para a interface, Geist e tokens. Lista completa em "Obrigatório em toda ferramenta", em `docs/installation.html`.
- **Adotar o Grin em outra ferramenta:** siga "Adotar o Grin num projeto existente" em `docs/installation.html`. Copie os arquivos de `dist/` de uma versão publicada em Releases, nunca do ramo principal.
- **Publicar uma versão:** depois do commit e do build do Pages, crie a tag e a release: `git tag vX.Y && git push origin vX.Y && gh release create vX.Y --notes "…"` (as notas são a entrada do CHANGELOG).
- **Novo ícone:** acrescente o desenho (viewBox 24, traço 2, estilo Lucide) em `ICONS` de `scripts/utils.js`.
