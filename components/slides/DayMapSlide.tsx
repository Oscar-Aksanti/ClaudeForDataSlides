import type { DayMapSlide as DayMapSlideType } from "@/lib/types";
import { SlideShell } from "@/components/ui/SlideShell";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { Reveal } from "@/components/ui/Reveal";

const WEEKDAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven"];

export function DayMapSlide({ slide }: { slide: DayMapSlideType }) {
  return (
    <SlideShell tone="light">
      <Reveal>
        <EyebrowLabel>{slide.eyebrow}</EyebrowLabel>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-3 text-[30px] font-semibold text-ink">{slide.title}</h2>
      </Reveal>

      <Reveal delay={0.16} className="mt-6 flex items-center gap-2">
        {slide.days.map((_, i) => {
          const isActive = i + 1 === slide.activeDay;
          const isDone = i + 1 < slide.activeDay;
          return (
            <div
              key={i}
              className={`relative h-[7px] flex-1 rounded-full ${
                isActive || isDone ? "bg-signal" : "bg-fog-dim"
              } ${isDone ? "opacity-35" : ""}`}
            >
              {isActive && (
                <span className="absolute -top-[5px] right-0 h-[17px] w-[17px] rounded-full bg-signal shadow-[0_0_0_4px_rgba(217,119,87,0.18)]" />
              )}
            </div>
          );
        })}
      </Reveal>
      <div className="mt-2 flex gap-2">
        {WEEKDAYS.map((d) => (
          <span key={d} className="flex-1 font-mono text-[11px] text-slate">
            {d}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-2.5">
        {slide.days.map((day, i) => {
          const isCurrent = i + 1 === slide.activeDay;
          return (
            <Reveal key={day.num} delay={0.22 + i * 0.07}>
              <div
                className={`group flex items-center gap-3.5 rounded-[10px] border bg-white px-4 py-2.5 transition-colors hover:border-signal ${
                  isCurrent ? "border-signal" : "border-fog-dim"
                }`}
              >
                <span className="w-5 font-mono text-[12px] text-signal">{day.num}</span>
                <div>
                  <p className="text-[13.5px] font-semibold text-ink">{day.title}</p>
                  <span className="text-[12px] text-slate">{day.subtitle}</span>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </SlideShell>
  );
}
