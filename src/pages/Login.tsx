import { useState, type FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { useSession } from "../session";
import { isMemoryDb } from "../data/db";
import { Button, Eyebrow, Field } from "../ui";

export default function Login() {
  const { user, signIn } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  if (user) return <Navigate to="/inicio" replace />;

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Digite um e-mail válido, como nome@clinica.com.br.");
    if (password.length < 8) return setError("A senha tem pelo menos 8 caracteres.");
    setBusy(true); setError("");
    try { await signIn(email, password); } catch { setError("Não foi possível entrar. Confira e-mail e senha."); setBusy(false); }
  }

  return (
    <div className="login">
      <section className="login-panel">
        <div className="grid-bg" />
        <Eyebrow>Arquitetura de conformidade</Eyebrow>
        <p className="login-claim">LGPD da sua clínica,<br />documento por documento.</p>
        <span className="eyebrow">15 documentos · Lei 13.709/2018</span>
      </section>

      <form className="login-form" onSubmit={submit} noValidate>
        <div className="brand">FRAMEWORKA</div>
        <h1>Entrar</h1>
        {isMemoryDb && <p className="note">Modo local: qualquer e-mail e senha com 8+ caracteres entram, com dados de exemplo.</p>}
        <Field id="email" label="E-mail">
          <input id="email" type="email" autoComplete="email" inputMode="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <Field id="password" label="Senha">
          <input id="password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Field>
        {error && <p className="error" role="alert">{error}</p>}
        <Button type="submit" disabled={busy}>{busy ? "Entrando…" : "Entrar"}</Button>
        <p className="muted small">Ainda não tem conta? O cadastro abre na etapa de login real.</p>
      </form>
    </div>
  );
}
