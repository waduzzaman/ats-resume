"use client";

import { Button } from "@/components/ui/button";

export default function PayPage() {
  const handleCheckout = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <div
      className="
        min-h-screen flex items-center justify-center
        bg-slate-50 dark:bg-gray-900
        transition-colors
      "
    >
      <div
        className="
          p-8 rounded-xl shadow max-w-md w-full
          bg-white dark:bg-gray-800
          text-slate-800 dark:text-slate-200
          transition-colors
        "
      >
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Unlock Full ATS Report
        </h1>

        <ul className="text-sm mb-6 space-y-2 text-slate-600 dark:text-slate-300">
          <li>✅ Full missing keywords</li>
          <li>✅ ATS-optimized PDF download</li>
          <li>✅ Unlimited resume scans</li>
        </ul>

        <Button onClick={handleCheckout} className="w-full">
          Pay $5 & Unlock
        </Button>

        <p className="text-xs mt-4 text-center text-slate-500 dark:text-slate-400">
          One-time payment. No subscription.
        </p>
      </div>
    </div>
  );
}
