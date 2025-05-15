// import { Button } from "../Button";
import { Chart } from "../Chart";
export default function ChartSection({
  title,
  childData,
  recommendations,
  index,
}: {
  title?: string;
  childData?: {
    jenisKelamin: string;
    umur: number;
    tinggiBadan: number;
    beratBadan: number;
    chartData: { x: number; value: number }[];
  };
  recommendations?: string;
  index: string;
}) {
  return (
    <section>
      <h2 className="mb-4 text-lg font-bold">Rekap Data {title}</h2>
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Chart
            jenisKelamin={childData?.jenisKelamin || "L"}
            umur={childData?.umur || 0}
            tinggiBadan={childData?.tinggiBadan || 0}
            beratBadan={childData?.beratBadan || 0}
            index={index}
            childData={childData?.chartData || []}
          />
        </div>
        <div className="relative w-full rounded-xl bg-primary-10 p-4 md:w-1/4">
          <h2 className="text-lg font-semibold">Rekomendasi</h2>
          <p className="text-sm font-medium text-dark-20">{recommendations}</p>
          {/* <Button
          variant="primary"
          className="absolute -bottom-4 right-0 text-white"
        >
          Download Data
        </Button> */}
        </div>
      </div>
    </section>
  );
}
