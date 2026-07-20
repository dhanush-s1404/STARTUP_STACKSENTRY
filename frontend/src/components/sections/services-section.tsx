"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { MotionDiv } from "@/lib/motion";
import {
  BrainCircuit,
  Building2,
  Globe,
  Cloud,
  ShieldCheck,
  Workflow,
  Users,
  Smartphone,
  Code2,
  Palette,
  ArrowRight,
} from "lucide-react";

const services = [
  { icon: BrainCircuit, title: "AI Development", description: "Custom AI models, NLP, computer vision, and intelligent automation systems.", color: "blue" as const },
  { icon: Building2, title: "Enterprise Software", description: "Scalable ERP, CRM, and custom enterprise platforms built for growth.", color: "purple" as const },
  { icon: Globe, title: "Web Development", description: "Next-gen web applications with React, Next.js, and modern stacks.", color: "cyan" as const },
  { icon: Cloud, title: "Cloud Engineering", description: "AWS, Azure, and GCP infrastructure with Kubernetes orchestration.", color: "blue" as const },
  { icon: ShieldCheck, title: "Cyber Security", description: "Penetration testing, security audits, and compliance solutions.", color: "purple" as const },
  { icon: Workflow, title: "Automation", description: "Business process automation with intelligent workflows and AI.", color: "cyan" as const },
  { icon: Users, title: "Recruitment Platforms", description: "AI-powered ATS, candidate matching, and hiring automation.", color: "blue" as const },
  { icon: Smartphone, title: "Mobile Applications", description: "Native and cross-platform mobile apps for iOS and Android.", color: "purple" as const },
  { icon: Code2, title: "API Development", description: "RESTful, GraphQL, and real-time APIs with comprehensive documentation.", color: "cyan" as const },
  { icon: Palette, title: "UI/UX Design", description: "User-centered design systems, prototypes, and premium interfaces.", color: "blue" as const },
];

const glowColors = {
  blue: "group-hover:shadow-blue-500/20 group-hover:border-blue-500/20",
  purple: "group-hover:shadow-purple-500/20 group-hover:border-purple-500/20",
  cyan: "group-hover:shadow-cyan-500/20 group-hover:border-cyan-500/20",
};

const iconBgColors = {
  blue: "from-blue-500/10 to-blue-600/5 group-hover:from-blue-500/20 group-hover:to-blue-600/10",
  purple: "from-purple-500/10 to-purple-600/5 group-hover:from-purple-500/20 group-hover:to-purple-600/10",
  cyan: "from-cyan-500/10 to-cyan-600/5 group-hover:from-cyan-500/20 group-hover:to-cyan-600/10",
};

const iconColors = {
  blue: "text-blue-400 group-hover:text-blue-300",
  purple: "text-purple-400 group-hover:text-purple-300",
  cyan: "text-cyan-400 group-hover:text-cyan-300",
};

export function ServicesSection() {
  return (
    <Section id="services" padding="lg">
      <Container>
        <ScrollReveal>
          <Heading
            level="h2"
            gradient
            description="End-to-end technology solutions crafted for the world's most demanding enterprises."
          >
            Our Services
          </Heading>
        </ScrollReveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {services.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 0.05}>
              <MotionDiv
                whileHover={{ y: -4 }}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:bg-white/[0.04] hover:shadow-xl ${glowColors[service.color]}`}
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br transition-all duration-300 ${iconBgColors[service.color]}`}>
                  <service.icon className={`h-6 w-6 transition-colors duration-300 ${iconColors[service.color]}`} />
                </div>
                <h3 className="mb-2 text-base font-semibold text-white">{service.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-[hsl(var(--color-text-muted))] line-clamp-2">
                  {service.description}
                </p>
                <div className="flex items-center gap-1 text-sm font-medium text-blue-400 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Learn More <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </MotionDiv>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
