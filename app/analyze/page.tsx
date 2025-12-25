"use client";

import { useEffect, useState } from "react";

interface ATSResult {
  score: number;
  matched: string[];
  missing: string[];
}

export default function AnalyzePage() {
  const [atsResult, setAtsResult] = useState<ATSResult | null>(null);
  const [hasPaid, setHasPaid] = useState<boolean>(false);

  useEffect(() => {
    const result = sessionStorage.getItem("atsResult");
    if (result) {
      setAtsResult(JSON.parse(result) as ATSResult);
    }

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
    <div
      className="
        max-w-2xl mx-auto p-6 mt-8 rounded-xl shadow
        bg-white dark:bg-gray-800
        text-slate-800 dark:text-slate-200
        transition-colors
      "
    >
      <h2 className="text-2xl font-semibold mb-4 text-emerald-600 dark:text-emerald-400">
        ATS Match Analysis
      </h2>

      {/* Score */}
      <p className="mb-4 text-lg">
        ATS Score: <span className="font-bold">{score}%</span>
      </p>

      {/* Matched Keywords */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">
          Matched Keywords ({matched.length})
        </h3>

        <div className="flex flex-wrap gap-2">
          {matched.map((k) => (
            <span
              key={k}
              className="
                px-3 py-1 text-sm rounded-full
                bg-emerald-100 text-emerald-700
                dark:bg-emerald-900 dark:text-emerald-300
              "
            >
              {k}
            </span>
          ))}
        </div>
      </div>

      {/* Missing Keywords */}
      <div className="relative">
        <h3 className="font-semibold mb-2">
          Missing Keywords ({missing.length})
        </h3>

        <div
          className={`flex flex-wrap gap-2 ${
            !hasPaid ? "blur-sm select-none pointer-events-none" : ""
          }`}
        >
          {(hasPaid ? missing : previewMissing).map((k) => (
            <span
              key={k}
              className="
                px-3 py-1 text-sm rounded-full
                bg-red-100 text-red-700
                dark:bg-red-900 dark:text-red-300
              "
            >
              {k}
            </span>
          ))}

          {!hasPaid && (
            <>
              <span className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">
                ???
              </span>
              <span className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">
                ???
              </span>
            </>
          )}
        </div>

        {/* Paywall Overlay */}
        {!hasPaid && (
          <div
            className="
              absolute inset-0 flex items-center justify-center rounded-lg
              bg-white/70 dark:bg-gray-900/80
              backdrop-blur-sm
            "
          >
            <button
              onClick={() => (window.location.href = "/pay")}
              className="
                bg-black dark:bg-white
                text-white dark:text-black
                px-6 py-3 rounded-lg
                transition
              "
            >
              Unlock Full Report + PDF ($5)
            </button>
          </div>
        )}
      </div>

      {/* PDF Download */}
      {hasPaid && (
        <a
          href="/api/download-pdf"
          className="
            block mt-8 text-center px-6 py-3 rounded-lg
            bg-emerald-600 hover:bg-emerald-700
            text-white transition
          "
        >
          Download ATS-Optimized PDF
        </a>
      )}
    </div>
  );
}
