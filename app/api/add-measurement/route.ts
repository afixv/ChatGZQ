import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Measurement from "@/models/Measurement";

export async function POST(req: NextRequest) {
  try {
    await connectMongo();

    const body = await req.json(); // Mendapatkan JSON dari request body
    const { date, weight, height } = body;

    if (!date || !weight || !height) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 },
      );
    }

    const measurement = await Measurement.create({ date, weight, height });

    return NextResponse.json(
      { success: true, data: measurement },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 },
    );
  }
}

export const GET = async () => {
  try {
    await connectMongo();

    const measurements = await Measurement.find({});
    return NextResponse.json(
      { success: true, data: measurements },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 },
    );
  }
};
