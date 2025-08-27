// src/components/SummaryView.tsx
import React, { useMemo } from "react";

type Props = {
  summary: string;
  fullText?: string;
};

function generateKeyPoints(summary: string, maxPoints = 5) {
  if (!summary) return [];
  const candidates = summary
    .replace(/\n+/g, " ")
    .split(/(?<=[.?!])\s+/)
    .map(s => s.trim())
    .filter(Boolean);

  const scored = candidates.map(s => {
    const score = s.length + (/[—:•–-]/.test(s) ? 50 : 0);
    return { s, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, Math.min(maxPoints, scored.length)).map(x => x.s);
}

export default function SummaryView({ summary, fullText }: Props) {
  const keyPoints = useMemo(() => generateKeyPoints(summary, 5), [summary]);

  return (
    <div className="w-full max-w-3xl mx-auto mt-6 space-y-4">
      {/* Summary card */}
      <div className="p-4 bg-gray-900 rounded-xl shadow border border-gray-700">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-bold text-black bg-white px-2 py-1 rounded">
            📝 Summary
          </h3>
          <button
            onClick={() => navigator.clipboard.writeText(summary)}
            className="px-3 py-1 rounded-md border border-gray-600 text-sm text-gray-200 hover:bg-gray-800"
            aria-label="Copy summary"
          >
            Copy
          </button>
        </div>
        <p className="mt-3 text-gray-200 whitespace-pre-line">{summary}</p>
      </div>

      {/* Key points */}
      {keyPoints.length > 0 && (
        <div className="p-4 bg-gray-900 rounded-xl shadow border border-gray-700">
          <h4 className="text-black bg-white inline-block px-2 py-1 rounded font-bold mb-2">
            📌 Key Points
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-gray-200">
            {keyPoints.map((kp, i) => (
              <li key={i} className="leading-snug">{kp}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Full text toggle */}
      {fullText && (
        <details className="p-4 bg-gray-900 rounded-xl shadow border border-gray-700">
          <summary className="cursor-pointer text-black bg-white inline-block px-2 py-1 rounded font-bold">
            📄 Show Full Extracted Text
          </summary>
          <pre className="mt-3 whitespace-pre-wrap text-sm text-gray-200 max-h-72 overflow-auto">
            {fullText}
          </pre>
        </details>
      )}
    </div>
  );
}
