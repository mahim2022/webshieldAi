// src/app/results/page.tsx

'use client';

import { useState, useEffect } from 'react';

type ScanSummary = {
  id: string;
  url: string;
  scannedAt: string;
  issueCount: number;
};

const mockResults: ScanSummary[] = [
  {
    id: '1',
    url: 'https://example.com',
    scannedAt: '2025-07-28 14:32',
    issueCount: 3,
  },
  {
    id: '2',
    url: 'https://vuln-site.org',
    scannedAt: '2025-07-27 18:05',
    issueCount: 1,
  },
  {
    id: '3',
    url: 'https://secure-site.com',
    scannedAt: '2025-07-26 10:12',
    issueCount: 0,
  },
];

export default function ResultsPage() {
  const [scans, setScans] = useState<ScanSummary[]>([]);

  useEffect(() => {
    // Simulate fetching from Supabase later
    setScans(mockResults);
  }, []);

  return (
    <section className="mt-8">
      <h1 className="text-3xl font-bold text-center mb-6">📋 Scan History</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Website URL</th>
              <th>Date & Time</th>
              <th>Issues Found</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {scans.map((scan, index) => (
              <tr key={scan.id}>
                <th>{index + 1}</th>
                <td className="break-words">{scan.url}</td>
                <td>{scan.scannedAt}</td>
                <td>{scan.issueCount}</td>
                <td>
                  {scan.issueCount > 0 ? (
                    <span className="badge badge-error">Vulnerable</span>
                  ) : (
                    <span className="badge badge-success">Secure</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
