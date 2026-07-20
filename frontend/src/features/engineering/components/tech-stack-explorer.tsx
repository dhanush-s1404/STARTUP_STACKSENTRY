"use client";

import { useState, useMemo } from "react";
import {
  Layout,
  Server,
  Database,
  Cloud,
  Brain,
  Settings,
  Search,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs } from "@/components/ui/tabs";
import { FadeIn } from "@/components/ui/fade-in";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { cn } from "@/lib/cn";
import { TECHNOLOGIES, type TechnologyData } from "@/data/technologies";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Frontend: Layout,
  Backend: Server,
  Database: Database,
  Cloud: Cloud,
  "AI/ML": Brain,
  DevOps: Settings,
};

const CATEGORY_COLORS: Record<string, "blue" | "purple" | "cyan" | "green" | "amber"> = {
  Frontend: "blue",
  Backend: "purple",
  Database: "cyan",
  Cloud: "green",
  "AI/ML": "amber",
  DevOps: "purple",
};

const EXPERIENCE_COLORS: Record<string, string> = {
  beginner: "text-white/40",
  intermediate: "text-cyan-400",
  advanced: "text-blue-400",
  expert: "text-purple-400",
};

const ALL_CATEGORIES = ["All", ...Object.keys(CATEGORY_ICONS)];

export function TechStackExplorer() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTechs = useMemo(() => {
    let results = TECHNOLOGIES;
    if (activeCategory !== "All") {
      results = results.filter((t) => t.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.useCases.some((uc) => uc.toLowerCase().includes(q)),
      );
    }
    return results;
  }, [activeCategory, searchQuery]);

  const tabItems = ALL_CATEGORIES.map((cat) => {
    const CatIcon = cat !== "All" ? CATEGORY_ICONS[cat] : undefined;
    return {
      id: cat,
      label: cat,
      icon: CatIcon ? <CatIcon className="h-4 w-4" /> : undefined,
    };
  });

  return (
    <Section id="tech-stack" padding="lg" background="gradient">
      <Container>
        <FadeIn direction="up">
          <Heading
            level="h2"
            gradient
            description="Explore the technologies we use to build production-grade applications."
            className="mb-8"
          >
            Technology Stack Explorer
          </Heading>
        </FadeIn>

        <FadeIn direction="up" delay={0.1}>
          <div className="relative mx-auto mb-8 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input
              type="search"
              placeholder="Search technologies..."
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
          {filteredTechs.map((tech) => (
            <StaggerItem key={tech.slug}>
              <TechCard tech={tech} />
            </StaggerItem>
          ))}
        </Stagger>

        {filteredTechs.length === 0 && (
          <div className="py-16 text-center text-white/40">
            No technologies match your search.
          </div>
        )}
      </Container>
    </Section>
  );
}

function TechCard({ tech }: { tech: TechnologyData }) {
  const Icon = CATEGORY_ICONS[tech.category] || Server;

  return (
    <Card glass hover glow="blue" padding="md" className="group h-full">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5">
            <Icon className="h-5 w-5 text-white/70" />
          </div>
          <div>
            <h3 className="font-semibold text-white">{tech.name}</h3>
            <Badge variant={CATEGORY_COLORS[tech.category] || "default"} size="sm">
              {tech.category}
            </Badge>
          </div>
        </div>
        <span className={cn("text-xs font-medium capitalize", EXPERIENCE_COLORS[tech.experience])}>
          {tech.experience}
        </span>
      </div>

      <p className="mt-3 text-sm text-white/50 leading-relaxed">{tech.description}</p>

      <div className="mt-4 space-y-3">
        <div>
          <span className="text-xs font-medium text-white/40 uppercase tracking-wider">Use Cases</span>
          <ul className="mt-1 space-y-1">
            {tech.useCases.slice(0, 2).map((uc) => (
              <li key={uc} className="flex items-start gap-1.5 text-xs text-white/50">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-blue-400" />
                {uc}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <span className="text-xs font-medium text-white/40 uppercase tracking-wider">Benefits</span>
          <ul className="mt-1 space-y-1">
            {tech.benefits.slice(0, 2).map((b) => (
              <li key={b} className="flex items-start gap-1.5 text-xs text-white/50">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-purple-400" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}
