"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { StoryReveal } from "./scroll-story";
import { ArrowRight, Play, FileText } from "lucide-react";

function CTAVisualBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);
  const opacity = useTransform(scrollYProgress, [0.5, 1], [0.3, 0.6]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        style={{ rotate, scale, opacity }}
        className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-transparent blur-[100px]"
      />
      <motion.div
        style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, -15]), scale, opacity }}
        className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-purple-500/20 via-cyan-500/10 to-transparent blur-[100px]"
      />
      <div className="absolute inset-0 mesh-gradient opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(230,63%,4%)] via-transparent to-[hsl(230,63%,4%)]" />
    </div>
  );
}

export function CTACinematic() {
  return (
    <Section id="cta" padding="none" className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <CTAVisualBackground />

      <Container className="relative z-10 py-28 md:py-36">
        <StoryReveal>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto max-w-4xl text-center"
          >
            <div className="mb-6">
              <span className="inline-block rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 text-xs font-medium text-blue-300">
                Let&apos;s Build Together
              </span>
            </div>

            <h2 className="text-h1 text-white" style={{ lineHeight: 1.08 }}>
              Let&apos;s Build Something{" "}
              <span className="text-gradient-primary">Extraordinary</span>
              {" "}Together
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="mx-auto mt-6 max-w-2xl text-body-lg text-white/40"
            >
              Your vision deserves world-class execution. Let&apos;s discuss how we can
              architect, design, and develop a solution that transforms your business.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link href="/company/contact">
                <Button size="xl" icon={<ArrowRight className="h-5 w-5" />} iconPosition="right">
                  Start a Project
                </Button>
              </Link>
              <Link href="/company/contact">
                <Button variant="secondary" size="xl" icon={<Play className="h-4 w-4" />}>
                  Book Consultation
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-4"
            >
              <Link href="/company/contact">
                <Button variant="ghost" size="md">
                  <FileText className="mr-2 h-4 w-4" />
                  Request Proposal
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-white/20"
            >
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Typical response: &lt; 2 hours
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                Fixed-price or dedicated team
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                NDAs available
              </div>
            </motion.div>
          </motion.div>
        </StoryReveal>
      </Container>
    </Section>
  );
}
