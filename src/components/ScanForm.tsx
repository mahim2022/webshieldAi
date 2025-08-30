'use client';

import { useState } from 'react';
import axios from 'axios';
import ResultCard from '@/components/ResultCard';

// const mockScan = {
//   url: 'https://example.com',
//   issues: {
//     missingHeaders: ['Content-Security-Policy', 'Strict-Transport-Security'],
//     corsOpen: true,
//     xssDetected: false,
//     sqliDetected: true,
//   },
// };

type ScanResult = {
  url: string;
  headers: Record<string, string>;
  issues: {
    missingHeaders: string[];
    corsOpen: boolean;
    xssDetected: boolean;
    sqliDetected: boolean;
  };
  explanation: string;
};



export default function ScanForm() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setScanResult(null);
    // console.log(url);


    try {
      const response = await axios.post('/api/scan', { url });
      setScanResult(response.data);
      // console.log('Scan result:', response.data);
    } catch (err) {
      setError('Scan failed. Please check the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="w-full max-w-lg mx-auto mt-16 px-4">
    {/* Card container */}
    <div className="card shadow-xl bg-base-100 p-6">
      <h2 className="text-2xl font-bold text-center mb-6">🔍 Website Security Scanner</h2>

      <form onSubmit={handleScan} className="form-control space-y-4">
        <div>
          <label className="label">
            <span className="label-text text-lg font-semibold">Enter Website URL</span>
          </label>
          <input
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

       <button
  type="submit"
  className="btn btn-primary w-full flex items-center justify-center gap-2"
  disabled={loading}
>
  {loading ? (
    <>
      <span className="loading loading-spinner loading-sm"></span>
      Scanning...
    </>
  ) : (
    "Scan Website"
  )}
</button>
      </form>

      {error && <div className="alert alert-error mt-6">{error}</div>}

      {/* Mock result card - replace with real scan data */}
      {scanResult && (
        <div className="mt-6">
          <ResultCard result={scanResult} />
        </div>
      )}
    </div>
  </div>
);

}
