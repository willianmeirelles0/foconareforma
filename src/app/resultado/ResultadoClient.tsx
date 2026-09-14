"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTriagemRecord } from "@/lib/triagemSession";
import { PRICING } from "@/lib/pricing";
import { buildElianeMessage } from "@/lib/messages";
import { buildWhatsAppLink, getElianePhone } from "@/lib/whatsapp";
import FieldLabel from "@/components/form/FieldLabel";
import FaqAccordion from "@/components/FaqAccordion";
import { RESULTADO_FAQ } from "@/lib/faq";

type ContatoState = {
  nome: string;
  email: string;
  cnpj: string;
  telefone: string;
};

const CONTATO_INICIAL: ContatoState = {
  nome: "",
  email: "",
  cnpj: "",
  telefone: "",
};

export default function ResultadoClient() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const record = useTriagemRecord(id);
  const [contato, setContato] = useState<ContatoState>(CONTATO_INICIAL);
  const [error, setError] = useState<string | null>(null);
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  if (!record) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6">
        <h1 className="font-serif text-2xl text-prussia">
          Não encontramos o resultado da sua triagem
        </h1>
        <p className="mt-3 font-sans text-sm text-graphite">
          Isso pode acontecer se a página foi aberta em outra aba ou se a
          sessão expirou. Refaça a triagem, leva menos de dois minutos.
        </p>
        <Link
          href="/triagem"
          className="mt-8 inline-block rounded-full bg-techblue px-8 py-4 font-display text-base font-semibold text-white transition hover:scale-105 hover:bg-twilight"
        >
          Refazer triagem
        </Link>
      </div>
    );
  }

  const pricing = PRICING[record.classification];

  if (record.classification === "personalizado") {
    const whatsappLink = buildWhatsAppLink(
      getElianePhone(),
      buildElianeMessage(record.answers)
    );

    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <p className="font-display text-sm font-semibold uppercase tracking-widest text-techblue">
          Resultado da triagem
        </p>
        <h1 className="mt-3 font-serif text-2xl text-prussia sm:text-3xl">
          {pricing.title}
        </h1>
        <p className="mt-4 font-sans text-base text-graphite">
          {pricing.description}
        </p>
        <div className="mt-6 rounded-lg bg-oxford px-6 py-5 font-sans text-sm text-white">
          <p className="font-display text-base font-semibold text-honey">
            {pricing.priceLabel}
          </p>
          <p className="mt-2 text-white/85">
            Esse perfil não passa pelo checkout automático do site. Fale
            diretamente com a Eliane pelo WhatsApp para receber uma proposta
            sob medida para a sua empresa.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="font-display text-base font-semibold text-prussia">
            Perguntas frequentes
          </h2>
          <div className="mt-4">
            <FaqAccordion items={RESULTADO_FAQ} />
          </div>
        </div>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-full bg-techblue px-8 py-4 font-display text-base font-semibold text-white transition hover:scale-105 hover:bg-twilight"
        >
          Falar com a Eliane no WhatsApp
        </a>
      </div>
    );
  }

  const classification = record.classification;

  function validarContato(): string | null {
    if (!contato.nome.trim()) return "Informe o seu nome.";
    if (!/^\S+@\S+\.\S+$/.test(contato.email)) return "Informe um e-mail válido.";
    const cnpjDigits = contato.cnpj.replace(/\D/g, "");
    if (cnpjDigits.length !== 14) {
      return "Informe um CNPJ válido.";
    }
    const telefoneDigits = contato.telefone.replace(/\D/g, "");
    if (telefoneDigits.length < 10) return "Informe um telefone válido com DDD.";
    return null;
  }

  async function handleCheckout(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationError = validarContato();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setLoadingCheckout(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          triagemId: id,
          classification,
          contato,
        }),
      });

      if (!response.ok) {
        throw new Error("checkout_failed");
      }

      const data = (await response.json()) as { checkoutUrl: string };
      window.location.href = data.checkoutUrl;
    } catch {
      setError(
        "Não foi possível iniciar o pagamento agora. Tente novamente em instantes."
      );
      setLoadingCheckout(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <p className="font-display text-sm font-semibold uppercase tracking-widest text-techblue">
        Resultado da triagem
      </p>
      <h1 className="mt-3 font-serif text-2xl text-prussia sm:text-3xl">
        {pricing.title}
      </h1>
      <p className="mt-4 font-sans text-base text-graphite">
        {pricing.description}
      </p>

      <div className="mt-6 rounded-lg bg-oxford px-6 py-5 text-white">
        <p className="font-display text-2xl font-bold text-honey">
          {pricing.priceLabel}
        </p>
        <p className="mt-1 font-sans text-sm text-white/80">
          Pagamento único, via Pix ou cartão.
        </p>
      </div>

      <div className="mt-10">
        <h2 className="font-display text-base font-semibold text-prussia">
          Perguntas frequentes
        </h2>
        <div className="mt-4">
          <FaqAccordion items={RESULTADO_FAQ} />
        </div>
      </div>

      <form onSubmit={handleCheckout} className="mt-10 space-y-5">
        <h2 className="font-display text-base font-semibold text-prussia">
          Seus dados para o diagnóstico
        </h2>

        <div>
          <FieldLabel htmlFor="nome" required>
            Nome completo
          </FieldLabel>
          <input
            id="nome"
            type="text"
            value={contato.nome}
            onChange={(event) =>
              setContato((prev) => ({ ...prev, nome: event.target.value }))
            }
            className="mt-2 w-full rounded-md border border-black/15 px-4 py-3 font-sans text-sm outline-none focus:border-techblue"
          />
        </div>

        <div>
          <FieldLabel htmlFor="email" required>
            E-mail
          </FieldLabel>
          <input
            id="email"
            type="email"
            value={contato.email}
            onChange={(event) =>
              setContato((prev) => ({ ...prev, email: event.target.value }))
            }
            className="mt-2 w-full rounded-md border border-black/15 px-4 py-3 font-sans text-sm outline-none focus:border-techblue"
          />
        </div>

        <div>
          <FieldLabel htmlFor="cnpj" required>
            CNPJ
          </FieldLabel>
          <input
            id="cnpj"
            type="text"
            inputMode="numeric"
            placeholder="00.000.000/0000-00"
            value={contato.cnpj}
            onChange={(event) =>
              setContato((prev) => ({ ...prev, cnpj: event.target.value }))
            }
            className="mt-2 w-full rounded-md border border-black/15 px-4 py-3 font-sans text-sm outline-none focus:border-techblue"
          />
        </div>

        <div>
          <FieldLabel htmlFor="telefone" required>
            WhatsApp (com DDD)
          </FieldLabel>
          <input
            id="telefone"
            type="tel"
            value={contato.telefone}
            onChange={(event) =>
              setContato((prev) => ({ ...prev, telefone: event.target.value }))
            }
            className="mt-2 w-full rounded-md border border-black/15 px-4 py-3 font-sans text-sm outline-none focus:border-techblue"
          />
        </div>

        {error && (
          <p className="rounded-md bg-honey/20 px-4 py-3 font-sans text-sm text-carbon">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loadingCheckout}
          className="w-full rounded-full bg-techblue px-8 py-4 font-display text-base font-semibold text-white transition hover:scale-105 hover:bg-twilight disabled:opacity-60 sm:w-auto"
        >
          {loadingCheckout ? "Preparando pagamento..." : "Ir para o pagamento"}
        </button>
      </form>
    </div>
  );
}
