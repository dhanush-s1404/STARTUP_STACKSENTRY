import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Server Error",
  description: "Something went wrong on our end. Please try again later.",
  robots: { index: false, follow: false },
};

export default function Error500() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <Container>
        <div className="mx-auto max-w-lg text-center">
          <div className="relative mb-8">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-red-500/20 bg-red-500/5">
              <AlertTriangle className="h-10 w-10 text-red-400" />
            </div>
          </div>

          <h1 className="mb-3 text-4xl font-bold text-white">500</h1>
          <h2 className="mb-4 text-2xl font-semibold text-white">Server Error</h2>
          <p className="mb-8 text-lg text-white/50">
            Something went wrong on our end. Our team has been automatically notified and is working on a fix.
          </p>

          <div className="flex items-center justify-center gap-4">
            <a
              href="javascript:location.reload()"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/10"
            >
              Try Again
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40"
            >
              Back to Home
            </Link>
          </div>

          <p className="mt-8 text-sm text-white/30">
            If this persists, please{" "}
            <a
              href="mailto:support@stacksentry.com"
              className="text-blue-400 hover:text-blue-300"
            >
              contact support
            </a>
            .
          </p>
        </div>
      </Container>
    </main>
  );
}
