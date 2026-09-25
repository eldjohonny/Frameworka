// Contrato de dados do app. Telas só falam com `db`; a E2 troca a implementação pelo Supabase.
import { memoryDb } from "./memoryDb";

export type Role = "dono" | "editor" | "consultor" | "leitor";
export type User = { id: string; email: string; name: string };
export type Org = { id: string; name: string; legalName: string; cnpj: string; role: Role };
export type Dashboard = {
  profilePct: number; missingAnswers: number;
  docsDone: number; docsApplicable: number; docsNotApplicable: number;
  openFindings: number;
  nextStep: { title: string; detail: string; to: string } | null;
};

export interface Db {
  currentUser(): Promise<User | null>;
  signIn(email: string, password: string): Promise<User>;
  signOut(): Promise<void>;
  listOrgs(): Promise<Org[]>;
  dashboard(orgId: string): Promise<Dashboard>;
}

if (import.meta.env.VITE_SUPABASE_URL) {
  throw new Error("Supabase ainda não implementado (E2). Remova VITE_SUPABASE_URL do .env para usar o banco em memória.");
}

export const db: Db = memoryDb;
export const isMemoryDb = true;
