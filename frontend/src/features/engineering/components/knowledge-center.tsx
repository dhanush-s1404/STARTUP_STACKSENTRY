"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Clock, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs } from "@/components/ui/tabs";
import { FadeIn } from "@/components/ui/fade-in";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import {
  KNOWLEDGE_ARTICLES,
  type KnowledgeArticleData,
} from "@/data/knowledge-articles";

const KNOWLEDGE_CATEGORIES = [...new Set(KNOWLEDGE_ARTICLES.map((a) => a.category))];

const CATEGORY_BADGE: Record<string, "blue" | "purple" | "cyan" | "green" | "amber"> = {
  "Architecture Guides": "purple",
  "Technology Insights": "blue",
  "Security Tips": "green",
  "Performance": "cyan",
};

export function KnowledgeCenter() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = useMemo(() => {
    let results = KNOWLEDGE_ARTICLES;
    if (activeCategory !== "All") {
      results = results.filter((a) => a.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    return results;
  }, [activeCategory, searchQuery]);

  const tabItems = [
    { id: "All", label: "All" },
    ...KNOWLEDGE_CATEGORIES.map((cat) => ({ id: cat, label: cat })),
  ];

  return (
    <Section id="knowledge" padding="lg" background="gradient">
      <Container>
        <FadeIn direction="up">
          <Heading
            level="h2"
            gradient
            description="Technical articles, guides, and deep dives from our engineering team."
            className="mb-8"
          >
            Knowledge Center
          </Heading>
        </FadeIn>

        <FadeIn direction="up" delay={0.1}>
          <div className="relative mx-auto mb-8 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input
              type="search"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/40 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/25"
            />
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.15}>
          <Tabs
            items={tabItems}
            variant="pills"
            activeTab={activeCategory}
            onTabChange={setActiveCategory}
            className="mb-10"
          />
        </FadeIn>

        <Stagger staggerChildren={0.08} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <StaggerItem key={article.slug}>
              <ArticleCard article={article} />
            </StaggerItem>
          ))}
        </Stagger>

        {filteredArticles.length === 0 && (
          <div className="py-16 text-center text-white/40">
            No articles match your search.
          </div>
        )}
      </Container>
    </Section>
  );
}

function ArticleCard({ article }: { article: KnowledgeArticleData }) {
  return (
    <Link href={`/knowledge/${article.slug}`} className="block h-full">
      <Card glass hover glow="blue" padding="md" className="group flex h-full flex-col">
        <div className="flex items-center gap-2">
          <Badge variant={CATEGORY_BADGE[article.category] || "default"} size="sm">
            {article.category}
          </Badge>
          <span className="flex items-center gap-1 text-xs text-white/40">
            <Clock className="h-3 w-3" />
            {article.readTime}
          </span>
        </div>

        <h3 className="mt-3 font-semibold text-white transition-colors group-hover:text-blue-400">
          {article.title}
        </h3>

        <p className="mt-2 flex-1 text-sm text-white/50 leading-relaxed">{article.excerpt}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="default" size="sm">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-1 text-sm text-blue-400 opacity-0 transition-opacity group-hover:opacity-100">
          Read Article
          <ArrowRight className="h-3 w-3" />
        </div>
      </Card>
    </Link>
  );
}
