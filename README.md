# Frameworka

SaaS de adequação à LGPD para clínicas e serviços de saúde. Plano do app em [docs/plano-do-app.html](docs/plano-do-app.html).

## Regra de licenças

Nenhuma dependência pode ter licença copyleft (GPL, AGPL, LGPL, SSPL) ou licença não declarada. O workflow [Licenças](.github/workflows/licencas.yml) roda `scripts/check-licenses.mjs` em todo push e pull request e falha se encontrar uma.

Rodar localmente:

```bash
npm ci --ignore-scripts && node scripts/check-licenses.mjs
```

Pacote dual (ex.: `MIT OR GPL-3.0`) passa, porque é possível escolher a licença permissiva. Um pacote revisado à mão pode ser liberado em `EXCECOES`, no topo do script, com o motivo anotado.
