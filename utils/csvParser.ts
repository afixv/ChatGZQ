import fs from "fs";
import csv from "csv-parser";
import path from "path";

interface CsvRow {
  valueCol: string;
  "min 3 SD": string;
  "min 2 SD": string;
  "min 1 SD": string;
  normal: string;
  "1 SD": string;
  "2 SD": string;
  "3 SD": string;
}

interface SDValues {
  min3SD: number;
  min2SD: number;
  min1SD: number;
  normal: number;
  plus1SD: number;
  plus2SD: number;
  plus3SD: number;
}

const getCSVFileName = (
  indexType: string,
  gender: string,
  ageCategory: string,
): string => {
  const categoryMap: { [key: string]: string } = {
    BBPB: "BBPB",
    BBTB: "BBTB",
    PBU: "PBU",
    BBU: "BBU",
    TBU: "TBU",
  };

  return path.resolve(
    process.cwd(),
    "public",
    "data",
    `${gender}-${ageCategory}-${categoryMap[indexType]}.csv`,
  );
};

const findClosestRow = (
  results: CsvRow[],
  searchValue: number,
): CsvRow | null => {
  const targetValue = searchValue;
  let closestRow: CsvRow | null = null;
  let minDiff = Infinity;

  results.forEach((row) => {
    const diff = Math.abs(parseFloat(row.valueCol) - targetValue);
    if (diff < minDiff) {
      minDiff = diff;
      closestRow = row;
    }
  });

  return closestRow;
};

const getSDValues = async (
  indexType: string,
  gender: string,
  ageCategory: string,
  searchValue: number,
  comparisonValue: number,
): Promise<SDValues> => {
  const fileName = getCSVFileName(indexType, gender, ageCategory);

  return new Promise((resolve, reject) => {
    const results: CsvRow[] = [];
    fs.createReadStream(fileName)
      .pipe(
        csv({
          separator: ";",
          headers: [
            "valueCol",
            "min 3 SD",
            "min 2 SD",
            "min 1 SD",
            "normal",
            "1 SD",
            "2 SD",
            "3 SD",
          ],
          skipLines: 1,
        }),
      )
      .on("data", (data: CsvRow) => results.push(data))
      .on("end", () => {
        let valueToFind: number;

        // Untuk BBPB/BBTB, gunakan searchValue (yang mewakili PB) untuk mencari baris
        switch (indexType) {
          case "BBPB":
          case "BBTB":
            valueToFind = searchValue;
            break;
          case "PBU":
          case "TBU":
          case "BBU":
            valueToFind = searchValue;
            break;
          default:
            return reject(new Error("Tipe indeks tidak valid"));
        }

        console.log(`Searching in ${fileName}:`, {
          indexType,
          searchValue: valueToFind,
          comparisonValue,
        });

        const row = findClosestRow(results, valueToFind);

        if (!row) {
          console.error(`Data tidak ditemukan di ${fileName} untuk:`, {
            indexType,
            valueToFind,
          });
          return reject(new Error("Data antropometri tidak ditemukan"));
        }

        console.log(`Found row for ${indexType}:`, row);

        resolve({
          min3SD: parseFloat(row["min 3 SD"]),
          min2SD: parseFloat(row["min 2 SD"]),
          min1SD: parseFloat(row["min 1 SD"]),
          normal: parseFloat(row.normal),
          plus1SD: parseFloat(row["1 SD"]),
          plus2SD: parseFloat(row["2 SD"]),
          plus3SD: parseFloat(row["3 SD"]),
        });
      })
      .on("error", (error) => {
        console.error("CSV read error:", error);
        reject(new Error("Gagal membaca data antropometri"));
      });
  });
};

export { getSDValues };
