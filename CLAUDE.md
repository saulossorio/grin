# Canis Design System

Design system das ferramentas da família Canis (Canis, Laika/Canis Lite, Vezen). Repositório: github.com/saulossorio/canis-design-system, publicado no GitHub Pages.

- O dono do produto escreve em espanhol: responda em espanhol, curto. A documentação fica em português do Brasil.
- Fonte de verdade das cores e medidas: `tokens/`. Depois de mudar um JSON, rode `node tools/build-tokens.mjs` e `node tools/check-contrast.mjs`. Nunca edite `styles/variables.css` à mão.
- Componentes só usam tokens semânticos. Nada de cor escrita direto em `components/`.
- Componente novo: siga "Como criar um componente novo" em `docs/components.html`.
- Antes de mudar fonte, cor da marca ou outra escolha central, proponha opções e pergunte.
- Sincronização igual aos outros projetos: a cópia com git fica em `~/OpenClaw/OpenClawWorkspace-Lerdo/repos/canis-design-system`; os commits ali vão sozinhos para esta pasta do Proton (`~/.openclaw/bin/proton-sync.sh`). Mudanças feitas direto no Proton sobem para o GitHub só com o "sim" do dono (`proton-sync.sh --subir`).
- Depois de publicar, espere o GitHub Pages atualizar e confira a página antes de avisar.
