"use client";

import dynamic from "next/dynamic";

const AnimatedBackground = dynamic(
  () => import("@/components/shared/animated-background").then((m) => m.AnimatedBackground),
  { ssr: false },
);

export function ClientAnimatedBackground() {
  return <AnimatedBackground />;
}
