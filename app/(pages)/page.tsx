"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StatusGiziPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/chat");
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>Redirecting to chat...</p>
    </div>
  );
}
