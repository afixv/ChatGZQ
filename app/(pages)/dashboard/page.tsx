"use client"

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ChartSection from "@/components/Dashboard/Chart";
import Chat from "@/components/Dashboard/Chat";
import Menu from "@/components/Dashboard/Menu";
import Overview from "@/components/Dashboard/Overview";

export default function Page() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("/api/profile/status");
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Gagal mendapatkan data pengguna");

        if (!data.isCompleted) {
          router.push("/(pages)/(auth)/data-diri");
        } else {
          await update(); 
          setUserName(data.parentName ?? "User");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    if (status === "authenticated") {
      fetchUserData();
    }
  }, [router, status, update]);

  return (
    <main className="container mx-auto flex min-h-screen gap-4 px-6 md:px-0">
      <div className="mx-auto w-full space-y-8 pt-24 pb-12">
        <Overview userName={session?.user?.parentName ?? userName} />
        <ChartSection />
        <Menu />
      </div>

      <Chat />
    </main>
  );
}
