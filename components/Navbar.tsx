"use client";
import Image from "next/image";
import { Button } from "./Button";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineClose } from "react-icons/md";
import Link from "next/link";

export function Navbar() {
  const [dropDown, setDropDown] = useState(false);
  const routes = [
    { name: "Chat", href: "/chat" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Status Gizi", href: "/status-gizi" },
    { name: "Rekomendasi Menu", href: "/menu" },
  ];
  return (
    <nav className="sticky top-0 flex w-full items-center justify-between bg-primary-60 px-5 py-3 lg:px-[4%]">
      <Link href="/" className="relative aspect-[61.52/33.01] h-8 lg:h-10">
        <Image src="logo-navbar.svg" alt="ChatGZQ" fill />
      </Link>

      {/* Desktop */}
      <div className="flex items-center gap-8 max-lg:hidden">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className="text-white text-sm font-semibold hover:text-secondary-60"
          >
            {route.name}
          </Link>
        ))}
        <Button variant="secondary">Daftar</Button>
      </div>

      {/* Mobile */}
      <Button
        variant="secondary"
        size="icon"
        onClick={() => setDropDown((prev) => !prev)}
        className="lg:hidden"
      >
        {!dropDown ? <RxHamburgerMenu /> : <MdOutlineClose />}
      </Button>

      {/* Dropdown */}
      <div
        className={`absolute inset-x-0 top-full rounded-b-xl bg-primary-50 transition-[max-height] duration-300 ease-linear lg:hidden ${dropDown ? "max-h-[60vh] overflow-auto" : "max-h-0 overflow-hidden"}`}
      >
        <div className="flex flex-col gap-5 px-3 py-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="text-white text-center font-semibold hover:text-secondary-60"
            >
              {route.name}
            </Link>
          ))}
          <Button
            variant="secondary"
            className="w-full max-w-[400px] self-center"
          >
            Daftar
          </Button>
        </div>
      </div>
    </nav>
  );
}
