"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import { readProgress } from "@/lib/progress";

interface StartOrResumeCTAProps {
  day: number;
  totalSlides: number;
}

/** CTA principal de la page sommaire — bascule entre "Commencer" et "Reprendre" selon localStorage. */
export function StartOrResumeCTA({ day, totalSlides }: StartOrResumeCTAProps) {
  const [resumeAt, setResumeAt] = useState<number | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- lit localStorage, indisponible côté serveur
    setResumeAt(readProgress(day));
  }, [day]);

  return (
    <div className="flex items-center gap-3">
      <Link
        href={`/jour/${day}/${resumeAt ?? 1}`}
        className="flex items-center gap-2 rounded-full bg-signal px-5 py-2.5 text-[13.5px] font-medium text-white transition-colors hover:bg-signal-bright"
      >
        {resumeAt ? (
          <>
            <RotateCcw className="h-4 w-4" />
            Reprendre à la slide {resumeAt}/{totalSlides}
          </>
        ) : (
          <>
            Commencer
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Link>
      {resumeAt && (
        <Link
          href={`/jour/${day}/1`}
          className="text-[12.5px] font-medium text-slate transition-colors hover:text-ink"
        >
          Reprendre depuis le début
        </Link>
      )}
    </div>
  );
}
