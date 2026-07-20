"use client";

import { motion } from "framer-motion";
import { SOLUTIONS } from "@/data/solutions";

const highlightedSolutions = [
  SOLUTIONS[0],
  SOLUTIONS[3],
  SOLUTIONS[4],
];

export function SolutionArchitectureShowcase() {
  return (
    <section className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-emerald-400 text-sm font-semibold tracking-widest uppercase">
            Architecture
          </span>
          <h2 className="mt-4 text-4xl font-bold text-white">
            Enterprise-Grade Architecture
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Every solution is built with scalable, secure, and maintainable
            architecture patterns designed for the enterprise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {highlightedSolutions.map((solution, idx) => (
            <motion.div
              key={solution.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-slate-700">
                <h3 className="text-lg font-bold text-white">
                  {solution.title}
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  {solution.description}
                </p>
              </div>
              <div className="p-6 space-y-4">
                {solution.architecture.map((layer) => (
                  <div key={layer.layer} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-emerald-400">
                        {layer.layer}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400">
                      {layer.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {layer.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md bg-slate-700/50 text-xs text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 border-t border-slate-700">
                <p className="text-xs text-slate-500 mb-2">Deployment</p>
                <div className="flex flex-wrap gap-1.5">
                  {solution.deploymentModels.map((model) => (
                    <span
                      key={model}
                      className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-xs text-emerald-400 font-medium"
                    >
                      {model}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
