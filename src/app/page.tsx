import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";

const AUTORIDADE = [
  { valor: 15, sufixo: " anos", legenda: "de mercado em Bento Gonçalves/RS" },
  { valor: 500, sufixo: "+", legenda: "empresas atendidas pela Foco" },
  { valor: 3, sufixo: "", legenda: "regimes tributários simulados no diagnóstico" },
];

const RISCOS = [
  {
    titulo: "Margem corroída",
    texto:
      "Pagar mais imposto do que o necessário, dentro da lei, reduz o que sobra no fim do mês. Mês após mês, isso se acumula.",
  },
  {
    titulo: "Caixa comprometido",
    texto:
      "Errar o regime tributário no meio da transição da Reforma pode apertar o caixa exatamente quando a empresa mais precisa de fôlego para se adaptar.",
  },
  {
    titulo: "Risco à continuidade",
    texto:
      "Para negócios de margem apertada, a diferença entre o regime certo e o errado pode ser a diferença entre continuar operando e fechar as portas.",
  },
];

const COMO_FUNCIONA = [
  {
    titulo: "Triagem rápida",
    texto:
      "Você responde perguntas objetivas sobre a sua empresa: regime atual, faturamento, atividades e operações.",
  },
  {
    titulo: "Classificação e pagamento",
    texto:
      "Com base nas respostas, mostramos o diagnóstico certo para o seu perfil e o preço correspondente. O pagamento é feito com segurança, via Pix ou cartão.",
  },
  {
    titulo: "Estudo e orientação",
    texto:
      "Com o pagamento confirmado, o Hugo, responsável técnico pelas análises, entra em contato para uma breve explicação e já inicia o seu estudo.",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-prussia text-white">
        <div
          aria-hidden="true"
          className="animate-drift-one pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full bg-techblue/30 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="animate-drift-two pointer-events-none absolute -bottom-40 -right-16 h-[28rem] w-[28rem] rounded-full bg-honey/20 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <Reveal>
            <Image
              src="/brand/logo-dark-bg.png"
              alt="Foco na Reforma"
              width={1147}
              height={1200}
              priority
              className="h-20 w-auto sm:h-24"
            />
          </Reveal>
          <Reveal delayMs={40}>
            <p className="mt-8 font-display text-sm font-semibold uppercase tracking-widest text-honey">
              Diagnóstico de Impacto da Reforma Tributária
            </p>
          </Reveal>
          <Reveal delayMs={80}>
            <h1 className="mt-4 max-w-3xl font-display text-3xl leading-tight sm:text-5xl">
              <span className="font-black text-white">
                Até fevereiro de 2027, toda empresa vai decidir o seu regime
                tributário para a Reforma.
              </span>{" "}
              <span className="font-normal text-techblue">
                A diferença é decidir sabendo quanto isso custa.
              </span>
            </h1>
          </Reveal>
          <Reveal delayMs={160}>
            <p className="mt-6 max-w-2xl font-sans text-base text-white/80 sm:text-lg">
              A Foco Gestão Contábil simula o impacto da Reforma Tributária no
              seu negócio, compara Simples Nacional, Lucro Presumido e Lucro
              Real, e mostra qual caminho seguir.
            </p>
          </Reveal>
          <Reveal delayMs={240}>
            <div className="mt-10">
              <Link
                href="/triagem"
                className="animate-pulse-ring inline-block rounded-full bg-techblue px-8 py-4 font-display text-base font-semibold text-white transition hover:scale-105 hover:bg-twilight"
              >
                Começar minha triagem
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-14 sm:grid-cols-3 sm:px-6">
          {AUTORIDADE.map((item, index) => (
            <Reveal key={item.legenda} delayMs={index * 100}>
              <div className="font-display text-4xl font-bold text-twilight">
                <CountUp to={item.valor} suffix={item.sufixo} />
              </div>
              <p className="mt-2 font-sans text-sm text-graphite">
                {item.legenda}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-prussia text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <Reveal>
            <p className="font-display text-sm font-semibold uppercase tracking-widest text-honey">
              O custo real de escolher errado
            </p>
          </Reveal>
          <Reveal delayMs={80}>
            <h2 className="mt-4 max-w-2xl font-serif text-2xl text-white sm:text-3xl">
              Errar a escolha do regime tributário não é um detalhe contábil.
              É dinheiro saindo do caixa todo mês, de forma legal, mas
              evitável.
            </h2>
          </Reveal>
          <Reveal delayMs={140}>
            <p className="mt-6 max-w-2xl font-sans text-white/80">
              A Reforma muda a lógica de cobrança de tributos sobre o
              consumo. Duas empresas do mesmo setor, com o mesmo faturamento,
              podem pagar valores bem diferentes dependendo do regime
              escolhido. Quando essa escolha é feita sem simulação, a
              diferença vira custo fixo, todo mês, pelos próximos anos.
            </p>
          </Reveal>
          <Reveal delayMs={200}>
            <p className="mt-4 max-w-2xl font-sans font-medium text-white/90">
              Para negócios de margem apertada, isso não é exagero: é
              aritmética. Carga tributária acima do necessário reduz margem,
              compromete caixa e tira competitividade justamente no momento
              em que a empresa mais precisa de fôlego para se adaptar.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {RISCOS.map((risco, index) => (
              <Reveal key={risco.titulo} delayMs={index * 100}>
                <div className="h-full rounded-lg border border-white/15 bg-white/5 px-6 py-6">
                  <h3 className="font-display text-base font-semibold text-honey">
                    {risco.titulo}
                  </h3>
                  <p className="mt-2 font-sans text-sm text-white/75">
                    {risco.texto}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-oxford text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <Reveal>
            <p className="font-display text-sm font-semibold uppercase tracking-widest text-honey">
              Prazo real, não marketing
            </p>
          </Reveal>
          <Reveal delayMs={80}>
            <h2 className="mt-4 max-w-2xl font-serif text-2xl text-white sm:text-3xl">
              A escolha do regime tributário para 2027 se confirma no
              pagamento da primeira parcela do IRPJ, em fevereiro de 2027.
            </h2>
          </Reveal>
          <Reveal delayMs={140}>
            <p className="mt-6 max-w-2xl font-sans text-white/80">
              Esse é o prazo que vale para a maioria das empresas brasileiras.
              As empresas do Simples Nacional também têm uma janela específica
              para optar pelo regime híbrido: ela ocorre de 1 a 30 de setembro
              de cada ano, valendo para o semestre seguinte, e se repete a
              cada abril e setembro. 30 de novembro é apenas o prazo para
              desistir de uma opção já feita em setembro, não é uma nova
              janela de entrada.
            </p>
          </Reveal>
          <Reveal delayMs={200}>
            <p className="mt-4 max-w-2xl font-sans text-white/80">
              Quanto antes a sua empresa souber o resultado da simulação, mais
              tempo ela tem para se organizar antes de fevereiro de 2027.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <Reveal>
            <h2 className="font-serif text-2xl text-prussia sm:text-3xl">
              Como funciona
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {COMO_FUNCIONA.map((etapa, index) => (
              <Reveal key={etapa.titulo} delayMs={index * 100}>
                <div className="font-display text-3xl font-bold text-honey">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold text-prussia">
                  {etapa.titulo}
                </h3>
                <p className="mt-2 font-sans text-sm text-graphite">
                  {etapa.texto}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-prussia text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
          <Reveal>
            <h2 className="font-serif text-2xl text-white sm:text-3xl">
              Sua empresa já sabe o que a Reforma Tributária vai custar para
              ela?
            </h2>
          </Reveal>
          <Reveal delayMs={100}>
            <div className="mt-8">
              <Link
                href="/triagem"
                className="inline-block rounded-full bg-techblue px-8 py-4 font-display text-base font-semibold text-white transition hover:scale-105 hover:bg-twilight"
              >
                Começar minha triagem
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
