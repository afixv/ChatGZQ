import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import User from "@/models/User";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password || !email.includes("@")) {
    return NextResponse.json({ success: false, message: "Input tidak valid" }, { status: 400 });
  }  

  // Hash the password
  const hashedPassword = await hash(password, 12);

  // Connect to MongoDB
  await connectToDatabase();

  // Check if the email is already registered
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ success: false, message: "Email sudah terdaftar" }, { status: 400 });
  }

   const newUser = new User({
    email,
    password: hashedPassword, 
    createdAt: Date.now(),

  });

  await newUser.save();

  return NextResponse.json({ success: true, message: "Registrasi berhasil!" }, { status: 200 });
}
