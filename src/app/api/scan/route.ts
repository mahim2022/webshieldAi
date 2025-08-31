// import { NextRequest, NextResponse } from 'next/server';
// import axios from 'axios';
// import { explainScan } from '@/lib/explainScan';


// export async function POST(req: NextRequest) {
//   try {
//     const { url } = await req.json();

//     if (!url || !/^https?:\/\/.+$/.test(url)) {
//       return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
//     }

//     const response = await axios.get(url, {
//       timeout: 8000,
//       validateStatus: () => true,
//     });

//     const headers = response.headers;

//     const requiredHeaders = [
//       'content-security-policy',
//       'strict-transport-security',
//       'x-content-type-options',
//       'x-frame-options',
//       'x-xss-protection',
//       'referrer-policy',
//       'permissions-policy',
//     ];

//     const missingHeaders = requiredHeaders.filter(
//       (header) => !headers.hasOwnProperty(header)
//     );

//     const corsOpen = headers['access-control-allow-origin'] === '*';

//     // 🔐 Simulated XSS Test
//     const xssTest = await axios.get(`${url}?xss=<script>alert(1)</script>`, {
//       timeout: 1000,
//       validateStatus: () => true,
//     });

//     const xssDetected =
//       xssTest.data?.includes?.('<script>alert(1)</script>') ?? false;

//     // 🧨 Simulated SQL Injection Test
//     const sqliPayload = `' OR '1'='1`;
//     const sqliTest = await axios.get(`${url}?id=${encodeURIComponent(sqliPayload)}`, {
//       timeout: 1000,
//       validateStatus: () => true,
//     });

//     const sqliDetected = /sql|mysql|syntax|query/i.test(sqliTest.data);

//     const explanation = await explainScan({
//         missingHeaders,
//         corsOpen,
//         xssDetected,
//         sqliDetected,
//     });

//     return NextResponse.json({
//       url,
//       headers: Object.fromEntries(Object.entries(headers).slice(0, 20)),
//       issues: {
//         missingHeaders,
//         corsOpen,
//         xssDetected,
//         sqliDetected,
//       }, explanation
//     });
//   } catch (error: unknown) {
//   if (error instanceof Error) {
//     console.error('[SCAN ERROR]', error.message);
//   } else {
//     console.error('[SCAN ERROR]', error);
//   }
//   return NextResponse.json(
//     { error: 'Failed to scan the website.' },
//     { status: 500 }
//   );
// }
// }


import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import { explainScan } from "@/lib/explainScan";
import User from "@/models/User";
import Scan from "@/models/Scan";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export async function POST(req: NextRequest) {
  try {
    // 🔑 Verify user token
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decoded: string | jwt.JwtPayload;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    await connectDB();

    const { url } = await req.json();
    if (!url || !/^https?:\/\/.+$/.test(url)) {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    // 🔍 Perform scan
    const response = await axios.get(url, { timeout: 8000, validateStatus: () => true });
    const headers = response.headers;

    const requiredHeaders = [
      "content-security-policy",
      "strict-transport-security",
      "x-content-type-options",
      "x-frame-options",
      "x-xss-protection",
      "referrer-policy",
      "permissions-policy",
    ];
    const missingHeaders = requiredHeaders.filter((h) => !headers.hasOwnProperty(h));
    const corsOpen = headers["access-control-allow-origin"] === "*";

    const xssTest = await axios.get(`${url}?xss=<script>alert(1)</script>`, {
      timeout: 1000,
      validateStatus: () => true,
    });
    const xssDetected = xssTest.data?.includes?.("<script>alert(1)</script>") ?? false;

    const sqliPayload = `' OR '1'='1`;
    const sqliTest = await axios.get(`${url}?id=${encodeURIComponent(sqliPayload)}`, {
      timeout: 1000,
      validateStatus: () => true,
    });
    const sqliDetected = /sql|mysql|syntax|query/i.test(sqliTest.data);

    const explanation = await explainScan({
      missingHeaders,
      corsOpen,
      xssDetected,
      sqliDetected,
    });

    // 🗄️ Save to MongoDB
    const scanDoc = await Scan.create({
      userId: decoded.sub,
      url,
      headers: Object.fromEntries(Object.entries(headers).slice(0, 20)),
      issues: {
        missingHeaders,
        corsOpen,
        xssDetected,
        sqliDetected,
      },
      explanation,
    });

    return NextResponse.json(scanDoc, { status: 201 });
  } catch (error: unknown) {
    console.error("[SCAN ERROR]", error);
    return NextResponse.json(
      { error: "Failed to scan the website." },
      { status: 500 }
    );
  }
}
