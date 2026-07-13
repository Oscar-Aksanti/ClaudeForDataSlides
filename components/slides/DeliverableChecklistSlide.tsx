"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { DeliverableChecklistSlide as DeliverableChecklistSlideType } from "@/lib/types";
import { SlideShell } from "@/components/ui/SlideShell";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { Reveal } from "@/components/ui/Reveal";

export function DeliverableChecklistSlide({ slide }: { slide: DeliverableChecklistSlideType }) {
  const [checked, setChecked] = useState<boolean[]>(() => slide.items.map(() => false));

  function toggle(i: number) {
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  }

  return (
    <SlideShell tone="light">
      <Reveal>
        <EyebrowLabel>{slide.eyebrow}</EyebrowLabel>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-3 text-[27px] font-semibold text-ink">{slide.title}</h2>
      </Reveal>

      <div className="mt-5 flex max-w-[600px] flex-col gap-3">
        {slide.items.map((item, i) => (
          <Reveal key={item.title} delay={0.16 + i * 0.09}>
            <button
              onClick={() => toggle(i)}
              className="flex w-full items-start gap-3.5 rounded-card border border-fog-dim bg-white px-4.5 py-3.5 text-left transition-colors hover:border-signal/60"
            >
              <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-[6px] border-2 border-signal">
                <motion.span
                  initial={false}
                  animate={{ scale: checked[i] ? 1 : 0 }}
                  transition={{ duration: 0.2, ease: "backOut" }}
                >
                  <Check className="h-3 w-3 text-signal" strokeWidth={3} />
                </motion.span>
              </span>
              <div>
                <p
                  className={`text-[14px] font-semibold text-ink ${
                    checked[i] ? "line-through opacity-50" : ""
                  }`}
                >
                  {item.title}
                </p>
                <span className="mt-0.5 block text-[12.5px] text-slate">{item.detail}</span>
              </div>
            </button>
          </Reveal>
        ))}
      </div>
    </SlideShell>
  );
}
