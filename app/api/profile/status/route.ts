import { getServerSession } from "next-auth/next";
import connectMongo from "@/lib/mongodb";
import UserModel from "@/models/User";
import MeasurementModel from "@/models/Measurement";
import { Session } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = (await getServerSession(authOptions)) as Session;

  if (!session || !session.user?.email) {
    return new Response(
      JSON.stringify({ error: "Unauthorized. Please login to continue." }),
      { status: 401, headers: { "Content-Type": "application/json" } },
    );
  }
  await connectMongo();
  try {
    const user = await UserModel.findOne({
      email: session.user.email,
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Fetch measurements separately
    const measurements = user.measurements
      ? await MeasurementModel.find({ _id: { $in: user.measurements } })
      : [];

    return new Response(
      JSON.stringify({
        parentName: user.parentName ?? null,
        isCompleted: user.isCompleted,
        child: {
          name: user.childName ?? null,
          birthDate: user.childBirthDate ?? null,
          gender: user.childGender ?? null,
          historiesData: measurements,
        },
      }),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch {
    return new Response(
      JSON.stringify({ error: "Failed to check user data. Please try again." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
