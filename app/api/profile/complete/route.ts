import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";
import { Session } from "next-auth";

export async function POST(req: Request) {
    const session = (await getServerSession(authOptions)) as Session;

    if (!session || !session.user?.email) {
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
            { email: session.user.email },
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

        session.user.isCompleted = true;

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