# Estado entre sessões

Atualize ao fim de cada sessão. É o bilhete para a próxima pessoa ou IA.

## Última sessão
- Data: 25/09/2026
- Etapa: E1 — Esqueleto navegável → 🟨 pronta p/ revisão
- Última ação: casca responsiva, rotas e telas vazias no ar; commit enviado.

## Etapa atual
- Aguardando "ok" do dono na E1.
- Próxima: E2 (Supabase). Antes de começar, o dono precisa criar o projeto Supabase na região São Paulo e passar a URL + chave anon (vão no `.env`, nunca no git).

## Decisões em aberto (do dono)
- Fundir Descarte com Retenção e Gestão de Acessos com Segurança?
- ROPA vira tela do app ou continua planilha?
- Quem aprova documento: só o dono da empresa ou também o consultor?
- Cobrança por empresa ou por consultor?
- Ativar proteção da `main` exigindo o check **licencas**.

## Armadilhas conhecidas
- O `license-checker` do npm não serve: `--failOn` só pega nome exato. Use `scripts/check-licenses.mjs`.
- As datas de criação dos arquivos da pasta-base são todas 25/09/2026 (cópia). Compare por data de modificação e conteúdo.
