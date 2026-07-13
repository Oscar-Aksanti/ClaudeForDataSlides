"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { WorkflowFlowSlide as WorkflowFlowSlideType } from "@/lib/types";
import { SlideShell } from "@/components/ui/SlideShell";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { Reveal } from "@/components/ui/Reveal";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { ArrowRight } from "lucide-react";

/** Élément signature : la ligne se dessine (tracé SVG) derrière les nœuds — brief section 7. */
function TracedLine() {
  const reduceMotion = useReducedMotion();
  return (
    <svg
      className="pointer-events-none absolute inset-x-6 top-1/2 -z-0 h-2 -translate-y-1/2"
      viewBox="0 0 100 4"
      preserveAspectRatio="none"
    >
      <motion.line
        x1="1"
        y1="2"
        x2="99"
        y2="2"
        stroke="var(--fog-dim)"
        strokeWidth="1.4"
        initial={reduceMotion ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.1, delay: 0.3, ease: "easeInOut" }}
      />
    </svg>
  );
}

export function WorkflowFlowSlide({ slide }: { slide: WorkflowFlowSlideType }) {
  return (
    <SlideShell tone="light">
      <Reveal>
        <EyebrowLabel>{slide.eyebrow}</EyebrowLabel>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-3 text-[26px] font-semibold text-ink">{slide.title}</h2>
      </Reveal>

      <div className="relative my-auto flex items-center justify-between gap-1.5">
        <TracedLine />
        {slide.nodes.map((node, i) => (
          <div key={node.label} className="flex items-center">
            <Reveal delay={0.18 + i * 0.1}>
              <div
                className={`relative z-10 w-[135px] rounded-card border bg-white px-2.5 py-4 text-center ${
                  node.highlight
                    ? "border-signal shadow-[0_0_0_3px_rgba(217,119,87,0.12)]"
                    : "border-fog-dim"
                }`}
              >
                <DynamicIcon
                  name={node.icon}
                  className={`mx-auto mb-2 h-[26px] w-[26px] ${
                    node.highlight ? "text-signal" : "text-slate"
                  }`}
                />
                <p className="text-[12.5px] font-semibold text-ink">{node.label}</p>
                <span className="mt-0.5 block font-mono text-[9.5px] text-slate">
                  {node.detail}
                </span>
              </div>
            </Reveal>
            {i < slide.nodes.length - 1 && (
              <ArrowRight className="mx-1 h-4 w-4 flex-none text-slate/50" strokeWidth={2} />
            )}
          </div>
        ))}
      </div>
    </SlideShell>
  );
}
