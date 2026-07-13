"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { AgentBoxesSlide as AgentBoxesSlideType } from "@/lib/types";
import { SlideShell } from "@/components/ui/SlideShell";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { Reveal } from "@/components/ui/Reveal";

export function AgentBoxesSlide({ slide }: { slide: AgentBoxesSlideType }) {
  const reduceMotion = useReducedMotion();

  return (
    <SlideShell tone="light">
      <Reveal>
        <EyebrowLabel>{slide.eyebrow}</EyebrowLabel>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-3 text-[26px] font-semibold text-ink">{slide.title}</h2>
      </Reveal>

      <div className="my-auto flex gap-4.5" style={{ perspective: 1200 }}>
        {slide.boxes.map((box, i) => (
          <motion.div
            key={box.title}
            className={`flex-1 rounded-card border bg-white p-5 ${
              box.highlight ? "border-signal shadow-[0_0_0_3px_rgba(217,119,87,0.12)]" : "border-fog-dim"
            }`}
            initial={reduceMotion ? false : { opacity: 0, rotateY: -90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.55, delay: 0.16 + i * 0.14, ease: [0.22, 0.9, 0.28, 1] }}
          >
            <div className="w-fit rounded-full bg-[#F6EAE4] px-2.5 py-1 font-mono text-[10.5px] text-signal">
              {box.badge}
            </div>
            <h3 className="mt-3 text-[17px] font-semibold text-ink">{box.title}</h3>
            <p className="mt-2 text-[12.5px] leading-relaxed text-slate">{box.detail}</p>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  );
}
