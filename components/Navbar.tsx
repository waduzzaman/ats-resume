"use client";

import { useState } from "react";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link
            href="/"
            className="text-emerald-600 dark:text-emerald-400 font-bold text-xl sm:text-2xl"
          >
            ATS Converter
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-slate-700 dark:text-slate-300 hover:text-emerald-600"
            >
              Home
            </Link>

            <Link
              href="/analyze"
              className="text-slate-700 dark:text-slate-300 hover:text-emerald-600"
            >
              Analysis
            </Link>

            <ModeToggle />

            {/* <Link
              href="/pay"
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
            >
              Unlock Full Scan
            </Link> */}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <ModeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              {isOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-md px-4 pt-2 pb-4 space-y-2 transition-colors">
          <Link
            href="/"
            className="block text-slate-700 dark:text-slate-300 hover:text-emerald-600"
          >
            Home
          </Link>
          <Link
            href="/analyze"
            className="block text-slate-700 dark:text-slate-300 hover:text-emerald-600"
          >
            Analysis
          </Link>
          {/* <Link
            href="/pay"
            className="block bg-emerald-600 text-white text-center px-4 py-2 rounded-lg hover:bg-emerald-700"
          >
            Unlock Full Scan
          </Link> */}
        </div>
      )}
    </nav>
  );
}
