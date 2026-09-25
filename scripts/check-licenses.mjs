// Bloqueia dependências com licença copyleft (GPL, AGPL, LGPL, SSPL) ou sem licença declarada.
// Lê o package.json de cada pacote instalado em node_modules. Sem dependências próprias.
// Uso: npm ci --ignore-scripts && node scripts/check-licenses.mjs
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

// Pacotes revisados à mão, liberados mesmo sem licença reconhecida. Formato: "nome@versão".
// Anote o motivo ao lado de cada um.
const EXCECOES = [];

const COPYLEFT = /\b(A|L)?GPL|\bSSPL\b/i;

// ponytail: avaliação simplificada de SPDX (ignora parênteses aninhados); suficiente para o que aparece no npm.
export function bloqueia(expr) {
  if (!expr || /^(UNKNOWN|UNLICENSED|SEE LICENSE)/i.test(expr)) return "sem licença reconhecida";
  const alternativas = expr.replace(/[()]/g, "").split(/\s+OR\s+/i);
  const livre = alternativas.some((alt) => alt.split(/\s+AND\s+/i).every((l) => !COPYLEFT.test(l)));
  return livre ? null : "copyleft";
}

function licencaDe(pkg) {
  const l = pkg.license ?? pkg.licenses;
  if (typeof l === "string") return l;
  if (Array.isArray(l)) return l.map((x) => x.type ?? x).join(" OR ");
  return l?.type;
}

function* pacotes(dir) {
  if (!existsSync(dir)) return;
  for (const nome of readdirSync(dir)) {
    if (nome.startsWith(".")) continue;
    const caminho = join(dir, nome);
    if (nome.startsWith("@")) { yield* pacotes(caminho); continue; }
    const pj = join(caminho, "package.json");
    if (!existsSync(pj)) continue;
    yield JSON.parse(readFileSync(pj, "utf8"));
    yield* pacotes(join(caminho, "node_modules"));
  }
}

function main(raiz = "node_modules") {
  const vistos = new Set();
  const problemas = [];
  for (const pkg of pacotes(raiz)) {
    const id = `${pkg.name}@${pkg.version}`;
    if (vistos.has(id)) continue;
    vistos.add(id);
    const licenca = licencaDe(pkg);
    const motivo = bloqueia(licenca);
    if (motivo && !EXCECOES.includes(id)) problemas.push(`  ${id}  →  ${licenca ?? "(vazio)"}  [${motivo}]`);
  }
  if (problemas.length) {
    console.error(`Licenças bloqueadas (${problemas.length}):\n${problemas.join("\n")}`);
    console.error("\nTroque o pacote por uma alternativa MIT/Apache/BSD, ou revise e adicione em EXCECOES.");
    process.exit(1);
  }
  console.log(`OK: ${vistos.size} pacotes verificados, nenhum copyleft.`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main(process.argv[2]);
