import { Suspense } from "react";
import ConfirmacaoClient from "./ConfirmacaoClient";

export default function ConfirmacaoPage() {
  return (
    <Suspense fallback={null}>
      <ConfirmacaoClient />
    </Suspense>
  );
}
