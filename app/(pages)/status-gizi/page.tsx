import Link from "next/link";
import Image from "next/image";
import { IoMdPerson } from "react-icons/io";
import { GiBodyHeight } from "react-icons/gi";
import { FaWeightScale } from "react-icons/fa6";
import { TbReload } from "react-icons/tb";
import { useState } from "react";
import { Button } from "@/components/Button";

const WeightChartCard = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md text-left">
      <h2 className="text-lg font-bold">Berat Badan Menurut Umur (BB/U)</h2>

      {/* Gambar placeholder dari /public/growth-graph.png */}
      <img src="/growth-graph.png" alt="Grafik Berat Badan" className="w-full h-auto mt-2 rounded-md" />

      <div className="bg-red-200 text-red-700 text-sm font-bold px-2 py-1 mt-2 inline-block rounded-md">
        Berlebih
      </div>

      <p className="mt-2 font-bold">Rekomendasi:</p>
      <p className="text-gray-600">
        Perlu mengurangi makanan manis dan blablabla. Berat badan yang ideal adalah <b>xx kg</b>.
      </p>
    </div>
  );
};

export default function Page() {
  return (
    <main className="w-full px-6 md:px-12 pt-24 pb-20">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 text-left">
        Hasil Status Gizi
      </h1>
      <p className="text-gray-600 mt-2 text-left">
        Berikut merupakan hasil kalkulasi status gizi anak anda berdasarkan data yang anda masukkan
      </p>

      {/* Informasi Status Gizi */}
      <div className="bg-primary-10 flex flex-wrap items-center gap-4 p-2 mt-6 rounded-lg max-w-sm">
        {/* Jenis Kelamin */}
        <div className="flex items-center gap-2 text-primary-50">
          <IoMdPerson size={20} />
          <span className="text-sm font-medium">Laki - Laki (21 Bulan)</span>
        </div>

        {/* Tinggi Badan */}
        <div className="flex items-center gap-2 text-primary-50">
          <GiBodyHeight size={20} />
          <span className="text-sm font-medium">100 cm</span>
        </div>

        {/* Berat Badan */}
        <div className="flex items-center gap-2 text-primary-50">
          <FaWeightScale size={20} />
          <span className="text-sm font-medium">12 kg</span>
        </div>
      </div>

      {/* Grafik Status Gizi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      {/* Grafik 1 */}
      <div className="rounded-lg p-4 shadow-sm flex flex-col h-full text-left">
        <h2 className="text-lg font-bold">Berat Badan Menurut Umur (BB/U)</h2>
        <div className="relative mt-2">
          <Image
            src="/growth-graph.png"
            alt="Grafik Berat Badan Menurut Umur"
            width={250}
            height={150}
            className="w-full h-auto rounded-lg"
          />
          <span className="absolute bottom-2 left-2 bg-danger-40 text-danger-90 px-3 py-1 rounded-full text-sm font-semibold">
            Berlebih
          </span>
        </div>
        <p className="font-bold mt-2">Rekomendasi:</p>
        <p className="text-base mt-2 flex-grow text-justify">
        Kurangi konsumsi makanan manis dan tinggi kalori. Berat badan ideal untuk anak Anda adalah xx kg.
        </p>
      </div>

      {/* Grafik 2 */}
      <div className="rounded-lg p-4 shadow-sm flex flex-col h-full">
        <h2 className="text-lg font-bold">Tinggi Badan Menurut Umur (TB/U)</h2>
        <div className="relative mt-2 flex justify-center">
          <Image
            src="/graph-2.png"
            alt="Grafik Tinggi Badan Menurut Umur"
            width={250}
            height={150}
            className="w-full h-auto rounded-lg"
          />
          <span className="absolute bottom-2 left-2 bg-secondary-60 text-primary-80 px-3 py-1 rounded-full text-sm font-semibold">
            Sedang
          </span>
        </div>
        <p className="font-bold mt-2">Rekomendasi:</p>
        <p className="text-base mt-2 flex-grow">
        Pertumbuhan anak Anda sudah sesuai, tetap jaga pola makan dan gaya hidup sehat!
        </p>
      </div>

      {/* Grafik 3 */}
      <div className="rounded-lg p-4 shadow-sm flex flex-col h-full">
        <h2 className="text-lg font-bold">Tinggi Badan Menurut Berat Badan (BB/TB)</h2>
        <div className="relative mt-2 flex justify-center">
          <Image
            src="/graph-3.png"
            alt="Grafik Tinggi Badan Menurut Berat Badan"
            width={250}
            height={150}
            className="w-full h-auto rounded-lg"
          />
          <span className="absolute bottom-2 left-2 bg-warning-30 text-warning-80 px-3 py-1 rounded-full text-sm font-semibold">
            Kurang
          </span>
        </div>
        <p className="font-bold mt-2">Rekomendasi:</p>
        <p className="text-base mt-2 flex-grow">
          Tambahkan makanan protein hewani. Berat badan yang ideal adalah xx kg.
        </p>
      </div>
    </div>

    <div className="mt-2 flex">
    <Button variant="primary" className="mt-6 w-fit text-white px-4 py-2 rounded-lg flex items-center">
          Buat Data Baru <TbReload className="ml-2 text-lg" />
        </Button>
    </div>
    </main>
  );
}
