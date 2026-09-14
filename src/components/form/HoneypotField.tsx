import { HONEYPOT_FIELD } from "@/lib/honeypot";

/** Campo invisível para humanos, usado como antispam sem captcha pago. */
export default function HoneypotField() {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
      <label htmlFor={HONEYPOT_FIELD}>Não preencha este campo</label>
      <input
        type="text"
        id={HONEYPOT_FIELD}
        name={HONEYPOT_FIELD}
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}
