import { twMerge } from "tailwind-merge";

const variants = {
  primary: "bg-primary-10 text-primary-50 hover:bg-primary-10/80",
  secondary: "bg-secondary-60 text-primary-60 hover:bg-secondary-60/80",
};

interface IconWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof variants;
}

export default function IconWrapper({
  variant = "primary",
  children,
  className,
  ...props
}: IconWrapperProps) {
  const mergedClassName = twMerge(
    "inline-flex items-center justify-center w-14 h-14 rounded-full text-2xl",
    variants[variant],
    className,
  );
  return (
    <div className={mergedClassName} {...props}>
      {children}
    </div>
  );
}
