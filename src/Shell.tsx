import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { db } from "./data/db";
import { useSession } from "./session";

// Ícones de traço simples, 24px, herdam a cor do texto.
const icon = (d: string) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" aria-hidden="true"><path d={d} /></svg>
);
export const NAV = [
  { to: "/inicio", label: "Início", short: "Início", icon: icon("M4 11 12 4l8 7v9H4z M10 20v-6h4v6") },
  { to: "/empresa", label: "Minha empresa", short: "Empresa", icon: icon("M4 20V6h10v14 M14 10h6v10 M7 9h4 M7 13h4 M7 17h4") },
  { to: "/documentos", label: "Criar documentos", short: "Criar", icon: icon("M6 3h8l4 4v14H6z M14 3v4h4 M12 11v6 M9 14h6") },
  { to: "/meus-documentos", label: "Meus documentos", short: "Meus docs", icon: icon("M4 6h16v14H4z M4 10h16 M8 3v3 M16 3v3") },
  { to: "/revisao", label: "Revisão", short: "Revisão", icon: icon("M12 3 3 20h18z M12 10v4 M12 17v.5") },
];
const ACCOUNT = [
  { to: "/equipe", label: "Equipe e acessos" },
  { to: "/plano", label: "Plano" },
  { to: "/conta", label: "Minha conta" },
];

function OrgSwitcher() {
  const { orgs, org, selectOrg } = useSession();
  if (!org) return null;
  return (
    <label className="org-switch">
      <span className="eyebrow">Empresa</span>
      <select id="org-switch" value={org.id} onChange={(e) => selectOrg(e.target.value)} disabled={orgs.length < 2}>
        {orgs.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
      </select>
    </label>
  );
}

export default function Shell() {
  const { signOut, org } = useSession();
  const [findings, setFindings] = useState(0);
  useEffect(() => { if (org) db.dashboard(org.id).then((d) => setFindings(d.openFindings)); }, [org]);
  return (
    <div className="shell">
      <aside className="side" aria-label="Menu principal">
        <div className="brand">FRAMEWORKA</div>
        <OrgSwitcher />
        <nav>
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} className="side-link">
              {n.icon}<span>{n.label}</span>
              {n.to === "/revisao" && findings > 0 && <b className="count">{findings}</b>}
            </NavLink>
          ))}
        </nav>
        <span className="eyebrow side-sep">Conta</span>
        <nav>
          {ACCOUNT.map((n) => <NavLink key={n.to} to={n.to} className="side-link side-link-sm">{n.label}</NavLink>)}
          <button className="side-link side-link-sm" onClick={signOut}>Sair</button>
        </nav>
      </aside>

      <header className="topbar">
        <div className="brand">FRAMEWORKA</div>
        <OrgSwitcher />
        <NavLink to="/conta" className="avatar" aria-label="Minha conta, equipe e plano">•••</NavLink>
      </header>

      <main className="content"><Outlet /></main>

      <nav className="tabbar" aria-label="Menu principal">
        {NAV.map((n) => (
          <NavLink key={n.to} to={n.to} className="tab">
            <span className="tab-icon">{n.icon}{n.to === "/revisao" && findings > 0 && <b className="count">{findings}</b>}</span>
            <span>{n.short}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
