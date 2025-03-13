import { twMerge } from "tailwind-merge";

const variants = {
  primary: "bg-primary-50 hover:bg-primary-50/80",
  secondary: "bg-secondary-60 hover:bg-secondary-60/80 text-primary-70",
  destructive: "bg-danger-60 hover:bg-danger-60/80",
  outline: "border border-primary-50 hover:bg-primary-10/80",
};

const sizes = {
  default: "px-4 py-2",
  icon: "w-8 h-8",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: keyof typeof variants;
  size?: keyof typeof sizes;
}

export function Button({
  children,
  variant,
  size = "default",
  className,
  ...props
}: ButtonProps) {
  const mergedClassName = twMerge(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    variants[variant],
    sizes[size],
    className,
  );
  return (
    <button className={mergedClassName} {...props}>
      {children}
    </button>
  );
}
