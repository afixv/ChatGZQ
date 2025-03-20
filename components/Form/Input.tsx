import { twMerge } from "tailwind-merge";

const variants = {
  default: "border-dark-100 bg-white text-gray-900 focus:border-primary-50",
  error: "border-dark-100 bg-danger-10 text-danger-80 focus:border-danger-60",
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: keyof typeof variants;
  label?: string;
  required?: boolean;
  className?: string;
  containerClassName?: string;
}

export function Input({
  variant = "default",
  label,
  required = false,
  className,
  containerClassName,
  ...props
}: InputProps) {
  const mergedClassName = twMerge(
    "block w-full rounded-[9px] focus:ring-0 px-3 py-[10px] border-2 font-medium focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
    variants[variant],
    className,
  );

  return (
    <div className={twMerge("flex flex-col gap-1", containerClassName)}>
      {label && (
        <label className="text-gray-900 mb-1 font-medium">
          {label} {required && <span className="text-danger-60">*</span>}
        </label>
      )}
      <input className={mergedClassName} required={required} {...props} />
    </div>
  );
}
