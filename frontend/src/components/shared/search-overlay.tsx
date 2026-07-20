"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { useUIStore } from "@/stores";
import { useDebounce } from "@/hooks";
import { SEARCH_ITEMS, TRENDING_SEARCHES } from "@/constants";
import type { SearchItem, SearchHistoryItem } from "@/types";
import {
  Search,
  ArrowUp,
  ArrowDown,
  CornerDownLeft,
  Clock,
  TrendingUp,
  X,
  Brain,
  Cloud,
  BarChart3,
  Shield,
  LayoutDashboard,
  Puzzle,
  Code2,
  BookOpen,
  Newspaper,
  Briefcase,
  Users,
  Info,
  Mail,
  FileText,
  DollarSign,
  Radio,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Brain, Cloud, BarChart3, Shield, LayoutDashboard,
  Puzzle, Code2, BookOpen, Newspaper, Briefcase,
  Users, Info, Mail, FileText, DollarSign, Radio,
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

const panelVariants = {
  hidden: { opacity: 0, scale: 0.96, y: -12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: -8,
    transition: { duration: 0.15 },
  },
};

export function SearchOverlay() {
  const router = useRouter();
  const isOpen = useUIStore((s) => s.isSearchOpen);
  const setOpen = useUIStore((s) => s.setSearchOpen);
  const searchHistory = useUIStore((s) => s.searchHistory);
  const addSearchHistory = useUIStore((s) => s.addSearchHistory);
  const clearSearchHistory = useUIStore((s) => s.clearSearchHistory);

  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showHistory, setShowHistory] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedQuery = useDebounce(query, 150);

  const filteredItems = debouncedQuery
    ? SEARCH_ITEMS.filter((item) => {
        const searchStr = `${item.label} ${item.description || ""}`.toLowerCase();
        return searchStr.includes(debouncedQuery.toLowerCase());
      })
    : [];

  const flatItems = filteredItems;

  const groups = filteredItems.reduce(
    (acc, item) => {
      if (!acc[item.group]) acc[item.group] = [];
      acc[item.group].push(item);
      return acc;
    },
    {} as Record<string, SearchItem[]>,
  );

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setShowHistory(true);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleSelect = useCallback(
    (item: SearchItem) => {
      addSearchHistory(item.label);
      setOpen(false);
      router.push(item.href);
    },
    [addSearchHistory, setOpen, router],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const items = flatItems.length > 0 ? flatItems : [];
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, Math.max(items.length - 1, 0)));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          if (items[selectedIndex]) {
            handleSelect(items[selectedIndex]);
          } else if (debouncedQuery) {
            addSearchHistory(debouncedQuery);
            setOpen(false);
            router.push(`/search?q=${encodeURIComponent(debouncedQuery)}`);
          }
          break;
        case "Escape":
          setOpen(false);
          break;
        case "Backspace":
          if (!query) setShowHistory(true);
          break;
      }
    },
    [flatItems, selectedIndex, debouncedQuery, handleSelect, addSearchHistory, setOpen, router, query],
  );

  const handleHistoryClick = useCallback(
    (item: SearchHistoryItem) => {
      setOpen(false);
      router.push(`/search?q=${encodeURIComponent(item.query)}`);
    },
    [setOpen, router],
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />

          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-x-4 top-[12%] mx-auto max-w-xl"
            role="dialog"
            aria-label="Search"
            aria-modal="true"
          >
            <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[hsl(222,40%,11%)]/95 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-3 border-b border-white/[0.06] px-4">
                <Search className="h-5 w-5 shrink-0 text-white/30" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                    setShowHistory(false);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Search pages, features, docs..."
                  className="flex h-14 flex-1 bg-transparent text-sm text-white placeholder:text-white/20 focus:outline-none"
                  autoComplete="off"
                  spellCheck={false}
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="flex h-6 w-6 items-center justify-center rounded-md text-white/30 hover:bg-white/5 hover:text-white/60"
                    aria-label="Clear search"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
                <kbd className="hidden rounded-md border border-white/[0.06] bg-white/[0.04] px-1.5 py-0.5 text-[10px] text-white/30 sm:inline-block">
                  ESC
                </kbd>
              </div>

              <div className="max-h-80 overflow-y-auto">
                {!query && showHistory && (
                  <div className="p-2">
                    {searchHistory.length > 0 && (
                      <div className="mb-2">
                        <div className="flex items-center justify-between px-3 py-2">
                          <span className="text-xs font-medium text-white/30">Recent</span>
                          <button
                            onClick={clearSearchHistory}
                            className="text-[10px] text-white/20 transition-colors hover:text-white/50"
                          >
                            Clear
                          </button>
                        </div>
                        {searchHistory.map((item) => (
                          <button
                            key={`${item.query}-${item.timestamp}`}
                            onClick={() => handleHistoryClick(item)}
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-white/60 transition-colors hover:bg-white/[0.04] hover:text-white/80"
                          >
                            <Clock className="h-3.5 w-3.5 shrink-0 text-white/20" />
                            <span className="truncate">{item.query}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    <div>
                      <div className="flex items-center gap-2 px-3 py-2">
                        <TrendingUp className="h-3 w-3 text-white/20" />
                        <span className="text-xs font-medium text-white/30">Trending</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 px-3 pb-3">
                        {TRENDING_SEARCHES.map((term) => (
                          <button
                            key={term}
                            onClick={() => {
                              setQuery(term);
                              setShowHistory(false);
                              inputRef.current?.focus();
                            }}
                            className="rounded-full border border-white/[0.06] px-2.5 py-1 text-xs text-white/40 transition-colors hover:border-white/10 hover:bg-white/[0.04] hover:text-white/70"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {flatItems.length === 0 && debouncedQuery ? (
                  <div className="flex flex-col items-center py-10 text-center">
                    <Search className="mb-2 h-6 w-6 text-white/20" />
                    <p className="text-sm text-white/40">No results for &ldquo;{debouncedQuery}&rdquo;</p>
                    <p className="mt-0.5 text-xs text-white/20">Try a different search term</p>
                  </div>
                ) : null}

                {flatItems.length > 0 && (
                  <div className="p-2">
                    {Object.entries(groups).map(([group, groupItems]) => (
                      <div key={group}>
                        <div className="px-3 py-2 text-xs font-medium text-white/30">{group}</div>
                        {groupItems.map((item) => {
                          const globalIndex = flatItems.indexOf(item);
                          const Icon = item.icon ? iconMap[item.icon] : null;
                          return (
                            <button
                              key={item.id}
                              onClick={() => handleSelect(item)}
                              onMouseEnter={() => setSelectedIndex(globalIndex)}
                              className={cn(
                                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                                globalIndex === selectedIndex
                                  ? "bg-white/[0.06] text-white"
                                  : "text-white/60",
                              )}
                            >
                              {Icon && (
                                <div
                                  className={cn(
                                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
                                    globalIndex === selectedIndex
                                      ? "bg-blue-500/10 text-blue-400"
                                      : "bg-white/[0.04] text-white/30",
                                  )}
                                >
                                  <Icon className="h-4 w-4" />
                                </div>
                              )}
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="truncate font-medium">{item.label}</span>
                                  {item.popular && (
                                    <span className="shrink-0 rounded-full bg-blue-500/10 px-1.5 py-0.5 text-[10px] font-medium text-blue-400">
                                      Popular
                                    </span>
                                  )}
                                </div>
                                {item.description && (
                                  <div className="truncate text-xs text-white/30">
                                    {item.description}
                                  </div>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 border-t border-white/[0.06] px-4 py-2.5">
                <div className="flex items-center gap-1 text-xs text-white/30">
                  <ArrowUp className="h-3 w-3" />
                  <ArrowDown className="h-3 w-3" />
                  <span>Navigate</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-white/30">
                  <CornerDownLeft className="h-3 w-3" />
                  <span>Select</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-white/30">
                  <kbd className="rounded border border-white/[0.06] bg-white/[0.04] px-1 py-0 text-[10px]">⌘K</kbd>
                  <span>Toggle</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
