"use client";

import {
  HeartPulse,
  GraduationCap,
  Landmark,
  Users,
  Factory,
  Store,
  ShoppingCart,
  Building,
  Home,
  Plane,
  Truck,
  UtensilsCrossed,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { FadeIn } from "@/components/ui/fade-in";
import { MotionDiv } from "@/lib/motion";

const iconMap: Record<string, LucideIcon> = {
  HeartPulse,
  GraduationCap,
  Landmark,
  Users,
  Factory,
  Store,
  ShoppingCart,
  Building,
  Home,
  Plane,
  Truck,
  UtensilsCrossed,
};

type IndustryDetailHeroProps = {
  title: string;
  description: string;
  icon: string;
  longDescription: string;
};

export function IndustryDetailHero({
  title,
  description,
  icon,
  longDescription,
}: IndustryDetailHeroProps) {
  const Icon = iconMap[icon] ?? Building;

  return (
    <Section padding="lg" background="gradient">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <MotionDiv
          className="absolute -top-20 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-purple-500/10 blur-[120px]"
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute -right-40 top-1/4 h-80 w-80 rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute -left-40 top-1/2 h-80 w-80 rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      <Container>
        <div className="relative z-10 py-8 md:py-12">
          <FadeIn delay={0.1}>
            <Breadcrumb
              items={[
                { label: "Industries", href: "/industries" },
                { label: title },
              ]}
              className="mb-8"
            />
          </FadeIn>

          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <FadeIn delay={0.15}>
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400">
                <Icon className="h-8 w-8" />
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                {title}
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="mb-6 max-w-3xl text-lg leading-relaxed text-white/50">
                {description}
              </p>
            </FadeIn>

            <FadeIn delay={0.35}>
              <p className="mb-8 max-w-3xl text-base leading-relaxed text-white/40">
                {longDescription}
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
                <Badge variant="purple" size="md">
                  Industry Expertise
                </Badge>
                <Badge variant="blue" size="md">
                  Custom Solutions
                </Badge>
                <Badge variant="green" size="md">
                  Proven Results
                </Badge>
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </Section>
  );
}
