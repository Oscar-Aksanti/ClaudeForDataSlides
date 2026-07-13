"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { DayContent } from "@/lib/types";
import { SlideRenderer } from "@/lib/slide-registry";

interface ReadingModeProps {
  day: DayContent;
  initialSlideId: string;
}

/**
 * Mode lecture mobile — brief : "utilisable sur mobile en lecture". Sous le breakpoint,
 * les mêmes composants de slide s'empilent verticalement au lieu du deck plein écran swipé.
 */
export function ReadingMode({ day, initialSlideId }: ReadingModeProps) {
  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    refs.current[initialSlideId]?.scrollIntoView({ block: "start" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-fog pb-16">
      <div className="sticky top-0 z-40 flex items-center gap-3 border-b border-fog-dim bg-fog/95 px-4 py-3 backdrop-blur-sm">
        <Link href="/" aria-label="Retour au plan" className="text-slate">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <p className="font-mono text-[10.5px] uppercase tracking-wide text-signal">
            Jour {String(day.day).padStart(2, "0")} · Mode lecture
          </p>
          <p className="text-[13.5px] font-semibold text-ink">{day.title}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-3 py-4">
        {day.slides.map((slide, i) => (
          <div
            key={slide.id}
            ref={(el) => {
              refs.current[slide.id] = el;
            }}
            className="relative h-auto min-h-[70vh] w-full overflow-hidden rounded-card border border-fog-dim shadow-sm scroll-mt-16"
          >
            <div className="absolute left-3 top-3 z-20 font-mono text-[10px] text-slate/70">
              {String(i + 1).padStart(2, "0")} / {String(day.slides.length).padStart(2, "0")}
            </div>
            <SlideRenderer slide={slide} />
          </div>
        ))}
      </div>
    </div>
  );
}
