import { Button } from "../Button";
import { Chart } from "../Chart";
export default function ChartSection() {
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
    <section className="flex w-full flex-col gap-4 md:flex-row">
      <div className="relative flex-1">
        <Chart
          // TODO: Fix chart data
          chartData={getChartData(data, ideal_data, (record) => record.weight)}
          label="Berat Badan"
          axisX="Bulan"
        />
      </div>
      <div className="w-full rounded-xl bg-primary-10 p-4 md:w-1/4 relative">
        <h2 className="text-lg font-semibold">Rekomendasi</h2>
        <p className="text-sm font-medium text-dark-20">
          Perlu mengurangi makanan manis dan blabl abla blab la. Berat badan
          yang ideal adalah xx kg
        </p>
        <Button variant="primary" className="text-white absolute right-0 -bottom-4">
          Download Data
        </Button>
      </div>
    </section>
  );
}
