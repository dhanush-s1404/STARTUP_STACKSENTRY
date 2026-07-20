"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Briefcase, BookOpen, ChevronDown, Shield, Globe, Zap, Sparkles, Cpu, Activity, Server, Cloud, Code2, CheckCircle2, Timer, Star } from "lucide-react";

const trustBadges = [
  { icon: Shield, label: "Enterprise Security" },
  { icon: Globe, label: "40+ Countries" },
  { icon: Zap, label: "99.99% Uptime" },
  { icon: Sparkles, label: "AI-Powered" },
];

const commandCenterMetrics = [
  { label: "System Status", value: "Operational", color: "text-emerald-400", icon: Activity, trend: "All systems nominal" },
  { label: "Active Projects", value: "47", color: "text-blue-400", icon: Code2, trend: "+3 this month" },
  { label: "AI Services", value: "98.7%", color: "text-purple-400", icon: Cpu, trend: "Uptime" },
  { label: "Cloud Infra", value: "12", color: "text-cyan-400", icon: Cloud, trend: "Global regions" },
  { label: "API Requests", value: "1.2M", color: "text-amber-400", icon: Server, trend: "Today" },
  { label: "Client Sat.", value: "4.9/5", color: "text-emerald-400", icon: Star, trend: "Across 500+ clients" },
  { label: "Avg Response", value: "<12ms", color: "text-blue-400", icon: Timer, trend: "P95 latency" },
  { label: "Deployments", value: "1,247", color: "text-purple-400", icon: CheckCircle2, trend: "Successful" },
];

const techChips = [
  "React", "Next.js", "TypeScript", "Python", "FastAPI", "PostgreSQL",
  "Docker", "AWS", "OpenAI", "TensorFlow",
];

function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const layers = [6, 8, 6];
    const nodes: { x: number; y: number; layer: number; index: number }[] = [];
    const connections: { from: number; to: number }[] = [];

    const gap = 120;
    const startX = canvas.offsetWidth / 2 - ((layers.length - 1) * gap) / 2;
    const centerY = canvas.offsetHeight / 2;

    layers.forEach((count, layerIdx) => {
      const x = startX + layerIdx * gap;
      const layerGap = Math.min(30, (canvas.offsetHeight - 80) / (count + 1));
      const layerStartY = centerY - ((count - 1) * layerGap) / 2;
      for (let i = 0; i < count; i++) {
        const idx = nodes.length;
        nodes.push({ x, y: layerStartY + i * layerGap, layer: layerIdx, index: i });
        if (layerIdx > 0) {
          const prevLayerStart = idx - count - layers[layerIdx - 1];
          for (let j = 0; j < layers[layerIdx - 1]; j++) {
            connections.push({ from: prevLayerStart + j, to: idx });
          }
        }
      }
    });

    let time = 0;
    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      time += 0.02;

      connections.forEach((conn) => {
        const from = nodes[conn.from];
        const to = nodes[conn.to];
        if (!from || !to) return;
        const pulse = Math.sin(time + conn.from * 0.5) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = `rgba(59, 130, 246, ${0.06 + pulse * 0.08})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      nodes.forEach((node) => {
        const pulse = Math.sin(time + node.index * 0.3 + node.layer * 0.5) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2.5 + pulse * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${0.4 + pulse * 0.4})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(node.x, node.y, 6 + pulse * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${0.05 + pulse * 0.1})`;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full opacity-40"
      aria-hidden="true"
    />
  );
}

function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -left-[20%] -top-[20%] h-[70%] w-[70%] rounded-full bg-blue-600/8 blur-[150px] animate-aurora" />
      <div className="absolute -right-[15%] top-[5%] h-[55%] w-[55%] rounded-full bg-purple-600/8 blur-[150px] animate-aurora" style={{ animationDelay: "7s" }} />
      <div className="absolute bottom-[5%] left-[25%] h-[45%] w-[45%] rounded-full bg-cyan-500/6 blur-[120px] animate-aurora" style={{ animationDelay: "14s" }} />
      <div className="absolute right-[30%] top-[40%] h-[35%] w-[35%] rounded-full bg-blue-500/5 blur-[100px] animate-aurora" style={{ animationDelay: "21s" }} />
    </div>
  );
}

