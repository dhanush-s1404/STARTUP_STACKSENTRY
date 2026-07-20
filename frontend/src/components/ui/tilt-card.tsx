"use client";

import { MotionDiv, useMotionValue, useTransform } from "@/lib/motion";
import { cn } from "@/lib/cn";

type TiltCardProps = {
  maxTilt?: number;
  glare?: boolean;
  children: React.ReactNode;
  className?: string;
};

export function TiltCard({ maxTilt = 15, glare = true, children, className }: TiltCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const glareOpacity = useTransform([x, y], ([xVal, yVal]) => {
    const xNum = typeof xVal === "number" ? xVal : 0;
    const yNum = typeof yVal === "number" ? yVal : 0;
    return Math.sqrt(xNum * xNum + yNum * yNum) * 0.5;
  });

  return (
    <MotionDiv
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      whileHover={{ scale: 1.02 }}
      className={cn("relative overflow-hidden", className)}
    >
      {children}
      {glare && (
        <MotionDiv
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: glareOpacity,
            background:
              "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 60%)",
          }}
        />
      )}
    </MotionDiv>
  );
}
