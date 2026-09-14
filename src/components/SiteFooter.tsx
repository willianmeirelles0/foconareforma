import Image from "next/image";
import { FOCO_INSTITUCIONAL_URL } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="bg-prussia text-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <Image
          src="/brand/logo-dark-bg.png"
          alt="Foco na Reforma"
          width={1147}
          height={1200}
          className="h-14 w-auto"
        />

        <p className="mt-3 max-w-2xl text-sm text-white/70">
          Diagnóstico de Impacto da Reforma Tributária para empresas de todo o Brasil.
        </p>

        <div className="mt-6 border-t border-white/15 pt-6 text-xs text-white/60">
          <p>
            Foco na Reforma é uma das frentes da{" "}
            <a
              href={FOCO_INSTITUCIONAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-honey decoration-2 underline-offset-2 hover:text-white"
            >
              Foco Gestão Contábil
            </a>
            , contabilidade de Bento Gonçalves/RS com 15 anos de mercado.
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} Foco Gestão Contábil. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
