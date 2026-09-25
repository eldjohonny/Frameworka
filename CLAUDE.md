# Instruções para IA

- Comece sempre por `ROTEIRO.md` e `docs/ESTADO.md`. Siga `docs/PROCESSO.md`.
- Uma etapa por vez; não avance sem o "ok" do dono.
- Premissas fixas do roteiro (seção 3) valem acima de qualquer preferência sua.
- Visual: só tokens de `src/styles/tokens.css` e componentes de `src/ui`. Mobile first.
- Dados passam por `src/data` (interface `Db`); nunca chamar Supabase direto de uma tela.
- Dependência nova: conferir licença e rodar `node scripts/check-licenses.mjs`.
