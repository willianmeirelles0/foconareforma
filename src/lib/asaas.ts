const SANDBOX_API_URL = "https://api-sandbox.asaas.com/v3";
const PRODUCTION_API_URL = "https://api.asaas.com/v3";

const SANDBOX_CHECKOUT_HOST = "https://sandbox.asaas.com";
const PRODUCTION_CHECKOUT_HOST = "https://www.asaas.com";

function isProduction(): boolean {
  return process.env.ASAAS_ENV === "production";
}

function getBaseUrl(): string {
  return isProduction() ? PRODUCTION_API_URL : SANDBOX_API_URL;
}

function getApiKey(): string {
  const key = process.env.ASAAS_API_KEY;
  if (!key) throw new Error("ASAAS_API_KEY não configurado.");
  return key;
}

async function asaasFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${getBaseUrl()}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      access_token: getApiKey(),
      ...init?.headers,
    },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Asaas API ${path} falhou (${res.status}): ${body}`);
  }

  return res.json() as Promise<T>;
}

export interface AsaasCheckoutSession {
  id: string;
  link?: string;
  url?: string;
  checkoutUrl?: string;
}

export interface CustomerData {
  name: string;
  email: string;
  cpfCnpj: string;
  phone?: string;
}

export async function createCheckoutSession(params: {
  customerData: CustomerData;
  externalReference: string;
  value: number;
  description: string;
  successUrl: string;
}): Promise<{ checkoutUrl: string; id: string }> {
  const session = await asaasFetch<AsaasCheckoutSession>("/checkouts", {
    method: "POST",
    body: JSON.stringify({
      billingTypes: ["PIX", "CREDIT_CARD"],
      chargeTypes: ["DETACHED"],
      minutesToExpire: 1440,
      customerData: params.customerData,
      callback: {
        successUrl: params.successUrl,
        autoRedirect: true,
      },
      items: [
        {
          name: params.description,
          value: params.value,
          quantity: 1,
        },
      ],
      externalReference: params.externalReference,
    }),
  });

  // A API do Asaas retorna o id do checkout; a URL final pode vir pronta em
  // link/url/checkoutUrl dependendo da versão da API. Quando não vier, ela é
  // montada a partir do id, no formato usado pelo checkout hospedado do Asaas.
  const checkoutUrl =
    session.link ??
    session.url ??
    session.checkoutUrl ??
    `${isProduction() ? PRODUCTION_CHECKOUT_HOST : SANDBOX_CHECKOUT_HOST}/checkoutSession/show/${session.id}`;

  return { checkoutUrl, id: session.id };
}

export interface AsaasPayment {
  id: string;
  status: string;
  externalReference?: string;
}

export async function getPayment(paymentId: string): Promise<AsaasPayment> {
  return asaasFetch<AsaasPayment>(`/payments/${paymentId}`);
}

/**
 * O redirecionamento de sucesso do Checkout não garante o id do pagamento na
 * URL, e a própria Asaas recomenda não confiar só no callback. Por isso a
 * confirmação consulta os pagamentos pelo externalReference (o id da nossa
 * triagem), que definimos na criação do checkout.
 */
export async function getPaymentsByExternalReference(
  externalReference: string
): Promise<AsaasPayment[]> {
  const result = await asaasFetch<{ data: AsaasPayment[] }>(
    `/payments?externalReference=${encodeURIComponent(externalReference)}`
  );
  return result.data;
}

export const CONFIRMED_STATUSES = ["CONFIRMED", "RECEIVED", "RECEIVED_IN_CASH"];
