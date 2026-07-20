"use client";

import { motion } from "framer-motion";
import type { SolutionData } from "@/data/solutions";

export function SolutionDetailComparison({
  solution,
}: {
  solution: SolutionData;
}) {
  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-emerald-400 text-sm font-semibold tracking-widest uppercase">
            Deployment & Integration
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white">
            Flexible Deployment Options
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl">
            {solution.title} supports multiple deployment models and integrates
            with your existing technology ecosystem.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8"
          >
            <h3 className="text-lg font-bold text-white mb-6">
              Deployment Models
            </h3>
            <div className="space-y-4">
              {solution.deploymentModels.map((model) => (
                <div
                  key={model}
                  className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-xl"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <svg
                      className="w-4 h-4 text-emerald-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-slate-300 font-medium">
                    {model}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8"
          >
            <h3 className="text-lg font-bold text-white mb-6">
              Integration Support
            </h3>
            <div className="space-y-4">
              {solution.integrationSupport.map((integration) => (
                <div
                  key={integration}
                  className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-xl"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                    <svg
                      className="w-4 h-4 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-slate-300 font-medium">
                    {integration}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
