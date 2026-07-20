"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { StoryReveal } from "./scroll-story";

type TechCategory = {
  name: string;
  items: { name: string; description: string; color: string }[];
};

const categories: TechCategory[] = [
  {
    name: "Frontend",
    items: [
      { name: "React", description: "Component-based UI library for building interactive interfaces.", color: "from-blue-500/20 to-blue-600/10" },
      { name: "Next.js", description: "Full-stack React framework with SSR, SSG, and edge functions.", color: "from-white/10 to-white/5" },
      { name: "TypeScript", description: "Typed superset of JavaScript for scalable enterprise applications.", color: "from-blue-500/20 to-blue-600/10" },
      { name: "Tailwind CSS", description: "Utility-first CSS framework for rapid, consistent design.", color: "from-cyan-500/20 to-cyan-600/10" },
    ],
  },
  {
    name: "Backend",
    items: [
      { name: "Python", description: "Versatile language for AI, APIs, and backend services.", color: "from-blue-500/20 to-blue-600/10" },
      { name: "FastAPI", description: "High-performance Python framework for building APIs.", color: "from-emerald-500/20 to-emerald-600/10" },
      { name: "Node.js", description: "JavaScript runtime for building scalable network applications.", color: "from-green-500/20 to-green-600/10" },
      { name: "GraphQL", description: "Query language for efficient API data fetching.", color: "from-pink-500/20 to-pink-600/10" },
    ],
  },
  {
    name: "Cloud & DevOps",
    items: [
      { name: "AWS", description: "Comprehensive cloud platform with 200+ services for global infrastructure.", color: "from-amber-500/20 to-amber-600/10" },
      { name: "Azure", description: "Microsoft's cloud platform for enterprise workloads and AI services.", color: "from-blue-500/20 to-blue-600/10" },
      { name: "Docker", description: "Container platform for consistent development and deployment.", color: "from-blue-500/20 to-blue-600/10" },
      { name: "Kubernetes", description: "Container orchestration for automated deployment, scaling, and management.", color: "from-blue-500/20 to-blue-600/10" },
    ],
  },
  {
    name: "AI & Data",
    items: [
      { name: "OpenAI", description: "Advanced AI models for natural language, code generation, and reasoning.", color: "from-green-500/20 to-green-600/10" },
      { name: "TensorFlow", description: "Open-source ML framework for building and deploying AI models.", color: "from-orange-500/20 to-orange-600/10" },
      { name: "PostgreSQL", description: "Advanced relational database with ACID compliance and extensions.", color: "from-blue-500/20 to-blue-600/10" },
      { name: "Redis", description: "In-memory data store for caching, real-time analytics, and message brokering.", color: "from-red-500/20 to-red-600/10" },
    ],
  },
];

export function TechShowcase() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  return (
    <Section id="technology" padding="lg">
      <Container>
        <StoryReveal>
          <Heading
            level="h2"
            gradient
            description="Modern technologies we leverage to build premium enterprise solutions."
          >
            Our Technology Stack
          </Heading>
        </StoryReveal>

        <div className="mt-12">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, idx) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(idx)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  activeCategory === idx
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                    : "text-white/40 hover:bg-white/[0.04] hover:text-white/70"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              {categories[activeCategory].items.map((tech) => (
                <motion.div
                  key={tech.name}
                  onMouseEnter={() => setHoveredTech(tech.name)}
                  onMouseLeave={() => setHoveredTech(null)}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br ${tech.color} p-5 transition-all duration-300 hover:border-white/[0.12]`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-white">{tech.name}</h3>
                    <div className="h-2 w-2 rounded-full bg-blue-400/50 transition-all duration-300 group-hover:bg-blue-400 group-hover:shadow-lg group-hover:shadow-blue-500/50" />
                  </div>

                  <AnimatePresence>
                    {(hoveredTech === tech.name) && (
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.2 }}
                        className="mt-3 text-xs leading-relaxed text-white/50"
                      >
                        {tech.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </Section>
  );
}
