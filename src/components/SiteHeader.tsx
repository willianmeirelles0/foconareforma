"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FOCO_INSTITUCIONAL_URL } from "@/lib/site";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/90 backdrop-blur transition-shadow duration-300 ${
        scrolled ? "border-black/10 shadow-[0_2px_16px_-4px_rgba(12,26,45,0.15)]" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex flex-col leading-none">
          <Link
            href="/"
            className="font-display text-lg font-bold tracking-tight text-prussia transition-opacity hover:opacity-80 sm:text-xl"
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
          className="hidden shrink-0 rounded-full bg-techblue px-5 py-2.5 font-display text-sm font-semibold text-white transition duration-200 hover:scale-105 hover:bg-twilight sm:inline-block"
        >
          Fazer diagnóstico
        </Link>
      </div>
    </header>
  );
}
