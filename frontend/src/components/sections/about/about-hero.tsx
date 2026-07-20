"use client";

import { useState, useCallback } from "react";
import { MotionDiv, MotionSection } from "@/lib/motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CountUp } from "@/components/ui/count-up";
import { useInView } from "@/hooks";
import {
  ArrowRight,
  Users,
  ChevronDown,
  ShieldCheck,
  Network,
  Code2,
  HeadphonesIcon,
} from "lucide-react";
import Link from "next/link";

const stats = [
  { end: 500, suffix: "+", label: "Projects", icon: Code2 },
  { end: 200, suffix: "+", label: "Clients", icon: Users },
  { end: 40, suffix: "+", label: "Countries", icon: Network },
  { end: 150, suffix: "+", label: "Developers", icon: ShieldCheck },
  { end: 50, suffix: "+", label: "Technologies", icon: Code2 },
  { end: 24, suffix: "/7", label: "Support", icon: HeadphonesIcon },
];

function FloatingShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <MotionDiv
        animate={{
          y: [0, -30, 0],
          rotate: [0, 10, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[10%] top-[15%] h-20 w-20 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm"
      />
      <MotionDiv
        animate={{
          y: [0, 20, 0],
          rotate: [0, -15, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute right-[15%] top-[25%] h-14 w-14 rounded-full border border-blue-500/10 bg-blue-500/5"
      />
      <MotionDiv
        animate={{
          x: [0, 25, 0],
          y: [0, -15, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[30%] left-[20%] h-16 w-16 rounded-xl border border-purple-500/10 bg-purple-500/5 rotate-45"
      />
      <MotionDiv
        animate={{
          y: [0, -25, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-[20%] right-[25%] h-10 w-10 rounded-full border border-cyan-500/10 bg-cyan-500/5"
      />
      <MotionDiv
        animate={{
          x: [0, -20, 0],
          rotate: [0, 20, 0],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute left-[50%] top-[60%] h-12 w-12 rounded-lg border border-emerald-500/10 bg-emerald-500/5"
      />
    </div>
  );
}

function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -left-[20%] -top-[20%] h-[60%] w-[60%] rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="absolute -right-[15%] top-[10%] h-[50%] w-[50%] rounded-full bg-purple-600/10 blur-[120px]" style={{ animationDelay: "7s" }} />
      <div className="absolute bottom-[10%] left-[30%] h-[40%] w-[40%] rounded-full bg-cyan-500/8 blur-[100px]" style={{ animationDelay: "14s" }} />
    </div>
  );
}

export function AboutHero() {
  const { ref: statsRef, isInView: statsInView } = useInView({ threshold: 0.3 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
    });
  }, []);

  return (
    <MotionSection
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="mesh-gradient absolute inset-0" aria-hidden="true" />
      <AuroraBackground />
      <FloatingShapes />

      <div
        className="pointer-events-none absolute inset-0 opacity-30 transition-all duration-700"
        style={{
          background: `radial-gradient(600px circle at ${50 + mousePos.x * 0.5}% ${50 + mousePos.y * 0.5}%, hsl(221 83% 53% / 0.15), transparent 50%)`,
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)` }}
          >
            <Badge variant="blue" size="md" className="mb-6">
              About StackSentry
            </Badge>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)` }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05]">
              Building the{" "}
              <span className="text-gradient-primary">Future</span>
              <br />
              of{" "}
              <span className="text-gradient-secondary">Enterprise Software</span>
            </h1>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ transform: `translate(${mousePos.x * -0.15}px, ${mousePos.y * -0.15}px)` }}
          >
            <p className="mx-auto mt-8 max-w-3xl text-lg text-[hsl(var(--color-text-tertiary))] leading-relaxed">
              StackSentry is a technology company dedicated to building
              world-class AI-powered enterprise software. We partner with
              organizations across the globe to design, develop, and deploy
              solutions that drive innovation, efficiency, and growth at scale.
            </p>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="/company/about#story">
              <Button size="xl" icon={<ArrowRight className="h-5 w-5" />} iconPosition="right">
                Our Story
              </Button>
            </Link>
            <Link href="/company/about#leadership">
              <Button variant="secondary" size="xl" icon={<Users className="h-5 w-5" />}>
                Meet the Team
              </Button>
            </Link>
          </MotionDiv>

          {/* Stats row */}
          <MotionDiv
            ref={statsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-20 grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass rounded-2xl p-4 text-center"
              >
                <stat.icon className="mx-auto mb-2 h-5 w-5 text-blue-400" />
                <div className="text-2xl font-bold text-white">
                  <CountUp from={0} to={stat.end} duration={2} suffix={stat.suffix} />
                </div>
                <div className="mt-1 text-xs text-[hsl(var(--color-text-muted))]">
                  {stat.label}
                </div>
              </div>
            ))}
          </MotionDiv>
        </div>
      </Container>

      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-[hsl(var(--color-text-muted))]">
          <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
          <ChevronDown className="h-5 w-5 animate-bounce-subtle" />
        </div>
      </MotionDiv>
    </MotionSection>
  );
}
