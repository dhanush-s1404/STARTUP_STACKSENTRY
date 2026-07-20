"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { MotionDiv } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Play,
  Sparkles,
  ChevronDown,
  Globe,
  Shield,
  Zap,
} from "lucide-react";

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; color: string;
    }> = [];

    const colors = [
      "rgba(37,99,235,0.6)",
      "rgba(124,58,237,0.5)",
      "rgba(6,182,212,0.4)",
      "rgba(16,185,129,0.3)",
    ];

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.6 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          p.x -= dx * force * 0.01;
          p.y -= dy * force * 0.01;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const d = Math.sqrt((p.x - q.x) ** 2 + (p.y - q.y) ** 2);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(37,99,235,${0.08 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.globalAlpha = 1;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}

function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -left-[20%] -top-[20%] h-[60%] w-[60%] rounded-full bg-blue-600/10 blur-[120px] animate-aurora" />
      <div className="absolute -right-[15%] top-[10%] h-[50%] w-[50%] rounded-full bg-purple-600/10 blur-[120px] animate-aurora" style={{ animationDelay: "7s" }} />
      <div className="absolute bottom-[10%] left-[30%] h-[40%] w-[40%] rounded-full bg-cyan-500/8 blur-[100px] animate-aurora" style={{ animationDelay: "14s" }} />
    </div>
  );
}

function FloatingObjects() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute left-[15%] top-[20%] h-20 w-20 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm animate-float" />
      <div className="absolute right-[20%] top-[30%] h-14 w-14 rounded-full border border-blue-500/10 bg-blue-500/5 animate-float-slow" />
      <div className="absolute left-[60%] bottom-[25%] h-16 w-16 rounded-xl border border-purple-500/10 bg-purple-500/5 rotate-45 animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute left-[10%] bottom-[30%] h-10 w-10 rounded-full border border-cyan-500/10 bg-cyan-500/5 animate-float-fast" style={{ animationDelay: "1s" }} />
      <div className="absolute right-[10%] bottom-[40%] h-12 w-12 rounded-lg border border-emerald-500/10 bg-emerald-500/5 animate-float-slow" style={{ animationDelay: "3s" }} />
    </div>
  );
}

const techChips = [
  "React", "Next.js", "TypeScript", "Python", "FastAPI", "PostgreSQL",
  "Docker", "AWS", "OpenAI", "TensorFlow",
];

const trustBadges = [
  { icon: Shield, label: "Enterprise Security" },
  { icon: Globe, label: "40+ Countries" },
  { icon: Zap, label: "99.99% Uptime" },
  { icon: Sparkles, label: "AI-Powered" },
];

export function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
    });
  }, []);

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background layers */}
      <div className="mesh-gradient absolute inset-0" aria-hidden="true" />
      <AuroraBackground />
      <ParticleCanvas />
      <FloatingObjects />

      {/* Interactive glow that follows mouse */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30 transition-all duration-700"
        style={{
          background: `radial-gradient(600px circle at ${50 + mousePos.x * 0.5}% ${50 + mousePos.y * 0.5}%, hsl(221 83% 53% / 0.15), transparent 50%)`,
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 text-center">
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)` }}
        >
          {/* Trust badges */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
            {trustBadges.map((badge, i) => (
              <MotionDiv
                key={badge.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <Badge variant="default" size="md" className="border-white/[0.08] bg-white/[0.04] backdrop-blur-sm">
                  <badge.icon className="mr-1.5 h-3.5 w-3.5 text-blue-400" />
                  {badge.label}
                </Badge>
              </MotionDiv>
            ))}
          </div>

          {/* Live indicator */}
          <MotionDiv
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Badge variant="blue" size="md" className="mb-8">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Enterprise AI Platform v3.0 — Now Available
            </Badge>
          </MotionDiv>

          {/* Main heading */}
          <h1 className="text-hero text-white" style={{ lineHeight: 1.05 }}>
            Building{" "}
            <span className="text-gradient-primary">Intelligent</span>
            <br />
            Software for{" "}
            <span className="text-gradient-secondary">Tomorrow</span>
          </h1>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ transform: `translate(${mousePos.x * -0.15}px, ${mousePos.y * -0.15}px)` }}
        >
          <p className="mx-auto mt-8 max-w-3xl text-body-lg text-[hsl(var(--color-text-tertiary))] leading-relaxed">
            We design and develop AI-powered enterprise software, cloud platforms,
            automation systems, and recruitment technology — trusted by organizations
            across 40+ countries to drive innovation at scale.
          </p>
        </MotionDiv>

        {/* CTAs */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button size="xl" icon={<ArrowRight className="h-5 w-5" />} iconPosition="right">
            Start Your Project
          </Button>
          <Button variant="secondary" size="xl" icon={<Play className="h-4 w-4" />}>
            Book Consultation
          </Button>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6 }}
          className="mt-6 flex items-center justify-center gap-4"
        >
          <Button variant="ghost" size="md">
            Explore Portfolio
          </Button>
          <Button variant="ghost" size="md">
            View Careers
          </Button>
        </MotionDiv>

        {/* Tech chips */}
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-2"
        >
          {techChips.map((tech, i) => (
            <span
              key={tech}
              className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-xs font-medium text-[hsl(var(--color-text-muted))] backdrop-blur-sm transition-colors hover:border-white/[0.12] hover:text-[hsl(var(--color-text-secondary))]"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {tech}
            </span>
          ))}
        </MotionDiv>

        {/* Satisfaction indicators */}
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm text-[hsl(var(--color-text-muted))]"
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {["bg-blue-500", "bg-purple-500", "bg-cyan-500", "bg-emerald-500"].map((bg, i) => (
                <div key={i} className={`h-7 w-7 rounded-full ${bg} ring-2 ring-[hsl(230,63%,5%)] flex items-center justify-center text-[10px] font-bold text-white`}>
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <span>500+ Enterprise Clients</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <svg key={s} className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span>4.9/5 Client Rating</span>
          </div>
        </MotionDiv>
      </div>

      {/* Scroll indicator */}
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
    </section>
  );
}
