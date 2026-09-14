import Link from "next/link";

const AUTORIDADE = [
  { numero: "15 anos", legenda: "de mercado em Bento Gonçalves/RS" },
  { numero: "500+", legenda: "empresas atendidas pela Foco" },
  { numero: "3", legenda: "regimes tributários simulados no diagnóstico" },
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
      <section className="bg-prussia text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-honey">
            Diagnóstico de Impacto da Reforma Tributária
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-3xl leading-tight text-white sm:text-5xl">
            Descubra quanto a sua empresa vai pagar em cada regime tributário
            depois da Reforma.
          </h1>
          <p className="mt-6 max-w-2xl font-sans text-base text-white/80 sm:text-lg">
            A Foco Gestão Contábil simula o impacto da Reforma Tributária no
            seu negócio, compara Simples Nacional, Lucro Presumido e Lucro
            Real, e orienta qual caminho seguir. Inteligência que organiza,
            orienta e gera segurança para a sua decisão.
          </p>
          <div className="mt-10">
            <Link
              href="/triagem"
              className="inline-block rounded-full bg-techblue px-8 py-4 font-display text-base font-semibold text-white transition hover:bg-twilight"
            >
              Começar minha triagem
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-14 sm:grid-cols-3 sm:px-6">
          {AUTORIDADE.map((item) => (
            <div key={item.legenda}>
              <div className="font-display text-4xl font-bold text-twilight">
                {item.numero}
              </div>
              <p className="mt-2 font-sans text-sm text-graphite">
                {item.legenda}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-oxford text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-honey">
            Prazo real, não marketing
          </p>
          <h2 className="mt-4 max-w-2xl font-serif text-2xl text-white sm:text-3xl">
            A escolha do regime tributário para 2027 se confirma no pagamento
            da primeira parcela do IRPJ, em fevereiro de 2027.
          </h2>
          <p className="mt-6 max-w-2xl font-sans text-white/80">
            Esse é o prazo que vale para a maioria das empresas brasileiras. As
            empresas do Simples Nacional também têm uma janela específica para
            optar pelo regime híbrido: ela ocorre de 1 a 30 de setembro de
            cada ano, valendo para o semestre seguinte, e se repete a cada
            abril e setembro. 30 de novembro é apenas o prazo para desistir de
            uma opção já feita em setembro, não é uma nova janela de entrada.
          </p>
          <p className="mt-4 max-w-2xl font-sans text-white/80">
            Quanto antes a sua empresa souber o resultado da simulação, mais
            tempo ela tem para se organizar antes de fevereiro de 2027.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-serif text-2xl text-prussia sm:text-3xl">
            Como funciona
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {COMO_FUNCIONA.map((etapa, index) => (
              <div key={etapa.titulo}>
                <div className="font-display text-3xl font-bold text-honey">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold text-prussia">
                  {etapa.titulo}
                </h3>
                <p className="mt-2 font-sans text-sm text-graphite">
                  {etapa.texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-prussia text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
          <h2 className="font-serif text-2xl text-white sm:text-3xl">
            Sua empresa já sabe o que a Reforma Tributária vai custar para
            ela?
          </h2>
          <div className="mt-8">
            <Link
              href="/triagem"
              className="inline-block rounded-full bg-techblue px-8 py-4 font-display text-base font-semibold text-white transition hover:bg-twilight"
            >
              Começar minha triagem
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
