"use client";

import { useState, useMemo } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { SearchInput } from "@/components/ui/search-input";
import { Tabs } from "@/components/ui/tabs";
import { Accordion } from "@/components/ui/accordion";
import { EmptyState } from "@/components/ui/empty-state";
import { FadeIn } from "@/components/ui/fade-in";
import { FAQS } from "@/data/careers";
import { Search } from "lucide-react";

const ALL_CATEGORY = "All";

export function CareersFaq() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);

  const categories = useMemo(() => {
    const cats = new Set(FAQS.map((faq) => faq.category));
    return [ALL_CATEGORY, ...Array.from(cats)];
  }, []);

  const filteredFaqs = useMemo(() => {
    return FAQS.filter((faq) => {
      const matchesCategory =
        activeCategory === ALL_CATEGORY || faq.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const tabItems = categories.map((cat) => ({
    id: cat,
    label: cat,
  }));

  const accordionItems = filteredFaqs.map((faq) => ({
    id: faq.id,
    title: faq.question,
    content: (
      <div>
        <span className="mb-2 inline-block rounded-full bg-blue-500/10 px-2 py-0.5 text-xs text-blue-400">
          {faq.category}
        </span>
        <p className="mt-1 text-sm leading-relaxed text-[hsl(var(--color-text-tertiary))]">
          {faq.answer}
        </p>
      </div>
    ),
  }));

  return (
    <Section padding="lg" background="gradient">
      <Container>
        <Heading
          level="h2"
          description="Find answers to common questions about working at StackSentry, our hiring process, and employee benefits."
        >
          Frequently Asked Questions
        </Heading>

        <FadeIn delay={0.2}>
          <div className="mx-auto mt-10 max-w-3xl">
            <div className="mb-6">
              <SearchInput
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onSearch={setSearchQuery}
                onClear={() => setSearchQuery("")}
              />
            </div>

            <Tabs
              items={tabItems}
              variant="pills"
              activeTab={activeCategory}
              onTabChange={setActiveCategory}
              className="mb-8"
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mx-auto max-w-3xl">
            {accordionItems.length > 0 ? (
              <Accordion items={accordionItems} type="multiple" />
            ) : (
              <EmptyState
                variant="search"
                icon={<Search className="h-12 w-12" />}
                title="No matching questions found"
                description={`No FAQ results match "${searchQuery}" in the ${activeCategory === ALL_CATEGORY ? "all categories" : activeCategory} category. Try a different search term or category.`}
              />
            )}
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
