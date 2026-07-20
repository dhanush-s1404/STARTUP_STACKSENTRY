"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { searchBlogPosts, blogPosts } from "@/data/blog";
import type { BlogPost } from "@/data/blog";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<BlogPost[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length >= 2) {
      setResults(searchBlogPosts(query));
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const popularTags = Array.from(new Set(blogPosts.flatMap((p) => p.tags))).slice(0, 8);

  return (
    <div ref={panelRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          placeholder="Search articles..."
          className={cn(
            "w-full rounded-xl border bg-white/[0.03] pl-11 pr-10 py-3 text-sm text-white placeholder:text-white/30",
            "border-white/[0.06] focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/20",
            "transition-all"
          )}
        />
        {query && (
          <button
            onClick={() => { setQuery(""); setResults([]); setIsOpen(false); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-white/[0.06] bg-[hsl(230,63%,5%)] backdrop-blur-xl shadow-2xl z-50 overflow-hidden">
          {results.length > 0 ? (
            <div className="max-h-80 overflow-y-auto">
              <div className="px-4 py-2 text-xs text-white/30 font-medium">Results ({results.length})</div>
              {results.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-start gap-3 px-4 py-3 hover:bg-white/[0.03] transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{post.title}</p>
                    <p className="text-xs text-white/40 truncate">{post.excerpt}</p>
                  </div>
                  <span className="text-xs text-white/30 shrink-0">{post.category}</span>
                </Link>
              ))}
            </div>
          ) : query.length >= 2 ? (
            <div className="px-4 py-8 text-center text-sm text-white/30">
              No articles found for "{query}"
            </div>
          ) : null}

          <div className="border-t border-white/[0.06] px-4 py-3">
            <p className="text-xs text-white/30 mb-2">Popular tags</p>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => setIsOpen(false)}
                  className="rounded-md bg-white/[0.03] px-2.5 py-1 text-xs text-white/40 hover:text-white/60 hover:bg-white/[0.06] border border-white/[0.06] transition-all"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
