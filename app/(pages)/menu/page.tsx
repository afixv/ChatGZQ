"use client";
import { Input } from "@/components/Form/Input";
import { dummy_menu } from "@/components/Menu/menu";
import { MenuCard } from "@/components/Menu/MenuCard";
import { useState } from "react";
import { CiFilter, CiSearch } from "react-icons/ci";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { twMerge } from "tailwind-merge";

export default function Page() {
  const data = dummy_menu;
  const [page, setPage] = useState(1);
  const perPage = 8;
  const maxPage = Math.ceil(data.length / perPage);
  const idxMenu = perPage * (page - 1);
  const getPagination =
    (count: number, ellipsis = "…") =>
    (page: number, total: number) => {
      const start = Math.max(
        1,
        Math.min(page - Math.floor((count - 3) / 2), total - count + 2),
      );
      const end = Math.min(
        total,
        Math.max(page + Math.floor((count - 2) / 2), count - 1),
      );
      const range = (lo: number, hi: number) =>
        Array.from({ length: hi - lo }, (_, i) => i + lo);
      return [
        <IoIosArrowBack key="back" />,
        ...(start > 2 ? [1, ellipsis] : start > 1 ? [1] : []),
        ...range(start, end + 1),
        ...(end < total - 1 ? [ellipsis, total] : end < total ? [total] : []),
        <IoIosArrowForward key="forward" />,
      ];
    };
  const pagination = getPagination(7)(page, maxPage);
  return (
    <main className="px-5 pt-14 lg:px-[5%] lg:pt-16">
      <div className="container mx-auto flex flex-col items-center gap-9 pb-14 pt-8 lg:gap-14">
        {/* Search Bar */}
        <div className="relative mt-8 flex w-full max-w-[560px] gap-1.5">
          <div className="absolute inset-y-0 flex items-center px-3 text-2xl text-light-60">
            <CiSearch />
          </div>
          <Input
            placeholder="Cari Menu"
            containerClassName="w-full"
            className="pl-10"
          />
          <button className="w-fit rounded-[9px] border-2 border-dark-100 p-3 text-xl text-light-60 outline-none">
            <CiFilter />
          </button>
        </div>
        {/* Menu List */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-7">
          {data.slice(idxMenu, idxMenu + perPage).map((menu, idx) => (
            <MenuCard key={idx} menu={menu} />
          ))}
        </div>
        <div className="flex gap-0.5 lg:gap-1">
          {pagination.map((i, idx) => (
            <button
              key={idx}
              disabled={
                typeof i === "string" || (typeof i === "number" && i === page)
              }
              onClick={() => {
                if (typeof i === "number") setPage(i);
                else if (idx === 0 && page !== 1) setPage((page) => page - 1);
                else if (idx === pagination.length - 1 && page !== maxPage)
                  setPage((page) => page + 1);
              }}
              className={twMerge(
                "flex aspect-square w-7 items-center justify-center rounded-md text-xs md:text-sm lg:w-8 lg:rounded-lg",
                typeof i === "number" && i === page
                  ? "bg-primary-50"
                  : "bg-[#FAFAFA]",
              )}
            >
              {i}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
