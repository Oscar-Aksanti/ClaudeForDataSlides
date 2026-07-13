"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface CountUpProps {
  /** Valeur finale déjà formatée pour l'affichage, ex. "20 000+", "5 JOURS", "1M". */
  value: string;
  durationMs?: number;
}

function parseTarget(value: string) {
  const match = value.match(/^(\d+(?:\s\d{3})*)(.*)$/);
  if (!match) return { hasNumber: false as const, number: 0, suffix: value };
  const digits = match[1].replace(/\s/g, "");
  if (digits.length === 0) return { hasNumber: false as const, number: 0, suffix: value };
  return { hasNumber: true as const, number: parseInt(digits, 10), suffix: match[2] };
}

function formatLikeFrench(n: number) {
  return n.toLocaleString("fr-FR").replace(/ | /g, " ");
}

/** Chiffre qui s'anime en comptant jusqu'à la valeur finale — brief section 7 (speaker-intro, quote-stat). */
export function CountUp({ value, durationMs = 1100 }: CountUpProps) {
  const reduceMotion = useReducedMotion();
  const target = parseTarget(value);
  const [display, setDisplay] = useState(target.hasNumber && !reduceMotion ? 0 : target.number);

  useEffect(() => {
    if (!target.hasNumber || reduceMotion) return;
    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target.number));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, reduceMotion]);

  if (!target.hasNumber) return <>{value}</>;

  return (
    <>
      {formatLikeFrench(display)}
      {target.suffix}
    </>
  );
}
