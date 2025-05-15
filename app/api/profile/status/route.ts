import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";
import { Session } from "next-auth";

export async function GET() {
    const session = (await getServerSession(authOptions)) as Session;

    console.log("Session di /api/profile/status:", session);

    if (!session || !session.user?.email) {
        return new Response(
            JSON.stringify({ error: "Unauthorized. Please login to continue." }),
            { status: 401, headers: { "Content-Type": "application/json" } }
        );
    }

    const client = await clientPromise;
    const users = client.db().collection("users");

    try {
        const user = await users.findOne({ email: session.user.email });

        if (!user) {
            return new Response(
                JSON.stringify({ error: "User not found." }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        return new Response(
            JSON.stringify({ isCompleted: user.isCompleted }),
            { headers: { "Content-Type": "application/json" } }
        );
    } catch {
        return new Response(
            JSON.stringify({ error: "Failed to check user data. Please try again." }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
