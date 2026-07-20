"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { MotionDiv, AnimatePresence } from "@/lib/motion";
import { ExternalLink, ArrowRight, Star } from "lucide-react";

type Project = {
  title: string;
  category: string;
  tags: string[];
  description: string;
  impact: string;
  score: number;
  color: "blue" | "purple" | "cyan";
};

const categories = ["All", "AI/ML", "Enterprise", "Web", "Mobile", "Cloud"];

const projects: Project[] = [
  {
    title: "AI Talent Acquisition Suite",
    category: "AI/ML",
    tags: ["Python", "FastAPI", "React", "OpenAI", "PostgreSQL"],
    description: "End-to-end recruitment platform with AI resume parsing, candidate matching, and automated interview scheduling.",
    impact: "85% faster hiring · 40% better candidate quality",
    score: 98,
    color: "blue",
  },
  {
    title: "Enterprise Command Center",
    category: "Enterprise",
    tags: ["Next.js", "TypeScript", "GraphQL", "Redis", "Kubernetes"],
    description: "Real-time business operations dashboard with 200+ KPIs, predictive analytics, and automated reporting.",
    impact: "360° visibility · 60% reduction in manual reporting",
    score: 96,
    color: "purple",
  },
  {
    title: "Global E-Commerce Platform",
    category: "Web",
    tags: ["Next.js", "Stripe", "PostgreSQL", "AWS", "Docker"],
    description: "Multi-vendor marketplace with real-time inventory, global payments, and AI-powered product recommendations.",
    impact: "300% revenue growth · 15+ countries · 99.99% uptime",
    score: 99,
    color: "cyan",
  },
  {
    title: "Healthcare Data Platform",
    category: "Enterprise",
    tags: ["Python", "FastAPI", "React", "TensorFlow", "AWS"],
    description: "HIPAA-compliant medical data management with AI diagnostics assistance and patient outcome prediction.",
    impact: "45% faster diagnosis · 2M+ patient records processed",
    score: 97,
    color: "blue",
  },
  {
    title: "FinTech Trading App",
    category: "Mobile",
    tags: ["React Native", "Node.js", "WebSocket", "Redis", "PostgreSQL"],
    description: "Real-time trading platform with advanced charting, portfolio management, and social trading features.",
    impact: "500K+ active traders · Sub-50ms trade execution",
    score: 95,
    color: "purple",
  },
  {
    title: "Cloud Infrastructure Orchestrator",
    category: "Cloud",
    tags: ["Go", "Kubernetes", "Terraform", "AWS", "Azure"],
    description: "Multi-cloud infrastructure management with automated provisioning, cost optimization, and security compliance.",
    impact: "60% infrastructure cost savings · 10x deployment speed",
    score: 97,
    color: "cyan",
  },
];

const colorMap = {
  blue: "from-blue-500/10 to-blue-600/5 border-blue-500/10",
  purple: "from-purple-500/10 to-purple-600/5 border-purple-500/10",
  cyan: "from-cyan-500/10 to-cyan-600/5 border-cyan-500/10",
};

const accentColors = {
  blue: "text-blue-400",
  purple: "text-purple-400",
  cyan: "text-cyan-400",
};

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <Section id="portfolio" padding="lg">
      <Container>
        <ScrollReveal>
          <Heading
            level="h2"
            gradient
            description="A selection of our most impactful enterprise projects delivered to clients worldwide."
          >
            Featured Portfolio
          </Heading>
        </ScrollReveal>

        {/* Filters */}
        <ScrollReveal delay={0.1}>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                    : "text-[hsl(var(--color-text-muted))] hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Projects grid */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="wait">
            {filtered.map((project, index) => (
              <MotionDiv
                key={project.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <div className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]">
                  {/* Preview area */}
                  <div className={`relative h-48 bg-gradient-to-br ${colorMap[project.color]} flex items-center justify-center`}>
                    <div className="rounded-xl border border-white/[0.08] bg-white/[0.05] p-6 backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
                      <div className="space-y-2">
                        <div className="h-2 w-20 rounded-full bg-white/10" />
                        <div className="h-2 w-14 rounded-full bg-white/10" />
                        <div className="h-2 w-18 rounded-full bg-white/10" />
                        <div className="mt-3 flex gap-2">
                          <div className="h-6 w-6 rounded-md bg-white/10" />
                          <div className="h-6 w-6 rounded-md bg-white/10" />
                          <div className="h-6 w-6 rounded-md bg-white/10" />
                        </div>
                      </div>
                    </div>
                    <div className="absolute right-3 top-3 opacity-0 transition-opacity group-hover:opacity-100">
                      <ExternalLink className="h-5 w-5 text-white/60" />
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <Badge variant="outline" size="sm">{project.category}</Badge>
                      <div className="flex items-center gap-1">
                        <Star className={`h-3.5 w-3.5 fill-current ${accentColors[project.color]}`} />
                        <span className="text-xs font-semibold text-white">{project.score}/100</span>
                      </div>
                    </div>
                    <h3 className="mb-2 text-base font-semibold text-white">{project.title}</h3>
                    <p className="mb-3 text-sm leading-relaxed text-[hsl(var(--color-text-muted))] line-clamp-2">
                      {project.description}
                    </p>
                    <p className={`mb-3 text-xs font-medium ${accentColors[project.color]}`}>
                      {project.impact}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span key={tag} className="rounded-md bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium text-[hsl(var(--color-text-muted))]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </AnimatePresence>
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-12 text-center">
            <Button variant="secondary" size="lg" icon={<ArrowRight className="h-4 w-4" />} iconPosition="right">
              View All Projects
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
