'use client';

import Layout from '@/components/Layout';
import { useState, useEffect } from 'react';

type Scan = {
  _id: string;
  url: string;
  createdAt: string;
  headers: Record<string, unknown>;
  issues: {
    missingHeaders: string[];
    corsOpen: boolean;
    xssDetected: boolean;
    sqliDetected: boolean;
  };
  explanation: string;
};

export default function ResultsPage() {
  const [scans, setScans] = useState<Scan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedScan, setSelectedScan] = useState<Scan | null>(null);

  useEffect(() => {
    const fetchScans = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/getScans', { credentials: 'include' });
        if (!res.ok) throw new Error('Failed to fetch scans');
        const data = await res.json();
        setScans(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    fetchScans();
  }, []);

  const issueCount = (scan: Scan) =>
    scan.issues.missingHeaders.length +
    (scan.issues.corsOpen ? 1 : 0) +
    (scan.issues.xssDetected ? 1 : 0) +
    (scan.issues.sqliDetected ? 1 : 0);

  return (
    <Layout>
    <section className="mt-8 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">📋 Scan History</h1>

      {loading && (
        <div className="flex justify-center items-center h-40">
          <span className="loading loading-spinner loading-lg text-blue-600"></span>
        </div>
      )}

      {error && <p className="text-red-600 text-center font-medium">{error}</p>}

      {!loading && scans.length === 0 && (
        <p className="text-center text-gray-500">No scans found yet.</p>
      )}

      {!loading && scans.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Website URL</th>
                <th>Date & Time</th>
                <th>Issues Found</th>
                <th>Status</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {scans.map((scan, index) => (
                <tr key={scan._id}>
                  <th>{index + 1}</th>
                  <td className="break-words">{scan.url}</td>
                  <td>{new Date(scan.createdAt).toLocaleString()}</td>
                  <td>{issueCount(scan)}</td>
                  <td>
                    {issueCount(scan) > 0 ? (
                      <span className="badge badge-error">Vulnerable</span>
                    ) : (
                      <span className="badge badge-success">Secure</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => setSelectedScan(scan)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {selectedScan && (
        <div className="modal modal-open">
          <div className="modal-box max-w-3xl overflow-auto">
            <h3 className="font-bold text-xl mb-4">🔍 Scan Details - {selectedScan.url}</h3>
            <p className="mb-2"><strong>Date:</strong> {new Date(selectedScan.createdAt).toLocaleString()}</p>

            <h4 className="font-semibold mt-4 mb-2">Issues</h4>
            <ul className="list-disc list-inside">
              {selectedScan.issues.missingHeaders.length > 0 ? (
                selectedScan.issues.missingHeaders.map((header) => <li key={header}>Missing Header: {header}</li>)
              ) : (
                <li>✅ All headers present</li>
              )}
              {selectedScan.issues.corsOpen && <li>❌ CORS open to all origins</li>}
              {selectedScan.issues.xssDetected && <li>❌ Potential XSS vulnerability detected</li>}
              {selectedScan.issues.sqliDetected && <li>❌ SQL Injection vulnerability detected</li>}
            </ul>

            <h4 className="font-semibold mt-4 mb-2">Headers (Top 20)</h4>
            <pre className="bg-gray-100 p-2 rounded overflow-x-auto text-sm">{JSON.stringify(selectedScan.headers, null, 2)}</pre>

            <h4 className="font-semibold mt-4 mb-2">Explanation</h4>
            <p className="whitespace-pre-line">{selectedScan.explanation}</p>

            <div className="modal-action">
              <button className="btn btn-primary" onClick={() => setSelectedScan(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
    </Layout>
  );
}
