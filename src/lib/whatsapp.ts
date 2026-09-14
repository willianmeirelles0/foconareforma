/** Monta um link wa.me com mensagem pré-preenchida (sem WhatsApp Business API). */
export function buildWhatsAppLink(phone: string, message: string): string {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function getHugoPhone(): string {
  return process.env.NEXT_PUBLIC_WHATSAPP_HUGO ?? "";
}

export function getElianePhone(): string {
  return process.env.NEXT_PUBLIC_WHATSAPP_ELIANE ?? "";
}
