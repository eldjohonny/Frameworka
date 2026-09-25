# Processo de cada etapa

Todo o trabalho segue este ciclo. Ele existe para que qualquer sessão, mesmo começando do zero, retome sem se perder.

## Passo a passo

1. **Ler** `ROTEIRO.md` inteiro e `docs/ESTADO.md`. Identificar a etapa 🟦 ou a primeira ⬜ cuja anterior está ✅.
2. **Sincronizar:** `git pull`. Se houver conflito, resolver antes de qualquer outra coisa.
3. **Planejar:** escrever em `docs/ESTADO.md` (seção "Etapa atual") o que será feito, arquivos a tocar e como verificar. Marcar a etapa 🟦 no roteiro.
4. **Construir** só o escopo da etapa. Reusar `src/ui` e os tokens antes de criar algo novo.
5. **Revisar design:** conferir a régua (seção 4 do roteiro): tokens, escala de tipo, alvo de toque 44px, foco visível, 375px e 1280px, tema escuro.
6. **Revisar pacotes:** cada dependência nova tem licença conferida e motivo anotado no registro. Rodar `node scripts/check-licenses.mjs`.
7. **Verificar de verdade** (ver abaixo). Não basta compilar.
8. **Registrar:** bloco da etapa na seção 6 do roteiro + atualizar `docs/ESTADO.md`.
9. **Commit e push** com mensagem `E?: resumo`. Marcar 🟨 **Pronta p/ revisão**.
10. **Esperar o "ok"** do dono. Correções pedidas voltam ao passo 4. Com o "ok", marcar ✅.

## Como verificar de verdade

- `npm run build`: tipos e build sem erro.
- `npm run dev` e abrir no navegador em **375×812** e **1280×800**. Clicar em cada item do menu; conferir que nada estoura a largura e que a barra de abas não cobre conteúdo.
- Console do navegador sem erro.
- **Banco em memória, só local:** sem `VITE_SUPABASE_URL` no `.env`, o app usa `src/data/memoryDb.ts`, com dados de exemplo e duas empresas fictícias. Isso permite testar todas as telas sem chaves de produção. Recarregar a página zera os dados. Nunca usar em produção: o build de produção falha se `VITE_SUPABASE_URL` faltar (a partir da E2).
- A partir da E2: `npm run test:rls` roda o teste "usuário da empresa A não lê a empresa B" contra um Supabase local (`supabase start`).

## Mensagens de commit

`E1: casca responsiva e rotas` · `E1 fix: foco visível no menu`. Terminar com a linha de coautoria quando feito com IA.
