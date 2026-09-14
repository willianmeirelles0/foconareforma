"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ChoiceCard from "@/components/form/ChoiceCard";
import FieldLabel from "@/components/form/FieldLabel";
import HoneypotField from "@/components/form/HoneypotField";
import { isBot } from "@/lib/honeypot";
import {
  classify,
  FATURAMENTO_LABELS,
  REGIME_LABELS,
  type FaturamentoMensal,
  type RegimeAtual,
  type TriagemAnswers,
} from "@/lib/classification";
import { generateId, saveTriagemRecord } from "@/lib/triagemSession";

const SEGMENTOS = [
  "Comércio",
  "Indústria",
  "Serviços",
  "Comércio e serviços",
  "Outro",
];

const SIM_NAO = [
  { value: "sim", label: "Sim" },
  { value: "nao", label: "Não" },
];

type FormState = {
  segmento: string;
  regimeAtual: RegimeAtual | "";
  faturamentoMensal: FaturamentoMensal | "";
  operacoesInterestaduais: string;
  importacaoExportacao: string;
  multiplasAtividades: string;
  beneficiosFiscais: string;
};

const INITIAL_STATE: FormState = {
  segmento: "",
  regimeAtual: "",
  faturamentoMensal: "",
  operacoesInterestaduais: "",
  importacaoExportacao: "",
  multiplasAtividades: "",
  beneficiosFiscais: "",
};

export default function TriagemPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    if (isBot(Object.fromEntries(formData) as Record<string, string>)) {
      return;
    }

    if (
      !form.segmento ||
      !form.regimeAtual ||
      !form.faturamentoMensal ||
      !form.operacoesInterestaduais ||
      !form.importacaoExportacao ||
      !form.multiplasAtividades ||
      !form.beneficiosFiscais
    ) {
      setError("Preencha todas as perguntas para continuar.");
      return;
    }

    setSubmitting(true);

    const answers: TriagemAnswers = {
      segmento: form.segmento,
      regimeAtual: form.regimeAtual,
      faturamentoMensal: form.faturamentoMensal,
      operacoesInterestaduais: form.operacoesInterestaduais === "sim",
      importacaoExportacao: form.importacaoExportacao === "sim",
      multiplasAtividades: form.multiplasAtividades === "sim",
      beneficiosFiscais: form.beneficiosFiscais === "sim",
    };

    const classification = classify(answers);
    const id = generateId();

    saveTriagemRecord({
      id,
      answers,
      classification,
      createdAt: new Date().toISOString(),
    });

    fetch("/api/triagem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, answers, classification }),
    }).catch(() => {
      // Falha ao registrar na planilha não deve travar a experiência do usuário.
    });

    router.push(`/resultado?id=${id}`);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <p className="font-display text-sm font-semibold uppercase tracking-widest text-techblue">
        Triagem
      </p>
      <h1 className="mt-3 font-serif text-2xl text-prussia sm:text-3xl">
        Responda algumas perguntas sobre a sua empresa
      </h1>
      <p className="mt-3 font-sans text-sm text-graphite">
        Leva menos de dois minutos. Com base nas respostas, mostramos o
        diagnóstico certo para o perfil da sua empresa.
      </p>

      <form onSubmit={handleSubmit} className="relative mt-10 space-y-10">
        <HoneypotField />

        <div className="space-y-3">
          <FieldLabel required>1. Qual é o segmento da sua empresa?</FieldLabel>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {SEGMENTOS.map((segmento) => (
              <ChoiceCard
                key={segmento}
                name="segmento"
                value={segmento}
                checked={form.segmento === segmento}
                onChange={(value) => update("segmento", value)}
                label={segmento}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <FieldLabel required>2. Qual o regime tributário atual da empresa?</FieldLabel>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {(Object.keys(REGIME_LABELS) as RegimeAtual[]).map((regime) => (
              <ChoiceCard
                key={regime}
                name="regimeAtual"
                value={regime}
                checked={form.regimeAtual === regime}
                onChange={(value) => update("regimeAtual", value as RegimeAtual)}
                label={REGIME_LABELS[regime]}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <FieldLabel required>3. Qual o faturamento médio mensal da empresa?</FieldLabel>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {(Object.keys(FATURAMENTO_LABELS) as FaturamentoMensal[]).map(
              (faixa) => (
                <ChoiceCard
                  key={faixa}
                  name="faturamentoMensal"
                  value={faixa}
                  checked={form.faturamentoMensal === faixa}
                  onChange={(value) =>
                    update("faturamentoMensal", value as FaturamentoMensal)
                  }
                  label={FATURAMENTO_LABELS[faixa]}
                />
              )
            )}
          </div>
        </div>

        <div className="space-y-3">
          <FieldLabel required>4. A empresa realiza operações interestaduais?</FieldLabel>
          <div className="grid grid-cols-2 gap-2 sm:w-1/2">
            {SIM_NAO.map((opcao) => (
              <ChoiceCard
                key={opcao.value}
                name="operacoesInterestaduais"
                value={opcao.value}
                checked={form.operacoesInterestaduais === opcao.value}
                onChange={(value) => update("operacoesInterestaduais", value)}
                label={opcao.label}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <FieldLabel required>5. A empresa realiza importação ou exportação?</FieldLabel>
          <div className="grid grid-cols-2 gap-2 sm:w-1/2">
            {SIM_NAO.map((opcao) => (
              <ChoiceCard
                key={opcao.value}
                name="importacaoExportacao"
                value={opcao.value}
                checked={form.importacaoExportacao === opcao.value}
                onChange={(value) => update("importacaoExportacao", value)}
                label={opcao.label}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <FieldLabel required>
            6. A empresa tem mais de uma atividade relevante (CNAE) ou mais de
            uma filial?
          </FieldLabel>
          <div className="grid grid-cols-2 gap-2 sm:w-1/2">
            {SIM_NAO.map((opcao) => (
              <ChoiceCard
                key={opcao.value}
                name="multiplasAtividades"
                value={opcao.value}
                checked={form.multiplasAtividades === opcao.value}
                onChange={(value) => update("multiplasAtividades", value)}
                label={opcao.label}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <FieldLabel required>
            7. A empresa possui benefícios fiscais ou regime especial de
            tributação?
          </FieldLabel>
          <div className="grid grid-cols-2 gap-2 sm:w-1/2">
            {SIM_NAO.map((opcao) => (
              <ChoiceCard
                key={opcao.value}
                name="beneficiosFiscais"
                value={opcao.value}
                checked={form.beneficiosFiscais === opcao.value}
                onChange={(value) => update("beneficiosFiscais", value)}
                label={opcao.label}
              />
            ))}
          </div>
        </div>

        {error && (
          <p className="rounded-md bg-honey/20 px-4 py-3 font-sans text-sm text-carbon">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-techblue px-8 py-4 font-display text-base font-semibold text-white transition hover:bg-twilight disabled:opacity-60 sm:w-auto"
        >
          Ver meu resultado
        </button>
      </form>
    </div>
  );
}
