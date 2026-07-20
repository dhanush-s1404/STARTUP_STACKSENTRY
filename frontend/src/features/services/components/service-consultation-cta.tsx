"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/ui/fade-in";
import {
  Calendar,
  MessageSquare,
  Phone,
  ArrowRight,
  Sparkles,
  Shield,
  Clock,
} from "lucide-react";

const options = [
  {
    title: "Free Discovery Call",
    description: "30-minute video call to discuss your project needs and goals",
    icon: Calendar,
    href: "/contact?type=discovery",
    features: ["No obligation", "Expert consultation", "Project roadmap"],
  },
  {
    title: "Technical Assessment",
    description: "In-depth review of your technical architecture and codebase",
    icon: MessageSquare,
    href: "/contact?type=assessment",
    features: ["Architecture review", "Performance audit", "Recommendations"],
  },
  {
    title: "Quick Chat",
    description: "Get immediate answers to your questions via phone or chat",
    icon: Phone,
    href: "/contact",
    features: ["Fast response", "Direct access", "No paperwork"],
  },
];

const guarantees = [
  { icon: Sparkles, text: "Free initial consultation" },
  { icon: Shield, text: "Confidentiality guaranteed" },
  { icon: Clock, text: "Response within 24 hours" },
];

export function ServiceConsultationCTA() {
  return (
    <Section padding="lg" background="gradient">
      <Container>
        <div className="relative">
          {/* Background glow */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-40 top-0 h-80 w-80 rounded-full bg-blue-500/20 blur-[120px]" />
            <div className="absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-purple-500/20 blur-[120px]" />
          </div>

          <div className="relative z-10">
            <FadeIn delay={0.1}>
              <div className="mx-auto max-w-2xl text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-400">
                  <Sparkles className="h-4 w-4" />
                  Start Your Journey
                </span>
                <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                  Ready to Build Something{" "}
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    Extraordinary
                  </span>
                  ?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-base text-white/50">
                  Choose how you'd like to get started. No pressure, just expert guidance
                  tailored to your needs.
                </p>
              </div>
            </FadeIn>

            {/* Options grid */}
            <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-3">
              {options.map((option, index) => {
                const Icon = option.icon;
                return (
                  <FadeIn key={option.title} delay={0.2 + index * 0.1}>
                    <Link
                      href={option.href}
                      className="group flex h-full flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 hover:bg-white/[0.04] hover:shadow-xl"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                        <Icon className="h-6 w-6 text-blue-400" />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-white">
                        {option.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/50">
                        {option.description}
                      </p>
                      <ul className="mt-4 flex-1 space-y-2">
                        {option.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-xs text-white/40">
                            <div className="h-1 w-1 rounded-full bg-blue-400" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 flex items-center gap-2 text-sm font-medium text-blue-400 opacity-0 transition-opacity group-hover:opacity-100">
                        Get Started
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </Link>
                  </FadeIn>
                );
              })}
            </div>

            {/* Guarantees */}
            <FadeIn delay={0.6}>
              <div className="mx-auto mt-12 flex max-w-lg flex-wrap items-center justify-center gap-6">
                {guarantees.map((g) => {
                  const Icon = g.icon;
                  return (
                    <div
                      key={g.text}
                      className="flex items-center gap-2 text-sm text-white/40"
                    >
                      <Icon className="h-4 w-4 text-emerald-400" />
                      {g.text}
                    </div>
                  );
                })}
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </Section>
  );
}
