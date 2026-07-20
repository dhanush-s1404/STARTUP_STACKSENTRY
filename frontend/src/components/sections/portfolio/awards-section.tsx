"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { MotionDiv } from "@/lib/motion";
import { Trophy, Medal, Award, Star, Newspaper, ShieldCheck } from "lucide-react";

const awards = [
  {
    title: "Best AI Implementation 2025",
    issuer: "TechCrunch Awards",
    category: "innovation",
    year: 2025,
    icon: Trophy,
    color: "text-amber-400",
    bg: "from-amber-500/10 to-amber-600/5",
  },
  {
    title: "Top Enterprise Software Company",
    issuer: "Clutch.co",
    category: "industry",
    year: 2025,
    icon: Award,
    color: "text-blue-400",
    bg: "from-blue-500/10 to-blue-600/5",
  },
  {
    title: "Innovation in Healthcare Tech",
    issuer: "HealthTech Magazine",
    category: "industry",
    year: 2024,
    icon: Medal,
    color: "text-emerald-400",
    bg: "from-emerald-500/10 to-emerald-600/5",
  },
  {
    title: "Open Source Contributor Award",
    issuer: "GitHub Stars",
    category: "community",
    year: 2024,
    icon: Star,
    color: "text-purple-400",
    bg: "from-purple-500/10 to-purple-600/5",
  },
  {
    title: "Fastest Growing Software Company",
    issuer: "Inc. 5000",
    category: "press",
    year: 2025,
    icon: Newspaper,
    color: "text-cyan-400",
    bg: "from-cyan-500/10 to-cyan-600/5",
  },
  {
    title: "ISO 27001 Certified",
    issuer: "International Organization for Standardization",
    category: "industry",
    year: 2024,
    icon: ShieldCheck,
    color: "text-rose-400",
    bg: "from-rose-500/10 to-rose-600/5",
  },
];

const categoryVariant: Record<string, "blue" | "purple" | "cyan" | "green" | "amber" | "outline"> = {
  innovation: "amber",
  industry: "blue",
  community: "purple",
  press: "cyan",
};

export function AwardsSection() {
  return (
    <Section padding="lg">
      <Container>
        <FadeIn>
          <Heading
            level="h2"
            gradient
            description="Recognition for our commitment to excellence and innovation in software development."
          >
            Awards & Recognition
          </Heading>
        </FadeIn>

        <Stagger delay={0.1} staggerChildren={0.1} className="mt-12">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {awards.map((award) => {
              const Icon = award.icon;
              return (
                <StaggerItem key={award.title}>
                  <MotionDiv
                    whileHover={{ y: -4 }}
                    className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
                  >
                    {/* Gradient border on hover */}
                    <div
                      className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(59,130,246,0.1), rgba(168,85,247,0.1), rgba(34,211,238,0.1))",
                        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        maskComposite: "exclude",
                        padding: "1px",
                      }}
                    />

                    <div className="relative z-10">
                      <div
                        className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${award.bg}`}
                      >
                        <Icon className={`h-6 w-6 ${award.color}`} />
                      </div>

                      <h3 className="text-lg font-semibold text-white">
                        {award.title}
                      </h3>

                      <p className="mt-1 text-sm text-white/50">
                        {award.issuer}
                      </p>

                      <div className="mt-4 flex items-center gap-2">
                        <Badge variant={categoryVariant[award.category] || "outline"} size="sm">
                          {award.category}
                        </Badge>
                        <Badge variant="default" size="sm">
                          {award.year}
                        </Badge>
                      </div>
                    </div>
                  </MotionDiv>
                </StaggerItem>
              );
            })}
          </div>
        </Stagger>
      </Container>
    </Section>
  );
}
