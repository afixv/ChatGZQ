import { dummy_menu } from "@/components/Menu/menu";
import { MenuTags } from "@/components/Menu/MenuTags";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Fragment } from "react";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const data = dummy_menu;
  const menu = data.find((menu) => menu.slug === slug);
  if (!menu) return notFound();
  return (
    <main className="px-5 pt-14 lg:px-[5%] lg:pt-16">
      <div className="container mx-auto flex flex-col items-center gap-6 pb-14 pt-8">
        {/* Header */}
        <div className="flex flex-col items-center gap-3">
          {/* Title */}
          <h1 className="text-center text-2xl font-bold">{menu.nama}</h1>
          <div className="flex w-fit gap-3">
            <MenuTags menu={menu} className="w-fit px-2 py-1" />
          </div>
        </div>
        {/* Image */}
        <div className="relative aspect-[442/343] w-[442px] max-w-[90%] overflow-hidden rounded-md [filter:drop-shadow(0px_6.29px_21.29px_#000E3326)] lg:rounded-xl">
          <Image
            src={menu.image ?? ""}
            alt={menu.nama}
            fill
            className="object-cover"
          />
        </div>
        {/* Bahan - Bahan */}
        <div className="flex w-full flex-col gap-3">
          <h2 className="text-lg font-semibold">Bahan - Bahan</h2>
          <ul>
            {menu.bahan.map((bahan, idx) => (
              <li key={idx} className="ml-6 list-disc text-base">
                {bahan}
              </li>
            ))}
          </ul>
        </div>
        {/* Cara Memasak */}
        <div className="flex w-full flex-col gap-3">
          <h2 className="text-lg font-semibold">Cara Memasak</h2>
          <div className="grid grid-cols-[34px_1fr] gap-x-1 gap-y-3">
            {menu.langkah.map((langkah, idx) => (
              <Fragment key={idx}>
                <div className="flex justify-center text-xs">
                  <div className="flex h-[23px] w-[23px] items-center justify-center rounded-full bg-[#079A89] text-center text-white">
                    {idx + 1}
                  </div>
                </div>
                <div className="">{langkah}</div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
