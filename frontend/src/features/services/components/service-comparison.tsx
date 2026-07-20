"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { FadeIn } from "@/components/ui/fade-in";
import { Check, X, Minus } from "lucide-react";
import { cn } from "@/lib/cn";

type ServiceCompare = {
  slug: string;
  title: string;
  category: string;
  features: Record<string, boolean | string>;
};

const comparisonData: ServiceCompare[] = [
  {
    slug: "ai-development",
    title: "AI Development",
    category: "Artificial Intelligence",
    features: {
      "Custom ML Models": true,
      "Neural Networks": true,
      "NLP": true,
      "Computer Vision": true,
      "LLM Integration": false,
      "Automation": false,
      "Cloud Native": true,
      "API Design": true,
      "DevOps Pipeline": true,
    },
  },
  {
    slug: "generative-ai",
    title: "Generative AI",
    category: "Artificial Intelligence",
    features: {
      "Custom ML Models": true,
      "Neural Networks": true,
      "NLP": true,
      "Computer Vision": false,
      "LLM Integration": true,
      "Automation": true,
      "Cloud Native": true,
      "API Design": true,
      "DevOps Pipeline": false,
    },
  },
  {
    slug: "web-development",
    title: "Web Development",
    category: "Development",
    features: {
      "Custom ML Models": false,
      "Neural Networks": false,
      "NLP": false,
      "Computer Vision": false,
      "LLM Integration": false,
      "Automation": false,
      "Cloud Native": true,
      "API Design": true,
      "DevOps Pipeline": true,
    },
  },
  {
    slug: "cloud-solutions",
    title: "Cloud Solutions",
    category: "Infrastructure",
    features: {
      "Custom ML Models": false,
      "Neural Networks": false,
      "NLP": false,
      "Computer Vision": false,
      "LLM Integration": false,
      "Automation": true,
      "Cloud Native": true,
      "API Design": false,
      "DevOps Pipeline": true,
    },
  },
  {
    slug: "cyber-security",
    title: "Cyber Security",
    category: "Infrastructure",
    features: {
      "Custom ML Models": false,
      "Neural Networks": false,
      "NLP": false,
      "Computer Vision": false,
      "LLM Integration": false,
      "Automation": true,
      "Cloud Native": false,
      "API Design": false,
      "DevOps Pipeline": false,
    },
  },
  {
    slug: "devops",
    title: "DevOps",
    category: "Infrastructure",
    features: {
      "Custom ML Models": false,
      "Neural Networks": false,
      "NLP": false,
      "Computer Vision": false,
      "LLM Integration": false,
      "Automation": true,
      "Cloud Native": true,
      "API Design": false,
      "DevOps Pipeline": true,
    },
  },
];

const allFeatures = [
  "Custom ML Models",
  "Neural Networks",
  "NLP",
  "Computer Vision",
  "LLM Integration",
  "Automation",
  "Cloud Native",
  "API Design",
  "DevOps Pipeline",
];

const categories = ["All", "Artificial Intelligence", "Development", "Infrastructure"];

export function ServiceComparison() {
  const [selected, setSelected] = useState<string[]>([
    "ai-development",
    "generative-ai",
    "web-development",
  ]);
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filtered = comparisonData.filter(
    (s) => categoryFilter === "All" || s.category === categoryFilter
  );

  const displayServices = filtered.filter((s) => selected.includes(s.slug));
  const availableServices = filtered.filter((s) => !selected.includes(s.slug));

  function toggleService(slug: string) {
    setSelected((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }

  return (
    <Section id="comparison" padding="lg">
      <Container>
        <Heading
          level="h2"
          description="Find the right service for your needs"
          className="mb-12"
        >
          Compare Services
        </Heading>

        {/* Category filter */}
        <FadeIn delay={0.1}>
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm transition-all",
                  categoryFilter === cat
                    ? "bg-blue-600 text-white"
                    : "border border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Available services to add */}
        {availableServices.length > 0 && (
          <FadeIn delay={0.15}>
            <div className="mb-8 flex flex-wrap gap-2">
              <span className="flex items-center text-sm text-white/40">Add:</span>
              {availableServices.map((s) => (
                <button
                  key={s.slug}
                  onClick={() => toggleService(s.slug)}
                  className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60 transition-all hover:border-blue-500/30 hover:text-white"
                >
                  <span>+</span>
                  {s.title}
                </button>
              ))}
            </div>
          </FadeIn>
        )}

        {/* Comparison table */}
        <FadeIn delay={0.2}>
          <div className="overflow-x-auto rounded-xl border border-white/[0.06]">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                  <th className="sticky left-0 z-10 bg-[hsl(230,63%,5%)] px-4 py-4 text-left font-medium text-white/60">
                    Feature
                  </th>
                  {displayServices.map((s) => (
                    <th key={s.slug} className="px-4 py-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className="font-semibold text-white">{s.title}</span>
                        <button
                          onClick={() => toggleService(s.slug)}
                          className="text-[10px] text-white/30 hover:text-red-400"
                        >
                          Remove
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allFeatures.map((feature) => (
                  <tr
                    key={feature}
                    className="border-b border-white/[0.06] transition-colors hover:bg-white/[0.01]"
                  >
                    <td className="sticky left-0 z-10 bg-[hsl(230,63%,5%)] px-4 py-3 font-medium text-white/80">
                      {feature}
                    </td>
                    {displayServices.map((s) => {
                      const val = s.features[feature];
                      const supported = val === true;
                      const partially = typeof val === "string";
                      return (
                        <td
                          key={s.slug}
                          className={cn(
                            "px-4 py-3 text-center",
                            supported
                              ? "text-emerald-400"
                              : partially
                                ? "text-amber-400"
                                : "text-white/10"
                          )}
                        >
                          {supported ? (
                            <Check className="mx-auto h-4 w-4" />
                          ) : partially ? (
                            <Minus className="mx-auto h-4 w-4" />
                          ) : (
                            <X className="mx-auto h-4 w-4" />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>

        {displayServices.length === 0 && (
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-12 text-center">
            <p className="text-white/40">Select services above to compare them side by side.</p>
          </div>
        )}
      </Container>
    </Section>
  );
}
