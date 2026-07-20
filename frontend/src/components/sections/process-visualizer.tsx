"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { StoryReveal } from "./scroll-story";
import { Search, Target, Palette, Boxes, Code2, FlaskConical, Rocket, Headphones, ArrowRight } from "lucide-react";

const steps = [
  { icon: Search, title: "Discover", description: "Deep stakeholder interviews, market research, and opportunity analysis to align on vision.", color: "from-blue-500" },
  { icon: Target, title: "Research", description: "Competitive analysis, user research, technical feasibility, and roadmap definition.", color: "from-purple-500" },
  { icon: Palette, title: "Architecture", description: "System design, database modeling, API contracts, and technology selection.", color: "from-cyan-500" },
  { icon: Boxes, title: "UI/UX", description: "Wireframes, interactive prototypes, design systems, and usability testing.", color: "from-blue-500" },
  { icon: Code2, title: "Development", description: "Agile sprints with CI/CD, code reviews, pair programming, and daily demos.", color: "from-purple-500" },
  { icon: FlaskConical, title: "Testing", description: "Automated unit, integration, e2e tests, performance audits, and security scanning.", color: "from-cyan-500" },
  { icon: Rocket, title: "Deployment", description: "Zero-downtime rollout, monitoring, alerting, and disaster recovery.", color: "from-blue-500" },
  { icon: Headphones, title: "Support", description: "24/7 monitoring, SLA-backed support, continuous improvement, and scaling.", color: "from-purple-500" },
];

export function ProcessVisualizer() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <Section id="process" padding="lg" background="subtle">
      <Container>
        <StoryReveal>
          <Heading
            level="h2"
            gradient
            description="A refined methodology proven across hundreds of enterprise-scale deliveries."
          >
            How We Build
          </Heading>
        </StoryReveal>

        <div className="relative mt-20">
          <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-blue-500/30 via-purple-500/30 to-cyan-500/30 lg:left-1/2 lg:-translate-x-px" />

          <div className="relative space-y-12">
            {steps.map((step, index) => (
              <StoryReveal key={step.title} delay={index * 0.08}>
                <div
                  className="group relative flex items-start gap-6 lg:gap-0"
                  onMouseEnter={() => setActiveStep(index)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  <div className={cn(
                    "hidden w-1/2 lg:block",
                    index % 2 === 0 ? "pr-14 text-right" : "ml-auto pl-14",
                  )}>
                    <AnimatePresence>
                      {activeStep === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm leading-relaxed text-white/50">
                            {step.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="relative z-10 flex shrink-0 items-center justify-center">
                    <div className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br transition-all duration-300",
                      `${step.color}/10 to-transparent`,
                      "border border-white/[0.06] group-hover:scale-110 group-hover:shadow-lg",
                    )}
                    style={{
                      boxShadow: activeStep === index ? `0 0 30px hsl(var(--primary)/0.15)` : "none",
                    }}>
                      <step.icon className="h-5 w-5 text-blue-400 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <div className="absolute inset-0 rounded-xl bg-blue-500/5 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  <div className={cn(
                    "flex-1 pt-2.5 lg:hidden",
                    index % 2 === 0 ? "" : "",
                  )}>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-blue-400/60">0{index + 1}</span>
                      <h3 className="text-sm font-semibold text-white">{step.title}</h3>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-white/40">
                      {step.description}
                    </p>
                  </div>

                  <div className={cn(
                    "hidden lg:block w-1/2",
                    index % 2 === 0 ? "pl-14" : "pr-14 text-right",
                  )}>
                    <div className={cn(
                      "flex items-center gap-3",
                      index % 2 !== 0 && "flex-row-reverse",
                    )}>
                      <span className="text-xs font-bold text-blue-400/40">0{index + 1}</span>
                      <h3 className="text-base font-semibold text-white/90 transition-colors duration-300 group-hover:text-white">
                        {step.title}
                      </h3>
                      <motion.div
                        animate={{ x: activeStep === index ? 4 : 0 }}
                        className="text-blue-400/0 transition-colors duration-300 group-hover:text-blue-400"
                      >
                        <ArrowRight className="h-3.5 w-3.5" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </StoryReveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ");
}
