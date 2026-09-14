export interface FaqItem {
  pergunta: string;
  resposta: string;
}

export const RESULTADO_FAQ: FaqItem[] = [
  {
    pergunta: "Por que eu pago antes de falar com alguém?",
    resposta:
      "A Foco Gestão Contábil atende, em grande parte, por indicação. Não temos uma equipe comercial dedicada a vender por telefone ou WhatsApp: toda a nossa equipe está focada em entregar análises de qualidade e cuidar dos negócios dos nossos clientes. Por isso, o processo aqui é direto: você preenche as informações da sua empresa, garante sua vaga e paga com segurança. Assim que o pagamento é confirmado, o Hugo, responsável técnico pelas análises, entra em contato diretamente com você para uma breve explicação e já inicia o seu estudo.",
  },
  {
    pergunta: "Quanto tempo demora para eu receber o resultado?",
    resposta:
      "Depois que o pagamento é confirmado, o Hugo entra em contato para uma breve explicação e já inicia o seu estudo. O prazo exato da entrega é combinado diretamente com ele nesse primeiro contato, de acordo com a complexidade do seu caso e a fila de análises em andamento.",
  },
  {
    pergunta: "Como funciona o pagamento?",
    resposta:
      "O checkout aceita Pix e cartão, processado com segurança pelo Asaas. As opções de parcelamento no cartão seguem a configuração ativa na conta da Foco no momento da compra.",
  },
  {
    pergunta:
      "Minha empresa é um caso mais complexo (Lucro Real, múltiplas filiais, benefício fiscal). Ainda assim posso fazer o diagnóstico?",
    resposta:
      "Sim. A triagem identifica automaticamente esse perfil e direciona você direto para um atendimento personalizado com a Eliane, responsável pela Foco, em vez do checkout automático. O valor desses casos é definido sob consulta, a partir de R$ 3.000, de acordo com a complexidade real do seu negócio.",
  },
  {
    pergunta: "Esse diagnóstico substitui a minha contabilidade atual?",
    resposta:
      "Não. O diagnóstico é uma análise pontual do impacto da Reforma Tributária na sua empresa, com orientação sobre qual regime seguir. Ele não substitui a rotina contábil mensal do seu negócio.",
  },
  {
    pergunta: "Meus dados estão seguros?",
    resposta:
      "Sim. As informações da sua empresa são usadas exclusivamente para a elaboração do seu diagnóstico pela equipe técnica da Foco Gestão Contábil.",
  },
  {
    pergunta: "Qual é o prazo real para decidir o regime tributário?",
    resposta:
      "A escolha entre Simples Nacional, Lucro Presumido e Lucro Real para 2027 se confirma no pagamento da primeira parcela do IRPJ, em fevereiro de 2027. Empresas do Simples Nacional também têm uma janela específica para o regime híbrido, de 1 a 30 de setembro e 1 a 30 de abril de cada ano. Quanto antes você souber o resultado da simulação, mais tempo tem para se organizar.",
  },
];
