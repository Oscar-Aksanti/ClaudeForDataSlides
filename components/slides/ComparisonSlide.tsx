import { Check, Minus } from "lucide-react";
import type { ComparisonSlide as ComparisonSlideType } from "@/lib/types";
import { SlideShell } from "@/components/ui/SlideShell";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { Reveal } from "@/components/ui/Reveal";

export function ComparisonSlide({ slide }: { slide: ComparisonSlideType }) {
  return (
    <SlideShell tone="light">
      <Reveal>
        <EyebrowLabel>{slide.eyebrow}</EyebrowLabel>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-3 text-[28px] font-semibold text-ink">{slide.title}</h2>
      </Reveal>

      <div className="mt-5 flex flex-1 gap-4">
        {slide.columns.map((col, ci) => (
          <Reveal key={col.label} delay={0.16 + ci * 0.1} className="flex-1">
            <div
              className={`h-full rounded-[14px] border p-5 ${
                col.winner
                  ? "border-signal bg-[linear-gradient(160deg,#fff,#FDF0EC)]"
                  : "border-fog-dim bg-white"
              }`}
            >
              <b className="text-[15px] font-semibold text-ink">{col.label}</b>
              <ul className="mt-2.5 flex flex-col gap-1.5">
                {col.items.map((item) => (
                  <li
                    key={item}
                    className={`flex items-start gap-2 text-[12.5px] ${
                      col.winner ? "text-ink" : "text-slate"
                    }`}
                  >
                    {col.winner ? (
                      <Check className="mt-0.5 h-3.5 w-3.5 flex-none text-signal" strokeWidth={2} />
                    ) : (
                      <Minus className="mt-0.5 h-3.5 w-3.5 flex-none text-slate/60" strokeWidth={2} />
                    )}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </SlideShell>
  );
}
