"use client";

import { useRouter } from "next/navigation"
import { Button } from "@/components/Button";
import { Input } from "@/components/Form/Input";
import { Select } from "@/components/Form/Select";
import Image from "next/image";
import { useState} from "react";
import { useSession } from "next-auth/react";

export default function Page() {
  const router = useRouter();
  const { update } = useSession();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const data = {
      nama_orang_tua: form.nama_orang_tua.value,
      nama_anak: form.nama_anak.value,
      tanggal_lahir_anak: form.tanggal_lahir_anak.value,
      jenis_kelamin_anak: form.jenis_kelamin_anak.value,
    };

    try{
      const res = await fetch("/api/profile/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (res.ok) {
        await update();
        router.push("/dashboard");
      } else {
        const errorData = await res.json();
        setError(errorData.error || "Gagal menyimpan data.");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Terjadi kesalahan. Silakan coba lagi.");
      } else {
        setError("Terjadi kesalahan yang tidak terduga.");
      }
    }
  };



  return (
    <main className="container mx-auto flex h-full min-h-screen w-full flex-col items-center justify-center px-6">
      <section className="w-full max-w-xl">
        <span className="inline-block">
          <h1 className="text-start text-4xl font-bold">
            Selamat Anda Berhasil <br />
            Daftar!
            <Image
              src={"/brand.svg"}
              alt="Brand Logo"
              width={64}
              height={24}
              className="ml-2 inline"
            />
          </h1>
        </span>
        <p className="mb-6 mt-1 font-medium text-light-60">
          Lengkapi data berikut untuk melanjutkan!
        </p>

        {/* Menampilkan Error Message jika ada */}
        {error && <p className="text-danger-70 text-sm">{error}</p>}  {/* Menampilkan error message */}

        <form className="flex flex-col gap-y-6" onSubmit={handleSubmit}>
          {/* Nama Orang Tua, Nama Anak, Tanggal Lahir Anak, Jenis Kelamin Anak */}
          <Input
            label="Nama Orang Tua"
            placeholder="Masukkan nama orang tua"
            name="nama_orang_tua"
            required
          />
          <Input
            label="Nama Anak"
            placeholder="Masukkan nama anak"
            name="nama_anak"
            required
          />
          <Input
            label="Tanggal Lahir Anak"
            placeholder="Masukkan tanggal lahir anak"
            name="tanggal_lahir_anak"
            type="date"
            required
          />
          <Select
            label="Jenis Kelamin Anak"
            placeholder="Pilih jenis kelamin anak"
            options={[
              { label: "Laki-laki", value: "L" },
              { label: "Perempuan", value: "P" },
            ]}
            name="jenis_kelamin_anak"
            required
          />
          <Button type="submit" variant="primary" className="py-3 text-white">
            Lanjutkan
          </Button>
        </form>
      </section>
    </main>
  );
}
