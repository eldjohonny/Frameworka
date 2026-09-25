import { StrictMode, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./styles/tokens.css";
import "./styles/app.css";
import { SessionProvider, useSession } from "./session";
import Shell from "./Shell";
import Login from "./pages/Login";
import Inicio from "./pages/Inicio";
import { Conta, Documento, Documentos, Empresa, Equipe, MeusDocumentos, NaoEncontrada, NovaEmpresa, Plano, Revisao } from "./pages/Vazias";

function Private({ children }: { children: ReactNode }) {
  const { user, loading } = useSession();
  if (loading) return <p className="boot" aria-busy="true">Carregando…</p>;
  return user ? children : <Navigate to="/entrar" replace />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SessionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/entrar" element={<Login />} />
          <Route element={<Private><Shell /></Private>}>
            <Route path="/" element={<Navigate to="/inicio" replace />} />
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/nova-empresa" element={<NovaEmpresa />} />
            <Route path="/empresa/:bloco?" element={<Empresa />} />
            <Route path="/documentos" element={<Documentos />} />
            <Route path="/documentos/:codigo" element={<Documento />} />
            <Route path="/meus-documentos" element={<MeusDocumentos />} />
            <Route path="/revisao" element={<Revisao />} />
            <Route path="/equipe" element={<Equipe />} />
            <Route path="/plano" element={<Plano />} />
            <Route path="/conta" element={<Conta />} />
            <Route path="*" element={<NaoEncontrada />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SessionProvider>
  </StrictMode>,
);
