# Grin

Leia `AGENTS.md` inteiro antes de mudar qualquer coisa. Ele tem as regras do projeto, as fontes de verdade e as verificações antes de commitar.

**Linguagem (obrigatório).** Qualquer texto que você escrever no Grin, inclusive CHANGELOG, comentários e respostas que vão para a documentação, segue a seção "Linguagem" de `AGENTS.md`. Resumo: texto objetivo e técnico, frases completas e afirmativas, sem marketing, sem metáforas, sem tom de conversa, sem dois-pontos abrindo enumerações e sem listas dentro de frases. O dono já rejeitou várias vezes textos fora dessas regras.

Abaixo, só o que vale para o Claude Code nesta máquina.

- O dono escreve em espanhol: responda em espanhol, curto (conclusão e, se precisar, uma pergunta). A documentação do Grin fica em português do Brasil.
- Grin é independente e feito do zero (nome escolhido pelo dono em 19/11/2026). Não mencione outras ferramentas dele como origem.
- Antes de mudar fonte, cor da marca ou outra escolha central sem pedido explícito, proponha opções e pergunte.
- Onde trabalhar: na cópia com git em `~/OpenClaw/OpenClawWorkspace-Lerdo/repos/grin`. Os commits dali vão sozinhos para `Proton Drive/Archive/Projects/grin` (`~/.openclaw/bin/proton-sync.sh`). Mudanças feitas direto no Proton só sobem para o GitHub com o "sim" do dono (`proton-sync.sh --subir`).
- O hook `pre-commit` recusa commits que removem arquivos; não use `--no-verify`. Para remover algo, pergunte ao dono.
- Remoto por HTTPS (o SSH para o GitHub não funciona nesta máquina).
- Depois do push, espere o GitHub Pages terminar o build (`gh api repos/saulossorio/grin/pages/builds/latest`) e confira a página antes de avisar.
