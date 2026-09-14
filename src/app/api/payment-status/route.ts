import { NextResponse } from "next/server";
import { CONFIRMED_STATUSES, getPaymentsByExternalReference } from "@/lib/asaas";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const triagemId = searchParams.get("triagemId");

  if (!triagemId) {
    return NextResponse.json({ error: "triagemId é obrigatório." }, { status: 400 });
  }

  try {
    const payments = await getPaymentsByExternalReference(triagemId);
    const confirmed = payments.some((payment) =>
      CONFIRMED_STATUSES.includes(payment.status)
    );

    return NextResponse.json({ confirmed });
  } catch (error) {
    console.error("Falha ao consultar status de pagamento na Asaas:", error);
    return NextResponse.json(
      { error: "Não foi possível verificar o pagamento." },
      { status: 502 }
    );
  }
}
