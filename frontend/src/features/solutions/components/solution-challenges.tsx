"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CHALLENGES } from "@/data/challenges";

export function SolutionChallenges() {
  const featured = CHALLENGES.slice(0, 6);

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
            Business Challenges
          </span>
          <h2 className="mt-4 text-4xl font-bold text-white">
            Challenges We Solve
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Our solutions are designed to address the most pressing enterprise
            challenges across industries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((challenge, idx) => (
            <motion.div
              key={challenge.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 group hover:border-emerald-500/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-xs text-emerald-400 font-medium">
                  {challenge.category}
                </span>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    challenge.impact === "Critical"
                      ? "bg-red-500/10 text-red-400"
                      : "bg-amber-500/10 text-amber-400"
                  }`}
                >
                  {challenge.impact}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {challenge.title}
              </h3>
              <p className="text-sm text-slate-400 mb-4">
                {challenge.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {challenge.solutions.slice(0, 2).map((sol) => (
                  <span
                    key={sol}
                    className="text-xs text-slate-500 bg-slate-700/50 rounded-md px-2 py-1"
                  >
                    {sol.length > 50 ? sol.slice(0, 50) + "..." : sol}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/challenges"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-all text-sm font-medium"
          >
            View All Challenges
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
