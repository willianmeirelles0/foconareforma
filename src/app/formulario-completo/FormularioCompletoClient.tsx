"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import FieldLabel from "@/components/form/FieldLabel";
import HoneypotField from "@/components/form/HoneypotField";
import { isBot } from "@/lib/honeypot";
import { CAMPOS_FORMULARIO_COMPLETO } from "@/lib/formularioCompleto";

type Respostas = Record<string, string>;

function agruparPorSecao() {
  const secoes: { nome: string; campos: typeof CAMPOS_FORMULARIO_COMPLETO }[] = [];
  for (const campo of CAMPOS_FORMULARIO_COMPLETO) {
    let secao = secoes.find((s) => s.nome === campo.secao);
    if (!secao) {
      secao = { nome: campo.secao, campos: [] };
      secoes.push(secao);
    }
    secao.campos.push(campo);
  }
  return secoes;
}

const SECOES = agruparPorSecao();

export default function FormularioCompletoClient() {
  const searchParams = useSearchParams();
  const triagemId = searchParams.get("id") ?? "";
  const secoes = SECOES;

  const [respostas, setRespostas] = useState<Respostas>({});
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  function update(id: string, value: string) {
    setRespostas((prev) => ({ ...prev, [id]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    if (isBot(Object.fromEntries(formData) as Record<string, string>)) {
      return;
    }

    for (const campo of CAMPOS_FORMULARIO_COMPLETO) {
      if (campo.required && !respostas[campo.id]?.trim()) {
        setError(`Preencha o campo obrigatório: "${campo.label}".`);
        return;
      }
    }

    const email = respostas.email ?? "";
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Informe um e-mail válido.");
      return;
    }

    setEnviando(true);

    try {
      const response = await fetch("/api/formulario-completo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ triagemId, respostas }),
      });

      if (!response.ok) throw new Error("submit_failed");

      setEnviado(true);
    } catch {
      setError(
        "Não foi possível enviar o formulário agora. Tente novamente em instantes."
      );
    } finally {
      setEnviando(false);
    }
  }

  if (enviado) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-serif text-2xl text-prussia">
          Recebemos as informações da sua empresa
        </h1>
        <p className="mt-3 font-sans text-sm text-graphite">
          Obrigado por preencher o formulário completo. O Hugo já está com
          essas informações para seguir com o seu estudo.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <p className="font-display text-sm font-semibold uppercase tracking-widest text-techblue">
        Formulário completo
      </p>
      <h1 className="mt-3 font-serif text-2xl text-prussia sm:text-3xl">
        Informações detalhadas para o seu diagnóstico
      </h1>
      <p className="mt-3 font-sans text-sm text-graphite">
        São 23 perguntas sobre a sua empresa. Essas informações são a base do
        estudo que o Hugo vai preparar.
      </p>

      <form onSubmit={handleSubmit} className="relative mt-10 space-y-12">
        <HoneypotField />

        {secoes.map((secao) => (
          <div key={secao.nome} className="space-y-6">
            <h2 className="border-b border-black/10 pb-2 font-display text-lg font-semibold text-prussia">
              {secao.nome}
            </h2>

            {secao.campos.map((campo) => (
              <div key={campo.id}>
                <FieldLabel htmlFor={campo.id} required={campo.required}>
                  {campo.label}
                </FieldLabel>

                {campo.tipo === "textarea" ? (
                  <textarea
                    id={campo.id}
                    name={campo.id}
                    rows={3}
                    value={respostas[campo.id] ?? ""}
                    onChange={(event) => update(campo.id, event.target.value)}
                    className="mt-2 w-full rounded-md border border-black/15 px-4 py-3 font-sans text-sm outline-none focus:border-techblue"
                  />
                ) : campo.tipo === "select" ? (
                  <select
                    id={campo.id}
                    name={campo.id}
                    value={respostas[campo.id] ?? ""}
                    onChange={(event) => update(campo.id, event.target.value)}
                    className="mt-2 w-full rounded-md border border-black/15 bg-white px-4 py-3 font-sans text-sm outline-none focus:border-techblue"
                  >
                    <option value="" disabled>
                      Selecione
                    </option>
                    {campo.opcoes?.map((opcao) => (
                      <option key={opcao} value={opcao}>
                        {opcao}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={campo.id}
                    name={campo.id}
                    type={campo.tipo}
                    value={respostas[campo.id] ?? ""}
                    onChange={(event) => update(campo.id, event.target.value)}
                    className="mt-2 w-full rounded-md border border-black/15 px-4 py-3 font-sans text-sm outline-none focus:border-techblue"
                  />
                )}
              </div>
            ))}
          </div>
        ))}

        {error && (
          <p className="rounded-md bg-honey/20 px-4 py-3 font-sans text-sm text-carbon">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={enviando}
          className="w-full rounded-full bg-techblue px-8 py-4 font-display text-base font-semibold text-white transition hover:scale-105 hover:bg-twilight disabled:opacity-60 sm:w-auto"
        >
          {enviando ? "Enviando..." : "Enviar formulário"}
        </button>
      </form>
    </div>
  );
}
