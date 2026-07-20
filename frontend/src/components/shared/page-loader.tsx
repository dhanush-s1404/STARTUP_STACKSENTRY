"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";

type PageLoaderProps = {
  className?: string;
};

export function PageLoader({ className }: PageLoaderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className={`fixed inset-x-0 top-0 z-[60] h-[3px] ${className || ""}`}
          role="progressbar"
          aria-label="Page loading"
        >
          <motion.div
            className="h-full w-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 0.8, ease: "easeInOut", repeat: Infinity }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
