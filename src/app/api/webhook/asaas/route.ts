import { NextResponse } from "next/server";

/**
 * Recebe notificações de pagamento da Asaas. Serve como registro/auditoria
 * dos eventos; a liberação da página de confirmação usa a consulta direta à
 * API da Asaas (/api/payment-status), que é a fonte de verdade, já que a
 * Asaas recomenda não confiar apenas no webhook ou no callback de sucesso.
 */
export async function POST(request: Request) {
  const token = request.headers.get("asaas-access-token");
  const expectedToken = process.env.ASAAS_WEBHOOK_TOKEN;

  if (expectedToken && token !== expectedToken) {
    return NextResponse.json({ error: "Token inválido." }, { status: 401 });
  }

  const event = await request.json().catch(() => null);
  console.log("Webhook Asaas recebido:", event?.event, event?.payment?.externalReference);

  return NextResponse.json({ ok: true });
}
