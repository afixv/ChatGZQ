"use client";

import ChartSection from "@/components/Dashboard/Chart";
import Chat from "@/components/Dashboard/Chat";
// import Menu from "@/components/Dashboard/Menu";
import Overview from "@/components/Dashboard/Overview";
import { calculateAgeInMonths } from "@/utils/calculateAge";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";

export default function Page() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [nutritionData, setNutritionData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const childData = useMemo(
    () => ({
      name: "Kim Minji",
      gender: "P",
      birthDate: "2024-07-08",
      historiesData: [
        {
          date: "2024-07-08",
          height: 50,
          weight: 3.2,
        },
        {
          date: "2024-08-08",
          height: 54,
          weight: 4.0,
        },
        {
          date: "2024-10-08",
          height: 60,
          weight: 5.5,
        },
        {
          date: "2025-01-08",
          height: 68,
          weight: 7.2,
        },
        {
          date: "2025-05-01",
          height: 74,
          weight: 6.5,
        },
      ],
    }),
    [],
  );

  const age = calculateAgeInMonths(childData.birthDate);

  useEffect(() => {
    const fetchNutritionData = async () => {
      try {
        const lastHistory =
          childData.historiesData?.[childData.historiesData.length - 1] || {};
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
      } finally {
        setLoading(false);
      }
    };

    fetchNutritionData();
  }, [age, childData]);

  console.log("Nutrition Data:", nutritionData);

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
