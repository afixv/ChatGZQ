//page status gizi

"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StatusGiziPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/status-gizi/form"); // Langsung ke form
  }, [router]);

  return <p>Redirecting to form...</p>;
}
