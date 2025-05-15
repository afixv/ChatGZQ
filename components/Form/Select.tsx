import { twMerge } from "tailwind-merge";

const selectVariants = {
  default: "border-dark-100 bg-white text-gray-900 focus:border-primary-50",
  error: "border-dark-100 bg-danger-10 text-danger-80 focus:border-danger-60",
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  variant?: keyof typeof selectVariants;
  label?: string;
  required?: boolean;
  className?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
}

export function Select({
  variant = "default",
  label,
  required = false,
  className,
  placeholder,
  options,
  ...props
}: SelectProps) {
  const mergedClassName = twMerge(
    "block w-full rounded-[9px] focus:ring-0 !px-3 py-[12px] border-2 font-medium focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
    selectVariants[variant],
    props.value === "" && "text-dark-90",
    className,
  );

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-gray-900 mb-1 font-medium">
          {label} {required && <span className="text-danger-60">*</span>}
        </label>
      )}
      <select className={mergedClassName} required={required} {...props}>
        <option value="" disabled>
          {placeholder || "Pilih salah satu"}
        </option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="text-black"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
