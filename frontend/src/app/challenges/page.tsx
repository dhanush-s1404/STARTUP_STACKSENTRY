"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { AlertTriangle, Search, Filter, ArrowRight, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CHALLENGES } from "@/data/challenges";

const impactColors: Record<string, "amber" | "default" | "outline"> = {
  Critical: "amber",
  High: "default",
  Medium: "outline",
} as const;

const CATEGORIES = Array.from(new Set(CHALLENGES.map((c) => c.category))).sort();

export default function ChallengesPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return CHALLENGES.filter((c) => {
      if (selectedCategory && c.category !== selectedCategory) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.symptoms.some((s) => s.toLowerCase().includes(q)) ||
          c.solutions.some((s) => s.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [search, selectedCategory]);

  return (
    <main className="flex-1 pt-16">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Business Challenges" }]} />

      {/* Hero */}
      <Section padding="lg" background="gradient">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-medium text-amber-300">Business Challenges Library</span>
              </div>
              <Heading
                level="h1"
                description="Every business has pain points. We turn them into opportunities with modern software solutions."
              >
                Identify & Solve Your Business Challenges
              </Heading>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Filters */}
      <Section padding="md" background="subtle">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                placeholder="Search challenges, symptoms, solutions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
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
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  !selectedCategory
                    ? "bg-amber-500/20 text-amber-300"
                    : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70"
                }`}
              >
                <Filter className="h-3.5 w-3.5" />
                All
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    selectedCategory === cat
                      ? "bg-amber-500/20 text-amber-300"
                      : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Grid */}
      <Section padding="lg">
        <Container>
          <Stagger staggerChildren={0.05}>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((challenge) => (
                <StaggerItem key={challenge.slug}>
                  <Link href={`/challenges/${challenge.slug}`}>
                    <Card glass hover glow="none" className="group flex h-full flex-col">
                      <div className="mb-4 flex items-start justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 transition-colors group-hover:bg-amber-500/20">
                          <AlertTriangle className="h-5 w-5 text-amber-400" />
                        </div>
                        <Badge variant={impactColors[challenge.impact] ?? "default"} size="sm">
                          {challenge.impact}
                        </Badge>
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-white transition-colors group-hover:text-amber-300">
                        {challenge.title}
                      </h3>
                      <p className="mb-4 flex-1 text-sm leading-relaxed text-white/50">
                        {challenge.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="default" size="sm">
                          {challenge.category}
                        </Badge>
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-400 opacity-0 transition-all group-hover:opacity-100">
                          Explore Solution <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </Card>
                  </Link>
                </StaggerItem>
              ))}
            </div>
          </Stagger>

          {filtered.length === 0 && (
            <FadeIn>
              <div className="py-20 text-center">
                <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-white/20" />
                <p className="text-lg font-medium text-white/40">No challenges match your search</p>
                <p className="mt-1 text-sm text-white/30">Try different keywords or clear the filters</p>
              </div>
            </FadeIn>
          )}
        </Container>
      </Section>
    </main>
  );
}
