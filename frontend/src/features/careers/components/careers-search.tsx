"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { cn } from "@/lib/cn";
import { MotionDiv, AnimatePresence } from "@/lib/motion";
import { useClickOutside, useDebounce, useLocalStorage } from "@/hooks";
import { SearchInput } from "@/components/ui/search-input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Clock,
  TrendingUp,
  X,
  MapPin,
  Code2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { DEPARTMENTS, LOCATIONS, searchJobs } from "@/data/careers";

const TRENDING_SKILLS = [
  "React",
  "TypeScript",
  "Python",
  "Kubernetes",
  "LLM",
  "PyTorch",
  "Next.js",
  "AWS",
  "Terraform",
  "PostgreSQL",
];

const QUICK_FILTERS = [
  { label: "Remote", icon: MapPin, query: "remote" },
  { label: "Engineering", icon: Code2, query: "engineering" },
  { label: "AI/ML", icon: Sparkles, query: "machine learning" },
];

const MAX_RECENT = 8;

type CareersSearchProps = {
  onSearch: (query: string) => void;
  onFilterSelect?: (type: string, value: string) => void;
  className?: string;
};

export function CareersSearch({ onSearch, onFilterSelect, className }: CareersSearchProps) {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>(
    "stacksentry-recent-job-searches",
    [],
  );
  const [isFocused, setIsFocused] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const containerRef = useClickOutside<HTMLDivElement>(() => setIsFocused(false));
  const inputRef = useRef<HTMLInputElement>(null);

  const searchResults = useMemo(() => {
    if (!debouncedQuery || debouncedQuery.length < 2) return [];
    return searchJobs(debouncedQuery).slice(0, 5);
  }, [debouncedQuery]);

  const departmentSuggestions = useMemo(() => {
    if (!debouncedQuery || debouncedQuery.length < 2) return [];
    const q = debouncedQuery.toLowerCase();
    return DEPARTMENTS.filter((d) => d.name.toLowerCase().includes(q)).slice(0, 3);
  }, [debouncedQuery]);

  const locationSuggestions = useMemo(() => {
    if (!debouncedQuery || debouncedQuery.length < 2) return [];
    const q = debouncedQuery.toLowerCase();
    return LOCATIONS.filter(
      (l) => l.name.toLowerCase().includes(q) || l.city.toLowerCase().includes(q),
    ).slice(0, 3);
  }, [debouncedQuery]);

  const showSuggestions = isFocused && (debouncedQuery?.length >= 2 || recentSearches.length > 0);

  const handleSubmit = useCallback(
    (value: string) => {
      if (value.trim()) {
        onSearch(value.trim());
        setRecentSearches((prev) => {
          const filtered = prev.filter((s) => s !== value.trim());
          return [value.trim(), ...filtered].slice(0, MAX_RECENT);
        });
        setIsFocused(false);
        inputRef.current?.blur();
      }
    },
    [onSearch, setRecentSearches],
  );

  const handleClearRecent = useCallback(() => {
    setRecentSearches([]);
  }, [setRecentSearches]);

  const handleRemoveRecent = useCallback(
    (term: string) => {
      setRecentSearches((prev) => prev.filter((s) => s !== term));
    },
    [setRecentSearches],
  );

  const selectSuggestion = useCallback(
    (value: string) => {
      setQuery(value);
      handleSubmit(value);
    },
    [handleSubmit],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !isFocused && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFocused]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <SearchInput
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onSearch={handleSubmit}
        onClear={() => {
          setQuery("");
          onSearch("");
        }}
        onFocus={() => setIsFocused(true)}
        placeholder='Search jobs, skills, or departments... (Press "/" to focus)'
      />

      <AnimatePresence>
        {showSuggestions && (
          <MotionDiv
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full z-50 mt-2"
          >
            <Card padding="none" hover={false} className="overflow-hidden">
              {/* Recent Searches */}
              {debouncedQuery.length < 2 && recentSearches.length > 0 && (
                <div className="p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs font-medium text-white/40">
                      <Clock className="h-3 w-3" />
                      Recent Searches
                    </span>
                    <button
                      onClick={handleClearRecent}
                      className="text-xs text-white/30 transition-colors hover:text-white/60"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="space-y-1">
                    {recentSearches.map((term) => (
                      <div
                        key={term}
                        className="group flex items-center justify-between rounded-lg px-3 py-2 transition-colors hover:bg-white/[0.04]"
                      >
                        <button
                          onClick={() => selectSuggestion(term)}
                          className="flex items-center gap-2 text-sm text-white/60 group-hover:text-white/80"
                        >
                          <Clock className="h-3.5 w-3.5 text-white/30" />
                          {term}
                        </button>
                        <button
                          onClick={() => handleRemoveRecent(term)}
                          className="rounded p-1 text-white/20 opacity-0 transition-all hover:text-white/60 group-hover:opacity-100"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending Skills (show when no query) */}
              {debouncedQuery.length < 2 && recentSearches.length === 0 && (
                <div className="p-4">
                  <span className="mb-3 flex items-center gap-2 text-xs font-medium text-white/40">
                    <TrendingUp className="h-3 w-3" />
                    Trending Skills
                  </span>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {TRENDING_SKILLS.map((skill) => (
                      <button
                        key={skill}
                        onClick={() => selectSuggestion(skill)}
                        className="rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-xs text-white/50 transition-all hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-400"
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Search Results */}
              {debouncedQuery.length >= 2 && (
                <div className="p-2">
                  {searchResults.length > 0 ? (
                    <div className="space-y-0.5">
                      <div className="px-3 py-2 text-xs font-medium text-white/30">
                        Jobs
                      </div>
                      {searchResults.map((job) => (
                        <button
                          key={job.id}
                          onClick={() => {
                            onSearch(job.title);
                            setRecentSearches((prev) => {
                              const filtered = prev.filter((s) => s !== job.title);
                              return [job.title, ...filtered].slice(0, MAX_RECENT);
                            });
                            setIsFocused(false);
                          }}
                          className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-white/[0.04]"
                        >
                          <div>
                            <p className="text-sm font-medium text-white/80">{job.title}</p>
                            <p className="mt-0.5 text-xs text-white/40">
                              {job.departmentSlug.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}{" "}
                              &middot; {job.locationSlug.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                            </p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-white/20" />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="px-3 py-6 text-center text-sm text-white/30">
                      No results for &quot;{debouncedQuery}&quot;
                    </div>
                  )}

                  {/* Department Suggestions */}
                  {departmentSuggestions.length > 0 && (
                    <div className="mt-2 border-t border-white/[0.04] p-2">
                      <div className="px-3 py-2 text-xs font-medium text-white/30">
                        Departments
                      </div>
                      {departmentSuggestions.map((dept) => (
                        <button
                          key={dept.id}
                          onClick={() => onFilterSelect?.("department", dept.slug)}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-white/[0.04]"
                        >
                          <Code2 className="h-4 w-4 text-white/30" />
                          <span className="text-sm text-white/60">{dept.name}</span>
                          <Badge variant="default" size="sm" className="ml-auto">
                            {dept.headCount}
                          </Badge>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Location Suggestions */}
                  {locationSuggestions.length > 0 && (
                    <div className="border-t border-white/[0.04] p-2">
                      <div className="px-3 py-2 text-xs font-medium text-white/30">
                        Locations
                      </div>
                      {locationSuggestions.map((loc) => (
                        <button
                          key={loc.id}
                          onClick={() => onFilterSelect?.("location", loc.slug)}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-white/[0.04]"
                        >
                          <MapPin className="h-4 w-4 text-white/30" />
                          <span className="text-sm text-white/60">{loc.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </Card>
          </MotionDiv>
        )}
      </AnimatePresence>

      {/* Quick Filter Chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        {QUICK_FILTERS.map((filter) => (
          <button
            key={filter.label}
            onClick={() => selectSuggestion(filter.query)}
            className="flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-xs text-white/40 transition-all hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-400"
          >
            <filter.icon className="h-3 w-3" />
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}
