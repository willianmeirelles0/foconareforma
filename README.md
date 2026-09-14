# Foco na Reforma

Site de vendas do Diagnóstico de Impacto da Reforma Tributária, uma frente
da [Foco Gestão Contábil](https://www.focogestaocontabil.com.br). Funil
completo, sem atendimento comercial humano antes do pagamento: triagem →
resultado → checkout (Asaas) → confirmação → formulário completo.

## Stack

- Next.js (App Router) + TypeScript, hospedado na Vercel.
- Tailwind CSS v4, com paleta e tipografia (Literata, Blinker, Hanken
  Grotesk) definidas em `src/app/globals.css` e `src/app/layout.tsx`.
- Checkout via API do Asaas (`src/lib/asaas.ts`), sem link de pagamento
  manual.
- Google Sheets via API oficial (`googleapis`), autenticado por conta de
  serviço, sem Google Forms (`src/lib/googleSheets.ts`).
- Contato via links `wa.me` com mensagem pré-preenchida (sem WhatsApp
  Business API).
- Sem nenhuma ferramenta paga de automação (sem Zapier, Make, Calendly).

## Fluxo

```
/ (home) → /triagem → classificação automática → /resultado
  ├── Simples (R$1.000) / Presumido (R$2.000) → checkout Asaas → /confirmacao
  │     (verificada via API do Asaas, não apenas pelo redirecionamento)
  │     → WhatsApp do Hugo + /formulario-completo (23 perguntas)
  └── Personalizado (sob consulta) → WhatsApp da Eliane, sem checkout
```

## Configuração

Copie `.env.example` para `.env.local` e preencha:

### Asaas

1. Crie uma conta no [Asaas](https://www.asaas.com) (ou use o sandbox) e
   gere uma API Key em Configurações → Integrações.
2. Defina `ASAAS_API_KEY` e `ASAAS_ENV` (`sandbox` ou `production`).
3. Configure um Webhook em Configurações → Webhooks apontando para
   `https://SEU_DOMINIO/api/webhook/asaas`, eventos de pagamento, e defina
   um token de autenticação. Coloque o mesmo valor em
   `ASAAS_WEBHOOK_TOKEN`.
4. A confirmação de pagamento não depende só do webhook nem do
   redirecionamento do navegador: `/api/payment-status` consulta a API do
   Asaas pelos pagamentos com o `externalReference` da triagem antes de
   liberar a página `/confirmacao`.

### Google Sheets

1. Crie um projeto no Google Cloud e ative a Google Sheets API.
2. Crie uma conta de serviço e gere uma chave JSON.
3. Compartilhe a planilha de destino com o e-mail da conta de serviço
   (permissão de Editor).
4. Preencha `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY` (mantenha
   as quebras de linha como `\n`) e `GOOGLE_SHEET_ID`.
5. Crie duas abas na planilha:
   - **Triagem**: `Timestamp, ID, Segmento, Regime atual, Faturamento mensal, Operações interestaduais, Importação/exportação, Múltiplas atividades, Benefícios fiscais, Classificação`
   - **FormularioCompleto**: `Timestamp, ID da triagem` seguido das 23
     perguntas na ordem definida em `src/lib/formularioCompleto.ts`.

### WhatsApp

`NEXT_PUBLIC_WHATSAPP_HUGO` e `NEXT_PUBLIC_WHATSAPP_ELIANE` devem conter
apenas dígitos, com DDI e DDD (ex: `5554999999999`).

## Desenvolvimento

```bash
npm install
npm run dev
```

## Deploy

Projeto pensado para o plano gratuito da Vercel. Configure as variáveis de
ambiente do `.env.example` no painel do projeto antes do primeiro deploy.
