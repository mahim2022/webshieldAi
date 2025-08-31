// src/app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body as {
      name?: string;
      email?: string;
      password?: string;
    };

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const existing = await User.findOne({ email }).lean();
    if (existing) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    const created = await User.create({
      name: name || "",
      email,
      password: hashed,
    });

    // sanitize returned user
    const safeUser = {
      id: created._id.toString(),
      email: created.email,
      name: created.name,
    };

    return NextResponse.json(
      { message: "User created", user: safeUser },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("[SIGNUP ERROR]", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { message: "Server error during signup" },
      { status: 500 }
    );
  }
}
