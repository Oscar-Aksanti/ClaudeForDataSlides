import Image from "next/image";
import type { SpeakerIntroSlide as SpeakerIntroSlideType } from "@/lib/types";
import { SlideShell } from "@/components/ui/SlideShell";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";

export function SpeakerIntroSlide({ slide }: { slide: SpeakerIntroSlideType }) {
  return (
    <SlideShell tone="light" row className="items-center">
      <div className="flex-[1.3] flex flex-col">
        <Reveal>
          <EyebrowLabel>{slide.eyebrow}</EyebrowLabel>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-3 text-[32px] font-semibold text-ink">{slide.name}</h2>
        </Reveal>
        <Reveal delay={0.16} className="mt-3.5 max-w-[480px] text-[14.5px] leading-relaxed text-slate">
          <p>{slide.bio}</p>
        </Reveal>

        <div className="mt-5 flex gap-3.5">
          {slide.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={0.28 + i * 0.09}>
              <div className="rounded-card border border-fog-dim bg-white px-4 py-3 text-center">
                <b className="block font-mono text-[22px] font-normal text-signal">
                  <CountUp value={stat.value} />
                </b>
                <span className="font-mono text-[10.5px] text-slate">{stat.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal delay={0.2} className="flex-1 self-stretch">
        {slide.photo ? (
          <div className="relative h-[80%] min-h-[220px] w-full overflow-hidden rounded-[24px] bg-ink">
            <Image
              src={slide.photo}
              alt={slide.name}
              fill
              sizes="(max-width: 768px) 90vw, 400px"
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <div className="flex h-[80%] min-h-[220px] w-full items-center justify-center rounded-[24px] bg-[linear-gradient(160deg,var(--ink)_0%,var(--signal)_130%)] p-4 text-center text-[12.5px] text-white/70">
            {slide.photoPlaceholder}
          </div>
        )}
      </Reveal>
    </SlideShell>
  );
}
