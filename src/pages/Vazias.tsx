// Telas que ainda só têm cabeçalho e estado vazio. Cada uma ganha arquivo próprio na sua etapa.
import { useParams } from "react-router-dom";
import { useSession } from "../session";
import { ButtonLink, EmptyState, PageHeader } from "../ui";

const BLOCOS = ["Identificação", "Pessoas-chave", "Operação", "Sistemas", "Segurança", "Arquivos"];

export function Empresa() {
  return (
    <>
      <PageHeader eyebrow="Meus dados" title="Minha empresa" lede="Cada resposta dada aqui preenche todos os documentos que a usam." />
      <div className="chips" role="list">{BLOCOS.map((b) => <span role="listitem" key={b} className="chip">{b}</span>)}</div>
      <EmptyState stage="E4" title="A ficha da empresa entra aqui" text="Cinco blocos curtos. Cada pergunta mostra em quantos documentos será usada e por que a LGPD pede." />
    </>
  );
}

export function Documentos() {
  return (
    <>
      <PageHeader eyebrow="Catálogo" title="Criar documentos" lede="15 documentos LGPD para saúde, na ordem em que faz sentido montar." />
      <EmptyState stage="E6" title="O catálogo aparece aqui" text="O status de cada documento sai da sua ficha: pronto para gerar, faltam dados ou não se aplica." />
    </>
  );
}

export function Documento() {
  const { codigo } = useParams();
  return (
    <>
      <PageHeader eyebrow={codigo} title="Documento" />
      <EmptyState stage="E6" title="Entender · Preencher · Prévia" text="No celular, três abas. No computador, três colunas lado a lado." action={<ButtonLink to="/documentos" variant="secondary">Voltar ao catálogo</ButtonLink>} />
    </>
  );
}

export function MeusDocumentos() {
  return (
    <>
      <PageHeader eyebrow="Arquivo" title="Meus documentos" />
      <EmptyState stage="E7" title="Nenhum documento gerado ainda" text="Cada versão gerada fica aqui, com data, status e aviso quando algum dado da ficha mudar." action={<ButtonLink to="/documentos">Criar o primeiro</ButtonLink>} />
    </>
  );
}

export function Revisao() {
  return (
    <>
      <PageHeader eyebrow="Qualidade" title="Revisão" lede="Divergências entre documentos, com o risco explicado." />
      <EmptyState stage="E8" title="As divergências aparecem aqui" text="Exemplo: o e-mail do DPO diferente entre a Política de Privacidade e a ficha." />
    </>
  );
}

export function Equipe() {
  return (
    <>
      <PageHeader eyebrow="Conta" title="Equipe e acessos" />
      <EmptyState stage="E9" title="Convide sua equipe ou seu consultor" text="Dono, editor, consultor ou só leitura. Cada pessoa vê apenas as empresas às quais foi convidada." />
    </>
  );
}

export function Plano() {
  return (
    <>
      <PageHeader eyebrow="Conta" title="Plano" />
      <EmptyState stage="E12" title="Planos e cobrança" text="Teste grátis, plano por empresa e plano para consultores." />
    </>
  );
}

export function Conta() {
  const { user, signOut } = useSession();
  return (
    <>
      <PageHeader eyebrow="Conta" title="Minha conta" lede={user?.email} />
      <nav className="list-links" aria-label="Conta">
        <ButtonLink to="/equipe" variant="secondary">Equipe e acessos</ButtonLink>
        <ButtonLink to="/plano" variant="secondary">Plano</ButtonLink>
      </nav>
      <button className="btn btn-secondary" onClick={signOut}>Sair</button>
    </>
  );
}

export function NovaEmpresa() {
  return (
    <>
      <PageHeader eyebrow="Passo 1 de 3" title="Qual o CNPJ da clínica?" lede="Buscamos os dados públicos na Receita Federal. Você só confere." />
      <EmptyState stage="E3" title="Cadastro por CNPJ" text="Razão social, endereço e CNAE preenchidos automaticamente." />
    </>
  );
}

export function NaoEncontrada() {
  return <EmptyState title="Página não encontrada" text="O endereço pode ter mudado." action={<ButtonLink to="/inicio">Ir para o início</ButtonLink>} />;
}
