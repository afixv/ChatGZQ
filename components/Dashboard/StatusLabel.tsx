import { twMerge } from "tailwind-merge";

const variants = {
  yellow: "bg-warning-30 text-warning-80 hover:bg-warning-30/80",
  green: "bg-secondary-60 text-primary-80 hover:bg-secondary-30/80",
  red: "bg-danger-40 text-danger-90 hover:bg-danger-40/90",
};

interface StatusLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: keyof typeof variants;
  text: string;
}

export default function StatusLabel({
  color = "yellow",
  text,
  className,
  ...props
}: StatusLabelProps) {
  const mergedClassName = twMerge(
    "flex items-center justify-center py-1 px-3 rounded-2xl rounded-tl-none text-sm w-fit font-semibold",
    variants[color],
    className,
  );
  return (
    <div className={mergedClassName} {...props}>
      {text}
    </div>
  );
}
