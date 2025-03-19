"use client";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function Chart({
  chartData,
  label,
  axisX,
}: Readonly<{
  chartData: { x: string; value: number | null; ideal: number | null }[];
  label: string;
  axisX: string;
}>) {
  const chartConfig = {
    value: {
      label: label,
    },
    ideal: {
      label: "Ideal",
    },
  } satisfies ChartConfig;
  return (
    <ChartContainer config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="x"
          // TODO: Fix chart data
          // scale="linear"
          // type="number"
          // domain={["auto", "auto"]}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip
          labelFormatter={(label) => `${axisX} ${label}`}
          cursor={false}
          content={<ChartTooltipContent />}
        />
        <Line
          dataKey="value"
          type="monotone"
          stroke="#F88510"
          strokeWidth={2}
          dot={false}
          connectNulls
        />
        <Line
          dataKey="ideal"
          type="monotone"
          stroke="#BD0D15"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
