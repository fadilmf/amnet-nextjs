"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode } from "react";

interface ParallaxSectionProps {
  children: ReactNode;
}

export function ParallaxSection({ children }: ParallaxSectionProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <motion.div style={{ y }} className="relative z-10 bg-white">
      {children}
    </motion.div>
  );
}
