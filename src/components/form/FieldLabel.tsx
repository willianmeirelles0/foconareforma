export default function FieldLabel({
  children,
  htmlFor,
  required,
}: {
  children: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block font-display text-sm font-semibold text-prussia"
    >
      {children}
      {required && <span className="ml-1 text-techblue">*</span>}
    </label>
  );
}
