"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ChartSection from "@/components/Dashboard/Chart";
import Chat from "@/components/Dashboard/Chat";
import Overview from "@/components/Dashboard/Overview";
import { calculateAgeInMonths } from "@/utils/calculateAge";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Page() {
  const { status, update } = useSession();
  const router = useRouter();

  const [childData, setChildData] = useState<{
    name: string;
    gender: string;
    birthDate: string;
    historiesData: { date: string; height: number; weight: number }[];
  } | null>(null);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [nutritionData, setNutritionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [parentName, setParentName] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      const fetchData = async () => {
        try {
          const detailRes = await fetch("/api/profile/status", {
            credentials: "include",
          });

          if (!detailRes.ok) throw new Error("Gagal mengambil detail profil");

          const detailData = await detailRes.json();

          const child = detailData.child;
          if (!child?.birthDate) {
            setError("Data anak tidak lengkap");
            setLoading(false);
            return;
          }
          if (!child.historiesData || child.historiesData.length === 0) {
            setError("Riwayat data anak kosong");
            setLoading(false);
            return;
          }

          const age = calculateAgeInMonths(child.birthDate);
          const lastHistory =
            child.historiesData[child.historiesData.length - 1];

          setChildData(child);
          setParentName(detailData.parentName);

          const nutritionRes = await axios.get("/api/nutrition-status", {
            params: {
              umur: age,
              jenisKelamin: child.gender,
              berat: lastHistory.weight,
              tinggi: lastHistory.height,
            },
          });

          setNutritionData(nutritionRes.data.data);
        } catch (err) {
          console.error("Fetch data error:", err);
          setError("Gagal mengambil data");
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else if (status === "unauthenticated") {
      router.push("/masuk");
    }
  }, [status, update, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error || !childData || !nutritionData) {
    return (
      <div className="text-red-500 flex min-h-screen items-center justify-center">
        {error || "Data tidak tersedia"}
      </div>
    );
  }

  const age = calculateAgeInMonths(childData.birthDate);

  return (
    <main className="container mx-auto flex min-h-screen gap-4 px-6 md:px-0">
      <div className="mx-auto w-full space-y-8 pb-12 pt-24">
        <Overview
          parentName={parentName}
          name={childData.name}
          umur={age}
          jenisKelamin={childData.gender}
          historiesData={childData.historiesData}
          nutritionData={nutritionData}
        />
        <ChartSection
          title="BB/U (Berat Badan terhadap Umur)"
          recommendations={nutritionData?.bbu.recommendations.join(", ")}
          // recommendations={nutritionData?.bbu.recommendations}
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
          recommendations={nutritionData?.pbu.recommendations.join(", ")}
          // recommendations={nutritionData?.pbu.recommendations}
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
          recommendations={nutritionData?.bbpb.recommendations.join(", ")}
          // recommendations={nutritionData?.bbpb.recommendations}
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
