"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AlertTriangle, Home, RefreshCw, Mail } from "lucide-react";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#050816] text-white antialiased">
        <main className="flex min-h-screen items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-lg text-center"
          >
            <div className="relative mb-8">
              <div className="absolute inset-0 animate-glow-pulse-blue rounded-full bg-red-500/10 blur-3xl" />
              <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-red-500/20 bg-red-500/5 backdrop-blur-sm">
                <AlertTriangle className="h-10 w-10 text-red-400" />
              </div>
            </div>

            <h1 className="mb-3 text-3xl font-bold">Something Went Wrong</h1>
            <p className="mb-4 text-lg text-white/50">
              An unexpected error occurred. Our team has been notified.
            </p>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => reset()}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/10"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </button>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40"
              >
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
            </div>

            <p className="mt-8 text-xs text-white/20">
              If this persists, please{" "}
              <a
                href="mailto:support@stacksentry.com"
                className="text-blue-400 hover:text-blue-300"
              >
                contact support
              </a>
              {" "}<Mail className="inline h-3 w-3" /> with the error details.
            </p>
          </motion.div>
        </main>
      </body>
    </html>
  );
}
