"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import type { DataTableSlide as DataTableSlideType } from "@/lib/types";
import { SlideShell } from "@/components/ui/SlideShell";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { Reveal } from "@/components/ui/Reveal";

export function DataTableSlide({ slide }: { slide: DataTableSlideType }) {
  const reduceMotion = useReducedMotion();

  return (
    <SlideShell tone="light">
      <Reveal>
        <EyebrowLabel>{slide.eyebrow}</EyebrowLabel>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-3 text-[27px] font-semibold text-ink">{slide.title}</h2>
      </Reveal>
      {slide.lead && (
        <Reveal delay={0.14} className="mt-2 max-w-xl text-[13.5px] leading-relaxed text-slate">
          <p>{slide.lead}</p>
        </Reveal>
      )}

      <Reveal delay={0.2} className="mt-5 overflow-hidden rounded-card border border-fog-dim">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="bg-white">
              {slide.columns.map((col) => (
                <th
                  key={col}
                  className="border-b border-fog-dim px-4 py-2.5 text-left font-mono text-[11px] font-medium uppercase tracking-wide text-slate"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slide.rows.map((row, ri) => (
              <motion.tr
                key={ri}
                className={row.critical ? "bg-[#FBF0EE]" : "bg-white odd:bg-fog/40"}
                initial={
                  row.critical && !reduceMotion
                    ? { backgroundColor: "rgba(217,119,87,0.28)" }
                    : false
                }
                animate={row.critical && !reduceMotion ? { backgroundColor: "rgba(251,240,238,1)" } : {}}
                transition={{ duration: 1.1, delay: 0.5, ease: "easeOut" }}
              >
                {row.cells.map((cell, ci) => (
                  <td
                    key={ci}
                    className={`border-b border-fog-dim px-4 py-2.5 ${
                      row.critical ? "font-medium text-[#B0503A]" : "text-ink"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      {ci === 0 && row.critical && (
                        <AlertTriangle className="h-3.5 w-3.5 flex-none text-signal" strokeWidth={2} />
                      )}
                      {cell}
                    </span>
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </Reveal>
    </SlideShell>
  );
}
