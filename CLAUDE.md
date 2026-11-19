# Canis Design System

Design system das ferramentas da família Canis (Canis, Laika/Canis Lite, Vezen). Repositório: github.com/saulossorio/canis-design-system, publicado no GitHub Pages.

- O dono do produto escreve em espanhol: responda em espanhol, curto. A documentação fica em português do Brasil.
- Fonte de verdade das cores e medidas: `tokens/`. Depois de mudar um JSON, rode `node tools/build-tokens.mjs` e `node tools/check-contrast.mjs`. Nunca edite `styles/variables.css` à mão.
- Componentes só usam tokens semânticos. Nada de cor escrita direto em `components/`.
- Componente novo: siga "Como criar um componente novo" em `docs/components.html`.
- Antes de mudar fonte, cor da marca ou outra escolha central, proponha opções e pergunte.
- Esta pasta (Proton Drive) não tem `.git`; a publicação é feita por um clone temporário. Depois de publicar, espere o GitHub Pages atualizar e confira a página antes de avisar.
