import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

type Variant = "primary" | "secondary" | "blue";
export function Button({ variant = "primary", ...p }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button {...p} className={`btn btn-${variant} ${p.className ?? ""}`} />;
}
export function ButtonLink({ to, variant = "primary", children }: { to: string; variant?: Variant; children: ReactNode }) {
  return <Link to={to} className={`btn btn-${variant}`}>{children}</Link>;
}

export type Tone = "ok" | "warn" | "bad" | "info" | "na" | "neutral";
export function Pill({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return <span className={`pill pill-${tone}`}>{children}</span>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="eyebrow">{children}</span>;
}

export function PageHeader({ eyebrow, title, lede, action }: { eyebrow?: string; title: string; lede?: string; action?: ReactNode }) {
  return (
    <header className="page-header">
      <div>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1>{title}</h1>
        <div className="rule" />
        {lede && <p className="lede">{lede}</p>}
      </div>
      {action}
    </header>
  );
}

export function EmptyState({ title, text, action, stage }: { title: string; text: string; action?: ReactNode; stage?: string }) {
  return (
    <section className="empty">
      {stage && <Pill tone="na">Chega na {stage}</Pill>}
      <h2>{title}</h2>
      <p>{text}</p>
      {action}
    </section>
  );
}

export function Field({ id, label, hint, children }: { id: string; label: string; hint?: ReactNode; children: ReactNode }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
      {hint && <small>{hint}</small>}
    </div>
  );
}
