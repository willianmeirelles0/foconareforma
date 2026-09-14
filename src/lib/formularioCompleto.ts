export type CampoTipo = "text" | "email" | "tel" | "textarea" | "select";

export interface CampoFormulario {
  id: string;
  secao: string;
  label: string;
  tipo: CampoTipo;
  required: boolean;
  opcoes?: string[];
  placeholder?: string;
}

export const CAMPOS_FORMULARIO_COMPLETO: CampoFormulario[] = [
  // Dados cadastrais e societários
  { id: "razaoSocial", secao: "Dados cadastrais", label: "Razão social da empresa", tipo: "text", required: true },
  { id: "cnpj", secao: "Dados cadastrais", label: "CNPJ", tipo: "text", required: true },
  { id: "nomeResponsavel", secao: "Dados cadastrais", label: "Nome do responsável por estas informações", tipo: "text", required: true },
  { id: "cargoResponsavel", secao: "Dados cadastrais", label: "Cargo do responsável", tipo: "text", required: false },
  { id: "email", secao: "Dados cadastrais", label: "E-mail para contato", tipo: "email", required: true },
  { id: "telefone", secao: "Dados cadastrais", label: "Telefone/WhatsApp para contato", tipo: "tel", required: true },
  {
    id: "tempoAtividade",
    secao: "Dados cadastrais",
    label: "Há quanto tempo a empresa está em atividade?",
    tipo: "select",
    required: true,
    opcoes: ["Menos de 1 ano", "De 1 a 3 anos", "De 3 a 10 anos", "Mais de 10 anos"],
  },
  {
    id: "quantidadeSocios",
    secao: "Dados cadastrais",
    label: "Quantos sócios a empresa possui?",
    tipo: "select",
    required: true,
    opcoes: ["1", "2", "3", "4 ou mais"],
  },

  // Atividade econômica
  { id: "cnaePrincipal", secao: "Atividade econômica", label: "CNAE principal (código e descrição)", tipo: "text", required: true },
  { id: "cnaesSecundarios", secao: "Atividade econômica", label: "CNAEs secundários relevantes, se houver", tipo: "textarea", required: false },
  { id: "descricaoAtividade", secao: "Atividade econômica", label: "Descreva a atividade e os principais produtos ou serviços da empresa", tipo: "textarea", required: true },
  { id: "estadosOperacao", secao: "Atividade econômica", label: "Em quais estados a empresa vende produtos ou presta serviços?", tipo: "textarea", required: true },
  {
    id: "perfilClientes",
    secao: "Atividade econômica",
    label: "Qual o perfil predominante dos clientes da empresa?",
    tipo: "select",
    required: true,
    opcoes: [
      "Majoritariamente consumidor final (B2C)",
      "Majoritariamente empresas (B2B)",
      "Equilibrado entre B2C e B2B",
    ],
  },

  // Financeiro
  { id: "faturamentoAnual", secao: "Financeiro", label: "Faturamento bruto dos últimos 12 meses (aproximado)", tipo: "text", required: true },
  { id: "faturamentoProjetado2027", secao: "Financeiro", label: "Faturamento projetado para 2027, se houver estimativa", tipo: "text", required: false },
  {
    id: "margemLucro",
    secao: "Financeiro",
    label: "Qual a margem de lucro média aproximada da empresa?",
    tipo: "select",
    required: true,
    opcoes: ["Até 5%", "De 5% a 15%", "De 15% a 30%", "Acima de 30%", "Não sei informar"],
  },
  { id: "folhaPagamento", secao: "Financeiro", label: "Folha de pagamento mensal aproximada (salários + encargos)", tipo: "text", required: true },
  { id: "principaisCustos", secao: "Financeiro", label: "Quais os principais custos e insumos utilizados na operação?", tipo: "textarea", required: true },

  // Tributário
  { id: "aliquotaEfetiva", secao: "Perfil tributário", label: "Alíquota efetiva aproximada de ICMS/ISS/PIS/COFINS, se souber informar", tipo: "text", required: false },
  { id: "beneficiosFiscaisDetalhe", secao: "Perfil tributário", label: "A empresa possui benefícios fiscais, incentivos ou regime especial? Quais?", tipo: "textarea", required: false },
  {
    id: "substituicaoTributaria",
    secao: "Perfil tributário",
    label: "A empresa realiza operações com substituição tributária?",
    tipo: "select",
    required: true,
    opcoes: ["Sim", "Não", "Não sei"],
  },
  { id: "tiposNotaFiscal", secao: "Perfil tributário", label: "Quais tipos de nota fiscal a empresa emite? (NF-e, NFS-e, NFC-e, CT-e etc.)", tipo: "textarea", required: true },
  { id: "observacoes", secao: "Perfil tributário", label: "Alguma dúvida específica ou ponto de atenção que gostaria que analisássemos?", tipo: "textarea", required: false },
];
