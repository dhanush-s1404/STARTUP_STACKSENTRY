"use client";

import { useState, useEffect } from "react";
import { List } from "lucide-react";
import { cn } from "@/lib/cn";

type TocItem = {
  id: string;
  text: string;
  level: number;
};

export function TableOfContents() {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const headings = document.querySelectorAll("article h2, article h3");
    const tocItems: TocItem[] = Array.from(headings).map((h) => ({
      id: h.id || h.textContent?.toLowerCase().replace(/\s+/g, "-") || "",
      text: h.textContent || "",
      level: h.tagName === "H2" ? 2 : 3,
    }));

    setItems(tocItems);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    tocItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  if (items.length === 0) return null;

  return (
    <nav className="space-y-2" aria-label="Table of contents">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-white mb-4">
        <List className="h-4 w-4 text-blue-400" />
        On this page
      </h3>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className={cn(
                "block text-sm transition-all duration-200 rounded-lg px-3 py-1.5",
                item.level === 3 ? "ml-4" : "",
                activeId === item.id
                  ? "text-blue-400 bg-blue-500/10"
                  : "text-white/40 hover:text-white/60 hover:bg-white/[0.03]"
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
