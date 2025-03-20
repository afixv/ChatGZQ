"use client";
import Chat from "@/components/Chat";

export default function Page() {
  return (
    <main className="flex h-screen flex-col items-center gap-2 px-5 pb-12 pt-14 lg:px-[4%] lg:pt-16">
      <Chat />
    </main>
  );
}
