import Link from "next/link";
import { FOCO_INSTITUCIONAL_URL } from "@/lib/site";

export default function SiteHeader() {
  return (
    <header className="border-b border-black/10 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex flex-col leading-none">
          <Link
            href="/"
            className="font-display text-lg font-bold tracking-tight text-prussia sm:text-xl"
          >
            FOCO <span className="text-techblue">NA REFORMA</span>
          </Link>
          <span className="mt-1 text-[11px] font-sans uppercase tracking-wide text-steel">
            Uma frente da{" "}
            <a
              href={FOCO_INSTITUCIONAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-honey decoration-2 underline-offset-2 hover:text-graphite"
            >
              Foco Gestão Contábil
            </a>
          </span>
        </div>

        <Link
          href="/triagem"
          className="hidden shrink-0 rounded-full bg-techblue px-5 py-2.5 font-display text-sm font-semibold text-white transition hover:bg-twilight sm:inline-block"
        >
          Fazer diagnóstico
        </Link>
      </div>
    </header>
  );
}
