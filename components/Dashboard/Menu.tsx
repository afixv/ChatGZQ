import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { dummy_menu } from "../Menu/menu";
import { MenuCard } from "../Menu/MenuCard";

export default function Menu() {
  return (
    <section>
      <h2 className="text-2xl font-semibold">Rekomendasi Menu</h2>
      {/* map card menu skeleton */}
      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
        {dummy_menu.slice(0, 3).map((menu) => (
          <MenuCard key={menu.slug} menu={menu} />
        ))}
      </div>
      <Link
        href="/menu"
        className="my-4 flex items-center font-semibold text-primary-60 hover:opacity-80"
      >
        Lihat Semuanya
        <ChevronRight size={20} />
      </Link>
    </section>
  );
}
