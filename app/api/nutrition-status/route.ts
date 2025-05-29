import { getSDValues } from "@/utils/csvParser";
import { getRecommendation } from "@/utils/getRecommendation";
import { NextRequest, NextResponse } from "next/server";

interface SDValues {
  min3SD: number;
  min2SD: number;
  plus1SD: number;
  plus2SD: number;
  plus3SD: number;
}

interface NutritionStatusResult {
  status: string;
  value: number;
  color: string;
}

interface Results {
  bbu: {
    status: string;
    value: number;
    color: string;
  };
  pbu_tbu: {
    status: string;
    value: number;
    indexType: string;
    color: string;
  };
  bbtb_bbpb: {
    status: string;
    value: number;
    indexType: string;
    color: string;
  };
}

interface Recommendations {
  bbu: string;
  pbu: string;
  bbpb: string;
}

interface UserData {
  umur: number;
  tinggi: number;
  jenisKelamin: string;
  berat: number;
}

const determineSDStatus = (
  value: number,
  sdValues: SDValues,
  indexType: string,
): NutritionStatusResult => {
  switch (indexType) {
    case "BBPB":
    case "BBTB":
      if (value === 0) {
        return { status: "Tidak Diketahui", value, color: "gray" };
      }
      if (value < sdValues.min3SD) {
        return { status: "Gizi Buruk", value, color: "red" };
      } else if (value >= sdValues.min3SD && value < sdValues.min2SD) {
        return { status: "Gizi Kurang", value, color: "yellow" };
      } else if (value >= sdValues.min2SD && value <= sdValues.plus1SD) {
        return { status: "Gizi Baik", value, color: "green" };
      } else if (value > sdValues.plus1SD && value <= sdValues.plus2SD) {
        return { status: "Berisiko Gizi Lebih", value, color: "yellow" };
      } else if (value > sdValues.plus2SD && value <= sdValues.plus3SD) {
        return { status: "Gizi Lebih", value, color: "yellow" };
      } else {
        return { status: "Obesitas", value, color: "red" };
      }
    case "BBU":
      if (value === 0) {
        return { status: "Tidak Diketahui", value, color: "gray" };
      }
      if (value < sdValues.min3SD) {
        return { status: "Berat Badan Sangat Kurang", value, color: "red" };
      } else if (value >= sdValues.min3SD && value < sdValues.min2SD) {
        return { status: "Berat Badan Kurang", value, color: "yellow" };
      } else if (value >= sdValues.min2SD && value <= sdValues.plus1SD) {
        return { status: "Berat Badan Normal", value, color: "green" };
      } else {
        return { status: "Risiko Berat Badan Lebih", value, color: "yellow" };
      }
    case "PBU":
    case "TBU":
      if (value === 0) {
        return { status: "Tidak Diketahui", value, color: "gray" };
      }
      if (value < sdValues.min3SD) {
        return { status: "Sangat Pendek", value, color: "red" };
      } else if (value >= sdValues.min3SD && value < sdValues.min2SD) {
        return { status: "Pendek", value, color: "yellow" };
      } else if (value >= sdValues.min2SD && value <= sdValues.plus3SD) {
        return { status: "Normal", value, color: "green" };
      } else {
        return { status: "Tinggi", value, color: "green" };
      }
    default:
      throw new Error("Tipe indeks tidak valid");
  }
};

