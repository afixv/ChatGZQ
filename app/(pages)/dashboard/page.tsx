"use client";

import ChartSection from "@/components/Dashboard/Chart";
import Chat from "@/components/Dashboard/Chat";
import Overview from "@/components/Dashboard/Overview";
import { calculateAgeInMonths } from "@/utils/calculateAge";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Page() {
  const [nutritionData, setNutritionData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [childData, setChildData] = useState<{
    name: string;
    gender: string;
    birthDate: string;
    historiesData: { date: string; height: number; weight: number }[];
  }>({
    name: "Kim Minji",
    gender: "P",
    birthDate: "2024-07-08",
    historiesData: [], // Awalnya kosong, akan diisi setelah fetch data
  });

  const age = calculateAgeInMonths(childData.birthDate);

  useEffect(() => {
    const fetchHistoriesData = async () => {
      try {
        const response = await axios.get("/api/add-measurement");
        let histories = response.data?.data || []; // Ambil array `data` dari response

        // Urutkan berdasarkan tanggal (ascending)
        histories = histories.sort(
          (
            a: { date: string | number | Date },
            b: { date: string | number | Date },
          ) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );

        console.log("Fetched and Sorted Histories Data:", histories);

        // Perbarui childData dengan histories yang telah diurutkan
        setChildData((prev) => ({
          ...prev,
          historiesData: histories,
        }));

        return histories;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data?.message || "Failed to fetch histories data.",
          );
        } else {
          setError("An error occurred while fetching histories data.");
        }
        return [];
      }
    };

    const fetchNutritionData = async (
      histories: typeof childData.historiesData,
    ) => {
      try {
        const lastHistory = histories[histories.length - 1];
        if (!lastHistory) {
          setError(
            "No histories data available to calculate nutrition status.",
          );
          return;
        }

        const { weight, height } = lastHistory;

        const response = await axios.get("/api/nutrition-status", {
          params: {
            umur: age,
            jenisKelamin: childData.gender,
            berat: weight,
            tinggi: height,
          },
        });

        setNutritionData(response.data?.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data?.message ||
              "Failed to fetch nutrition status.",
          );
        } else {
          setError("An error occurred while fetching data.");
        }
      }
    };

    const fetchData = async () => {
      setLoading(true);
      const histories = await fetchHistoriesData();
      if (histories.length > 0) {
        await fetchNutritionData(histories);
      }
      setLoading(false);
    };

    fetchData();
  }, [age, childData.gender]);

  console.log("Nutrition Data:", nutritionData);
  console.log("Child Data with Histories:", childData);

  if (loading) {
    return (
      <div className="container mx-auto flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }
  if (error) {
    return (
      <div className="container mx-auto flex min-h-screen items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <main className="container mx-auto flex min-h-screen gap-4 px-6 md:px-0">
      <div className="mx-auto w-full space-y-8 pb-12 pt-24">
        <Overview
          name={childData.name}
          umur={age}
          jenisKelamin={childData.gender}
          historiesData={childData.historiesData}
          nutritionData={nutritionData}
        />
        <ChartSection
          title="BB/U (Berat Badan terhadap Umur)"
          recommendations={nutritionData?.bbu.recommendations}
          index="BBU"
          childData={{
            jenisKelamin: childData.gender,
            umur: age,
            tinggiBadan: childData.historiesData[0]?.height || 0,
            beratBadan: childData.historiesData[0]?.weight || 0,
            chartData: childData.historiesData.map((item) => ({
              x: calculateAgeInMonths(childData.birthDate, item.date),
              value: item.weight,
            })),
          }}
        />
        <ChartSection
          title="TB/U (Tinggi Badan terhadap Umur)"
          index="TBU"
          recommendations={nutritionData?.pbu.recommendations}
          childData={{
            jenisKelamin: childData.gender,
            umur: age,
            tinggiBadan: childData.historiesData[0]?.height || 0,
            beratBadan: childData.historiesData[0]?.weight || 0,
            chartData: childData.historiesData.map((item) => ({
              x: calculateAgeInMonths(childData.birthDate, item.date),
              value: item.height,
            })),
          }}
        />
        <ChartSection
          title="BB/TB (Berat Badan terhadap Tinggi Badan)"
          index="BBTB"
          recommendations={nutritionData?.bbpb.recommendations}
          childData={{
            jenisKelamin: childData.gender,
            umur: age,
            tinggiBadan: childData.historiesData[0]?.height || 0,
            beratBadan: childData.historiesData[0]?.weight || 0,
            chartData: childData.historiesData.map((item) => ({
              x: item.height,
              value: item.weight,
            })),
          }}
        />
        {/* <Menu /> */}
      </div>

      <Chat />
    </main>
  );
}
