"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";
import { ArrowRight } from "lucide-react";
import { getIcon } from "@/lib/icon-registry";

type ServiceDetailHeroProps = {
  title: string;
  description: string;
  icon: string;
  features: string[];
};

export function ServiceDetailHero({
  title,
  description,
  icon,
  features,
}: ServiceDetailHeroProps) {
  const Icon = getIcon(icon);
  return (
    <Section padding="lg">
      {/* Gradient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-1/4 h-80 w-80 rounded-full bg-blue-500/15 blur-[120px]" />
        <div className="absolute -left-40 top-1/2 h-80 w-80 rounded-full bg-purple-500/15 blur-[120px]" />
      </div>

      <Container>
        <div className="relative z-10 py-12 md:py-16">
          <FadeIn delay={0.1}>
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: title },
              ]}
              className="mb-8"
            />
          </FadeIn>

          <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:gap-16">
            {/* Icon */}
            <FadeIn direction="left" delay={0.2}>
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/[0.06]">
                <Icon className="h-12 w-12 text-blue-400" />
              </div>
            </FadeIn>

            {/* Content */}
            <div className="flex-1">
              <FadeIn delay={0.3}>
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                  {title}
                </h1>
              </FadeIn>

              <FadeIn delay={0.4}>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/50">
                  {description}
                </p>
              </FadeIn>

              {/* Feature badges */}
              <FadeIn delay={0.5}>
                <div className="mt-6 flex flex-wrap gap-2">
                  {features.map((feature) => (
                    <Badge key={feature} variant="blue" size="md">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </FadeIn>

              {/* CTAs */}
              <FadeIn delay={0.6}>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <a href="#pricing">
                    <Button
                      size="lg"
                      icon={<ArrowRight className="h-5 w-5" />}
                      iconPosition="right"
                    >
                      Get Started
                    </Button>
                  </a>
                  <a href="#overview">
                    <Button variant="outline" size="lg">
                      View Case Studies
                    </Button>
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
