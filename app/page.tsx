import UploadForm from "@/components/UploadForm";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 bg-slate-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">
          Fix Your Resume for ATS in 60 Seconds
        </h1>

        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg">
          Upload your resume, compare it with a job description, and get an ATS-optimized version instantly.
        </p>
      </section>

      {/* Upload Form */}
      <section className="w-full max-w-xl">
        <UploadForm />
      </section>
    </main>
  );
}
