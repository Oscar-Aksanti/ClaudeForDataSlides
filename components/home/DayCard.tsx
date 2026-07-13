"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { DayMetaEntry } from "@/lib/types";
import { readProgress } from "@/lib/progress";

interface DayCardProps {
  meta: DayMetaEntry;
  slideCount: number;
}

export function DayCard({ meta, slideCount }: DayCardProps) {
  const [resumeAt, setResumeAt] = useState<number | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- lit localStorage, indisponible côté serveur
    setResumeAt(readProgress(meta.day));
  }, [meta.day]);

  return (
    <Link
      href={`/jour/${meta.day}`}
      className="group flex items-center gap-5 rounded-card border border-fog-dim bg-white px-6 py-5 transition-colors hover:border-signal"
    >
      <span className="font-mono text-[15px] text-signal">{String(meta.day).padStart(2, "0")}</span>
      <div className="flex-1">
        <p className="text-[15.5px] font-semibold text-ink">{meta.title}</p>
        <span className="text-[13px] text-slate">{meta.subtitle}</span>
      </div>
      <div className="flex flex-none items-center gap-2 font-mono text-[11px] text-slate">
        {resumeAt ? (
          <span className="rounded-full bg-[#F6EAE4] px-2.5 py-1 text-signal">
            Reprendre · {resumeAt}/{slideCount}
          </span>
        ) : (
          <span>{slideCount} slides</span>
        )}
        <ArrowRight className="h-4 w-4 text-slate transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}
