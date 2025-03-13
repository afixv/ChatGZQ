import Image from "next/image";

export function Footer() {
  return (
    <div className="flex w-full flex-col items-center gap-2 bg-primary-60 py-4">
      <div className="relative aspect-[78/43] h-[43px]">
        <Image src="logo-navbar.svg" alt="ChatGZQ" fill />
      </div>
      <div className="text-center text-xs text-primary-10 lg:text-sm">
        Copyright © 2025 Tim Sanbox Senpro B1_01
      </div>
    </div>
  );
}
