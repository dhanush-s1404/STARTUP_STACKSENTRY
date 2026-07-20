"use client";

import Link from "next/link";
import { ArrowRight, Calendar, MessageSquare, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";

import { FadeIn } from "@/components/ui/fade-in";

export function ConsultationHero() {
  return (
    <Section padding="lg" background="gradient" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(230,63%,15%),transparent_60%)]" />
      <Container>
        <FadeIn>
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5">
              <Sparkles className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-300">
                Smart Project Discovery
              </span>
            </div>
            <Heading
              level="h1"
              className="text-4xl sm:text-5xl md:text-6xl"
              description="A structured consultation process that helps define project goals, priorities, and recommended technologies — so you start with clarity and confidence."
            >
              Let&apos;s Plan Your Next Software Project
            </Heading>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/consultation/discover">
                <Button size="lg" variant="primary">
                  Start Project Discovery
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/consultation/meeting">
                <Button size="lg" variant="secondary">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Consultation
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="ghost">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Talk to an Expert
                </Button>
              </Link>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
