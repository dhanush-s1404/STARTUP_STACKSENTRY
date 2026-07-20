"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { FadeIn } from "@/components/ui/fade-in";
import { MotionDiv } from "@/lib/motion";
import { useInView } from "@/hooks";

const charts = [
  {
    title: "Projects Delivered",
    data: [
      { label: "Q1 24", value: 3 },
      { label: "Q2 24", value: 5 },
      { label: "Q3 24", value: 7 },
      { label: "Q4 24", value: 8 },
      { label: "Q1 25", value: 10 },
      { label: "Q2 25", value: 12 },
      { label: "Q3 25", value: 14 },
      { label: "Q4 25", value: 15 },
    ],
    color: "from-blue-500 to-blue-400",
    max: 15,
  },
  {
    title: "Client Satisfaction",
    data: [
      { label: "Q1 24", value: 92 },
      { label: "Q2 24", value: 94 },
      { label: "Q3 24", value: 95 },
      { label: "Q4 24", value: 96 },
      { label: "Q1 25", value: 97 },
      { label: "Q2 25", value: 98 },
      { label: "Q3 25", value: 98 },
      { label: "Q4 25", value: 99 },
    ],
    suffix: "%",
    color: "from-emerald-500 to-emerald-400",
    max: 100,
  },
  {
    title: "Team Growth",
    data: [
      { label: "Q1 24", value: 15 },
      { label: "Q2 24", value: 25 },
      { label: "Q3 24", value: 35 },
      { label: "Q4 24", value: 50 },
      { label: "Q1 25", value: 65 },
      { label: "Q2 25", value: 80 },
      { label: "Q3 25", value: 100 },
      { label: "Q4 25", value: 120 },
    ],
    color: "from-purple-500 to-purple-400",
    max: 120,
  },
  {
    title: "Revenue Growth",
    data: [
      { label: "Q1 24", value: 100, display: "$100K" },
      { label: "Q2 24", value: 200, display: "$200K" },
      { label: "Q3 24", value: 350, display: "$350K" },
      { label: "Q4 24", value: 500, display: "$500K" },
      { label: "Q1 25", value: 750, display: "$750K" },
      { label: "Q2 25", value: 1000, display: "$1M" },
      { label: "Q3 25", value: 1500, display: "$1.5M" },
      { label: "Q4 25", value: 2000, display: "$2M" },
    ],
    color: "from-amber-500 to-amber-400",
    max: 2000,
  },
];

export function ClientSuccessChart() {
  return (
    <Section padding="lg">
      <Container>
        <FadeIn>
          <Heading
            level="h2"
            description="Tracking our growth and performance over time."
          >
            Performance Over Time
          </Heading>
        </FadeIn>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {charts.map((chart, chartIndex) => (
            <FadeIn key={chart.title} delay={chartIndex * 0.1}>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm">
                <h3 className="mb-6 text-sm font-semibold text-white/70">
                  {chart.title}
                </h3>
                <BarChart
                  data={chart.data}
                  max={chart.max}
                  color={chart.color}
                />
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function BarChart({
  data,
  max,
  color,
}: {
  data: { label: string; value: number; display?: string }[];
  max: number;
  color: string;
}) {
  const { ref, isInView } = useInView({ threshold: 0.3 });

  return (
    <div ref={ref} className="flex items-end gap-2 h-40">
      {data.map((item, i) => (
        <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
          <MotionDiv
            initial={{ height: 0 }}
            animate={isInView ? { height: `${(item.value / max) * 100}%` } : { height: 0 }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full rounded-t-md bg-gradient-to-t ${color} min-h-[2px]`}
          />
          <span className="text-[10px] text-white/30 whitespace-nowrap">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
