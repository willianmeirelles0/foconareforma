import { Suspense } from "react";
import ResultadoClient from "./ResultadoClient";

export default function ResultadoPage() {
  return (
    <Suspense fallback={null}>
      <ResultadoClient />
    </Suspense>
  );
}
