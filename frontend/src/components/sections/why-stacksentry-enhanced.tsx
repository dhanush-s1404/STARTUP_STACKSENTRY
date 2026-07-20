"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { StoryReveal } from "./scroll-story";
import { motion } from "framer-motion";
import { Lightbulb, ShieldCheck, Maximize, Zap, Code2, Rocket, Globe, Users, Eye, GitBranch, ArrowRight } from "lucide-react";

const reasons = [
  { icon: Lightbulb, title: "Innovation First", description: "Cutting-edge AI and ML integrated into every solution we build. We don't just follow trends — we set them.", color: "blue" },
  { icon: ShieldCheck, title: "Enterprise Security", description: "Bank-grade encryption, SOC2 alignment, and security-first architecture in every deliverable.", color: "purple" },
  { icon: Maximize, title: "Scalability by Design", description: "Architected to handle millions of users from day one with auto-scaling, caching, and CDN strategies.", color: "cyan" },
  { icon: Zap, title: "Performance Optimized", description: "Sub-100ms response times, lighthouse scores above 95, and optimized infrastructure at every layer.", color: "emerald" },
  { icon: Code2, title: "Clean Architecture", description: "Maintainable, testable code following SOLID principles, design patterns, and industry best practices.", color: "blue" },
  { icon: Rocket, title: "Modern Tech Stack", description: "Latest frameworks, cloud-native architecture, AI-first approaches, and continuous modernization.", color: "purple" },
  { icon: Globe, title: "Global Delivery", description: "Distributed teams across time zones providing 24/7 coverage, support, and rapid response.", color: "cyan" },
  { icon: Users, title: "Dedicated Partnership", description: "Embedded teams that become extensions of your organization with shared goals and metrics.", color: "emerald" },
  { icon: Eye, title: "Full Transparency", description: "Complete visibility into development with daily standups, sprint reviews, and real-time dashboards.", color: "blue" },
  { icon: GitBranch, title: "Agile Excellence", description: "Two-week sprints with continuous delivery, automated testing, and rapid feedback integration.", color: "purple" },
];

const colorMap: Record<string, { border: string; bg: string; text: string; glow: string }> = {
  blue: { border: "group-hover:border-blue-500/30", bg: "from-blue-500/10 to-blue-600/5", text: "text-blue-400", glow: "group-hover:shadow-blue-500/10" },
  purple: { border: "group-hover:border-purple-500/30", bg: "from-purple-500/10 to-purple-600/5", text: "text-purple-400", glow: "group-hover:shadow-purple-500/10" },
  cyan: { border: "group-hover:border-cyan-500/30", bg: "from-cyan-500/10 to-cyan-600/5", text: "text-cyan-400", glow: "group-hover:shadow-cyan-500/10" },
  emerald: { border: "group-hover:border-emerald-500/30", bg: "from-emerald-500/10 to-emerald-600/5", text: "text-emerald-400", glow: "group-hover:shadow-emerald-500/10" },
};

export function WhyStackSentryEnhanced() {
  return (
    <Section id="why-us" padding="lg">
      <Container>
        <StoryReveal>
          <Heading
            level="h2"
            gradient
            description="The principles and practices that make us the preferred technology partner for enterprises worldwide."
          >
            Why StackSentry
          </Heading>
        </StoryReveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {reasons.map((reason, index) => (
            <StoryReveal key={reason.title} delay={index * 0.04}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                className={`group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 text-center transition-all duration-300 hover:bg-white/[0.04] ${colorMap[reason.color].border} ${colorMap[reason.color].glow}`}
              >
                <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${colorMap[reason.color].bg} transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                  <reason.icon className={`h-6 w-6 ${colorMap[reason.color].text} transition-transform duration-300 group-hover:scale-110`} />
                </div>
                <h3 className="mb-2 text-sm font-semibold text-white">{reason.title}</h3>
                <p className="text-xs leading-relaxed text-white/40">
                  {reason.description}
                </p>
                <div className={`mt-4 flex items-center justify-center gap-1 text-xs font-medium ${colorMap[reason.color].text} opacity-0 transition-all duration-300 group-hover:opacity-100`}>
                  <span>Learn more</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </motion.div>
            </StoryReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
