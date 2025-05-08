/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import Papa from "papaparse";

interface SDData {
  x: number;
  "-3 SD": number;
  "-2 SD": number;
  "-1 SD": number;
  "0 SD": number;
  "+1 SD": number;
  "+2 SD": number;
  "+3 SD": number;
}

export function Chart({
  jenisKelamin,
  umur,
  tinggiBadan,
  beratBadan,
  index,
  childData: initialChildData,
}: {
  jenisKelamin: string;
  umur: number;
  tinggiBadan: number;
  beratBadan: number;
  index: string;
  childData?: { x: number; value: number }[];
}) {
  const [sdData, setSdData] = useState<SDData[]>([]);
  const [childData, setChildData] = useState<{ x: number; value: number }[]>(
    initialChildData || [],
  );
  const [domainX, setDomainX] = useState<[number, number]>([0, 0]);
  const [domainY, setDomainY] = useState<[number, number]>([0, 0]);

  const umurmodified =
    umur < 24 && (index === "BBTB" || index === "TBU")
      ? "024"
      : umur < 60 && index === "BBU"
        ? "060"
        : "2460";

  useEffect(() => {
    const fileName = `${jenisKelamin}-${umurmodified}-${index}.csv`;
    fetch(`/data/${fileName}`)
      .then((res) => res.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          complete: function (results) {
            const data = results.data;

            const sdData = data.map((row: any) => {
              const xValue = row.umur || row.tb || row.pb;
              return {
                x: xValue ? Number(xValue) : 0,
                "-3 SD": row["min 3 SD"],
                "-2 SD": row["min 2 SD"],
                "-1 SD": row["min 1 SD"],
                "0 SD": row["normal"],
                "+1 SD": row["1 SD"],
                "+2 SD": row["2 SD"],
                "+3 SD": row["3 SD"],
              };
            });

            const sdDataWithoutLastRow = sdData.slice(0, sdData.length - 1);

            setDomainX([
              Math.min(...sdDataWithoutLastRow.map((d) => d.x)),
              Math.max(...sdDataWithoutLastRow.map((d) => d.x)),
            ]);

            setDomainY([
              Math.min(
                ...sdDataWithoutLastRow.map((d) =>
                  Math.min(
                    d["-3 SD"],
                    d["-2 SD"],
                    d["-1 SD"],
                    d["0 SD"],
                    d["+1 SD"],
                    d["+2 SD"],
                    d["+3 SD"],
                  ),
                ),
              ),
              Math.max(
                ...sdDataWithoutLastRow.map((d) =>
                  Math.max(
                    d["-3 SD"],
                    d["-2 SD"],
                    d["-1 SD"],
                    d["0 SD"],
                    d["+1 SD"],
                    d["+2 SD"],
                    d["+3 SD"],
                  ),
                ),
              ),
            ]);
            setSdData(sdDataWithoutLastRow);

            if (!initialChildData) {
              if (index === "BBU") {
                setChildData([{ x: umur, value: beratBadan }]);
              } else if (index === "BBTB") {
                setChildData([{ x: tinggiBadan, value: beratBadan }]);
              } else if (index === "TBU") {
                setChildData([{ x: umur, value: tinggiBadan }]);
              }
            }
          },
          error: (error: any) => console.error("Error parsing CSV:", error),
        });
      });
  }, [
    jenisKelamin,
    umur,
    umurmodified,
    index,
    tinggiBadan,
    beratBadan,
    initialChildData,
  ]);

  console.log("initialChildData", initialChildData);

  const chartConfig: ChartConfig = {
    value: {
      label: index,
    },
  };

  return (
    <ChartContainer config={chartConfig}>
      <LineChart data={sdData}>
        <CartesianGrid vertical={false} />
        <YAxis domain={domainY} hide={true} />
        <XAxis dataKey="x" type="number" domain={domainX} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        {["-3 SD", "-2 SD", "-1 SD", "0 SD", "+1 SD", "+2 SD", "+3 SD"].map(
          (key, index) => (
            <Line
              key={key}
              dataKey={key}
              data={sdData}
              type="monotone"
              stroke={
                [
                  "#FF0000",
                  "#FFA500",
                  "#FFFF00",
                  "#00FF00",
                  "#0000FF",
                  "#4B0082",
                  "#EE82EE",
                ][index]
              }
              strokeWidth={1.5}
              dot={false}
            />
          ),
        )}
        {childData && (
          <Line
            data={childData}
            type="monotone"
            dataKey="value"
            stroke="#079A89"
            strokeWidth={2}
            dot={{ r: 5 }}
          />
        )}
      </LineChart>
    </ChartContainer>
  );
}
