"use client";

import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import { MotionDiv, AnimatePresence } from "@/lib/motion";
import { contactFAQs } from "@/data/contact";

const categories = Array.from(new Set(contactFAQs.map((f) => f.category)));

export function ContactFAQ() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = contactFAQs.filter((faq) => {
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs..."
            className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition-all"
          />
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory("All")}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition-all",
            activeCategory === "All"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
              : "bg-white/[0.03] text-white/50 hover:bg-white/[0.06] border border-white/[0.06]"
          )}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-all",
              activeCategory === cat
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                : "bg-white/[0.03] text-white/50 hover:bg-white/[0.06] border border-white/[0.06]"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((faq, i) => (
            <MotionDiv
              key={faq.question}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: i * 0.03, duration: 0.3 }}
            >
              <Card
                glass
                hover
                padding="md"
                className="cursor-pointer"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div className="flex items-center justify-between gap-4">
                  <h4 className="text-sm font-medium text-white">{faq.question}</h4>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-white/30 shrink-0 transition-transform duration-300",
                      openIndex === i && "rotate-180"
                    )}
                  />
                </div>
                <AnimatePresence>
                  {openIndex === i && (
                    <MotionDiv
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 text-sm text-white/40 leading-relaxed">
                        {faq.answer}
                      </p>
                    </MotionDiv>
                  )}
                </AnimatePresence>
              </Card>
            </MotionDiv>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-white/30 text-sm">
            No FAQs found for your search.
          </div>
        )}
      </div>
    </div>
  );
}
