"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/glow-card";
import { FadeIn } from "@/components/ui/fade-in";
import { cn } from "@/lib/cn";
import { Check, ArrowRight } from "lucide-react";

type PricingTier = {
  name: string;
  price: string;
  features: string[];
  highlighted?: boolean;
};

type ServiceDetailPricingProps = {
  tiers: PricingTier[];
};

export function ServiceDetailPricing({ tiers }: ServiceDetailPricingProps) {
  return (
    <Section id="pricing" padding="lg" background="gradient">
      <Container>
        <Heading
          level="h2"
          description="Flexible pricing options to match your needs"
          className="mb-12"
        >
          Pricing Plans
        </Heading>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {tiers.map((tier, index) => (
            <FadeIn key={tier.name} delay={index * 0.1}>
              {tier.highlighted ? (
                <GlowCard color="blue" className="h-full">
                  <div
                    className={cn(
                      "relative flex h-full flex-col rounded-2xl border border-blue-500/30 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8",
                      "shadow-lg shadow-blue-500/10"
                    )}
                  >
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-blue-500/5 to-transparent" />

                    <div className="relative z-10">
                      <span className="inline-block rounded-full bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-400">
                        Most Popular
                      </span>
                      <h3 className="mt-4 text-xl font-bold text-white">
                        {tier.name}
                      </h3>
                      <div className="mt-2">
                        <span className="text-3xl font-bold text-white">
                          {tier.price}
                        </span>
                      </div>
                      <ul className="mt-6 space-y-3">
                        {tier.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                            <span className="text-sm text-white/60">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className="mt-8 w-full"
                        icon={<ArrowRight className="h-4 w-4" />}
                        iconPosition="right"
                      >
                        Get Started
                      </Button>
                    </div>
                  </div>
                </GlowCard>
              ) : (
                <div
                  className={cn(
                    "flex h-full flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04] sm:p-8"
                  )}
                >
                  <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-white">
                      {tier.price}
                    </span>
                  </div>
                  <ul className="mt-6 flex-1 space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
                        <span className="text-sm text-white/60">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="outline"
                    className="mt-8 w-full"
                    icon={<ArrowRight className="h-4 w-4" />}
                    iconPosition="right"
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
