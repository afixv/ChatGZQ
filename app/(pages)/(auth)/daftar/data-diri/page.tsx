import { Button } from "@/components/Button";
import { Input } from "@/components/Form/Input";
import { Select } from "@/components/Form/Select";
import Image from "next/image";

export default function Page() {
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

        <form className="flex flex-col gap-y-6">
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
