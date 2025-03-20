import { twMerge } from "tailwind-merge";

const variants = {
  kurang: "bg-warning-30 text-warning-80 hover:bg-warning-30/80",
  baik: "bg-secondary-60 text-primary-80 hover:bg-secondary-30/80",
  berlebih: "bg-danger-40 text-danger-90 hover:bg-danger-40/90",
};

interface StatusLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: keyof typeof variants;
}

export default function StatusLabel({
  status = "kurang",
  className,
  ...props
}: StatusLabelProps) {
  const mapText = {
    kurang: "Kurang",
    baik: "Baik",
    berlebih: "Berlebih",
  };

  const mergedClassName = twMerge(
    "flex items-center justify-center py-1 px-3 rounded-2xl rounded-tl-none text-sm w-fit font-semibold",
    variants[status],
    className,
  );
  return (
    <div className={mergedClassName} {...props}>
      {mapText[status]}
    </div>
  );
}
