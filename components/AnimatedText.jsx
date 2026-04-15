"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["Sell tickets.", "Scan entries.", "Run events."];

export default function AnimatedText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[80px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.h1
          key={index}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.5 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[0.95]"
        >
          {words[index]}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
}