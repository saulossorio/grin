# Grin

Grin: design system independente, feito do zero. Nome escolhido pelo dono em 19/11/2026. Canis, Laika e Vezen serviram só de referência: não cite essas ferramentas, a 4Network nem o Sirius na documentação, nos exemplos ou nos tokens. Repositório: github.com/saulossorio/grin, publicado no GitHub Pages.

- O dono do produto escreve em espanhol: responda em espanhol, curto. A documentação fica em português do Brasil.
- Fonte de verdade das cores e medidas: `tokens/`. Depois de mudar um JSON, rode `node tools/build-tokens.mjs` e `node tools/check-contrast.mjs`. Nunca edite `styles/variables.css` à mão.
- Componentes só usam tokens semânticos. Nada de cor escrita direto em `components/`.
- Componente novo: siga "Como criar um componente novo" em `docs/components.html`.
- Antes de mudar fonte, cor da marca ou outra escolha central, proponha opções e pergunte.
- Sincronização igual aos outros projetos: a cópia com git fica em `~/OpenClaw/OpenClawWorkspace-Lerdo/repos/grin`; os commits ali vão sozinhos para esta pasta do Proton (`~/.openclaw/bin/proton-sync.sh`). Mudanças feitas direto no Proton sobem para o GitHub só com o "sim" do dono (`proton-sync.sh --subir`).
- Depois de publicar, espere o GitHub Pages atualizar e confira a página antes de avisar.
