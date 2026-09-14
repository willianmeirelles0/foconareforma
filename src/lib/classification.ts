export type Classification = "simples" | "presumido" | "personalizado";

export type RegimeAtual = "simples" | "presumido" | "lucro_real" | "nao_sei";

export type FaturamentoMensal =
  | "ate_50k"
  | "50k_150k"
  | "150k_400k"
  | "acima_400k";

export interface TriagemAnswers {
  segmento: string;
  regimeAtual: RegimeAtual;
  faturamentoMensal: FaturamentoMensal;
  operacoesInterestaduais: boolean;
  importacaoExportacao: boolean;
  multiplasAtividades: boolean;
  beneficiosFiscais: boolean;
}

/**
 * Classifica a empresa em uma das três faixas do diagnóstico com base nas
 * respostas da triagem. Segue os critérios da oferta comercial: Lucro Real,
 * múltiplas atividades/filiais, benefícios ou regimes especiais e
 * importação/exportação sempre vão para o Personalizado (sem checkout).
 */
export function classify(answers: TriagemAnswers): Classification {
  if (answers.regimeAtual === "lucro_real") return "personalizado";
  if (answers.importacaoExportacao) return "personalizado";
  if (answers.multiplasAtividades) return "personalizado";
  if (answers.beneficiosFiscais) return "personalizado";

  if (answers.regimeAtual === "presumido") return "presumido";
  if (answers.regimeAtual === "simples") return "simples";

  // Regime desconhecido: usa o faturamento apenas para direcionar a faixa de
  // preço da triagem. O regime real é confirmado no estudo.
  return answers.faturamentoMensal === "acima_400k" ? "presumido" : "simples";
}

export const FATURAMENTO_LABELS: Record<FaturamentoMensal, string> = {
  ate_50k: "Até R$ 50 mil/mês",
  "50k_150k": "De R$ 50 mil a R$ 150 mil/mês",
  "150k_400k": "De R$ 150 mil a R$ 400 mil/mês",
  acima_400k: "Acima de R$ 400 mil/mês",
};

export const REGIME_LABELS: Record<RegimeAtual, string> = {
  simples: "Simples Nacional",
  presumido: "Lucro Presumido",
  lucro_real: "Lucro Real",
  nao_sei: "Não sei / não tenho certeza",
};
