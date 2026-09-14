import type { Metadata } from "next";
import { Literata, Blinker, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const literata = Literata({
  variable: "--font-literata",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const blinker = Blinker({
  variable: "--font-blinker",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Foco na Reforma | Diagnóstico de Impacto da Reforma Tributária",
  description:
    "Descubra quanto sua empresa pagaria em cada regime tributário após a Reforma e qual caminho seguir. Diagnóstico da Foco Gestão Contábil, 15 anos de mercado.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${literata.variable} ${blinker.variable} ${hanken.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-carbon">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
