"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { MotionDiv } from "@/lib/motion";
import { ArrowRight, Play, Calendar, Briefcase } from "lucide-react";

export function CTASection() {
  return (
    <Section id="cta" padding="lg">
      <Container>
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.06]">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-cyan-600/20" />
            <div className="absolute inset-0 mesh-gradient opacity-50" />
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-blue-500/20 blur-[80px]" />
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-purple-500/20 blur-[80px]" />

            <div className="relative z-10 px-8 py-16 text-center md:px-16 md:py-24">
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-h2 text-white">
                  Ready to Build Something{" "}
                  <span className="text-gradient-primary">Extraordinary</span>?
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-body-lg text-[hsl(var(--color-text-tertiary))]">
                  Let&apos;s discuss your vision. Our team is ready to architect, design,
                  and develop a solution that transforms your business.
                </p>
              </MotionDiv>

              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
              >
                <Button size="xl" icon={<ArrowRight className="h-5 w-5" />} iconPosition="right">
                  Start a Project
                </Button>
                <Button variant="secondary" size="xl" icon={<Calendar className="h-4 w-4" />}>
                  Book Consultation
                </Button>
              </MotionDiv>

              <MotionDiv
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-6 flex flex-wrap items-center justify-center gap-4"
              >
                <Button variant="ghost">
                  <Play className="mr-2 h-4 w-4" />
                  Schedule a Demo
                </Button>
                <Button variant="ghost">
                  <Briefcase className="mr-2 h-4 w-4" />
                  View Careers
                </Button>
              </MotionDiv>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
