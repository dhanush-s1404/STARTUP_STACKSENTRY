"use client";

import { motion } from "framer-motion";
import type { SolutionData } from "@/data/solutions";

export function SolutionDetailROI({ solution }: { solution: SolutionData }) {
  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-emerald-400 text-sm font-semibold tracking-widest uppercase">
            Return on Investment
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white">
            Measurable Business Impact
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl">
            Expected outcomes and ROI benchmarks based on our deployment track
            record with {solution.title}.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {solution.businessBenefits.map((benefit, idx) => (
            <motion.div
              key={benefit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                <span className="text-emerald-400 font-bold text-lg">
                  {idx + 1}
                </span>
              </div>
              <p className="text-white font-medium">{benefit}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
          {solution.features.map((feature, idx) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-center gap-2 text-sm text-slate-300"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              {feature}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
