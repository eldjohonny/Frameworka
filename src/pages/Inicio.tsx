import { useEffect, useState } from "react";
import { db, type Dashboard } from "../data/db";
import { useSession } from "../session";
import { ButtonLink, Eyebrow, PageHeader } from "../ui";

export default function Inicio() {
  const { org } = useSession();
  const [d, setD] = useState<Dashboard | null>(null);
  useEffect(() => { if (org) { setD(null); db.dashboard(org.id).then(setD); } }, [org]);

  const today = new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" });
  return (
    <>
      <PageHeader eyebrow={today} title="Sua conformidade LGPD" lede={org?.legalName} />
      {!d ? <p className="muted" aria-busy="true">Carregando…</p> : (
        <div className="stack">
          {d.nextStep && (
            <section className="card next">
              <div>
                <Eyebrow>Próximo passo</Eyebrow>
                <h2>{d.nextStep.title}</h2>
                <p className="muted small">{d.nextStep.detail}</p>
              </div>
              <ButtonLink to={d.nextStep.to}>Responder</ButtonLink>
            </section>
          )}
          <div className="stats">
            <Stat label="Ficha da empresa" value={`${d.profilePct}%`} pct={d.profilePct} note={`faltam ${d.missingAnswers} respostas`} />
            <Stat label="Documentos" value={`${d.docsDone} de ${d.docsApplicable}`} pct={(d.docsDone / d.docsApplicable) * 100}
              note={d.docsNotApplicable ? `${d.docsNotApplicable} não se aplica` : "todos se aplicam"} />
            <Stat label="Revisão" value={String(d.openFindings)} tone={d.openFindings ? "bad" : undefined}
              note={d.openFindings ? "divergências abertas" : "nada pendente"} />
          </div>
        </div>
      )}
    </>
  );
}

function Stat({ label, value, note, pct, tone }: { label: string; value: string; note: string; pct?: number; tone?: "bad" }) {
  return (
    <section className="card stat">
      <Eyebrow>{label}</Eyebrow>
      <strong className={tone ? `num ${tone}` : "num"}>{value}</strong>
      {pct !== undefined && <div className="bar" role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100}><i style={{ width: `${pct}%` }} /></div>}
      <span className="muted small">{note}</span>
    </section>
  );
}
