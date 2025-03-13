import { Button } from "@/components/Button";
import { Input } from "@/components/Form/Input";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <main className="container mx-auto flex h-full min-h-screen w-full flex-col items-center justify-center px-6">
      <section className="w-full max-w-xl">
        <div className="flex items-center gap-2">
          <h1 className="text-start text-4xl font-bold">Daftar</h1>
          <Image src={"/brand.svg"} alt="Brand Logo" width={64} height={24} />
        </div>
        <p className="mb-6 mt-1 font-medium text-light-60">
          Lakukan pendaftaran untuk memantau perkembangan anak anda.
        </p>
        <form className="flex flex-col gap-y-6">
          <Input
            label="Email"
            placeholder="Masukkan email anda"
            name="email"
            type="email"
            required
          />
          <Input
            label="Kata Sandi"
            name="password"
            placeholder="Masukkan kata sandi anda"
            required
            type="password"
          />
          <Input
            label="Konfirmasi Kata Sandi"
            name="password_confirm"
            placeholder="Masukkan kembali kata sandi anda"
            required
            type="password"
          />
          <Button type="submit" variant="primary" className="py-3 text-white">
            Daftar
          </Button>
        </form>
        <div className="mt-6 text-center">
          <span className="font-medium text-light-60">Sudah punya akun? </span>
          <Link href="/masuk" className="font-semibold text-primary-50">
            Masuk
          </Link>
        </div>
        <div className="relative mt-8">
          <hr className="border-dark-100" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform bg-white px-2 text-sm font-medium text-dark-90">
            atau
          </span>
        </div>
        <Button
          variant="outline"
          className="mt-8 w-full rounded-[10px] border border-light-30 bg-white py-3 text-dark-80 shadow-[0px_3.146px_15.73px_0px_rgba(0,_0,_0,_0.10)] hover:bg-light-10"
        >
          <Image
            src={"/logo-google.svg"}
            alt="Google Logo"
            width={24}
            height={24}
            className="h-6 w-6 mix-blend-multiply"
          />
          Daftar dengan Google
        </Button>
      </section>
    </main>
  );
}
