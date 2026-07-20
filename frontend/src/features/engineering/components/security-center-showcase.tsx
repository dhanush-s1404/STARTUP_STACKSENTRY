"use client";

import { useState } from "react";
import {
  Fingerprint,
  Lock,
  KeyRound,
  CheckSquare,
  Server,
  ClipboardCheck,
  Radar,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { AnimatePresence } from "@/lib/motion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { cn } from "@/lib/cn";
import { SECURITY_TOPICS, SECURITY_CATEGORIES, type SecurityTopic } from "@/data/security-topics";

const ICON_MAP: Record<string, LucideIcon> = {
  Fingerprint,
  Lock,
  KeyRound,
  CheckSquare,
  Server,
  ClipboardCheck,
  Radar,
};

const CATEGORY_BADGE: Record<string, "blue" | "purple" | "cyan" | "green" | "amber"> = {
  Identity: "blue",
  "Data Security": "cyan",
  "Application Security": "green",
  Infrastructure: "purple",
  Governance: "amber",
  Operations: "blue",
};

export function SecurityCenterShowcase() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredTopics = activeCategory
    ? SECURITY_TOPICS.filter((t) => t.category === activeCategory)
    : SECURITY_TOPICS;

  return (
    <Section id="security" padding="lg">
      <Container>
        <FadeIn direction="up">
          <Heading
            level="h2"
            gradient
            description="Security is embedded into every layer of our development process."
            className="mb-8"
          >
            Security Center
          </Heading>
        </FadeIn>

        <FadeIn direction="up" delay={0.1}>
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                !activeCategory
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                  : "text-white/50 hover:bg-white/5 hover:text-white/70",
              )}
            >
              All Topics
            </button>
            {SECURITY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                  activeCategory === cat
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                    : "text-white/50 hover:bg-white/5 hover:text-white/70",
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>

        <Stagger staggerChildren={0.08} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTopics.map((topic) => (
            <StaggerItem key={topic.id}>
              <SecurityTopicCard
                topic={topic}
                isExpanded={expandedId === topic.id}
                onToggle={() => setExpandedId((prev) => (prev === topic.id ? null : topic.id))}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}

function SecurityTopicCard({
  topic,
  isExpanded,
  onToggle,
}: {
  topic: SecurityTopic;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const Icon = ICON_MAP[topic.icon] || Lock;

  return (
    <Card
      glass
      hover
      glow="cyan"
      padding="md"
      className={cn("h-full", isExpanded && "bg-white/[0.04]")}
      onClick={onToggle}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5">
          <Icon className="h-5 w-5 text-cyan-400" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-white">{topic.title}</h3>
          <Badge variant={CATEGORY_BADGE[topic.category] || "default"} size="sm" className="mt-1">
            {topic.category}
          </Badge>
        </div>
        <ChevronRight
          className={cn(
            "h-4 w-4 shrink-0 text-white/40 transition-transform duration-200",
            isExpanded && "rotate-90",
          )}
        />
      </div>

      <p className="mt-3 text-sm text-white/50 leading-relaxed">{topic.description}</p>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-4 border-t border-white/[0.06] pt-4">
              <div>
                <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Details</span>
                <ul className="mt-2 space-y-1.5">
                  {topic.details.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-sm text-white/60">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-400" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Best Practices</span>
                <ul className="mt-2 space-y-1.5">
                  {topic.bestPractices.map((bp) => (
                    <li key={bp} className="flex items-start gap-2 text-sm text-white/60">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-green-400" />
                      {bp}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
