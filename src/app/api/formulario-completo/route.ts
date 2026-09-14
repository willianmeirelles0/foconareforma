import { NextResponse } from "next/server";
import { appendRow } from "@/lib/googleSheets";
import { isBot } from "@/lib/honeypot";
import { CAMPOS_FORMULARIO_COMPLETO } from "@/lib/formularioCompleto";

interface FormularioPayload {
  triagemId?: string;
  respostas: Record<string, string>;
  [key: string]: unknown;
}

export async function POST(request: Request) {
  const body = (await request.json()) as FormularioPayload;

  if (isBot(body)) {
    return NextResponse.json({ ok: true });
  }

  const { triagemId, respostas } = body;

  if (!respostas) {
    return NextResponse.json({ error: "Dados incompletos." }, { status: 400 });
  }

  for (const campo of CAMPOS_FORMULARIO_COMPLETO) {
    if (campo.required && !respostas[campo.id]?.trim()) {
      return NextResponse.json(
        { error: `Campo obrigatório ausente: ${campo.id}` },
        { status: 400 }
      );
    }
  }

  try {
    await appendRow("FormularioCompleto", [
      new Date().toISOString(),
      triagemId ?? "",
      ...CAMPOS_FORMULARIO_COMPLETO.map((campo) => respostas[campo.id] ?? ""),
    ]);
  } catch (error) {
    console.error("Falha ao gravar formulário completo no Google Sheets:", error);
    return NextResponse.json(
      { error: "Não foi possível salvar as informações agora." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
