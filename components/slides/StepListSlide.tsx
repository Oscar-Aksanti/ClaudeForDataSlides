"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { StepListSlide as StepListSlideType } from "@/lib/types";
import { SlideShell } from "@/components/ui/SlideShell";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { Reveal } from "@/components/ui/Reveal";

export function StepListSlide({ slide }: { slide: StepListSlideType }) {
  const reduceMotion = useReducedMotion();

  return (
    <SlideShell tone="light">
      <Reveal>
        <EyebrowLabel>{slide.eyebrow}</EyebrowLabel>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-3 text-[26px] font-semibold text-ink">{slide.title}</h2>
      </Reveal>

      <div className="mt-5 flex flex-col gap-2.5">
        {slide.steps.map((step, i) => (
          <Reveal key={step.title} delay={0.16 + i * 0.1}>
            <div className="flex items-start gap-4 rounded-card border border-fog-dim bg-white px-4.5 py-3.5">
              <motion.div
                className="flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full bg-signal font-mono text-[12px] text-white"
                initial={reduceMotion ? false : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.35, delay: 0.3 + i * 0.1, ease: "backOut" }}
              >
                {i + 1}
              </motion.div>
              <div>
                <p className="text-[13.5px] font-semibold text-ink">{step.title}</p>
                <span className="mt-0.5 block text-[12px] text-slate">{step.detail}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </SlideShell>
  );
}
