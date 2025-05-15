"use client";

import { IoMdPerson } from "react-icons/io";
import { GiBodyHeight } from "react-icons/gi";
import { FaWeightScale } from "react-icons/fa6";
import { TbReload } from "react-icons/tb";
import { Button } from "@/components/Button";
import { Chart } from "@/components/Chart";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import StatusLabel from "@/components/Dashboard/StatusLabel";

export default function ResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [nutritionData, setNutritionData] = useState<any>(null); // to store fetched data
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNutritionData = async () => {
      try {
        const params = new URLSearchParams(searchParams);
        const response = await fetch(
          `/api/nutrition-status?${params.toString()}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch nutrition status.");
        }

        const data = await response.json();
        setNutritionData(data.data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An error occurred while fetching data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNutritionData();
  }, [searchParams]);

  if (loading) {
    return <div className="min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen">{error}</div>;
  }

  return (
    <main className="w-full px-6 pb-20 pt-24 md:px-12">
      <h1 className="text-left text-3xl font-bold text-dark-30">
        Hasil Status Gizi
      </h1>
      <p className="mt-2 text-left text-dark-80">
        Berikut merupakan hasil kalkulasi status gizi anak anda berdasarkan data
        yang anda masukkan
      </p>

      <div className="mt-6 flex w-fit flex-wrap items-center gap-4 rounded-lg bg-primary-10 p-2 px-4">
        <div className="flex items-center gap-2 text-primary-50">
          <IoMdPerson size={20} />
          <span className="text-sm font-medium">
            {searchParams.get("jenisKelamin") === "L"
              ? "Laki-laki"
              : "Perempuan"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-primary-50">
          <GiBodyHeight size={20} />
          <span className="text-sm font-medium">
            {parseInt(searchParams.get("tinggi") || "0")} cm
          </span>
        </div>
        <div className="flex items-center gap-2 text-primary-50">
          <FaWeightScale size={20} />
          <span className="text-sm font-medium">
            {parseInt(searchParams.get("berat") || "0")} kg
          </span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="flex h-full flex-col rounded-lg p-4 text-left shadow-sm">
          <h2 className="text-lg font-bold">Berat Badan Menurut Umur (BB/U)</h2>
          <div className="relative mt-2">
            <Chart
              jenisKelamin={searchParams.get("jenisKelamin") || ""}
              umur={parseInt(searchParams.get("umur") || "0")}
              tinggiBadan={parseInt(searchParams.get("tinggi") || "0")}
              beratBadan={parseInt(searchParams.get("berat") || "0")}
              index="BBU"
            />
            <StatusLabel
              color={nutritionData?.bbu?.color}
              text={nutritionData?.bbu?.status}
              className="absolute bottom-2 left-2 rounded-full px-3 py-1 text-sm font-semibold"
            />
          </div>
          <p className="mt-2 font-bold">Rekomendasi:</p>
          <p className="mt-2 flex-grow text-justify text-base">
            {nutritionData?.bbu?.recommendations}
          </p>
        </div>

        <div className="flex h-full flex-col rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-bold">
            Tinggi Badan Menurut Umur (TB/U)
          </h2>
          <div className="relative mt-2">
            <Chart
              jenisKelamin={searchParams.get("jenisKelamin") || ""}
              umur={parseInt(searchParams.get("umur") || "0")}
              tinggiBadan={parseInt(searchParams.get("tinggi") || "0")}
              beratBadan={parseInt(searchParams.get("berat") || "0")}
              index="TBU"
            />
            <StatusLabel
              color={nutritionData?.pbu?.color}
              text={nutritionData?.pbu?.status}
              className="absolute bottom-2 left-2 rounded-full px-3 py-1 text-sm font-semibold"
            />
          </div>
          <p className="mt-2 font-bold">Rekomendasi:</p>
          <p className="mt-2 flex-grow text-base">
            {nutritionData?.pbu?.recommendations}
          </p>
        </div>

        <div className="flex h-full flex-col rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-bold">
            Tinggi Badan Menurut Berat Badan (BB/TB)
          </h2>
          <div className="relative mt-2">
            <Chart
              jenisKelamin={searchParams.get("jenisKelamin") || ""}
              umur={parseInt(searchParams.get("umur") || "0")}
              tinggiBadan={parseInt(searchParams.get("tinggi") || "0")}
              beratBadan={parseInt(searchParams.get("berat") || "0")}
              index="BBTB"
            />
            <StatusLabel
              color={nutritionData?.bbpb?.color}
              text={nutritionData?.bbpb?.status}
              className="absolute bottom-2 left-2 rounded-full px-3 py-1 text-sm font-semibold"
            />
          </div>
          <p className="mt-2 font-bold">Rekomendasi:</p>
          <p className="mt-2 flex-grow text-base">
            {nutritionData?.bbpb?.recommendations}
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
