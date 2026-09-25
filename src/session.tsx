import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { db, type Org, type User } from "./data/db";

type Session = {
  user: User | null; orgs: Org[]; org: Org | null; loading: boolean;
  signIn(email: string, password: string): Promise<void>;
  signOut(): Promise<void>;
  selectOrg(id: string): void;
};

const Ctx = createContext<Session | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [orgs, setOrgs] = useState<Org[]>([]);
  const [orgId, setOrgId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function load(u: User | null) {
    setUser(u);
    const list = u ? await db.listOrgs() : [];
    setOrgs(list);
    setOrgId(list[0]?.id ?? null);
    setLoading(false);
  }

  useEffect(() => { db.currentUser().then(load); }, []);

  const value: Session = {
    user, orgs, loading, org: orgs.find((o) => o.id === orgId) ?? null,
    signIn: async (e, p) => load(await db.signIn(e, p)),
    signOut: async () => { await db.signOut(); load(null); },
    selectOrg: setOrgId,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSession() {
  const s = useContext(Ctx);
  if (!s) throw new Error("useSession fora do SessionProvider");
  return s;
}
