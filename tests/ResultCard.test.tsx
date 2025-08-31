// // src/components/ResultCard.tsx
// "use client";

// import { useMemo, useState } from "react";

// export type ScanResult = {
//   _id?: string;
//   url: string;
//   createdAt?: string; // optional, if your API returns it
//   headers?: Record<string, unknown>; // top 20 from the API
//   issues: {
//     missingHeaders: string[];
//     corsOpen: boolean;
//     xssDetected: boolean;
//     sqliDetected: boolean;
//   };
//   explanation?: string;
// };

// export default function ResultCard({ result }: { result: ScanResult }) {
//   const { url, createdAt, issues, headers, explanation } = result;
//   const [showDetails, setShowDetails] = useState(false);

//   const issueCount = useMemo(() => {
//     if (!issues) return 0;
//     return (
//       (issues?.missingHeaders?.length || 0) +
//       (issues?.corsOpen ? 1 : 0) +
//       (issues?.xssDetected ? 1 : 0) +
//       (issues?.sqliDetected ? 1 : 0)
//     );
//   }, [issues]);

//   const statusBadge =
//     issueCount > 0 ? (
//       <span className="badge badge-error">Vulnerable</span>
//     ) : (
//       <span className="badge badge-success">Secure</span>
//     );

//   const handleCopyJSON = async () => {
//     try {
//       const json = JSON.stringify(result, null, 2);
//       await navigator.clipboard.writeText(json);
//     } catch (e) {
//       // no-op; clipboard may be blocked in some contexts
//       console.error("Copy failed", e);
//     }
//   };

//   return (
//     <div className="card bg-base-100 shadow-xl mt-6">
//       <div className="card-body gap-3">
//         {/* Header */}
//         <div className="flex flex-col gap-2">
//           <div className="flex items-center justify-between flex-wrap gap-2">
//             <h2 className="card-title">🔍 Scan Results</h2>
//             {statusBadge}
//           </div>
//           <p className="text-blue-600 font-semibold break-words">{url}</p>
//           {createdAt && (
//             <p className="text-sm text-base-content/60">
//               Scanned: {new Date(createdAt).toLocaleString()}
//             </p>
//           )}
//         </div>

//         {/* Quick summary pills */}
//         <div className="flex flex-wrap gap-2 mt-1">
//           <div className="badge badge-outline">
//             Missing Headers: {issues?.missingHeaders?.length ?? 0}
//           </div>
//           <div className={`badge ${issues?.corsOpen ? "badge-error" : "badge-success"}`}>
//             CORS: {issues?.corsOpen ? "Open" : "OK"}
//           </div>
//           <div className={`badge ${issues?.xssDetected ? "badge-error" : "badge-success"}`}>
//             XSS: {issues?.xssDetected ? "Detected" : "None"}
//           </div>
//           <div className={`badge ${issues?.sqliDetected ? "badge-error" : "badge-success"}`}>
//             SQLi: {issues?.sqliDetected ? "Detected" : "None"}
//           </div>
//         </div>

//         {/* Missing headers */}
//         <section className="mt-3">
//           <h3 className="font-bold text-lg">❌ Missing Security Headers</h3>
//           {issues?.missingHeaders?.length ? (
//             <ul className="list-disc list-inside mt-2">
//               {issues.missingHeaders.map((header) => (
//                 <li key={header}>{header}</li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-success mt-2">✅ All critical headers are present</p>
//           )}
//         </section>

//         {/* CORS */}
//         <section className="mt-2">
//           <h3 className="font-bold text-lg">🛡️ CORS Policy</h3>
//           <p className={issues?.corsOpen ? "text-error" : "text-success"}>
//             {issues?.corsOpen
//               ? "❌ CORS is open to all origins (Potential Risk)"
//               : "✅ CORS is configured properly"}
//           </p>
//         </section>

//         {/* XSS */}
//         <section className="mt-2">
//           <h3 className="font-bold text-lg">🧪 XSS Detection</h3>
//           <p className={issues?.xssDetected ? "text-error" : "text-success"}>
//             {issues?.xssDetected
//               ? "❌ Potential XSS vulnerability found"
//               : "✅ No XSS vulnerability detected"}
//           </p>
//         </section>

//         {/* SQLi */}
//         <section className="mt-2">
//           <h3 className="font-bold text-lg">💥 SQL Injection Test</h3>
//           <p className={issues?.sqliDetected ? "text-error" : "text-success"}>
//             {issues?.sqliDetected
//               ? "❌ SQL Injection vulnerability detected"
//               : "✅ No SQLi vulnerability detected"}
//           </p>
//         </section>

//         {/* Actions */}
//         <div className="mt-4 flex flex-wrap gap-2">
//           <button
//             className="btn btn-outline btn-sm"
//             onClick={() => setShowDetails((v) => !v)}
//             aria-expanded={showDetails}
//           >
//             {showDetails ? "Hide Details" : "View Details"}
//           </button>

//           <button className="btn btn-outline btn-sm" onClick={handleCopyJSON}>
//             Copy JSON
//           </button>
//         </div>

//         {/* Details Panel */}
//         {showDetails && (
//           <div className="mt-4 grid gap-4">
//             {/* Explanation */}
//             {explanation && (
//               <section>
//                 <h4 className="font-semibold text-base mb-2">📖 Explanation</h4>
//                 {/* Avoid react-markdown className issue by using simple text rendering */}
//                 <div className="p-3 rounded-lg bg-base-200 text-sm whitespace-pre-wrap leading-relaxed">
//                   {explanation}
//                 </div>
//               </section>
//             )}

//             {/* Headers */}
//             {headers && (
//               <section>
//                 <h4 className="font-semibold text-base mb-2">📦 Response Headers (Top 20)</h4>
//                 <pre className="p-3 rounded-lg bg-base-200 text-xs overflow-x-auto">
//                   {JSON.stringify(headers, null, 2)}
//                 </pre>
//               </section>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
