"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { BeforeAfterSlide as BeforeAfterSlideType } from "@/lib/types";
import { SlideShell } from "@/components/ui/SlideShell";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { Reveal } from "@/components/ui/Reveal";

export function BeforeAfterSlide({ slide }: { slide: BeforeAfterSlideType }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <SlideShell tone="light">
      <Reveal>
        <EyebrowLabel>{slide.eyebrow}</EyebrowLabel>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-3 text-[26px] font-semibold text-ink">{slide.title}</h2>
      </Reveal>

      <div className="mt-5 flex flex-1 items-center gap-4">
        <div className="flex-1 rounded-card border border-fog-dim bg-white p-4">
          <div className="mb-2.5 w-fit rounded-[6px] bg-[#F4E3E0] px-2.5 py-1 font-mono text-[10.5px] font-medium tracking-wide text-[#B0503A]">
            {slide.before.label}
          </div>
          {slide.before.rows.map((row) => (
            <div
              key={row}
              className="mb-1.5 rounded-[6px] bg-[#FBF0EE] px-2.5 py-1.5 font-mono text-[11.5px] text-[#B0503A] line-through opacity-70"
            >
              {row}
            </div>
          ))}
        </div>

        <button
          onClick={() => setRevealed((r) => !r)}
          aria-label="Basculer avant / après"
          className="flex-none rounded-full border border-fog-dim bg-white p-2 text-signal transition-transform hover:scale-110"
        >
          <ArrowRight className="h-5 w-5" strokeWidth={2} />
        </button>

        <div className="relative flex-1 rounded-card border border-fog-dim bg-white p-4">
          <AnimatePresence mode="wait">
            {revealed ? (
              <motion.div
                key="after"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <div className="mb-2.5 w-fit rounded-[6px] bg-[#F6EAE4] px-2.5 py-1 font-mono text-[10.5px] font-medium tracking-wide text-[#A8552E]">
                  {slide.after.label}
                </div>
                {slide.after.rows.map((row) => (
                  <div
                    key={row.primary}
                    className="mb-1.5 flex justify-between rounded-[6px] bg-[#FBEFE9] px-2.5 py-1.5 font-mono text-[11.5px] text-[#8A4229]"
                  >
                    <span>{row.primary}</span>
                    <span>{row.secondary}</span>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-full min-h-[120px] items-center justify-center text-center text-[12.5px] text-slate"
              >
                Clique sur la flèche pour voir le résultat
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SlideShell>
  );
}
