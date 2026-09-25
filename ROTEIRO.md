# ROTEIRO — Frameworka App

> **Fonte de verdade do projeto.** Toda sessão (humana ou IA) começa lendo este arquivo e termina atualizando-o.
> Plano visual completo: `docs/plano-do-app.html`. Processo detalhado: `docs/PROCESSO.md`.

## 1. Regra do processo

1. Uma etapa por vez. Só começa a próxima depois do **"ok"** do dono (eldjohonny) na etapa anterior.
2. Ciclo de cada etapa: ler roteiro → `git pull` → planejar → construir → revisar design e pacotes → verificar → registrar → marcar **Pronta p/ revisão** → esperar "ok". Detalhes em `docs/PROCESSO.md`.
3. Nada entra sem passar em `docs/CHECKLIST-ETAPA.md`.
4. Escopo que aparecer no meio do caminho vira linha nova na tabela, não entra na etapa atual.
5. Ao fechar a etapa: preencher a seção 6 (Registro) e atualizar `docs/ESTADO.md`.

## 2. Status

Legenda: ⬜ a fazer · 🟦 em andamento · 🟨 pronta p/ revisão · ✅ aprovada (ok do dono)

| # | Etapa | Entrega | Status |
|---|---|---|---|
| E0 | Fundação | Repositório, CI de licenças, plano do app | ✅ |
| E1 | Esqueleto navegável | Vite+React+TS, tokens visuais, rotas, login falso, casca responsiva (abas embaixo no celular / barra lateral no PC), todas as telas com estado vazio, banco em memória | 🟨 |
| E2 | Banco e login reais | Supabase (região São Paulo), schema, RLS com `is_member()`, auth por e-mail, teste "empresa A não lê empresa B" no CI | ⬜ |
| E3 | Criar empresa por CNPJ | BrasilAPI + ViaCEP, tela T-02, primeira `organization` + `membership` dono | ⬜ |
| E4 | Ficha da empresa | `field_definitions` + `field_values`, 5 blocos, selo "usado em N docs", "por que pedimos", progresso | ⬜ |
| E5 | Templates normalizados | Aplicar os 4 pareceres, trocar colchetes por `{{chaves}}`, condicionais, gerar `field_definitions` (conteúdo, pode andar junto com E3–E4) | ⬜ |
| E6 | Catálogo e tela do documento | Status calculado pela ficha, T-06 (Entender · Preencher · Prévia ao vivo com mustache) | ⬜ |
| E7 | Gerar e guardar documentos | Word/PDF pelo kit, `document_versions` com snapshot, "Meus documentos", selo "desatualizado" | ⬜ |
| E8 | Revisão sem IA | Regras determinísticas → `findings`, tela T-07, contador no menu | ⬜ |
| E9 | Equipe e consultor | Convites, papéis, seletor de empresa, `audit_log` | ⬜ |
| E10 | Leitura de arquivos | Upload por empresa, leitura com Claude (Edge Function), sugestões a confirmar | ⬜ |
| E11 | Redator e revisor IA | Redação adaptada e revisão de sentido, sempre como sugestão | ⬜ |
| E12 | Cobrança e planos | Planos, teste grátis, limites | ⬜ |

## 3. Premissas fixas (não mudam sem decisão explícita do dono)

- **Licenças:** nenhuma dependência GPL, AGPL, LGPL, SSPL ou sem licença. O CI (`scripts/check-licenses.mjs`) bloqueia.
- **Isolamento:** toda tabela da empresa tem `org_id`; acesso só pela função `is_member(org_id)` no banco. Arquivos em `uploads/{org_id}/…`.
- **Um dado, uma vez:** todo dado vive no dicionário de campos; nenhum template pede o mesmo dado com outra chave.
- **IA nunca grava direto:** tudo que vier de IA ou OCR entra como sugestão até alguém confirmar.
- **Sem dado de paciente** em nenhum campo do app.
- **Mobile first, otimizado para web.** Todo layout nasce em 360px e cresce. Testar em 375px e 1280px.
- **Fonte dos templates:** `02_Produto_Kit_LGPD_Saude/Templates_fonte_MD` (fora do repo até a E5, que os traz para `templates/`).
- **Stack:** React + Vite + TypeScript, CSS puro com tokens (sem framework de CSS), react-router, Supabase. Dependência nova só se poupar trabalho real, e com licença conferida.
- **Idioma:** interface em pt-BR; código em inglês; textos da interface em `src/copy` só quando repetirem.

## 4. Direção visual (régua)

Herdada do Guia Frameworka: técnico, editorial, calmo. Preto, cinzas e um azul institucional. Nada de gradientes, sombras pesadas ou emoji.

### Tokens (definidos em `src/styles/tokens.css`)

| Token | Claro | Uso |
|---|---|---|
| `--ink` | #0A0A0A | texto principal, botão primário |
| `--ink-2` | #333336 | texto secundário forte |
| `--mute` | #66666B | rótulos, legendas |
| `--line` | #C8C8CC | bordas de campo |
| `--line-2` | #E5E5E7 | divisórias |
| `--wash` | #F4F4F5 | fundos de apoio |
| `--paper` | #FFFFFF | superfície |
| `--ground` | #EDEDEF | fundo da página |
| `--blue` | #001F54 | marca, filete, item ativo, campo preenchido |
| `--blue-wash` | #E8ECF4 | fundo do item ativo, destaque de dado vindo da ficha |
| `--ok` / `--warn` / `--bad` | #1F6B45 / #8A5A00 / #9B1C1C | status (com `-wash` para fundo) |

