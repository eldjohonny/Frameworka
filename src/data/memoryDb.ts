// Banco em memória, só para desenvolvimento local: dados de exemplo, zera ao recarregar.
import type { Dashboard, Db, Org, User } from "./db";

const orgs: Org[] = [
  { id: "org-vitta", name: "Clínica Vitta", legalName: "Clínica Vitta Saúde Integrada Ltda", cnpj: "12.345.678/0001-90", role: "dono" },
  { id: "org-aurora", name: "Instituto Aurora", legalName: "Instituto Aurora de Diagnóstico S.A.", cnpj: "98.765.432/0001-10", role: "consultor" },
];

const dashboards: Record<string, Dashboard> = {
  "org-vitta": {
    profilePct: 72, missingAnswers: 9, docsDone: 4, docsApplicable: 14, docsNotApplicable: 1, openFindings: 3,
    nextStep: { title: "Cadastre o sistema de prontuário eletrônico", detail: "Libera a Política de Segurança e o RIPD · 3 min", to: "/empresa/sistemas" },
  },
  "org-aurora": {
    profilePct: 18, missingAnswers: 41, docsDone: 0, docsApplicable: 15, docsNotApplicable: 0, openFindings: 0,
    nextStep: { title: "Indique o encarregado (DPO)", detail: "Aparece em 10 documentos · 2 min", to: "/empresa/pessoas" },
  },
};

let user: User | null = null;
const wait = <T,>(v: T) => new Promise<T>((r) => setTimeout(() => r(v), 120));

export const memoryDb: Db = {
  currentUser: () => wait(user),
  async signIn(email) {
    user = { id: "u-1", email, name: email.split("@")[0] };
    return wait(user);
  },
  async signOut() { user = null; },
  listOrgs: () => wait(orgs),
  dashboard: (orgId) => wait(dashboards[orgId]),
};
