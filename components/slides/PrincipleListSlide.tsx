import type { PrincipleListSlide as PrincipleListSlideType } from "@/lib/types";
import { SlideShell } from "@/components/ui/SlideShell";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { Reveal, STAGGER_STEP } from "@/components/ui/Reveal";

export function PrincipleListSlide({ slide }: { slide: PrincipleListSlideType }) {
  return (
    <SlideShell tone="light">
      <Reveal>
        <EyebrowLabel>{slide.eyebrow}</EyebrowLabel>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-3 max-w-2xl text-[27px] font-semibold text-ink">{slide.title}</h2>
      </Reveal>
      {slide.lead && (
        <Reveal delay={0.14} className="mt-2 max-w-xl text-[13.5px] leading-relaxed text-slate">
          <p>{slide.lead}</p>
        </Reveal>
      )}

      <div className="mt-5 flex max-w-3xl flex-col gap-2.5 overflow-y-auto">
        {slide.items.map((item, i) => (
          <Reveal key={item.num} delay={0.2 + i * STAGGER_STEP}>
            <div className="flex items-start gap-4 rounded-[11px] border border-fog-dim bg-white px-4.5 py-3">
              <span className="flex-none pt-0.5 font-mono text-[12.5px] font-medium text-signal">
                {item.num}
              </span>
              <div>
                <p className="text-[13.5px] font-semibold text-ink">{item.title}</p>
                <span className="mt-0.5 block text-[12px] leading-relaxed text-slate">
                  {item.detail}
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </SlideShell>
  );
}
