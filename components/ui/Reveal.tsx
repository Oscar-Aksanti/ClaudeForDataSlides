"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
}

/**
 * Animation d'entrée systématique et sobre — translateY 12px + fondu (brief section 9).
 * `delay` (en secondes) permet le cascade/stagger d'une liste sans dupliquer la logique.
 */
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const Component = as === "li" ? motion.li : motion.div;

  return (
    <Component
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: reduceMotion ? 0 : delay, ease: [0.22, 0.9, 0.28, 1] }}
    >
      {children}
    </Component>
  );
}

export const STAGGER_STEP = 0.07;
