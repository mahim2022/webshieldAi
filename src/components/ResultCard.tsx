// // src/components/ResultCard.tsx

// type ScanResult = {
//   url: string;
//   issues: {
//     missingHeaders: string[];
//     corsOpen: boolean;
//     xssDetected: boolean;
//     sqliDetected: boolean;
//   };
//   explanation: string;
// };

// export default function ResultCard({ result }: { result: ScanResult }) {
//   const { url, issues, explanation } = result;
//   console.log(explanation);

//   return (
//     <div className="card bg-base-100 shadow-xl mt-6">
//       <div className="card-body">
//         <h2 className="card-title">🔍 Scan Results for</h2>
//         <p className="text-blue-600 font-semibold break-words">{url}</p>

//         <div className="mt-4">
//           <h3 className="font-bold text-lg">❌ Missing Security Headers</h3>
//           {issues.missingHeaders.length > 0 ? (
//             <ul className="list-disc list-inside mt-2">
//               {issues.missingHeaders.map((header) => (
//                 <li key={header}>{header}</li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-success mt-2">✅ All critical headers are present</p>
//           )}
//         </div>

//         <div className="mt-4">
//           <h3 className="font-bold text-lg">🛡️ CORS Policy</h3>
//           <p className={issues.corsOpen ? 'text-error' : 'text-success'}>
//             {issues.corsOpen ? '❌ CORS is open to all origins (Potential Risk)' : '✅ CORS is configured properly'}
//           </p>
//         </div>

//         <div className="mt-4">
//           <h3 className="font-bold text-lg">🧪 XSS Detection</h3>
//           <p className={issues.xssDetected ? 'text-error' : 'text-success'}>
//             {issues.xssDetected ? '❌ Potential XSS vulnerability found' : '✅ No XSS vulnerability detected'}
//           </p>
//         </div>

//         <div className="mt-4">
//           <h3 className="font-bold text-lg">💥 SQL Injection Test</h3>
//           <p className={issues.sqliDetected ? 'text-error' : 'text-success'}>
//             {issues.sqliDetected ? '❌ SQL Injection vulnerability detected' : '✅ No SQLi vulnerability detected'}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }



// src/components/ResultCard.tsx

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type ScanResult = {
  url: string;
  issues: {
    missingHeaders: string[];
    corsOpen: boolean;
    xssDetected: boolean;
    sqliDetected: boolean;
  };
  explanation: string;
};

export default function ResultCard({ result }: { result: ScanResult }) {
  const { url, issues, explanation } = result;

  return (
    <div className="card bg-base-100 shadow-xl mt-6">
      <div className="card-body">
        <h2 className="card-title">🔍 Scan Results for</h2>
        <p className="text-blue-600 font-semibold break-words">{url}</p>

        {/* Missing Headers */}
        <div className="mt-4">
          <h3 className="font-bold text-lg">❌ Missing Security Headers</h3>
          {issues.missingHeaders.length > 0 ? (
            <ul className="list-disc list-inside mt-2">
              {issues.missingHeaders.map((header) => (
                <li key={header}>{header}</li>
              ))}
            </ul>
          ) : (
            <p className="text-success mt-2">✅ All critical headers are present</p>
          )}
        </div>

        {/* CORS */}
        <div className="mt-4">
          <h3 className="font-bold text-lg">🛡️ CORS Policy</h3>
          <p className={issues.corsOpen ? 'text-error' : 'text-success'}>
            {issues.corsOpen
              ? '❌ CORS is open to all origins (Potential Risk)'
              : '✅ CORS is configured properly'}
          </p>
        </div>

        {/* XSS */}
        <div className="mt-4">
          <h3 className="font-bold text-lg">🧪 XSS Detection</h3>
          <p className={issues.xssDetected ? 'text-error' : 'text-success'}>
            {issues.xssDetected
              ? '❌ Potential XSS vulnerability found'
              : '✅ No XSS vulnerability detected'}
          </p>
        </div>

        {/* SQLi */}
        <div className="mt-4">
          <h3 className="font-bold text-lg">💥 SQL Injection Test</h3>
          <p className={issues.sqliDetected ? 'text-error' : 'text-success'}>
            {issues.sqliDetected
              ? '❌ SQL Injection vulnerability detected'
              : '✅ No SQLi vulnerability detected'}
          </p>
        </div>

        {/* Explanation */}
        {explanation && (
          <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
            <h3 className="font-bold text-blue-700 text-lg">📖 AI Explanation</h3>
            {/* <p className="mt-2 text-gray-700 text-sm leading-relaxed"> */}
             {/* Wrap react-markdown in a div and style it */}
            <div className="prose prose-sm sm:prose lg:prose-lg max-w-full text-gray-700">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {explanation}
              </ReactMarkdown>
              </div>

            {/* </p> */}
          </div>
        )}
      </div>
    </div>
  );
}
