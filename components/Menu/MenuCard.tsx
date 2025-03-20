import Image from "next/image";
import { Menu } from "./menu";
import Link from "next/link";
import { MenuTags } from "./MenuTags";

export function MenuCard({ menu }: Readonly<{ menu: Menu }>) {
  return (
    <Link className="relative w-full" href={`menu/${menu.slug}`}>
      <div className="relative z-20 flex h-full flex-col items-center gap-2 overflow-hidden px-3 pb-4 lg:gap-3.5 lg:px-4 lg:pb-6">
        {/* Image */}
        <div className="relative aspect-[152/118] w-[69%] overflow-hidden rounded-md [filter:drop-shadow(0px_6.29px_21.29px_#000E3326)] lg:rounded-xl">
          <Image
            src={menu.image ?? ""}
            alt={menu.nama}
            fill
            className="object-cover"
          />
        </div>
        {/* Nama & Deskripsi */}
        <div className="flex w-full flex-col">
          <div className="line-clamp-2 text-left text-sm font-bold md:text-xl">
            {menu.nama}
          </div>
          <div className="line-clamp-2 text-left text-xs font-medium text-dark-70 md:text-lg">
            {menu.deskripsi}
          </div>
        </div>
        {/* Porsi & Usia */}
        <div className="flex w-full justify-center gap-1">
          <MenuTags menu={menu} />
        </div>
      </div>
      {/* Background */}
      <div className="absolute inset-0 top-8 z-10 rounded-lg bg-white [filter:drop-shadow(0px_3.15px_15.73px_#0000001A)] lg:top-14 lg:rounded-xl" />
    </Link>
  );
}
