import { NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/asaas";
import { PRICING } from "@/lib/pricing";
import type { Classification } from "@/lib/classification";

interface CheckoutPayload {
  triagemId: string;
  classification: Classification;
  contato: {
    nome: string;
    email: string;
    cnpj: string;
    telefone: string;
  };
}

export async function POST(request: Request) {
  const body = (await request.json()) as CheckoutPayload;
  const { triagemId, classification, contato } = body;

  if (!triagemId || !classification || !contato) {
    return NextResponse.json({ error: "Dados incompletos." }, { status: 400 });
  }

  const pricing = PRICING[classification];
  if (!pricing.value) {
    return NextResponse.json(
      { error: "Este perfil não possui checkout automático." },
      { status: 400 }
    );
  }

  const origin = request.headers.get("origin") ?? new URL(request.url).origin;

  try {
    const { checkoutUrl } = await createCheckoutSession({
      customerData: {
        name: contato.nome,
        email: contato.email,
        cpfCnpj: contato.cnpj.replace(/\D/g, ""),
        phone: contato.telefone.replace(/\D/g, ""),
      },
      externalReference: triagemId,
      value: pricing.value,
      description: pricing.title,
      successUrl: `${origin}/confirmacao?triagemId=${triagemId}`,
    });

    return NextResponse.json({ checkoutUrl });
  } catch (error) {
    console.error("Falha ao criar checkout Asaas:", error);
    return NextResponse.json(
      { error: "Não foi possível iniciar o pagamento." },
      { status: 502 }
    );
  }
}
