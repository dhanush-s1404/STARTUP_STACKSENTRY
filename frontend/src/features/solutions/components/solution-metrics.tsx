"use client";

import { motion } from "framer-motion";
import { METRICS } from "@/data/metrics";

export function SolutionMetrics() {
  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-emerald-400 text-sm font-semibold tracking-widest uppercase">
            Impact Metrics
          </span>
          <h2 className="mt-4 text-4xl font-bold text-white">
            Numbers That Speak
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Real results delivered across our enterprise solution deployments.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {METRICS.slice(0, 8).map((metric, idx) => (
            <motion.div
              key={metric.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-emerald-400">
                {metric.prefix || ""}
                {metric.value}
                <span className="text-lg">{metric.suffix}</span>
              </div>
              <p className="mt-2 text-sm font-medium text-white">
                {metric.label}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
