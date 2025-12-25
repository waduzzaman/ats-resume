"use client";

import { useEffect, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDF from "@/components/ResumePDF";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  const [resumeData, setResumeData] = useState<any>(null);
  const [atsResult, setAtsResult] = useState<any>(null);

  useEffect(() => {
    const resume = sessionStorage.getItem("atsResumeData");
    const result = sessionStorage.getItem("atsResult");

    if (resume) setResumeData(JSON.parse(resume));
    if (result) setAtsResult(JSON.parse(result));
  }, []);

  if (!resumeData || !atsResult) {
    return (
      <p className="text-center mt-20 text-slate-600 dark:text-slate-300">
        Loading...
      </p>
    );
  }

  return (
    <main
      className="
        max-w-3xl mx-auto px-4 sm:px-6 py-16
        text-slate-800 dark:text-slate-200
        transition-colors
      "
    >
      {/* Success Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-3 text-emerald-600 dark:text-emerald-400">
          Payment Successful 🎉
        </h1>
        <p className="text-slate-600 dark:text-slate-300">
          Your full ATS analysis and optimized resume are unlocked.
        </p>
      </div>

      {/* ATS Summary */}
      <div
        className="
          rounded-xl shadow p-6 mb-8
          bg-white dark:bg-gray-800
          transition-colors
        "
      >
        <h2 className="text-xl font-semibold mb-4">
          ATS Analysis Summary
        </h2>

        <p className="mb-3">
          <span className="font-medium">ATS Score:</span>{" "}
          <span className="font-bold text-emerald-600 dark:text-emerald-400">
            {atsResult.score}%
          </span>
        </p>

        {/* Matched Keywords */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Matched Keywords</h3>
          <div className="flex flex-wrap gap-2">
            {atsResult.matched.map((word: string, i: number) => (
              <span
                key={i}
                className="
                  px-3 py-1 rounded-full text-sm
                  bg-emerald-100 text-emerald-700
                  dark:bg-emerald-900 dark:text-emerald-300
                "
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Missing Keywords */}
        <div>
          <h3 className="font-semibold mb-2">Missing Keywords</h3>
          <div className="flex flex-wrap gap-2">
            {atsResult.missing.map((word: string, i: number) => (
              <span
                key={i}
                className="
                  px-3 py-1 rounded-full text-sm
                  bg-red-100 text-red-700
                  dark:bg-red-900 dark:text-red-300
                "
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Download PDF */}
      <div className="text-center">
        <PDFDownloadLink
          document={
            <ResumePDF
              name={resumeData.name || "Your Name"}
              resumeText={resumeData.text}
              missingKeywords={atsResult.missing}
            />
          }
          fileName="ATS_Optimized_Resume.pdf"
        >
          {({ loading }) => (
            <Button className="px-8 py-3 text-lg">
              {loading
                ? "Preparing PDF..."
                : "Download ATS-Optimized Resume"}
            </Button>
          )}
        </PDFDownloadLink>
      </div>
    </main>
  );
}
