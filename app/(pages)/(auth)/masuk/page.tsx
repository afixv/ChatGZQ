"use client";

import { Button } from "@/components/Button";
import { Input } from "@/components/Form/Input";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Email atau password salah.");
    } else {
      await checkProfileStatus();
    }
  };
  
  const handleGoogleLogin = async () => {
    const res = await signIn("google", {
      redirect: false,
    });
  
    if (res?.error) {
      setError("Gagal masuk dengan Google.");
    } else {
      console.log("Google login berhasil, menunggu session terbentuk...");
      
      // Tunggu sampai session terbentuk
      let attempts = 0;
      let sessionRes;
      while (attempts < 5) {
        sessionRes = await fetch("/api/auth/session");
        const sessionData = await sessionRes.json();
        console.log("Session data setelah login Google:", sessionData);
  
        if (sessionRes.ok && sessionData.user) {
          break;
        }
  
        attempts++;
        await new Promise((resolve) => setTimeout(resolve, 500)); // tunggu 500ms sebelum mencoba lagi
      }
  
      if (sessionRes?.ok) {
        await checkProfileStatus();
      } else {
        setError("Gagal memperbarui session.");
      }
    }
  }; 
  
  const checkProfileStatus = async () => {
    try {
      await fetch("/api/auth/session", { method: "GET" });

      const response = await fetch("/api/profile/status", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
      console.log("Response dari /api/profile/status:", data);
  
      if (response.ok) {
        if (data.isCompleted) {
          router.push("/dashboard");
        } else {
          router.push("/data-diri");
        }
      } else {
        setError(data.error || "Gagal mendapatkan status data diri.");
      }
    }catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Terjadi kesalahan saat memeriksa status data diri.");
      } else {
        setError("Terjadi kesalahan saat memeriksa status data diri.");
      }
    }
  };

  return (
    <main className="container mx-auto flex h-full min-h-screen w-full flex-col items-center justify-center px-6">
      <section className="w-full max-w-xl">
        <div className="flex items-center gap-2">
          <h1 className="text-start text-4xl font-bold">Masuk</h1>
          <Image src={"/brand.svg"} alt="Brand Logo" width={64} height={24} />
        </div>
        <p className="mb-6 mt-1 font-medium text-light-60">
          Masuk ke akun anda untuk mulai memantau perkembangan anak.
        </p>
        <form className="flex flex-col gap-y-6" onSubmit={handleSubmit}>
          <Input
            label="Email"
            placeholder="Masukkan email anda"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Kata Sandi"
            name="password"
            placeholder="Masukkan kata sandi anda"
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="primary" className="py-3 text-white">
            Masuk
          </Button>
        </form>
        {error && (
          <div className="mt-4 text-red-500">
            <p>{error}</p>
          </div>
        )}
        <div className="mt-6 text-center">
          <span className="font-medium text-light-60">Belum punya akun? </span>
          <Link href="/daftar" className="font-semibold text-primary-50">
            Daftar
          </Link>
        </div>
        <div className="relative mt-8">
          <hr className="border-dark-100" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform bg-white px-2 text-sm font-medium text-dark-90">
            atau
          </span>
        </div>
        {isClient && (
          <Button
            variant="outline"
            className="mt-8 w-full rounded-[10px] border border-light-30 bg-white py-3 text-dark-80 shadow-[0px_3.146px_15.73px_0px_rgba(0,_0,_0,_0.10)] hover:bg-light-10"
            onClick={handleGoogleLogin}
          >
            <Image
              src={"/logo-google.svg"}
              alt="Google Logo"
              width={24}
              height={24}
              className="h-6 w-6 mix-blend-multiply"
            />
            Masuk dengan Google
          </Button>
        )}
      </section>
    </main>
  );
}