Tema escuro: mesmos tokens redefinidos em `prefers-color-scheme: dark`.

### Tipografia

- **Inter** (títulos e corpo) · **IBM Plex Mono** (rótulos, códigos FRW, números, status).
- Escala (px): 12 · 13 · 15 · 18 · 24 · 32. Corpo 15/1.5. Títulos de tela 24 (celular) → 32 (≥1024px), peso 800, tracking −0.015em.
- Rótulo "eyebrow": Plex Mono 11px, maiúsculas, tracking 0.12em, cor `--mute`.
- Mínimo 16px em campos de formulário no celular (evita zoom no iOS).

### Espaço, forma, toque

- Base 4px: 4 · 8 · 12 · 16 · 24 · 32 · 48. Margem lateral 16px (celular) / 32px (PC).
- Raio 2px. Bordas 1px. Sombra só em menus flutuantes.
- Alvo de toque ≥ 44px. Foco visível: contorno 2px `--blue`.
- Assinatura: filete azul 2px × 48px sob o título principal de cada tela.

### Casca responsiva

| Largura | Navegação |
|---|---|
| < 1024px | Topo: marca + seletor de empresa. Base: **barra de abas fixa** com 5 itens (Início, Empresa, Criar, Meus docs, Revisão) + área segura do iPhone. Conta/Equipe/Plano no menu do avatar. |
| ≥ 1024px | **Barra lateral** 240px: seletor de empresa, 5 itens, separador "Conta" (Equipe, Plano, Minha conta, Sair). Conteúdo com largura máxima 1120px. |

### Componentes-base (`src/ui`)

`Button` (primário preto · secundário contorno · azul) · `Field` (rótulo, ajuda, estados: vazio, preenchido = borda azul, sugestão = tracejado âmbar, erro) · `Pill` (ok · warn · bad · info · n/a tracejado) · `Card` (só quando separa um objeto) · `EmptyState` (título, frase, ação) · `PageHeader` (eyebrow, título, filete, ação).

## 5. Telas

| Código | Rota | Tela | Celular | PC | Etapa |
|---|---|---|---|---|---|
| T-01 | `/entrar` | Login | formulário em tela cheia; painel azul vira faixa no topo | 2 colunas: formulário + painel azul com grid | E1 (falso) → E2 |
| T-02 | `/nova-empresa` | Criar empresa por CNPJ | 1 coluna, cartão de confirmação abaixo | 2 colunas | E3 |
| T-03 | `/inicio` | Início | cartões empilhados, "Próximo passo" primeiro | 3 cartões em linha + próximo passo | E1 → E4 |
| T-04 | `/empresa/:bloco` | Minha empresa | blocos como abas roláveis; "por que pedimos" abaixo do campo | campos + coluna de ajuda | E4 |
| T-05 | `/documentos` | Criar documentos | lista por família, status à direita | idem, mais largo | E6 |
| T-06 | `/documentos/:codigo` | Tela do documento | 3 abas: Entender · Preencher · Prévia | 3 colunas lado a lado | E6 |
| T-07 | `/revisao` | Revisão | lista de achados com faixa de severidade | idem | E8 |
| T-08 | `/meus-documentos` | Meus documentos | cartões por documento | tabela | E7 |
| T-09 | `/equipe` | Equipe e acessos | lista | tabela | E9 |
| T-10 | `/conta`, `/plano` | Conta e plano | simples | simples | E9 / E12 |

## 6. Registro de etapas

<!-- Ao fechar uma etapa, acrescente um bloco neste formato:
### E? — Nome (data)
- Feito:
- Decisões:
- Como verificar:
- Pendências / próximas:
-->

### E0 — Fundação (25/09/2026)
- Feito: repositório, workflow "Licenças" com verificador próprio (license-checker `--failOn` só bloqueava nome exato), plano visual em `docs/`.
- Pendências: o dono ativar a proteção da `main` exigindo o check **licencas**.

### E1 — Esqueleto navegável (25/09/2026)
- Feito: Vite + React 19 + TS; `react-router-dom`; tokens e tipografia da régua; casca responsiva (abas no celular, barra lateral ≥1024px); login falso; rotas de T-01 a T-10 com cabeçalho e estado vazio; início com dados de exemplo; camada de dados `src/data` com banco em memória (`memoryDb`) atrás de uma interface que a E2 troca pelo Supabase.
- Decisões: CSS puro com tokens, sem Tailwind. Login falso aceita qualquer e-mail e só existe sem `VITE_SUPABASE_URL`.
- Como verificar: `npm install && npm run dev`, abrir em 375px e 1280px, navegar por todas as abas; `npm run build` sem erro; `node scripts/check-licenses.mjs`.
- Pendências: nenhuma de código. Aguardando "ok".
