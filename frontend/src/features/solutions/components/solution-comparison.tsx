"use client";

import { motion } from "framer-motion";
import { SOLUTIONS } from "@/data/solutions";
import { useState } from "react";

const comparisonCategories = [
  "Deployment Models",
  "Integration Support",
  "Architecture Layers",
  "Business Benefits",
];

export function SolutionComparison() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [selectedSolutions, setSelectedSolutions] = useState<string[]>(
    SOLUTIONS.slice(0, 3).map((s) => s.slug),
  );

  const toggleSolution = (slug: string) => {
    setSelectedSolutions((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  };

  const filteredSolutions = SOLUTIONS.filter((s) =>
    selectedSolutions.includes(s.slug),
  );

  const getValue = (solution: (typeof SOLUTIONS)[0], catIndex: number) => {
    switch (catIndex) {
      case 0:
        return solution.deploymentModels;
      case 1:
        return solution.integrationSupport;
      case 2:
        return solution.architecture.map((a) => a.layer);
      case 3:
        return solution.businessBenefits;
      default:
        return [];
    }
  };

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
            Compare Solutions
          </span>
          <h2 className="mt-4 text-4xl font-bold text-white">
            Side-by-Side Comparison
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Select solutions to compare features, deployment models, and
            integration capabilities.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {SOLUTIONS.map((solution) => (
            <button
              key={solution.slug}
              onClick={() => toggleSolution(solution.slug)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedSolutions.includes(solution.slug)
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              {solution.title}
            </button>
          ))}
        </div>

        <div className="flex justify-center gap-2 mb-12">
          {comparisonCategories.map((cat, i) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(i)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeCategory === i
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredSolutions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSolutions.map((solution, idx) => (
              <motion.div
                key={solution.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-white mb-4">
                  {solution.title}
                </h3>
                <ul className="space-y-2">
                  {getValue(solution, activeCategory).map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-slate-300"
                    >
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-500">
            Select at least one solution to compare.
          </p>
        )}
      </div>
    </section>
  );
}
