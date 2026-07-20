"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import { SEARCH_ITEMS } from "@/constants";
import {
  Search,
  FileText,
  Newspaper,
  Briefcase,
  MessageCircle,
  Brain,
  Cloud,
  BarChart3,
  Shield,
  LayoutDashboard,
  Puzzle,
  Code2,
  BookOpen,
  Users,
  Info,
  Mail,
  DollarSign,
  Radio,
} from "lucide-react";
import type { SearchItem } from "@/types";

const iconMap: Record<string, React.ElementType> = {
  Brain, Cloud, BarChart3, Shield, LayoutDashboard,
  Puzzle, Code2, BookOpen, Users, Info, Mail,
  FileText, DollarSign, Radio, Briefcase, Newspaper,
};

const popularPages = [
  { title: "Services", href: "/services", icon: FileText },
  { title: "Blog", href: "/blog", icon: Newspaper },
  { title: "Careers", href: "/careers", icon: Briefcase },
  { title: "Contact", href: "/contact", icon: MessageCircle },
];

export default function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [results, setResults] = useState<SearchItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if (q) {
      setQuery(q);
      performSearch(q);
    }
  }, []);

  const performSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setHasSearched(true);
    setSelectedIndex(0);

    setTimeout(() => {
      const filtered = SEARCH_ITEMS.filter((item) => {
        const searchStr = `${item.label} ${item.description || ""} ${item.group}`.toLowerCase();
        return searchStr.includes(searchQuery.toLowerCase());
      });
      setResults(filtered);
      setIsSearching(false);
    }, 200);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query);
    const url = new URL(window.location.href);
    url.searchParams.set("q", query);
    window.history.pushState({}, "", url.toString());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      router.push(results[selectedIndex].href);
    }
  };

  const grouped = results.reduce(
    (acc, item) => {
      if (!acc[item.group]) acc[item.group] = [];
      acc[item.group].push(item);
      return acc;
    },
    {} as Record<string, SearchItem[]>,
  );

  return (
    <main className="min-h-screen pt-32 pb-20">
      <Container size="xl">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <nav className="mb-4 flex items-center gap-2 text-sm text-white/30" aria-label="Breadcrumb">
              <Link href="/" className="transition-colors hover:text-white/60">Home</Link>
              <span>/</span>
              <span className="text-white/50">Search</span>
            </nav>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Search</h1>
            <p className="mt-4 text-lg text-white/50">Find pages, services, and resources across our website.</p>
          </div>

          <form onSubmit={handleSubmit} className="mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (e.target.value.length >= 2) {
                    performSearch(e.target.value);
                  } else {
                    setResults([]);
                    setHasSearched(false);
                  }
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search for anything..."
                className="h-14 w-full rounded-xl border border-white/[0.06] bg-white/[0.03] pl-12 pr-4 text-lg text-white placeholder:text-white/30 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30"
                autoFocus
                aria-label="Search"
              />
            </div>
            <div className="mt-2 flex items-center gap-4 text-xs text-white/20">
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-white/[0.06] bg-white/[0.04] px-1 py-0.5 text-[10px]">&#8593;&#8595;</kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-white/[0.06] bg-white/[0.04] px-1 py-0.5 text-[10px]">&#9166;</kbd>
                Select
              </span>
            </div>
          </form>

          {isSearching && (
            <div className="py-16 text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-blue-500" />
              <p className="mt-4 text-sm text-white/40">Searching...</p>
            </div>
          )}

          {!isSearching && hasSearched && results.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-16 text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/[0.03]">
                <Search className="h-8 w-8 text-white/10" />
              </div>
              <h2 className="mb-2 text-xl font-semibold text-white">No Results Found</h2>
              <p className="mb-6 text-white/40">
                No pages matched &ldquo;{query}&rdquo;. Try a different search term or browse below.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-medium text-white"
              >
                <MessageCircle className="h-4 w-4" />
                Contact Support
              </Link>
            </motion.div>
          )}

          {!isSearching && hasSearched && results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <p className="text-sm text-white/40">{results.length} result{results.length !== 1 ? "s" : ""} found</p>
              {Object.entries(grouped).map(([group, groupItems]) => (
                <div key={group}>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/30">{group}</h3>
                  <div className="space-y-1.5">
                    {groupItems.map((item) => {
                      const globalIndex = results.indexOf(item);
                      const Icon = item.icon ? iconMap[item.icon] : FileText;
                      return (
                        <Link
                          key={item.id}
                          href={item.href}
                          onMouseEnter={() => setSelectedIndex(globalIndex)}
                          className={cn(
                            "flex items-center gap-4 rounded-xl border border-white/[0.06] p-4 transition-all hover:border-white/10 hover:bg-white/[0.04]",
                            globalIndex === selectedIndex ? "border-white/10 bg-white/[0.04]" : "bg-white/[0.02]",
                          )}
                        >
                          <div className={cn(
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors",
                            globalIndex === selectedIndex ? "bg-blue-500/10 text-blue-400" : "bg-white/[0.04] text-white/30",
                          )}>
                            {Icon && <Icon className="h-5 w-5" />}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-medium text-white">{item.label}</h4>
                            {item.description && (
                              <p className="text-sm text-white/40">{item.description}</p>
                            )}
                          </div>
                          <span className="text-xs text-white/20">{item.href}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {!hasSearched && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="mb-4 text-xs font-medium uppercase tracking-wider text-white/30">Popular Pages</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {popularPages.map((page) => {
                  const Icon = page.icon;
                  return (
                    <Link
                      key={page.href}
                      href={page.href}
                      className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-white/50 transition-all hover:border-white/10 hover:bg-white/[0.04] hover:text-white"
                    >
                      <Icon className="h-5 w-5 transition-colors group-hover:text-blue-400" />
                      <span className="text-sm font-medium">{page.title}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-8">
                <p className="mb-4 text-xs font-medium uppercase tracking-wider text-white/30">Quick Links</p>
                <div className="flex flex-wrap gap-2">
                  {["Privacy Policy", "Terms & Conditions", "Cookie Policy", "Accessibility", "Sitemap"].map((label) => {
                    const href = `/${label.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-").replace("policy", "").replace("--", "-").replace(/-$/, "")}`;
                    return (
                      <Link
                        key={label}
                        href={href}
                        className="rounded-full border border-white/[0.06] px-3 py-1.5 text-xs text-white/40 transition-colors hover:border-white/10 hover:text-white/70"
                      >
                        {label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </Container>
    </main>
  );
}
