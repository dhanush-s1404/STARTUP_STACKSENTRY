"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { FadeIn } from "@/components/ui/fade-in";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { cn } from "@/lib/cn";
import {
  Database,
  Server,
  Cloud,
  Cpu,
  Code2,
  Workflow,
  BrainCircuit,
  Container as ContainerIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const categoryMap: Record<string, string> = {
  React: "Frontend",
  "Next.js": "Frontend",
  "React Native": "Frontend",
  Vue: "Frontend",
  Flutter: "Frontend",
  TypeScript: "Frontend",
  "Tailwind CSS": "Frontend",
  "Node.js": "Backend",
  Python: "Backend",
  Java: "Backend",
  Go: "Backend",
  Rust: "Backend",
  Django: "Backend",
  FastAPI: "Backend",
  NestJS: "Backend",
  "Express.js": "Backend",
  "Spring Boot": "Backend",
  PostgreSQL: "Database",
  MongoDB: "Database",
  Redis: "Database",
  Elasticsearch: "Database",
  Cassandra: "Database",
  ClickHouse: "Database",
  AWS: "Cloud",
  Azure: "Cloud",
  GCP: "Cloud",
  Docker: "DevOps",
  Kubernetes: "DevOps",
  Terraform: "DevOps",
  "GitHub Actions": "DevOps",
  GraphQL: "API",
  gRPC: "API",
  REST: "API",
  TensorFlow: "AI/ML",
  PyTorch: "AI/ML",
  LangChain: "AI/ML",
  "OpenAI": "AI/ML",
  "AI/ML": "AI/ML",
  FHIR: "Healthcare",
  HIPAA: "Healthcare",
  IoT: "Hardware",
  Blockchain: "Security",
  RabbitMQ: "Infrastructure",
  Kafka: "Infrastructure",
};

const categoryIcons: Record<string, LucideIcon> = {
  Frontend: Code2,
  Backend: Server,
  Database: Database,
  Cloud: Cloud,
  DevOps: ContainerIcon,
  API: Workflow,
  "AI/ML": BrainCircuit,
  Healthcare: Cpu,
  Hardware: Cpu,
  Security: Cpu,
  Infrastructure: Server,
};

const experienceLevels: Record<string, "expert" | "advanced" | "proficient"> = {
  React: "expert",
  "Next.js": "expert",
  TypeScript: "expert",
  "Node.js": "expert",
  Python: "expert",
  PostgreSQL: "expert",
  Docker: "expert",
  Redis: "expert",
  AWS: "expert",
  REST: "expert",
  FastAPI: "expert",
  NestJS: "advanced",
  Django: "expert",
  MongoDB: "expert",
  Kubernetes: "advanced",
  Elasticsearch: "expert",
  GraphQL: "expert",
  TensorFlow: "advanced",
  PyTorch: "advanced",
  LangChain: "advanced",
  "OpenAI": "advanced",
  FHIR: "advanced",
  HIPAA: "advanced",
  IoT: "advanced",
  Blockchain: "advanced",
  Go: "advanced",
  Java: "advanced",
  Azure: "advanced",
  GCP: "advanced",
  Terraform: "advanced",
  "GitHub Actions": "expert",
  gRPC: "advanced",
  Kafka: "advanced",
  RabbitMQ: "advanced",
  ClickHouse: "advanced",
  "React Native": "advanced",
  Flutter: "advanced",
  Vue: "advanced",
  "Spring Boot": "advanced",
  "Express.js": "expert",
  "Tailwind CSS": "expert",
  Cassandra: "proficient",
  Rust: "advanced",
};

type IndustryTechnologiesProps = {
  technologies: string[];
};

export function IndustryTechnologies({ technologies }: IndustryTechnologiesProps) {
  const categories = Array.from(
    new Set(technologies.map((t) => categoryMap[t] ?? "Other")),
  ).sort();

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = technologies.filter((t) => {
    const cat = categoryMap[t] ?? "Other";
    const matchesCategory = activeCategory === "All" || cat === activeCategory;
    const matchesSearch = t.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Section padding="lg" background="gradient">
      <Container>
        <Heading
          level="h2"
          description="Modern tools and frameworks powering our industry solutions"
          className="mb-12"
        >
          Technology Stack
        </Heading>

        <FadeIn delay={0.1}>
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveCategory("All")}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm transition-all",
                activeCategory === "All"
                  ? "bg-blue-600 text-white"
                  : "border border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white",
              )}
            >
              All
            </button>
            {categories.map((cat) => {
              const Icon = categoryIcons[cat] ?? Cpu;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm transition-all",
                    activeCategory === cat
                      ? "bg-blue-600 text-white"
                      : "border border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white",
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {cat}
                </button>
              );
            })}
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

        <Stagger
          staggerChildren={0.03}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
        >
          {filtered.map((tech) => {
            const cat = categoryMap[tech] ?? "Other";
            const Icon = categoryIcons[cat] ?? Cpu;
            const level = experienceLevels[tech] ?? "proficient";
            const bars = level === "expert" ? 3 : level === "advanced" ? 2 : 1;

            return (
              <StaggerItem key={tech}>
                <div className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 transition-all duration-200 hover:border-blue-500/20 hover:bg-white/[0.04] hover:shadow-lg sm:p-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 sm:h-10 sm:w-10">
                      <Icon className="h-4 w-4 text-blue-400 sm:h-5 sm:w-5" />
                    </div>
                    <h3 className="mt-2 text-xs font-semibold text-white sm:text-sm">
                      {tech}
                    </h3>
                    <span className="mt-0.5 text-[10px] text-white/30">{cat}</span>
                    <div className="mt-2 flex gap-0.5">
                      {[1, 2, 3].map((bar) => (
                        <div
                          key={bar}
                          className={cn(
                            "h-1 w-3 rounded-full",
                            bar <= bars ? "bg-blue-400" : "bg-white/10",
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
