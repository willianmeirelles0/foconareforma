/** Campo honeypot invisível: bots preenchem, humanos não. */
export const HONEYPOT_FIELD = "website";

export function isBot(body: Record<string, unknown>): boolean {
  const value = body[HONEYPOT_FIELD];
  return typeof value === "string" && value.trim().length > 0;
}
