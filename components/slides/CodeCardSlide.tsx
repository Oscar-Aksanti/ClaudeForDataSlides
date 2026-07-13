"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { CodeCardSlide as CodeCardSlideType } from "@/lib/types";
import { SlideShell } from "@/components/ui/SlideShell";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { Reveal } from "@/components/ui/Reveal";

type Segment = { text: string; tone: "plain" | "key" | "value" };

/** Parse les marqueurs légers <k>…</k> / <v>…</v> du contenu JSON en segments typés. */
function parseCode(code: string): Segment[] {
  const regex = /<(k|v)>(.*?)<\/\1>/g;
  const segments: Segment[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(code)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ text: code.slice(lastIndex, match.index), tone: "plain" });
    }
    segments.push({ text: match[2], tone: match[1] === "k" ? "key" : "value" });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < code.length) {
    segments.push({ text: code.slice(lastIndex), tone: "plain" });
  }
  return segments;
}

const TONE_CLASS: Record<Segment["tone"], string> = {
  plain: "text-[#C9D4D9]",
  key: "text-signal-bright",
  value: "text-spark",
};

export function CodeCardSlide({ slide }: { slide: CodeCardSlideType }) {
  const reduceMotion = useReducedMotion();
  const segments = useMemo(() => parseCode(slide.code), [slide.code]);
  const totalLength = useMemo(() => segments.reduce((n, s) => n + s.text.length, 0), [segments]);
  const [visible, setVisible] = useState(reduceMotion ? totalLength : 0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- réinitialise l'effet machine à écrire à chaque changement de slide
    setVisible(reduceMotion ? totalLength : 0);
    if (reduceMotion) return;
    const interval = setInterval(() => {
      setVisible((v) => {
        if (v >= totalLength) {
          clearInterval(interval);
          return v;
        }
        return Math.min(totalLength, v + 3);
      });
    }, 18);
    return () => clearInterval(interval);
  }, [slide.code, reduceMotion, totalLength]);

  const plainText = segments.map((s) => s.text).join("");

  function handleCopy() {
    navigator.clipboard?.writeText(plainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  const visibleSegments = segments.reduce<{ shown: Segment[]; remaining: number }>(
    (acc, seg) => {
      if (acc.remaining <= 0) return acc;
      const shown = seg.text.slice(0, Math.max(0, acc.remaining));
      return { shown: [...acc.shown, { text: shown, tone: seg.tone }], remaining: acc.remaining - seg.text.length };
    },
    { shown: [], remaining: visible }
  ).shown;

  return (
    <SlideShell tone="dark">
      <Reveal>
        <EyebrowLabel tone="signal">{slide.eyebrow}</EyebrowLabel>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-3 text-[28px] font-semibold text-white">{slide.title}</h2>
      </Reveal>

      <Reveal
        delay={0.18}
        className="mt-6 flex-1 overflow-hidden rounded-card border border-[#263140] bg-[#0b0f14]"
      >
        <div className="flex items-center gap-2 border-b border-[#263140] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#EB5757]" />
          <span className="h-2.5 w-2.5 rounded-full bg-spark" />
          <span className="h-2.5 w-2.5 rounded-full bg-signal" />
          <span className="ml-2.5 font-mono text-[11.5px] text-[#7E8A93]">{slide.filename}</span>
          <button
            onClick={handleCopy}
            className="ml-auto rounded-[7px] border border-[#2E3B47] px-2.5 py-1 font-mono text-[11px] text-signal-bright transition-colors hover:border-signal-bright"
          >
            {copied ? "Copié ✓" : "Copier"}
          </button>
        </div>
        <div className="whitespace-pre-wrap px-5.5 py-5 font-mono text-[13.5px] leading-[1.75]">
          {visibleSegments.map((seg, i) => (
            <span key={i} className={TONE_CLASS[seg.tone]}>
              {seg.text}
            </span>
          ))}
        </div>
      </Reveal>

      {slide.previewLabel && (
        <Reveal delay={0.3} className="mt-3 flex-none">
          <div className="rounded-[10px] border border-dashed border-[#2E3B47] bg-[#151B22] px-4 py-4 text-center text-[12px] text-slate">
            {slide.previewLabel}
          </div>
        </Reveal>
      )}
    </SlideShell>
  );
}
