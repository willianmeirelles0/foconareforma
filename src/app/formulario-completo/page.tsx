import { Suspense } from "react";
import FormularioCompletoClient from "./FormularioCompletoClient";

export default function FormularioCompletoPage() {
  return (
    <Suspense fallback={null}>
      <FormularioCompletoClient />
    </Suspense>
  );
}
