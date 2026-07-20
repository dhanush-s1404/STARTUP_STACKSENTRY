"use client";

import { MotionDiv, MotionSpan } from "@/lib/motion";
import { cn } from "@/lib/cn";

type AnimatedTextProps = {
  text: string;
  mode?: "words" | "chars" | "lines";
  staggerChildren?: number;
  className?: string;
};

const containerVariants = {
  hidden: {},
  visible: (custom: { staggerChildren: number }) => ({
    transition: {
      staggerChildren: custom.staggerChildren,
    },
  }),
};

const wordVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const charVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

export function AnimatedText({
  text,
  mode = "words",
  staggerChildren = 0.03,
  className,
}: AnimatedTextProps) {
  const items =
    mode === "chars"
      ? text.split("")
      : mode === "words"
        ? text.split(" ")
        : text.split("\n");

  return (
    <MotionDiv
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={containerVariants}
      custom={{ staggerChildren }}
      className={cn(
        "flex",
        mode === "words" && "flex-wrap gap-x-[0.25em]",
        mode === "chars" && "flex-wrap",
        className,
      )}
    >
      {items.map((item, i) => (
        <MotionSpan
          key={i}
          variants={mode === "chars" ? charVariants : wordVariants}
          className={cn(mode === "words" && "inline-block")}
        >
          {item}
          {mode === "words" && i < items.length - 1 && "\u00A0"}
        </MotionSpan>
      ))}
    </MotionDiv>
  );
}
