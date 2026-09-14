import type { Classification } from "./classification";

export interface PricingInfo {
  classification: Classification;
  title: string;
  priceLabel: string;
  /** Valor em reais para o checkout Asaas. null quando não há checkout automático. */
  value: number | null;
  description: string;
}

export const PRICING: Record<Classification, PricingInfo> = {
  simples: {
    classification: "simples",
    title: "Diagnóstico Simples Nacional",
    priceLabel: "R$ 1.000",
    value: 1000,
    description:
      "Simulação completa do impacto da Reforma Tributária para empresas do Simples Nacional, com orientação sobre o melhor caminho a seguir.",
  },
  presumido: {
    classification: "presumido",
    title: "Diagnóstico Lucro Presumido",
    priceLabel: "R$ 2.000",
    value: 2000,
    description:
      "Simulação completa do impacto da Reforma Tributária para empresas do Lucro Presumido, com orientação sobre o melhor caminho a seguir.",
  },
  personalizado: {
    classification: "personalizado",
    title: "Diagnóstico Personalizado",
    priceLabel: "Sob consulta, a partir de R$ 3.000",
    value: null,
    description:
      "Sua empresa tem uma estrutura mais complexa (Lucro Real, múltiplas atividades ou filiais, benefícios fiscais, regimes especiais, importação ou exportação). Esse perfil exige uma análise personalizada, feita sob consulta com a nossa equipe.",
  },
};
