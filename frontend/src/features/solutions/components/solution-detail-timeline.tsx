"use client";

import { motion } from "framer-motion";
import type { SolutionData } from "@/data/solutions";

const timelineSteps = [
  { phase: "Discovery", duration: "1-2 weeks", description: "Requirements gathering, stakeholder interviews, and current state assessment" },
  { phase: "Design", duration: "2-3 weeks", description: "Solution architecture, UX design, and technical specification" },
  { phase: "Development", duration: "8-12 weeks", description: "Iterative sprints with continuous integration and client demos" },
  { phase: "Testing", duration: "2-3 weeks", description: "QA, performance testing, security audit, and UAT" },
  { phase: "Deployment", duration: "1-2 weeks", description: "Staged rollout, data migration, and go-live support" },
  { phase: "Support", duration: "Ongoing", description: "24/7 monitoring, maintenance, and iterative enhancements" },
];

export function SolutionDetailTimeline({
  solution,
}: {
  solution: SolutionData;
}) {
  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-emerald-400 text-sm font-semibold tracking-widest uppercase">
            Implementation
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white">
            Delivery Timeline
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl">
            A proven implementation methodology for {solution.title} ensuring
            on-time, on-budget delivery.
          </p>
        </motion.div>

        <div className="mt-16 relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-slate-800" />

          <div className="space-y-12">
            {timelineSteps.map((step, idx) => (
              <motion.div
                key={step.phase}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative flex items-center gap-6 md:gap-0 ${
                  idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div
                  className={`flex-1 ${
                    idx % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"
                  } pl-16 md:pl-0`}
                >
                  <div
                    className={`inline-block ${
                      idx % 2 === 0 ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    <span className="text-emerald-400 text-xs font-semibold tracking-wider uppercase">
                      {step.phase}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1">
                      {step.duration}
                    </h3>
                    <p className="text-sm text-slate-400 mt-1 max-w-sm">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-emerald-500 border-4 border-slate-900" />

                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
