"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { FadeIn } from "@/components/ui/fade-in";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { cn } from "@/lib/cn";
import {
  Database, Server, Cloud, Cpu,
  Code2, Workflow, BrainCircuit, Container as ContainerIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type TechItem = {
  name: string;
  category: string;
  description: string;
  experience: "expert" | "advanced" | "proficient";
};

const technologies: TechItem[] = [
  { name: "React", category: "Frontend", description: "UI component library for modern web apps", experience: "expert" },
  { name: "Next.js", category: "Frontend", description: "React framework with SSR and static generation", experience: "expert" },
  { name: "TypeScript", category: "Frontend", description: "Typed JavaScript for scalable codebases", experience: "expert" },
  { name: "Tailwind CSS", category: "Frontend", description: "Utility-first CSS framework", experience: "expert" },
  { name: "Node.js", category: "Backend", description: "JavaScript runtime for server-side apps", experience: "expert" },
  { name: "Python", category: "Backend", description: "General-purpose language for AI and backend", experience: "expert" },
  { name: "Go", category: "Backend", description: "High-performance compiled language", experience: "advanced" },
  { name: "Rust", category: "Backend", description: "Systems programming with memory safety", experience: "advanced" },
  { name: "PostgreSQL", category: "Database", description: "Relational database with advanced features", experience: "expert" },
  { name: "MongoDB", category: "Database", description: "NoSQL document database", experience: "expert" },
  { name: "Redis", category: "Database", description: "In-memory data structure store", experience: "expert" },
  { name: "TensorFlow", category: "AI/ML", description: "ML framework for production deployments", experience: "expert" },
  { name: "PyTorch", category: "AI/ML", description: "Dynamic ML framework for research", experience: "expert" },
  { name: "LangChain", category: "AI/ML", description: "Framework for LLM-powered applications", experience: "advanced" },
  { name: "AWS", category: "Cloud", description: "Cloud computing platform", experience: "expert" },
  { name: "Azure", category: "Cloud", description: "Microsoft cloud platform", experience: "advanced" },
  { name: "GCP", category: "Cloud", description: "Google Cloud Platform", experience: "advanced" },
  { name: "Docker", category: "DevOps", description: "Container runtime", experience: "expert" },
  { name: "Kubernetes", category: "DevOps", description: "Container orchestration platform", experience: "expert" },
  { name: "Terraform", category: "DevOps", description: "Infrastructure as code tool", experience: "advanced" },
  { name: "GitHub Actions", category: "DevOps", description: "CI/CD automation platform", experience: "expert" },
  { name: "GraphQL", category: "API", description: "API query language", experience: "expert" },
  { name: "gRPC", category: "API", description: "High-performance RPC framework", experience: "advanced" },
  { name: "REST", category: "API", description: "Architectural style for APIs", experience: "expert" },
];

const categories = Array.from(new Set(technologies.map((t) => t.category)));
const iconMap: Record<string, LucideIcon> = {
  Frontend: Code2,
  Backend: Server,
  Database: Database,
  "AI/ML": BrainCircuit,
  Cloud: Cloud,
  DevOps: ContainerIcon,
  API: Workflow,
};

export function ServiceTechShowcase() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = technologies.filter((t) => {
    const matchesCategory = activeCategory === "All" || t.category === activeCategory;
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Section id="technology" padding="lg" background="gradient">
      <Container>
        <Heading
          level="h2"
          description="Modern tools and frameworks powering our solutions"
          className="mb-12"
        >
          Technology Showcase
        </Heading>

        <FadeIn delay={0.1}>
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveCategory("All")}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm transition-all",
                activeCategory === "All"
                  ? "bg-blue-600 text-white"
                  : "border border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
              )}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm transition-all",
                  activeCategory === cat
                    ? "bg-blue-600 text-white"
                    : "border border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="relative mb-8">
            <input
              type="text"
              placeholder="Search technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex h-10 w-full max-w-xs rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/25"
            />
          </div>
        </FadeIn>

        <Stagger staggerChildren={0.03} className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {filtered.map((tech) => {
            const Icon = iconMap[tech.category] || Cpu;
            const experienceBars = tech.experience === "expert" ? 3 : tech.experience === "advanced" ? 2 : 1;
            return (
              <StaggerItem key={tech.name}>
                <div className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 transition-all duration-200 hover:border-blue-500/20 hover:bg-white/[0.04] hover:shadow-lg sm:p-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 sm:h-10 sm:w-10">
                      <Icon className="h-4 w-4 text-blue-400 sm:h-5 sm:w-5" />
                    </div>
                    <h3 className="mt-2 text-xs font-semibold text-white sm:text-sm">
                      {tech.name}
                    </h3>
                    <span className="mt-0.5 text-[10px] text-white/30">{tech.category}</span>
                    <div className="mt-2 flex gap-0.5">
                      {[1, 2, 3].map((bar) => (
                        <div
                          key={bar}
                          className={cn(
                            "h-1 w-3 rounded-full",
                            bar <= experienceBars ? "bg-blue-400" : "bg-white/10"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        {filtered.length === 0 && (
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-12 text-center">
            <p className="text-white/40">No technologies found matching your search.</p>
          </div>
        )}
      </Container>
    </Section>
  );
}
