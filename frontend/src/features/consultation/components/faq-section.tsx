"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";
import { cn } from "@/lib/cn";
import { FAQ_ITEMS, searchFAQ, getFAQByCategory } from "@/data/faq";
import type { FAQCategory } from "@/data/faq";

const CATEGORIES: { value: FAQCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "process", label: "Process" },
  { value: "pricing", label: "Pricing" },
  { value: "timeline", label: "Timeline" },
  { value: "technology", label: "Technology" },
  { value: "general", label: "General" },
];

export function FAQSection() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<FAQCategory | "all">("all");
  const [open, setOpen] = useState<string | null>(null);

  const items = useMemo(() => {
    if (search) return searchFAQ(search);
    if (category !== "all") return getFAQByCategory(category);
    return FAQ_ITEMS;
  }, [search, category]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: FAQ_ITEMS.length };
    CATEGORIES.slice(1).forEach((c) => {
      counts[c.value] = getFAQByCategory(c.value as FAQCategory).length;
    });
    return counts;
  }, []);

  return (
    <Section padding="lg" background="subtle">
      <Container>
        <div className="mx-auto max-w-4xl">
          <FadeIn>
            <div className="mb-12 text-center">
              <Heading
                level="h2"
                description="Answers to common questions about our consultation process."
              >
                Frequently Asked Questions
              </Heading>
            </div>
          </FadeIn>

          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-10 text-sm text-white placeholder:text-white/30 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Category filter */}
          <FadeIn delay={0.1}>
            <div className="mb-10 flex flex-wrap justify-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => { setCategory(cat.value); setSearch(""); }}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm transition-all",
                    category === cat.value
                      ? "bg-blue-600 text-white"
                      : "border border-white/10 bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70",
                  )}
                >
                  {cat.label}
                  <span className="text-xs opacity-60">({categoryCounts[cat.value]})</span>
                </button>
              ))}
            </div>
          </FadeIn>

          {/* FAQ Items */}
          <div className="space-y-3">
            <AnimatePresence>
              {items.map((item, i) => (
                <motion.div
                  key={item.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                >
                  <Card
                    glass
                    hover={open !== item.slug}
                    className={cn(
                      "cursor-pointer overflow-hidden transition-all",
                      open === item.slug && "border-blue-500/20",
                    )}
                    onClick={() => setOpen(open === item.slug ? null : item.slug)}
                  >
                    <div className="flex items-start justify-between p-5">
                      <div className="flex-1 pr-4">
                        <h3 className="text-base font-medium text-white">{item.question}</h3>
                      </div>
                      <ChevronDown
                        className={cn(
                          "mt-0.5 h-5 w-5 shrink-0 text-white/30 transition-transform",
                          open === item.slug && "rotate-180 text-blue-400",
                        )}
                      />
                    </div>
                    <AnimatePresence>
                      {open === item.slug && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className="border-t border-white/[0.06] px-5 pb-5 pt-4">
                            <p className="text-sm leading-relaxed text-white/60">{item.answer}</p>
                            <div className="mt-3 flex gap-2">
                              <Badge variant="default" size="sm">{item.category}</Badge>
                              {item.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="outline" size="sm">{tag}</Badge>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>

            {items.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-white/40">No questions found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
