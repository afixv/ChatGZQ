import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Measurement from "@/models/Measurement";
import User from "@/models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await connectMongo();

    // Get user session
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await req.json();
    const { date, weight, height } = body;

    if (!date || !weight || !height) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 },
      );
    }

    // Create measurement
    const measurement = await Measurement.create({ date, weight, height });

    // Add measurement reference to user
    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { $push: { measurements: measurement._id } },
      { new: true },
    );

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

export const GET = async (req: NextRequest) => {
  try {
    await connectMongo();

    // Get user session
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    } // Get user with populated measurements
    const user = await User.findOne({ email: session.user.email }).populate(
      "measurements",
    );

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 },
      );
    }

    // Ensure measurements is always an array, even if user doesn't have measurements yet
    const measurements = user.measurements || [];

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
