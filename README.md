# Frameworka

SaaS de adequação à LGPD para clínicas e serviços de saúde.

- **Roteiro e status:** [ROTEIRO.md](ROTEIRO.md) (fonte de verdade)
- **Processo:** [docs/PROCESSO.md](docs/PROCESSO.md) · [docs/CHECKLIST-ETAPA.md](docs/CHECKLIST-ETAPA.md) · [docs/ESTADO.md](docs/ESTADO.md) · [docs/PROMPT-ETAPA.md](docs/PROMPT-ETAPA.md)
- **Plano visual:** [docs/plano-do-app.html](docs/plano-do-app.html)

## Como rodar

```bash
npm install
npm run dev
```

Sem `.env`, o app roda com um **banco em memória** e dados de exemplo (qualquer e-mail entra). Veja `.env.example`.

## Regra de licenças

Nenhuma dependência GPL, AGPL, LGPL, SSPL ou sem licença. O workflow [Licenças](.github/workflows/licencas.yml) roda `scripts/check-licenses.mjs` em todo push e pull request. Um pacote revisado à mão pode ser liberado em `EXCECOES`, no topo do script.
