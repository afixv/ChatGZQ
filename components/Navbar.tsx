"use client";
import Image from "next/image";
import { Button } from "./Button";
import { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineClose } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [dropDown, setDropDown] = useState(false);
  const pathname = usePathname();
  const routes = [
    { name: "Chat", href: "/chat" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Status Gizi", href: "/status-gizi" },
    { name: "Rekomendasi Menu", href: "/menu" },
  ];

  useEffect(() => {
    setDropDown(false);
  }, [pathname]);

  return (
    <nav className="fixed top-0 w-full bg-primary-60 px-5 py-3 lg:px-[4%]">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative aspect-[61.52/33.01] h-8 lg:h-10">
          <Image src="/logo-navbar.svg" alt="ChatGZQ" fill />
        </Link>

        {/* Routes and Buttons */}
        <div className="flex items-center gap-8">
          {/* Hamburger Menu for Mobile */}
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setDropDown((prev) => !prev)}
            className="lg:hidden"
          >
            {!dropDown ? <RxHamburgerMenu /> : <MdOutlineClose />}
          </Button>

          {/* Routes */}
          <div
            className={`absolute inset-x-0 top-full items-center justify-center rounded-b-xl bg-primary-50 transition-[max-height,padding] duration-[400ms] ease-in-out lg:static lg:flex lg:max-h-none lg:gap-8 lg:rounded-b-none lg:bg-primary-60 lg:px-0 lg:py-0 ${
              dropDown
                ? "max-h-[60vh] overflow-auto py-4"
                : "max-h-0 overflow-hidden py-0"
            }`}
          >
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`block px-3 py-2 text-center font-semibold lg:px-0 lg:py-0 ${
                  pathname === route.href
                    ? "text-secondary-60"
                    : "text-white hover:text-secondary-60"
                }`}
              >
                {route.name}
              </Link>
            ))}
            <Link
              href="/daftar"
              className="mx-auto block w-full max-w-[400px] px-3 py-2 text-center lg:w-auto lg:px-0 lg:py-0"
            >
              <Button variant="secondary" className="w-full lg:w-auto">
                Daftar
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
