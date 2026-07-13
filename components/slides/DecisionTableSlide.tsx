import { ArrowRight } from "lucide-react";
import type { DecisionTableSlide as DecisionTableSlideType } from "@/lib/types";
import { SlideShell } from "@/components/ui/SlideShell";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { Reveal, STAGGER_STEP } from "@/components/ui/Reveal";

export function DecisionTableSlide({ slide }: { slide: DecisionTableSlideType }) {
  return (
    <SlideShell tone="light">
      <Reveal>
        <EyebrowLabel>{slide.eyebrow}</EyebrowLabel>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-3 text-[28px] font-semibold text-ink">{slide.title}</h2>
      </Reveal>
      {slide.lead && (
        <Reveal delay={0.14} className="mt-2 max-w-xl text-[13.5px] leading-relaxed text-slate">
          <p>{slide.lead}</p>
        </Reveal>
      )}

      <div className="mt-5 flex max-w-3xl flex-col gap-2">
        {slide.rows.map((row, i) => (
          <Reveal key={row.want} delay={0.18 + i * STAGGER_STEP}>
            <div className="flex items-center gap-3.5 rounded-[10px] border border-fog-dim bg-white px-4 py-3 transition-colors hover:border-signal hover:bg-[#FDF6F3]">
              <span className="flex-1 text-[13px] font-medium text-ink">{row.want}</span>
              <ArrowRight className="h-3.5 w-3.5 flex-none text-slate/60" strokeWidth={2} />
              <span className="flex-none rounded-full bg-[#F6EAE4] px-2.5 py-1 font-mono text-[11.5px] font-medium text-signal">
                {row.tool}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </SlideShell>
  );
}
