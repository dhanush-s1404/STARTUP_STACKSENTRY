"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type TechItem = {
  name: string;
  category: string;
  color: string;
};

const technologies: TechItem[] = [
  { name: "Python", category: "Languages", color: "from-blue-400 to-blue-600" },
  { name: "FastAPI", category: "Backend", color: "from-emerald-400 to-emerald-600" },
  { name: "React", category: "Frontend", color: "from-cyan-400 to-cyan-600" },
  { name: "Next.js", category: "Frontend", color: "from-white/40 to-white/60" },
  { name: "TypeScript", category: "Languages", color: "from-blue-400 to-blue-600" },
  { name: "PostgreSQL", category: "Database", color: "from-blue-400 to-cyan-600" },
  { name: "Docker", category: "DevOps", color: "from-blue-400 to-blue-600" },
  { name: "Redis", category: "Database", color: "from-red-400 to-red-600" },
  { name: "AWS", category: "Cloud", color: "from-amber-400 to-amber-600" },
  { name: "Azure", category: "Cloud", color: "from-blue-400 to-blue-600" },
  { name: "Kubernetes", category: "DevOps", color: "from-blue-400 to-blue-500" },
  { name: "GitHub", category: "Tools", color: "from-gray-400 to-gray-600" },
  { name: "OpenAI", category: "AI", color: "from-green-400 to-green-600" },
  { name: "TensorFlow", category: "AI", color: "from-orange-400 to-orange-600" },
  { name: "PyTorch", category: "AI", color: "from-red-400 to-red-600" },
  { name: "Node.js", category: "Backend", color: "from-green-400 to-green-600" },
  { name: "GraphQL", category: "API", color: "from-pink-400 to-pink-600" },
  { name: "Tailwind CSS", category: "Frontend", color: "from-cyan-400 to-cyan-600" },
  { name: "Vercel", category: "Deploy", color: "from-gray-400 to-gray-600" },
  { name: "MongoDB", category: "Database", color: "from-green-400 to-green-600" },
];

export function TrustBarEnhanced() {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const totalWidth = container.scrollWidth / 2;

    let animationId: number;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      if (!isPaused) {
        const elapsed = (timestamp - startTime) * 0.08;
        const pos = -(elapsed % totalWidth);
        x.set(pos);
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused, x]);

  return (
    <section className="relative overflow-hidden border-y border-white/[0.04] bg-white/[0.01] py-16">
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[hsl(230,63%,5%)] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[hsl(230,63%,5%)] to-transparent z-10" />

      <div className="mb-6 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/20">
          Trusted Technology Stack
        </p>
      </div>

      <div
        ref={containerRef}
        className="flex gap-4 overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          className="flex gap-4"
          style={{ x: springX }}
        >
          {[...technologies, ...technologies].map((tech, i) => (
            <motion.div
              key={`${tech.name}-${i}`}
              whileHover={{ scale: 1.05 }}
              className="group relative flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-3 backdrop-blur-sm transition-colors hover:border-white/[0.10] hover:bg-white/[0.04]"
            >
              <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${tech.color}`} />
              <span className="whitespace-nowrap text-sm font-medium text-white/60 transition-colors group-hover:text-white/80">
                {tech.name}
              </span>
              <span className="whitespace-nowrap rounded-md bg-white/[0.03] px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-white/20">
                {tech.category}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
