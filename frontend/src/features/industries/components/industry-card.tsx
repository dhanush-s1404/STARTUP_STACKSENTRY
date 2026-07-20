"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MotionDiv, AnimatePresence } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { ChevronDown, AlertTriangle, Lightbulb, TrendingUp, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type IndustryCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  challenges: string[];
  solutions: string[];
  benefits: string[];
  slug: string;
};

const tabs = [
  { id: "challenges", label: "Challenges", icon: AlertTriangle },
  { id: "solutions", label: "Solutions", icon: Lightbulb },
  { id: "benefits", label: "Benefits", icon: TrendingUp },
] as const;

const badgeColors = {
  challenges: "amber" as const,
  solutions: "blue" as const,
  benefits: "green" as const,
};

const dataMap = {
  challenges: (card: IndustryCardProps) => card.challenges,
  solutions: (card: IndustryCardProps) => card.solutions,
  benefits: (card: IndustryCardProps) => card.benefits,
};

export function IndustryCard({
  title,
  description,
  icon: Icon,
  challenges,
  solutions,
  benefits,
  slug,
}: IndustryCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<"challenges" | "solutions" | "benefits">("challenges");

  const cardProps: IndustryCardProps = { title, description, icon: Icon, challenges, solutions, benefits, slug: "" };
  const currentData = dataMap[activeTab](cardProps);

  return (
    <Card padding="none" hover className="group h-full overflow-hidden">
      <div className="p-6">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 transition-colors group-hover:bg-purple-500/20">
          <Icon className="h-6 w-6" />
        </div>

        <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
        <p className="mb-4 text-sm leading-relaxed text-white/50">{description}</p>

        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className={cn(
            "flex w-full items-center justify-between rounded-lg border border-white/[0.06] px-4 py-2.5 text-sm font-medium text-white/70",
            "transition-all duration-200 hover:bg-white/[0.03] hover:text-white",
            expanded && "bg-white/[0.03]",
          )}
          aria-expanded={expanded}
        >
          <span>View Details</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-300",
              expanded && "rotate-180",
            )}
          />
        </button>

        <Link
          href={`/industries/${slug}`}
          className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-white/[0.06] px-4 py-2.5 text-sm font-medium text-blue-400 transition-all duration-200 hover:bg-blue-500/10 hover:text-blue-300"
        >
          View Full Case Studies
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <AnimatePresence>
        {expanded && (
          <MotionDiv
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/[0.06] px-6 pb-6 pt-4">
              <div className="mb-4 flex gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200",
                      activeTab === tab.id
                        ? "bg-white/10 text-white"
                        : "text-white/40 hover:bg-white/[0.03] hover:text-white/60",
                    )}
                  >
                    <tab.icon className="h-3 w-3" />
                    {tab.label}
                  </button>
                ))}
              </div>

              <ul className="space-y-2">
                {currentData.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white/60">
                    <Badge variant={badgeColors[activeTab]} size="sm" className="mt-0.5 shrink-0">
                      {activeTab === "challenges" ? "!" : activeTab === "solutions" ? "+" : "*"}
                    </Badge>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </Card>
  );
}
