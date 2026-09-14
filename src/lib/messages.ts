import { FATURAMENTO_LABELS, REGIME_LABELS, type TriagemAnswers } from "./classification";
import { PRICING } from "./pricing";
import type { Classification } from "./classification";

function resumoRespostas(answers: TriagemAnswers): string {
  return [
    `Segmento: ${answers.segmento}`,
    `Regime atual: ${REGIME_LABELS[answers.regimeAtual]}`,
    `Faturamento médio mensal: ${FATURAMENTO_LABELS[answers.faturamentoMensal]}`,
    `Operações interestaduais: ${answers.operacoesInterestaduais ? "Sim" : "Não"}`,
    `Importação/exportação: ${answers.importacaoExportacao ? "Sim" : "Não"}`,
    `Múltiplas atividades/filiais: ${answers.multiplasAtividades ? "Sim" : "Não"}`,
    `Benefícios fiscais/regime especial: ${answers.beneficiosFiscais ? "Sim" : "Não"}`,
  ].join("\n");
}

export function buildElianeMessage(answers: TriagemAnswers): string {
  return [
    "Olá, Eliane! Fiz a triagem no site Foco na Reforma e o meu perfil se enquadrou no Diagnóstico Personalizado.",
    "",
    resumoRespostas(answers),
    "",
    "Gostaria de saber mais sobre o diagnóstico para a minha empresa.",
  ].join("\n");
}

export function buildHugoMessage(
  answers: TriagemAnswers,
  classification: Exclude<Classification, "personalizado">
): string {
  return [
    "Olá, Hugo! Acabei de confirmar o pagamento do meu diagnóstico no site Foco na Reforma.",
    "",
    `Diagnóstico contratado: ${PRICING[classification].title}`,
    "",
    resumoRespostas(answers),
  ].join("\n");
}