function FloatingNodes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {[ 
        { x: "15%", y: "18%", size: "h-16 w-16", delay: "0s", border: "border-blue-500/10", bg: "bg-blue-500/5" },
        { x: "80%", y: "25%", size: "h-12 w-12", delay: "1s", border: "border-purple-500/10", bg: "bg-purple-500/5" },
        { x: "65%", y: "70%", size: "h-14 w-14", delay: "2s", border: "border-cyan-500/10", bg: "bg-cyan-500/5" },
        { x: "10%", y: "65%", size: "h-10 w-10", delay: "0.5s", border: "border-emerald-500/10", bg: "bg-emerald-500/5" },
        { x: "45%", y: "12%", size: "h-8 w-8", delay: "1.5s", border: "border-amber-500/10", bg: "bg-amber-500/5" },
        { x: "88%", y: "55%", size: "h-11 w-11", delay: "3s", border: "border-blue-400/10", bg: "bg-blue-400/5" },
      ].map((node, i) => (
        <div
          key={i}
          className={`absolute rounded-2xl border ${node.border} ${node.bg} backdrop-blur-sm ${node.size} animate-float`}
          style={{ left: node.x, top: node.y, animationDelay: node.delay, borderRadius: `${30 + i * 10}%` }}
        />
      ))}
    </div>
  );
}

function CommandCenterPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="hidden w-full max-w-2xl lg:block"
    >
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
              <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="ml-2 text-xs font-medium text-white/40">AI Command Center</span>
          </div>
          <span className="flex items-center gap-1.5 text-xs text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </span>
        </div>
        <div className="grid grid-cols-4 gap-px bg-white/[0.04]">
          {commandCenterMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.label} className="bg-[hsl(230,63%,4%)] p-3 transition-colors hover:bg-white/[0.02]">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Icon className="h-3 w-3 text-white/30" />
                  <span className="text-[10px] font-medium text-white/30 uppercase tracking-wider">{metric.label}</span>
                </div>
                <div className={cn("text-sm font-bold tracking-tight", metric.color)}>{metric.value}</div>
                <div className="text-[9px] text-white/20 mt-0.5">{metric.trend}</div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export function CinematicHero() {
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
      <div className="mesh-gradient absolute inset-0" aria-hidden="true" />
      <AuroraBackground />
      <NeuralNetwork />
      <FloatingNodes />

      <div
        className="pointer-events-none absolute inset-0 opacity-30 transition-all duration-700"
        style={{
          background: `radial-gradient(600px circle at ${50 + mousePos.x * 0.5}% ${50 + mousePos.y * 0.5}%, hsl(221 83% 53% / 0.15), transparent 50%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-4 py-20 lg:flex-row lg:items-start lg:gap-16">
        <div className="flex-1 pt-8 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)` }}
          >
            <div className="mb-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              {trustBadges.map((badge, i) => (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                >
                  <Badge variant="default" size="md" className="border-white/[0.08] bg-white/[0.04] backdrop-blur-sm">
                    <badge.icon className="mr-1.5 h-3.5 w-3.5 text-blue-400" />
                    {badge.label}
                  </Badge>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Badge variant="blue" size="md" className="mb-6">
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Enterprise AI Platform v3.0 — Now Available
              </Badge>
            </motion.div>

            <h1 className="text-hero text-white" style={{ lineHeight: 1.05 }}>
              Building{" "}
              <span className="text-gradient-primary">Intelligent</span>
              <br />
              Software for{" "}
              <span className="text-gradient-secondary">Tomorrow</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ transform: `translate(${mousePos.x * -0.15}px, ${mousePos.y * -0.15}px)` }}
            className="mx-auto mt-8 max-w-2xl text-body-lg text-white/40 leading-relaxed lg:mx-0"
          >
            We design and develop AI-powered enterprise software, cloud platforms,
            automation systems, and recruitment technology — trusted by organizations
            across 40+ countries to drive innovation at scale.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
          >
            <Link href="/company/contact">
              <Button size="xl" icon={<ArrowRight className="h-5 w-5" />} iconPosition="right">
                Start Your Project
              </Button>
            </Link>
            <Link href="/company/contact">
              <Button variant="secondary" size="xl" icon={<Play className="h-4 w-4" />}>
                Book Consultation
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <Link href="/portfolio">
              <Button variant="ghost" size="md">
                <Briefcase className="mr-2 h-4 w-4" />
                Explore Portfolio
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="ghost" size="md">
                <BookOpen className="mr-2 h-4 w-4" />
                View Services
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-2 lg:justify-start"
          >
            {techChips.map((tech, i) => (
              <span
                key={tech}
                className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-xs font-medium text-white/30 backdrop-blur-sm transition-colors hover:border-white/[0.12] hover:text-white/50"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {tech}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/30 lg:justify-start"
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
          </motion.div>
        </div>

        <div className="mt-12 flex-1 lg:mt-0">
          <CommandCenterPanel />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-white/30">
          <span className="text-[10px] uppercase tracking-[0.2em]">Scroll to explore</span>
          <ChevronDown className="h-4 w-4 animate-bounce-subtle" />
        </div>
      </motion.div>
    </section>
  );
}
