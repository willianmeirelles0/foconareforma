"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTriagemRecord } from "@/lib/triagemSession";
import { buildHugoMessage } from "@/lib/messages";
import { buildWhatsAppLink, getHugoPhone } from "@/lib/whatsapp";
import type { Classification } from "@/lib/classification";

type Status = "checking" | "confirmed" | "pending" | "error";

const MAX_TENTATIVAS = 10;
const INTERVALO_MS = 3000;

export default function ConfirmacaoClient() {
  const searchParams = useSearchParams();
  const triagemId = searchParams.get("triagemId");
  const [status, setStatus] = useState<Status>(() =>
    triagemId ? "checking" : "error"
  );
  const tentativas = useRef(0);
  const record = useTriagemRecord(triagemId);

  useEffect(() => {
    if (!triagemId) {
      return;
    }

    let cancelled = false;

    async function verificar() {
      try {
        const response = await fetch(
          `/api/payment-status?triagemId=${encodeURIComponent(triagemId!)}`
        );
        const data = (await response.json()) as { confirmed?: boolean };

        if (cancelled) return;

        if (data.confirmed) {
          setStatus("confirmed");
          return;
        }

        tentativas.current += 1;
        if (tentativas.current >= MAX_TENTATIVAS) {
          setStatus("pending");
          return;
        }

        setTimeout(verificar, INTERVALO_MS);
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    verificar();

    return () => {
      cancelled = true;
    };
  }, [triagemId]);

  if (status === "checking") {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
        <p className="font-sans text-sm text-graphite">
          Confirmando o seu pagamento...
        </p>
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-serif text-2xl text-prussia">
          Ainda estamos confirmando o seu pagamento
        </h1>
        <p className="mt-3 font-sans text-sm text-graphite">
          Isso pode levar alguns instantes, principalmente no Pix. Atualize a
          página em alguns minutos para ver a confirmação.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-8 inline-block rounded-full bg-techblue px-8 py-4 font-display text-base font-semibold text-white transition hover:scale-105 hover:bg-twilight"
        >
          Atualizar página
        </button>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-serif text-2xl text-prussia">
          Não foi possível verificar o seu pagamento
        </h1>
        <p className="mt-3 font-sans text-sm text-graphite">
          Se o pagamento foi concluído, ele será confirmado em instantes.
          Atualize a página para tentar novamente.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-8 inline-block rounded-full bg-techblue px-8 py-4 font-display text-base font-semibold text-white transition hover:scale-105 hover:bg-twilight"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  const classification = (record?.classification ?? "simples") as Exclude<
    Classification,
    "personalizado"
  >;
  const whatsappLink = record
    ? buildWhatsAppLink(getHugoPhone(), buildHugoMessage(record.answers, classification))
    : buildWhatsAppLink(
        getHugoPhone(),
        `Olá, Hugo! Acabei de confirmar o pagamento do meu diagnóstico no site Foco na Reforma. Referência: ${triagemId}`
      );

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <p className="font-display text-sm font-semibold uppercase tracking-widest text-techblue">
        Pagamento confirmado
      </p>
      <h1 className="mt-3 font-serif text-2xl text-prussia sm:text-3xl">
        Recebemos o seu pagamento. Agora faltam dois passos.
      </h1>

      <div className="mt-10 rounded-lg border border-black/10 px-6 py-6">
        <span className="font-display text-sm font-semibold text-honey">
          Passo 1
        </span>
        <h2 className="mt-1 font-display text-lg font-semibold text-prussia">
          Fale com o Hugo no WhatsApp
        </h2>
        <p className="mt-2 font-sans text-sm text-graphite">
          O Hugo, responsável técnico pelas análises, vai te dar uma breve
          explicação e já iniciar o seu estudo.
        </p>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-block rounded-full bg-techblue px-6 py-3 font-display text-sm font-semibold text-white transition hover:scale-105 hover:bg-twilight"
        >
          Chamar o Hugo no WhatsApp
        </a>
      </div>

      <div className="mt-6 rounded-lg border border-black/10 px-6 py-6">
        <span className="font-display text-sm font-semibold text-honey">
          Passo 2
        </span>
        <h2 className="mt-1 font-display text-lg font-semibold text-prussia">
          Preencha o formulário completo
        </h2>
        <p className="mt-2 font-sans text-sm text-graphite">
          São 23 perguntas detalhadas sobre a sua empresa. Essas informações
          são a base do seu diagnóstico.
        </p>
        <Link
          href={`/formulario-completo?id=${triagemId ?? ""}`}
          className="mt-5 inline-block rounded-full bg-prussia px-6 py-3 font-display text-sm font-semibold text-white transition hover:scale-105 hover:bg-oxford"
        >
          Preencher formulário completo
        </Link>
      </div>
    </div>
  );
}
