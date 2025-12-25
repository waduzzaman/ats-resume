import "./globals.css";
import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ATS Resume Converter",
  description: "Make your resume ATS-friendly in seconds",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}  text-slate-900 dark:bg-gray-900 dark:text-slate-200 min-h-screen flex flex-col transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Navbar */}
          <Navbar />

          {/* Main content */}
          <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>

          {/* Footer */}
          <footer className="w-full bg-white dark:bg-gray-800 shadow py-4 px-6 sm:px-10 text-xs text-slate-500 dark:text-slate-400 text-center transition-colors duration-300">
            &copy; {new Date().getFullYear()} ATS Resume Converter. All rights
            reserved.
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
