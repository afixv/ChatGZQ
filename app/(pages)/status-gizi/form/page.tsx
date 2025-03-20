"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/Form/Input";
import { Select } from "@/components/Form/Select";

export default function NutritionClassification() {
    const router = useRouter();

    // State untuk menyimpan input user
    const [formData, setFormData] = useState({
    gender: "",
    age: "",
    weight: "",
    height: "",
    });

    // Handle perubahan input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Simpan data & redirect ke result
    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/status-gizi/result");
    };

    return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-green-50 p-4">
        <div className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-dark-30">Klasifikasi Gizi Anak Anda!</h2>
        <p className="text-center text-dark-80 text-sm">Masukkan data antropometri anak anda, untuk mulai menghitung</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <Select
            label="Jenis Kelamin"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            options={[{ value: "male", label: "Laki-laki" }, { value: "female", label: "Perempuan" }]}
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

            <button type="submit" className="w-full bg-primary-50 text-white p-3 rounded-lg font-bold hover:bg-green-600">
            Hitung
            </button>
        </form>

        <p className="text-center text-sm text-light-60 mt-3">
            * Jika anak Anda belum bisa berdiri, pengukuran dilakukan dengan cara berbaring
        </p>
        </div>
    </div>
    );
    }
