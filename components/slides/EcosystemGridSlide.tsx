import type { EcosystemGridSlide as EcosystemGridSlideType } from "@/lib/types";
import { SlideShell } from "@/components/ui/SlideShell";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { Reveal, STAGGER_STEP } from "@/components/ui/Reveal";
import { DynamicIcon } from "@/components/ui/DynamicIcon";

export function EcosystemGridSlide({ slide }: { slide: EcosystemGridSlideType }) {
  return (
    <SlideShell tone="light">
      <Reveal>
        <EyebrowLabel>{slide.eyebrow}</EyebrowLabel>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-3 text-[28px] font-semibold text-ink">{slide.title}</h2>
      </Reveal>

      <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {slide.items.map((item, i) => (
          <Reveal key={item.title} delay={0.16 + i * STAGGER_STEP}>
            <div className="group rounded-card border border-fog-dim bg-white p-3.5 transition-all hover:-translate-y-0.5 hover:border-signal">
              <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-[8px] bg-[#F6EAE4]">
                <DynamicIcon name={item.icon} className="h-[15px] w-[15px] text-signal" />
              </div>
              <p className="text-[12px] font-bold text-ink">{item.title}</p>
              <span className="mt-0.5 block text-[10.5px] leading-tight text-slate">
                {item.detail}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </SlideShell>
  );
}