const calculateIndex = async (
  indexType: string,
  gender: string,
  ageCategory: string,
  searchValue: number,
  comparisonValue: number,
): Promise<NutritionStatusResult> => {
  try {
    const sdValues = await getSDValues(
      indexType,
      gender,
      ageCategory,
      searchValue,
      comparisonValue,
    );

    const valueToCompare = ["BBPB", "BBTB"].includes(indexType)
      ? comparisonValue
      : comparisonValue;

    return determineSDStatus(valueToCompare, sdValues, indexType);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error calculating ${indexType}: ${error.message}`);
    } else {
      throw new Error(`Error calculating ${indexType}: ${String(error)}`);
    }
  }
};

const calculateNutritionStatus = async (userData: UserData) => {
  const { umur, tinggi, jenisKelamin, berat } = userData;
  const ageInMonths = umur;

  if (ageInMonths < 0 || ageInMonths > 60) {
    throw new Error("Umur harus antara 0-60 bulan");
  }

  let heightIndex: string, heightAgeCategory: string;
  if (ageInMonths <= 24) {
    heightAgeCategory = "024";
    heightIndex = "PBU";
  } else {
    heightAgeCategory = "2460";
    heightIndex = "TBU";
  }

  const calculations = await Promise.allSettled([
    calculateIndex("BBU", jenisKelamin, "060", ageInMonths, berat),
    calculateIndex(
      heightIndex,
      jenisKelamin,
      heightAgeCategory,
      ageInMonths,
      tinggi,
    ),
    ageInMonths <= 24
      ? calculateIndex("BBPB", jenisKelamin, "024", tinggi, berat)
      : calculateIndex("BBTB", jenisKelamin, "2460", tinggi, berat),
  ]);

  const results: Results = {
    bbu: {
      status:
        calculations[0].status === "fulfilled"
          ? calculations[0].value.status
          : "Error",
      value:
        calculations[0].status === "fulfilled"
          ? calculations[0].value.value
          : 0,
      color:
        calculations[0].status === "fulfilled"
          ? calculations[0].value.color
          : "red",
    },
    pbu_tbu: {
      status:
        calculations[1].status === "fulfilled"
          ? calculations[1].value.status
          : "Error",
      value:
        calculations[1].status === "fulfilled"
          ? calculations[1].value.value
          : 0,
      indexType: heightIndex,
      color:
        calculations[1].status === "fulfilled"
          ? calculations[1].value.color
          : "red",
    },
    bbtb_bbpb: {
      status:
        calculations[2].status === "fulfilled"
          ? calculations[2].value.status
          : "Error",
      value:
        calculations[2].status === "fulfilled"
          ? calculations[2].value.value
          : 0,
      indexType: ageInMonths <= 24 ? "BBPB" : "BBTB",
      color:
        calculations[2].status === "fulfilled"
          ? calculations[2].value.color
          : "red",
    },
  };

  const recommendations: Recommendations = getRecommendation(results);

  return {
    data: {
      bbu: {
        status: results.bbu.status,
        value: results.bbu.value,
        recommendations: recommendations.bbu,
        color: results.bbu.color,
      },
      pbu: {
        status: results.pbu_tbu.status,
        value: results.pbu_tbu.value,
        recommendations: recommendations.pbu,
        color: results.pbu_tbu.color,
        indexType: results.pbu_tbu.indexType,
      },
      bbpb: {
        status: results.bbtb_bbpb.status,
        value: results.bbtb_bbpb.value,
        recommendations: recommendations.bbpb,
        color: results.bbtb_bbpb.color,
        indexType: results.bbtb_bbpb.indexType,
      },
    },
  };
};

const validateUserData = (userData: UserData) => {
  const errors: string[] = [];

  if (typeof userData !== "object" || !userData) {
    errors.push("Invalid user data format.");
  }

  if (userData.umur < 0 || userData.umur > 60) {
    errors.push("Umur harus antara 0-60 bulan.");
  }

  if (typeof userData.berat !== "number" || userData.berat < 0) {
    errors.push("Berat harus berupa angka positif.");
  }

  if (typeof userData.tinggi !== "number" || userData.tinggi < 0) {
    errors.push("Tinggi harus berupa angka positif.");
  }

  if (userData.jenisKelamin !== "L" && userData.jenisKelamin !== "P") {
    errors.push("Jenis kelamin harus 'L' atau 'P'.");
  }

  return errors;
};

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return NextResponse.json(
        { error: "Unsupported content type. Use application/json." },
        { status: 415 },
      );
    }

    const userData = await req.json();

    const validationErrors = validateUserData(userData);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: validationErrors.join(" ") },
        { status: 400 },
      );
    }

    const result = await calculateNutritionStatus(userData);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("POST /api/nutrition-status error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const umur = searchParams.get("umur");
    const tinggi = searchParams.get("tinggi");
    const jenisKelamin = searchParams.get("jenisKelamin");
    const berat = searchParams.get("berat");

    if (!umur || !tinggi || !jenisKelamin || !berat) {
      return NextResponse.json(
        {
          error:
            "Missing required query parameters (umur, tinggi, berat, jenisKelamin).",
        },
        { status: 400 },
      );
    }

    const userData = {
      umur: parseInt(umur),
      tinggi: parseInt(tinggi),
      jenisKelamin,
      berat: parseInt(berat),
    };

    const validationErrors = validateUserData(userData);
    if (validationErrors.length > 0) {
      console.error("Validation errors:", validationErrors);
      return NextResponse.json(
        { error: validationErrors.join(" ") },
        { status: 400 },
      );
    }

    const result = await calculateNutritionStatus(userData);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("GET /api/nutrition-status error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
