import { NextResponse } from "next/server";
import { appendRow } from "@/lib/googleSheets";
import { isBot } from "@/lib/honeypot";
import type { TriagemAnswers, Classification } from "@/lib/classification";

interface TriagemPayload {
  id: string;
  answers: TriagemAnswers;
  classification: Classification;
  [key: string]: unknown;
}

export async function POST(request: Request) {
  const body = (await request.json()) as TriagemPayload;

  if (isBot(body)) {
    return NextResponse.json({ ok: true });
  }

  const { id, answers, classification } = body;

  if (!id || !answers || !classification) {
    return NextResponse.json({ error: "Dados incompletos." }, { status: 400 });
  }

  try {
    await appendRow("Triagem", [
      new Date().toISOString(),
      id,
      answers.segmento,
      answers.regimeAtual,
      answers.faturamentoMensal,
      answers.operacoesInterestaduais,
      answers.importacaoExportacao,
      answers.multiplasAtividades,
      answers.beneficiosFiscais,
      classification,
    ]);
  } catch (error) {
    console.error("Falha ao gravar triagem no Google Sheets:", error);
    // Não bloqueia o fluxo do usuário: a triagem continua mesmo se o registro falhar.
  }

  return NextResponse.json({ ok: true });
}
