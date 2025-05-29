"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/Form/Input";
import { Select } from "@/components/Form/Select";


export default function NutritionClassification() {
  const params = useSearchParams();
  const router = useRouter();

  const jenis_kelamin = params.get("jenis_kelamin");
  const [formData, setFormData] = useState({
    gender: jenis_kelamin
      ? jenis_kelamin.toLowerCase().includes("laki")
        ? "L"
        : "P"
      : "",
    age: params.get("usia") || "",
    weight: params.get("berat") || "",
    height: params.get("tinggi") || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const query = new URLSearchParams({
      umur: formData.age,
      tinggi: formData.height,
      berat: formData.weight,
      jenisKelamin: formData.gender,
    }).toString();

    router.push(`/status-gizi/result?${query}`);
  };


  return (
    <div className="to-green-50 flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="text-center text-2xl font-bold text-dark-30">
          Klasifikasi Gizi Anak Anda!
        </h2>
        <p className="text-center text-sm text-dark-80">
          Masukkan data antropometri anak anda, untuk mulai menghitung
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Select
            label="Jenis Kelamin"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            options={[
              { value: "L", label: "Laki-laki" },
              { value: "P", label: "Perempuan" },
            ]}
          />

          <Input
            label="Usia Anak (0 - 60 Bulan)"
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Masukkan usia dalam bulan"
            min="0"
            max="60"
            required
          />

          <Input
            label="Berat Badan Anak (kg)"
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="Masukkan berat badan"
            min="0"
            step="0.01"
            required
          />

          <Input
            label="Tinggi Badan Anak (cm)"
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            placeholder="Masukkan tinggi badan"
            min="0"
            step="0.01"
            required
          />

          <button
            type="submit"
            className="hover:bg-green-600 w-full rounded-lg bg-primary-50 p-3 font-bold text-white"
          >
            Hitung
          </button>
        </form>

        <p className="mt-3 text-center text-sm text-light-60">
          * Jika anak Anda belum bisa berdiri, pengukuran dilakukan dengan cara
          berbaring
        </p>
      </div>
    </div>
  );
}
