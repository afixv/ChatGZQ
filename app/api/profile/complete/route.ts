// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";
// import { Session } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const token = await getToken({ req });

    if (!token || !token.email) {
        return new Response(
            JSON.stringify({ error: "Unauthorized. Please login to continue." }),
            { status: 401, headers: { "Content-Type": "application/json" } }
        );
    }

    const body = await req.json();
    const { nama_orang_tua, nama_anak, tanggal_lahir_anak, jenis_kelamin_anak } = body;

    const client = await clientPromise;
    const users = client.db().collection("users");

    try {
        await users.updateOne(
            { email: token.email },
            {
                $set: {
                    parentName: nama_orang_tua,
                    childName: nama_anak,
                    childBirthDate: tanggal_lahir_anak,
                    childGender: jenis_kelamin_anak,
                    isCompleted: true,
                    name: nama_orang_tua,
                },
            }
        );

        return new Response(
            JSON.stringify({ success: true }),
            { headers: { "Content-Type": "application/json" } }
        );
    } catch (err: unknown) {
        if (err instanceof Error) {
            return new Response(
                JSON.stringify({ error: err.message || "Failed to save data. Please try again." }),
                { status: 500, headers: { "Content-Type": "application/json" } }
            );
        }
        
        return new Response(
            JSON.stringify({ error: "An unknown error occurred. Please try again." }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}