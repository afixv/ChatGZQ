import { BiSolidDish } from "react-icons/bi";
import { Menu } from "./menu";
import { PiBabyFill } from "react-icons/pi";
import { twMerge } from "tailwind-merge";

export function MenuTags({
  menu,
  className,
}: Readonly<{ menu: Menu; className?: string }>) {
  return (
    <>
      <div
        className={twMerge(
          "flex w-full items-center justify-center gap-1.5 rounded-md bg-secondary-20 px-1.5 py-0.5 text-secondary-80",
          className,
        )}
      >
        <BiSolidDish />
        <span className="text-[9px] md:text-sm">{menu.porsi}</span>
      </div>
      <div
        className={twMerge(
          "flex w-full items-center justify-center gap-1.5 rounded-md bg-primary-10 px-1.5 py-0.5 text-primary-60",
          className,
        )}
      >
        <PiBabyFill />
        <span className="text-[9px] md:text-sm">{menu.usia}</span>
      </div>
    </>
  );
}
