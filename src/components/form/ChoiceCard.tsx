export default function ChoiceCard({
  name,
  value,
  checked,
  onChange,
  label,
  hint,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  label: string;
  hint?: string;
}) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 transition duration-150 ${
        checked
          ? "border-techblue bg-techblue/5 shadow-sm"
          : "border-black/10 hover:-translate-y-0.5 hover:border-techblue/40 hover:shadow-sm"
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="mt-1 h-4 w-4 accent-techblue"
      />
      <span>
        <span className="block font-sans text-sm font-medium text-carbon">
          {label}
        </span>
        {hint && (
          <span className="mt-0.5 block font-sans text-xs text-steel">
            {hint}
          </span>
        )}
      </span>
    </label>
  );
}
