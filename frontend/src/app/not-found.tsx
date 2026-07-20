"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Search, Home, ArrowLeft, FileText, Newspaper, Briefcase, MessageCircle } from "lucide-react";

const popularPages = [
  { title: "Services", href: "/services", icon: FileText },
  { title: "Blog", href: "/blog", icon: Newspaper },
  { title: "Careers", href: "/careers", icon: Briefcase },
  { title: "Contact", href: "/contact", icon: MessageCircle },
];

export default function NotFound() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="relative mb-8">
            <div className="text-[10rem] font-bold leading-none text-white/[0.03]">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 animate-glow-pulse-blue rounded-full bg-blue-500/20 blur-3xl" />
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm">
                  <Search className="h-10 w-10 text-white/20" />
                </div>
              </div>
            </div>
          </div>

          <h1 className="mb-3 text-3xl font-bold text-white sm:text-4xl">Page Not Found</h1>
          <p className="mb-8 text-lg text-white/50">
            The page you&apos;re looking for doesn&apos;t exist or has been moved to a new location.
          </p>

          <form onSubmit={handleSearch} className="mb-10">
            <div className="relative mx-auto max-w-md">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for pages..."
                className="h-12 w-full rounded-xl border border-white/[0.06] bg-white/[0.03] pl-12 pr-4 text-white placeholder:text-white/30 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30"
                aria-label="Search for pages"
              />
            </div>
          </form>

          <div className="mb-8">
            <p className="mb-4 text-xs font-medium uppercase tracking-wider text-white/30">Popular Pages</p>
            <div className="flex flex-wrap justify-center gap-3">
              {popularPages.map((page) => {
                const Icon = page.icon;
                return (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="group flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-2.5 text-sm text-white/50 transition-all hover:border-white/10 hover:bg-white/[0.05] hover:text-white"
                  >
                    <Icon className="h-4 w-4 transition-colors group-hover:text-blue-400" />
                    {page.title}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </motion.div>
      </Container>
    </main>
  );
}
