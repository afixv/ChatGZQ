"use client";

import { IoMdPerson } from "react-icons/io";
import { GiBodyHeight } from "react-icons/gi";
import { FaWeightScale } from "react-icons/fa6";
import { TbReload } from "react-icons/tb";
import { Button } from "@/components/Button";
import { Chart } from "@/components/Chart";
import { useRouter } from "next/navigation";

export default function ResultPage() {
    const router = useRouter();

    type Record = {
    month: number;
    weight: number;
    height: number;
    };
    const data: Record[] = [
    { month: 3, weight: 23, height: 58 },
    { month: 4, weight: 27, height: 62 },
    { month: 5, weight: 32, height: 65 },
    { month: 7, weight: 39, height: 70 },
    { month: 8, weight: 41, height: 73 },
    { month: 9, weight: 43, height: 75 },
    { month: 10, weight: 45, height: 77 },
    { month: 12, weight: 48, height: 82 },
    { month: 15, weight: 52, height: 88 },
    ];
    // Note: random data
    const ideal_data: Record[] = Array.from({ length: 61 }, (_, month) => {
    const weight = Math.round(2.5 + month * 0.5 + Math.random() * 2);
    const height = Math.round(45 + month * 1.2 + Math.random() * 3);
    return { month, weight, height };
    });

    // TODO: Fix chart data
    const getChartData = (
    data: Record[],
    ideal_data: Record[],
    func: (record: Record) => number,
    ) => {
    if (data.length === 0) return [];
    const minMonth = Math.max(data[0].month, ideal_data[0].month);
    const maxMonth = Math.min(
        data[data.length - 1].month,
        ideal_data[ideal_data.length - 1].month,
    );
    const dataMap = new Map(data.map((d) => [d.month, d]));
    const idealDataMap = new Map(ideal_data.map((d) => [d.month, d]));
    const getValue = (month: number, dataMap: Map<number, Record>) => {
        const record = dataMap.get(month);
        if (!record) return null;
        return func(record);
    };
    return Array.from(
        { length: maxMonth - minMonth + 1 },
        (_, i) => minMonth + i,
    ).map((month) => ({
        x: month.toString(),
        value: getValue(month, dataMap),
        ideal: getValue(month, idealDataMap),
    }));
    };

    return (
    <main className="w-full px-6 pb-20 pt-24 md:px-12">
        {/* Header */}
        <h1 className="text-dark-30 text-left text-3xl font-bold">
        Hasil Status Gizi
        </h1>
        <p className="text-dark-80 mt-2 text-left">
        Berikut merupakan hasil kalkulasi status gizi anak anda berdasarkan data
        yang anda masukkan
        </p>

        {/* Informasi Status Gizi */}
        <div className="mt-6 flex max-w-sm flex-wrap items-center gap-4 rounded-lg bg-primary-10 p-2">
        <div className="flex items-center gap-2 text-primary-50">
            <IoMdPerson size={20} />
            <span className="text-sm font-medium">Laki - Laki (21 Bulan)</span>
        </div>
        <div className="flex items-center gap-2 text-primary-50">
            <GiBodyHeight size={20} />
            <span className="text-sm font-medium">100 cm</span>
        </div>
        <div className="flex items-center gap-2 text-primary-50">
            <FaWeightScale size={20} />
            <span className="text-sm font-medium">12 kg</span>
        </div>
        </div>

        {/* Grafik Status Gizi */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="flex h-full flex-col rounded-lg p-4 text-left shadow-sm">
            <h2 className="text-lg font-bold">Berat Badan Menurut Umur (BB/U)</h2>
            <div className="relative mt-2">
            <Chart
                // TODO: Fix chart data
                chartData={getChartData(
                data,
                ideal_data,
                (record) => record.weight,
                )}
                label="Berat Badan"
                axisX="Bulan"
            />
            <span className="absolute bottom-2 left-2 rounded-full bg-danger-40 px-3 py-1 text-sm font-semibold text-danger-90">
                Berlebih
            </span>
            </div>
            <p className="mt-2 font-bold">Rekomendasi:</p>
            <p className="mt-2 flex-grow text-justify text-base">
            Kurangi konsumsi makanan manis dan tinggi kalori. Berat badan ideal
            untuk anak Anda adalah xx kg.
            </p>
        </div>

        <div className="flex h-full flex-col rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-bold">
            Tinggi Badan Menurut Umur (TB/U)
            </h2>
            <div className="relative mt-2">
            <Chart
                // TODO: Fix chart data
                chartData={getChartData(
                data,
                ideal_data,
                (record) => record.height,
                )}
                label="Tinggi Badan"
                axisX="Bulan"
            />
            <span className="absolute bottom-2 left-2 rounded-full bg-secondary-60 px-3 py-1 text-sm font-semibold text-primary-80">
                Sedang
            </span>
            </div>
            <p className="mt-2 font-bold">Rekomendasi:</p>
            <p className="mt-2 flex-grow text-base">
            Pertumbuhan anak Anda sudah sesuai, tetap jaga pola makan dan gaya
            hidup sehat!
            </p>
        </div>

        <div className="flex h-full flex-col rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-bold">
            Tinggi Badan Menurut Berat Badan (BB/TB)
            </h2>
            <div className="relative mt-2">
            <Chart
                // TODO: Fix chart data
                chartData={data.map((record) => ({
                x: record.height.toString(),
                value: record.weight,
                ideal: record.weight + Math.round(Math.random() * 5) + 5,
                }))}
                label="Berat Badan"
                axisX="Tinggi"
            />
            <span className="absolute bottom-2 left-2 rounded-full bg-warning-30 px-3 py-1 text-sm font-semibold text-warning-80">
                Kurang
            </span>
            </div>
            <p className="mt-2 font-bold">Rekomendasi:</p>
            <p className="mt-2 flex-grow text-base">
            Tambahkan makanan protein hewani. Berat badan yang ideal adalah xx
            kg.
            </p>
        </div>
        </div>

        <div className="mt-2 flex">
        <Button
            variant="primary"
            className="mt-6 flex w-fit items-center rounded-lg px-4 py-2 text-white"
            onClick={() => router.push("/status-gizi/form")}
        >
            Buat Data Baru <TbReload className="ml-2 text-lg" />
        </Button>
        </div>
    </main>
    );
    }
