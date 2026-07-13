import type { QuoteStatSlide as QuoteStatSlideType } from "@/lib/types";
import { SlideShell } from "@/components/ui/SlideShell";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";

export function QuoteStatSlide({ slide }: { slide: QuoteStatSlideType }) {
  const formattedValue = `${slide.value.toLocaleString("fr-FR")}${slide.suffix ?? ""}`;

  return (
    <SlideShell tone="dark" className="items-center justify-center text-center">
      <Reveal>
        <EyebrowLabel tone="signal">{slide.eyebrow}</EyebrowLabel>
      </Reveal>
      <Reveal delay={0.12}>
        <div className="mt-4 font-display text-[clamp(64px,12vw,120px)] font-bold leading-none text-signal-bright">
          <CountUp value={formattedValue} durationMs={1400} />
        </div>
      </Reveal>
      <Reveal delay={0.3}>
        <p className="mt-4 max-w-lg text-[17px] font-medium text-white">{slide.label}</p>
      </Reveal>
      {slide.context && (
        <Reveal delay={0.4} className="mt-2 max-w-md text-[13.5px] text-fog/55">
          <p>{slide.context}</p>
        </Reveal>
      )}
    </SlideShell>
  );
}
