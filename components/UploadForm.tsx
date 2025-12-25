"use client";

import { useState, useEffect } from "react";
import {
  Upload,
  FileText,
  AlertCircle,
  Loader2,
  Search,
  ShieldCheck,
  Lock,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDesc, setJobDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [freeScans, setFreeScans] = useState(0);
  const [hasPaid, setHasPaid] = useState(false);

  useEffect(() => {
    setFreeScans(Number(sessionStorage.getItem("freeScans") || 0));
    setHasPaid(sessionStorage.getItem("hasPaid") === "true");
  }, []);

  const handleSubmit = async () => {
    setError("");

    if (!file || !jobDesc.trim()) {
      setError("Please upload your resume and paste a job description.");
      return;
    }

    if (freeScans >= 1 && !hasPaid) {
      window.location.href = "/analyze";
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", file);

      const parseRes = await fetch("/api/parse", {
        method: "POST",
        body: formData,
      });

      if (!parseRes.ok) throw new Error();

      const parsed = await parseRes.json();

      const keywordRes = await fetch("/api/keywords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText: parsed.text,
          jobDescription: jobDesc,
        }),
      });

      if (!keywordRes.ok) throw new Error();

      const keywordData = await keywordRes.json();

      sessionStorage.setItem(
        "atsResult",
        JSON.stringify({
          score: keywordData.score,
          matched: keywordData.matched,
          missing: keywordData.missing,
        })
      );

      sessionStorage.setItem(
        "atsResumeData",
        JSON.stringify({
          name: extractName(parsed.text),
          text: parsed.text,
        })
      );

      if (!hasPaid) {
        sessionStorage.setItem("freeScans", (freeScans + 1).toString());
      }

      window.location.href = "/analyze";
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow max-w-xl w-full mx-auto mt-8 transition-colors duration-300">
      <h2 className="text-xl font-semibold mb-4 text-emerald-600 dark:text-emerald-400 text-center">
        Upload Resume for ATS Scan
      </h2>

      {/* Error */}
      {error && (
        <p className="mb-4 text-red-600 dark:text-red-400 text-sm flex items-center justify-center gap-2">
          <AlertCircle size={16} />
          {error}
        </p>
      )}

      {/* File Upload */}
      <div className="mb-4">
        <input
          id="resume-upload"
          type="file"
          accept=".pdf,.docx"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="hidden"
        />

        <label
          htmlFor="resume-upload"
          className={`flex items-center justify-center gap-2 cursor-pointer
            border-2 border-dashed rounded-lg px-4 py-4 text-sm font-medium
            transition
            ${
              error && !file
                ? "border-red-400 text-red-600 dark:border-red-500 dark:text-red-400"
                : "border-emerald-400 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-400 dark:hover:bg-emerald-700"
            }`}
        >
          <Upload size={18} />
          <span className="text-gray-500 dark:text-gray-300">Choose Resume File</span>
        </label>

        <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 text-center flex items-center justify-center gap-1">
          <FileText size={14} />
          {file ? file.name : "No file selected"}
        </p>

        {file && (
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>
        )}
      </div>

      {/* Job Description */}
      <textarea
        placeholder="Paste the job description here..."
        className="w-full border rounded-lg p-3 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:bg-gray-700 dark:text-slate-200 dark:border-gray-600"
        rows={6}
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
      />

      <Button onClick={handleSubmit} disabled={loading} className="w-full">
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="animate-spin" size={18} />
            Analyzing Resume...
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <Search size={18} />
            Analyze Resume
          </div>
        )}
      </Button>

      {/* Freemium Notice */}
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 text-center flex items-center justify-center gap-1">
        {hasPaid ? <ShieldCheck size={14} /> : <Lock size={14} />}
        First scan is free. PDF download and repeated scans require payment.
      </p>
    </div>
  );
}

/* ------------------------- Simple Name Extractor ------------------------- */
function extractName(text: string): string {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  return lines[0] || "Your Name";
}
