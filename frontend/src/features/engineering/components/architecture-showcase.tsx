"use client";

import { useState } from "react";
import {
  Monitor,
  Globe,
  Network,
  LayoutDashboard,
  Code,
  ShieldCheck,
  Brain,
  Database,
  Zap,
  Activity,
  ChevronDown,
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
import { cn } from "@/lib/cn";
import { ARCHITECTURE_LAYERS, type ArchitectureLayerData } from "@/data/architecture-layers";

const SLUG_ICON_MAP: Record<string, LucideIcon> = {
  "client-layer": Monitor,
  "cdn-and-edge": Globe,
  "load-balancer": Network,
  "web-application-layer": LayoutDashboard,
  "api-gateway": Code,
  "authentication-authorization": ShieldCheck,
  "business-logic-microservices": Brain,
  "database-layer": Database,
  "cache-layer": Zap,
  "monitoring-observability": Activity,
};

export function ArchitectureShowcase() {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  const toggleLayer = (slug: string) => {
    setExpandedSlug((prev) => (prev === slug ? null : slug));
  };

  return (
    <Section id="architecture" padding="lg">
      <Container>
        <FadeIn direction="up">
          <Heading
            level="h2"
            gradient
            description="Our application architecture — each layer designed for reliability, scalability, and performance."
            className="mb-12"
          >
            Architecture Overview
          </Heading>
        </FadeIn>

        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/40 via-purple-500/40 to-cyan-500/40 sm:left-1/2" />

          <div className="space-y-4">
            {ARCHITECTURE_LAYERS.map((layer, index) => (
              <ArchitectureLayerCard
                key={layer.slug}
                layer={layer}
                index={index}
                isExpanded={expandedSlug === layer.slug}
                onToggle={() => toggleLayer(layer.slug)}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function ArchitectureLayerCard({
  layer,
  index,
  isExpanded,
  onToggle,
}: {
  layer: ArchitectureLayerData;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const Icon = SLUG_ICON_MAP[layer.slug] || Monitor;
  const isLeft = index % 2 === 0;

  return (
    <div className={cn("relative flex items-start gap-4", "sm:gap-0")}>
      <div
        className={cn(
          "hidden sm:flex absolute left-1/2 top-6 z-10 h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-white/10 bg-[hsl(230,63%,5%)]",
        )}
      >
        <Icon className="h-4 w-4 text-white/70" />
      </div>

      <div
        className={cn(
          "flex w-full sm:w-[calc(50%-2rem)]",
          isLeft ? "sm:mr-auto sm:pr-8 sm:text-right" : "sm:ml-auto sm:pl-8",
        )}
      >
        <Card
          glass
          hover
          glow="blue"
          padding="md"
          className={cn("w-full cursor-pointer", isExpanded && "bg-white/[0.04]")}
          onClick={onToggle}
        >
          <div className={cn("flex items-center gap-3", !isLeft && "sm:flex-row-reverse")}>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 sm:hidden">
              <Icon className="h-5 w-5 text-white/70" />
            </div>
            <div className="flex-1">
              <div className={cn("flex items-center gap-2", !isLeft && "sm:justify-end")}>
                <h3 className="font-semibold text-white">{layer.title}</h3>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-4 w-4 text-white/40" />
                </motion.div>
              </div>
              <p className="mt-1 text-sm text-white/50">{layer.description}</p>
            </div>
          </div>

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
                  {layer.responsibilities.length > 0 && (
                    <div>
                      <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Responsibilities</span>
                      <ul className="mt-2 space-y-1.5">
                        {layer.responsibilities.map((r) => (
                          <li key={r} className={cn("flex items-start gap-2 text-sm text-white/60", !isLeft && "sm:flex-row-reverse sm:text-right")}>
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue-400" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {layer.securityConsiderations.length > 0 && (
                    <div>
                      <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Security</span>
                      <ul className="mt-2 space-y-1.5">
                        {layer.securityConsiderations.map((s) => (
                          <li key={s} className={cn("flex items-start gap-2 text-sm text-white/60", !isLeft && "sm:flex-row-reverse sm:text-right")}>
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-green-400" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className={cn("flex flex-wrap gap-1.5", !isLeft && "sm:justify-end")}>
                    {layer.technologies.map((tech) => (
                      <Badge key={tech} variant="cyan" size="sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </div>
  );
}
