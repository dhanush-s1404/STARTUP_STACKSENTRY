"use client";

import { useRef, useState, useEffect } from "react";

type TechItem = {
  name: string;
  category?: string;
};

const technologies: TechItem[] = [
  { name: "Python", category: "Languages" },
  { name: "FastAPI", category: "Backend" },
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Languages" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Docker", category: "DevOps" },
  { name: "Redis", category: "Database" },
  { name: "AWS", category: "Cloud" },
  { name: "Azure", category: "Cloud" },
  { name: "Kubernetes", category: "DevOps" },
  { name: "GitHub", category: "Tools" },
  { name: "OpenAI", category: "AI" },
  { name: "TensorFlow", category: "AI" },
  { name: "PyTorch", category: "AI" },
  { name: "Node.js", category: "Backend" },
  { name: "GraphQL", category: "API" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Vercel", category: "Deploy" },
  { name: "MongoDB", category: "Database" },
];

function TechBadge({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.06]">
      <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
      <span className="whitespace-nowrap text-sm font-medium text-[hsl(var(--color-text-secondary))]">
        {name}
      </span>
    </div>
  );
}

export function TechMarquee() {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationId: number;
    let offset = 0;
    const speed = 0.5;

    const animate = () => {
      if (!isPaused) {
        offset -= speed;
        const firstChild = container.firstElementChild as HTMLElement;
        if (firstChild) {
          const itemWidth = firstChild.offsetWidth;
          if (Math.abs(offset) >= itemWidth) {
            offset += itemWidth;
            container.appendChild(container.firstElementChild!);
          }
        }
        container.style.transform = `translateX(${offset}px)`;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  return (
    <section className="relative overflow-hidden border-y border-white/[0.04] bg-white/[0.01] py-12">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[hsl(230,63%,5%)] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[hsl(230,63%,5%)] to-transparent z-10" />

      <div
        className="flex gap-4"
        ref={containerRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {[...technologies, ...technologies].map((tech, i) => (
          <TechBadge key={`${tech.name}-${i}`} name={tech.name} />
        ))}
      </div>
    </section>
  );
}
