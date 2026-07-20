"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MotionDiv } from "@/lib/motion";
import { Trophy, Lightbulb, Users, Code2, Heart } from "lucide-react";

type AwardCategory = "innovation" | "leadership" | "technical" | "community";

type AwardCardProps = {
  title: string;
  description: string;
  issuer: string;
  category: AwardCategory;
  year: number;
  icon?: string;
};

const categoryConfig: Record<
  AwardCategory,
  { badge: "blue" | "purple" | "cyan" | "green"; accent: string; icon: typeof Trophy }
> = {
  innovation: {
    badge: "blue",
    accent: "from-blue-400 to-cyan-400",
    icon: Lightbulb,
  },
  leadership: {
    badge: "purple",
    accent: "from-purple-400 to-pink-400",
    icon: Users,
  },
  technical: {
    badge: "cyan",
    accent: "from-cyan-400 to-blue-400",
    icon: Code2,
  },
  community: {
    badge: "green",
    accent: "from-emerald-400 to-green-400",
    icon: Heart,
  },
};

const categoryLabels: Record<AwardCategory, string> = {
  innovation: "Innovation",
  leadership: "Leadership",
  technical: "Technical",
  community: "Community",
};

export function AwardCard({
  title,
  description,
  issuer,
  category,
  year,
}: AwardCardProps) {
  const config = categoryConfig[category];
  const Icon = config.icon;

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Card
        glow="blue"
        padding="none"
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${config.accent}`} />

        <div className="relative p-6">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.04]">
              <Icon className="h-5 w-5 text-white/60" />
            </div>
            <span className="text-3xl font-bold text-white/10">{year}</span>
          </div>

          <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
          <p className="mb-4 text-sm leading-relaxed text-white/50">
            {description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-sm text-white/40">{issuer}</span>
            <Badge variant={config.badge} size="sm">
              {categoryLabels[category]}
            </Badge>
          </div>
        </div>
      </Card>
    </MotionDiv>
  );
}
