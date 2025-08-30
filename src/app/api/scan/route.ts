import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { explainScan } from '@/lib/explainScan';


export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || !/^https?:\/\/.+$/.test(url)) {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }

    const response = await axios.get(url, {
      timeout: 8000,
      validateStatus: () => true,
    });

    const headers = response.headers;

    const requiredHeaders = [
      'content-security-policy',
      'strict-transport-security',
      'x-content-type-options',
      'x-frame-options',
      'x-xss-protection',
      'referrer-policy',
      'permissions-policy',
    ];

    const missingHeaders = requiredHeaders.filter(
      (header) => !headers.hasOwnProperty(header)
    );

    const corsOpen = headers['access-control-allow-origin'] === '*';

    // 🔐 Simulated XSS Test
    const xssTest = await axios.get(`${url}?xss=<script>alert(1)</script>`, {
      timeout: 1000,
      validateStatus: () => true,
    });

    const xssDetected =
      xssTest.data?.includes?.('<script>alert(1)</script>') ?? false;

    // 🧨 Simulated SQL Injection Test
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

    return NextResponse.json({
      url,
      headers: Object.fromEntries(Object.entries(headers).slice(0, 20)),
      issues: {
        missingHeaders,
        corsOpen,
        xssDetected,
        sqliDetected,
      }, explanation
    });
  } catch (error: unknown) {
  if (error instanceof Error) {
    console.error('[SCAN ERROR]', error.message);
  } else {
    console.error('[SCAN ERROR]', error);
  }
  return NextResponse.json(
    { error: 'Failed to scan the website.' },
    { status: 500 }
  );
}
}
