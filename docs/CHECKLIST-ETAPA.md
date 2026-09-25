# Checklist: etapa certa

Tudo marcado antes de pedir o "ok".

## Funcional
- [ ] Faz o que a linha da etapa no roteiro promete, e nada além.
- [ ] Caminho feliz testado no navegador, clicando.
- [ ] Estados vazio, carregando e erro existem nas telas tocadas.
- [ ] Nenhum dado pedido duas vezes.

## Técnico
- [ ] `npm run build` sem erro.
- [ ] Console do navegador limpo.
- [ ] `node scripts/check-licenses.mjs` OK; dependência nova justificada no registro.
- [ ] Nenhuma chave ou segredo no código; `.env` fora do git.
- [ ] A partir da E2: toda tabela nova tem `org_id` e política RLS usando `is_member()`; `npm run test:rls` passa.

## Design
- [ ] Só tokens de `src/styles/tokens.css`; nenhuma cor solta.
- [ ] Escala de tipo da régua; rótulos em Plex Mono.
- [ ] 375px: sem rolagem lateral, alvos ≥ 44px, campos com fonte ≥ 16px.
- [ ] 1280px: largura máxima respeitada, barra lateral correta.
- [ ] Tema escuro legível.
- [ ] Foco visível com teclado.
- [ ] Texto claro, do ponto de vista de quem usa; sem jargão técnico.

## Processo
- [ ] Registro da etapa escrito no roteiro (seção 6).
- [ ] `docs/ESTADO.md` atualizado.
- [ ] Commit `E?: …` enviado para o GitHub e CI verde.
- [ ] Status 🟨 no roteiro.
