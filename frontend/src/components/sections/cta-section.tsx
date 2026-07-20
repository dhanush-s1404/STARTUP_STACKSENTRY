"use client";

import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Heading } from "@/components/ui/heading";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <Section padding="lg">
      <Container>
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] p-12 text-center backdrop-blur-sm md:p-20">
            <div className="mesh-gradient pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
            <div className="relative z-10 space-y-6">
              <Heading level="h2" gradient>
                Ready to Transform Your Business?
              </Heading>
              <p className="mx-auto max-w-xl text-lg text-white/50">
                Join hundreds of enterprises already using StackSentry to build
                the future of intelligent software.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" icon={<ArrowRight className="h-4 w-4" />} iconPosition="right">
                  Start Free Trial
                </Button>
                <Button variant="secondary" size="lg">
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
