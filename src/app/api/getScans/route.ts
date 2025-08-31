import { NextRequest, NextResponse } from "next/server";
import jwt, {JwtPayload} from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import Scan from "@/models/Scan";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

type JWTPayload = {
  sub: string;
  email: string;
  iat: number;
  exp: number;
};


export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decoded: string | JWTPayload;
    
    try {
      decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }
    await connectDB();

    const scans = await Scan.find({ userId: decoded.sub }).sort({ createdAt: -1 });

    return NextResponse.json(scans, { status: 200 });
  } catch (error) {
    console.error("[FETCH SCANS ERROR]", error);
    return NextResponse.json({ error: "Failed to fetch scans" }, { status: 500 });
  }
}
