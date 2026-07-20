"use client";

import { useState, useMemo } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { FadeIn } from "@/components/ui/fade-in";
import { Search, ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

type FAQItem = {
  id: string;
  title: string;
  content: string;
  category: string;
};

type ServiceFAQEnhancedProps = {
  items?: FAQItem[];
  showSearch?: boolean;
  title?: string;
  subtitle?: string;
};

const defaultFAQ: FAQItem[] = [
  { id: "tech-stack", title: "What technologies do you specialize in?", content: "We specialize in a full-stack technology ecosystem including React, Next.js, Node.js, Python, Go, and Rust. For cloud infrastructure, we work with AWS, Azure, and GCP. Our AI/ML capabilities span TensorFlow, PyTorch, and custom model development.", category: "Technology" },
  { id: "timeline", title: "How long does a typical project take?", content: "Project timelines vary based on scope and complexity. A focused MVP can be delivered in 4-8 weeks. Mid-scale applications typically take 3-6 months, while enterprise-grade platforms may require 6-12 months. We provide detailed timelines during our discovery phase.", category: "Process" },
  { id: "support", title: "Do you provide ongoing support?", content: "Absolutely. We offer comprehensive maintenance and support packages that include 24/7 monitoring, performance optimization, security patches, and feature enhancements. Our support tiers range from basic monitoring to dedicated engineering teams.", category: "Support" },
  { id: "industries", title: "What industries do you serve?", content: "We serve fintech, healthcare, e-commerce, SaaS, logistics, education, and manufacturing. Our team has domain expertise in regulatory compliance (HIPAA, SOC 2, GDPR), payment processing, real-time data systems, and scalable consumer applications.", category: "General" },
  { id: "collaboration", title: "Can you work with our existing team?", content: "Yes, we frequently collaborate with in-house engineering teams. We can embed senior engineers within your team, provide technical consulting, or take ownership of specific modules. Our flexible engagement models complement your existing workflows.", category: "Process" },
  { id: "methodology", title: "What is your development methodology?", content: "We follow agile development practices with iterative delivery. Our process includes daily standups, bi-weekly sprints, sprint reviews, and retrospectives. Every sprint delivers working software with regular stakeholder involvement.", category: "Process" },
  { id: "quality", title: "How do you ensure code quality?", content: "Code quality is enforced through mandatory code reviews, automated testing (unit, integration, e2e), static analysis, and CI/CD pipelines. We follow clean architecture principles and conduct regular architecture reviews.", category: "Technology" },
  { id: "security", title: "What about data security?", content: "Security is embedded in every stage. We follow OWASP best practices, implement encryption at rest and in transit, conduct regular penetration testing, and maintain SOC 2 compliance. Our infrastructure uses zero-trust principles.", category: "Security" },
  { id: "pricing", title: "How is pricing structured?", content: "We offer flexible pricing models including fixed-price for well-defined projects, time-and-materials for evolving requirements, and dedicated team models for long-term engagements. We provide transparent pricing with no hidden costs.", category: "General" },
  { id: "start", title: "How do I get started?", content: "Getting started is simple. Reach out through our contact form, and we'll schedule a free discovery call to understand your needs. From there, we'll provide a proposal, timeline, and next steps. Most projects start within 1-2 weeks of agreement.", category: "General" },
];

const categories = Array.from(new Set(defaultFAQ.map((f) => f.category)));

export function ServiceFAQEnhanced({
  items = defaultFAQ,
  showSearch = true,
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about working with us",
}: ServiceFAQEnhancedProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openItems, setOpenItems] = useState<string[]>([]);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [items, activeCategory, searchQuery]);

  function toggleItem(id: string) {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  return (
    <Section id="faq" padding="lg">
      <Container size="md">
        <Heading level="h2" description={subtitle} className="mb-12">
          {title}
        </Heading>

        {showSearch && (
          <FadeIn delay={0.1}>
            <div className="relative mb-8">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex h-12 w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/25"
              />
            </div>
          </FadeIn>
        )}

        <FadeIn delay={0.15}>
          <div className="mb-8 flex flex-wrap gap-2">
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

        <div className="space-y-3">
          {filtered.map((item, index) => (
            <FadeIn key={item.id} delay={0.05 * index}>
              <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] transition-all duration-200 hover:border-white/[0.12]">
                <button
                  onClick={() => toggleItem(item.id)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-white/[0.02]"
                  aria-expanded={openItems.includes(item.id)}
                >
                  <span className="pr-4 text-sm font-medium text-white">{item.title}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-white/40 transition-transform duration-200",
                      openItems.includes(item.id) && "rotate-180"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-200",
                    openItems.includes(item.id) ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-white/[0.06] px-6 py-4">
                      <p className="text-sm leading-relaxed text-white/50">{item.content}</p>
                      <span className="mt-2 inline-flex items-center rounded-full bg-white/5 px-2.5 py-0.5 text-[10px] text-white/30">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-12 text-center">
            <p className="text-white/40">No questions match your search. Try different keywords.</p>
          </div>
        )}
      </Container>
    </Section>
  );
}
