"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { CoverSlide as CoverSlideType } from "@/lib/types";
import { SlideShell } from "@/components/ui/SlideShell";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { Reveal } from "@/components/ui/Reveal";

/** Découpe une ligne en segments {text, colored} autour de la sous-chaîne `highlight`. */
function splitHighlight(line: string, highlight?: string) {
  if (!highlight || !line.includes(highlight)) return [{ text: line, colored: false }];
  const idx = line.indexOf(highlight);
  const segments = [
    { text: line.slice(0, idx), colored: false },
    { text: highlight, colored: true },
    { text: line.slice(idx + highlight.length), colored: false },
  ];
  return segments.filter((s) => s.text.length > 0);
}

interface AnimatedTitleProps {
  lines: string[];
  highlight?: string;
}

interface TitleWord {
  key: string;
  word: string;
  colored: boolean;
  trailingSpace: boolean;
  wordIndex: number;
}

/** Aplatit les lignes/segments en une liste de mots numérotés, sans mutation pendant le rendu. */
function buildTitleLines(lines: string[], highlight?: string): TitleWord[][] {
  let counter = 0;
  return lines.map((line, li) => {
    const segments = splitHighlight(line, highlight);
    return segments.flatMap((seg, si) => {
      const words = seg.text.split(" ");
      return words.map((word, wi) => {
        const token: TitleWord = {
          key: `${li}-${si}-${wi}`,
          word,
          colored: seg.colored,
          trailingSpace: wi < words.length - 1 || si < segments.length - 1,
          wordIndex: counter,
        };
        counter += 1;
        return token;
      });
    });
  });
}

/** Élément signature du cover : le titre s'anime mot par mot à l'entrée (brief section 7). */
function AnimatedTitle({ lines, highlight }: AnimatedTitleProps) {
  const reduceMotion = useReducedMotion();
  const titleLines = buildTitleLines(lines, highlight);

  return (
    <h1 className="mt-4 max-w-3xl text-[clamp(32px,5vw,56px)] leading-[1.05] font-bold text-white">
      {titleLines.map((words, li) => (
        <span key={li} className="block">
          {words.map((token) => {
            const delay = reduceMotion ? 0 : 0.06 + token.wordIndex * 0.055;
            return (
              <Fragment key={token.key}>
                <motion.span
                  className={`inline-block ${token.colored ? "text-signal-bright" : ""}`}
                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay, ease: [0.22, 0.9, 0.28, 1] }}
                >
                  {token.word}
                </motion.span>
                {token.trailingSpace ? " " : ""}
              </Fragment>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

export function CoverSlide({ slide }: { slide: CoverSlideType }) {
  return (
    <SlideShell tone="cover" className="justify-center">
      <Reveal>
        <EyebrowLabel tone="signal">{slide.eyebrow}</EyebrowLabel>
      </Reveal>

      <AnimatedTitle lines={slide.title} highlight={slide.highlight} />

      {slide.subtitle && (
        <Reveal delay={0.5} className="mt-4 max-w-lg text-[15.5px] leading-relaxed text-fog/65">
          <p>{slide.subtitle}</p>
        </Reveal>
      )}

      {slide.meta && (
        <Reveal delay={0.65} className="mt-auto font-mono text-[12.5px] text-fog/45">
          {slide.metaHighlight && slide.meta.includes(slide.metaHighlight) ? (
            <>
              {slide.meta.split(slide.metaHighlight)[0]}
              <span className="font-medium text-spark">{slide.metaHighlight}</span>
              {slide.meta.split(slide.metaHighlight)[1]}
            </>
          ) : (
            slide.meta
          )}
        </Reveal>
      )}
    </SlideShell>
  );
}
