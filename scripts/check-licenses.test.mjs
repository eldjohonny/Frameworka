import assert from "node:assert/strict";
import { bloqueia } from "./check-licenses.mjs";

for (const ok of ["MIT", "Apache-2.0", "ISC", "BSD-3-Clause", "(MIT OR GPL-3.0-or-later)", "MIT AND Apache-2.0", "MPL-2.0"])
  assert.equal(bloqueia(ok), null, ok);

for (const ruim of ["GPL-3.0", "GPL-2.0-only", "AGPL-3.0-or-later", "LGPL-2.1", "SSPL-1.0", "MIT AND GPL-3.0", "(GPL-2.0 OR AGPL-3.0)"])
  assert.equal(bloqueia(ruim), "copyleft", ruim);

for (const vazio of [undefined, "", "UNKNOWN", "SEE LICENSE IN LICENSE.md", "UNLICENSED"])
  assert.equal(bloqueia(vazio), "sem licença reconhecida", String(vazio));

console.log("check-licenses: testes OK");
