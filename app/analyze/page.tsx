"use client";

import { useEffect, useState } from "react";

interface ATSResult {
  score: number;
  matched: string[];
  missing: string[];
}
function isATSResult(data: unknown): data is ATSResult {
  if (typeof data !== "object" || data === null) return false;

  const d = data as {
    score?: unknown;
    matched?: unknown;
    missing?: unknown;
  };

  return (
    typeof d.score === "number" &&
    Array.isArray(d.matched) &&
    Array.isArray(d.missing)
  );
}

export default function AnalyzePage() {
  const [atsResult, setAtsResult] = useState<ATSResult | null>(null);
  const [hasPaid, setHasPaid] = useState<boolean>(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("atsResult");

    let parsedResult: ATSResult | null = null;

    if (stored) {
      try {
        const parsed: unknown = JSON.parse(stored);
        if (isATSResult(parsed)) {
          parsedResult = parsed;
        }
      } catch {
        parsedResult = null;
      }
    }

    setAtsResult(parsedResult);
    setHasPaid(sessionStorage.getItem("hasPaid") === "true");
  }, []);

  if (!atsResult) {
    return (
      <p className="text-center mt-10 text-slate-600 dark:text-slate-300">
        Loading analysis...
      </p>
    );
  }

  const { matched, missing, score } = atsResult;
  const previewMissing = missing.slice(0, 3);

  return (
    <div className="max-w-2xl mx-auto p-6 mt-8 rounded-xl shadow bg-white dark:bg-gray-800">
      <h2 className="text-2xl font-semibold mb-4">ATS Match Analysis</h2>

      <p className="mb-4 text-lg">
        ATS Score: <span className="font-bold">{score}%</span>
      </p>

      <h3 className="font-semibold mb-2">
        Matched Keywords ({matched.length})
      </h3>

      <div className="flex flex-wrap gap-2 mb-6">
        {matched.map((k) => (
          <span key={k} className="px-3 py-1 rounded-full bg-emerald-100">
            {k}
          </span>
        ))}
      </div>

      <h3 className="font-semibold mb-2">
        Missing Keywords ({missing.length})
      </h3>

      <div className="flex flex-wrap gap-2">
        {(hasPaid ? missing : previewMissing).map((k) => (
          <span key={k} className="px-3 py-1 rounded-full bg-red-100">
            {k}
          </span>
        ))}
      </div>
    </div>
  );
}
