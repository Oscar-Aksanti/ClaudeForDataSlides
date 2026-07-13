"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, NotebookText, Maximize2, Printer } from "lucide-react";
import type { DayContent } from "@/lib/types";
import { SlideRenderer } from "@/lib/slide-registry";
import { Brandmark } from "@/components/ui/Brandmark";
import { SlideProgressBar } from "@/components/ui/SlideProgressBar";
import { SlideCounter } from "@/components/ui/SlideCounter";
import { ClickZones } from "@/components/ui/ClickZones";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { PresenterNotesPanel } from "@/components/ui/PresenterNotesPanel";
import { ReadingMode } from "@/components/deck/ReadingMode";
import { useMediaQuery } from "@/lib/use-media-query";
import { saveProgress } from "@/lib/progress";

interface SlideDeckProps {
  day: DayContent;
  index: number;
  allDays: DayContent[];
}

const SWIPE_THRESHOLD = 50;

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 44 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: -dir * 44 }),
};

export function SlideDeck({ day, index, allDays }: SlideDeckProps) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [navOpen, setNavOpen] = useState(false);
  const [presenterOpen, setPresenterOpen] = useState(false);
  const [direction, setDirection] = useState(1);
  const touchStartX = useRef<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const slide = day.slides[index];

  useEffect(() => {
    saveProgress(day.day, index + 1);
  }, [day.day, index]);

  const navigate = useCallback(
    (targetDay: number, slidePosition: number) => {
      router.push(`/jour/${targetDay}/${slidePosition}`);
    },
    [router]
  );

  const goToIndex = useCallback(
    (newIndex: number) => {
      if (newIndex < 0) {
        const prevDay = allDays.find((d) => d.day === day.day - 1);
        if (prevDay) {
          setDirection(-1);
          navigate(prevDay.day, prevDay.slides.length);
        }
        return;
      }
      if (newIndex >= day.slides.length) {
        const nextDay = allDays.find((d) => d.day === day.day + 1);
        if (nextDay) {
          setDirection(1);
          navigate(nextDay.day, 1);
        }
        return;
      }
      setDirection(newIndex > index ? 1 : -1);
      navigate(day.day, newIndex + 1);
    },
    [allDays, day, index, navigate]
  );

  const next = useCallback(() => goToIndex(index + 1), [goToIndex, index]);
  const prev = useCallback(() => goToIndex(index - 1), [goToIndex, index]);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      stageRef.current?.requestFullscreen();
    }
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const isTyping = ["INPUT", "TEXTAREA"].includes(target.tagName);

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setNavOpen(true);
        return;
      }
      if (e.key === "Escape") {
        setNavOpen((v) => !v);
        return;
      }
      if (isTyping || navOpen) return;

      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key.toLowerCase() === "f") toggleFullscreen();
      else if (e.key.toLowerCase() === "p") setPresenterOpen((v) => !v);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navOpen, next, prev, toggleFullscreen]);

  if (isMobile) {
    return <ReadingMode day={day} initialSlideId={slide.id} />;
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > SWIPE_THRESHOLD) prev();
    else if (delta < -SWIPE_THRESHOLD) next();
    touchStartX.current = null;
  }

  return (
    <div className="flex h-dvh w-full items-center justify-center bg-ink">
      <div
        ref={stageRef}
        className="relative aspect-[16/9.4] max-h-[92vh] w-[min(96vw,1240px)] overflow-hidden rounded-[20px] bg-fog shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <SlideProgressBar current={index} total={day.slides.length} />
        <SlideCounter current={index} total={day.slides.length} />

        <AnimatePresence custom={direction} initial={false} mode="popLayout">
          <motion.div
            key={slide.id}
            custom={direction}
            variants={reduceMotion ? undefined : variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.32, ease: [0.22, 0.9, 0.28, 1] }}
            className="absolute inset-0"
          >
            <SlideRenderer slide={slide} />
          </motion.div>
        </AnimatePresence>

        <Brandmark day={day.day} />

        <div className="no-print absolute top-4 right-16 z-30 flex items-center gap-1.5">
          <button
            aria-label="Plan de navigation"
            onClick={() => setNavOpen(true)}
            className="rounded-full bg-ink/45 p-1.5 text-fog backdrop-blur-sm transition-colors hover:bg-ink/70"
          >
            <Menu className="h-3.5 w-3.5" />
          </button>
          <button
            aria-label="Notes du présentateur"
            onClick={() => setPresenterOpen((v) => !v)}
            className={`rounded-full p-1.5 backdrop-blur-sm transition-colors ${
              presenterOpen ? "bg-signal text-white" : "bg-ink/45 text-fog hover:bg-ink/70"
            }`}
          >
            <NotebookText className="h-3.5 w-3.5" />
          </button>
          <button
            aria-label="Plein écran"
            onClick={toggleFullscreen}
            className="rounded-full bg-ink/45 p-1.5 text-fog backdrop-blur-sm transition-colors hover:bg-ink/70"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
          <a
            href={`/imprimer/${day.day}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Vue imprimable"
            className="rounded-full bg-ink/45 p-1.5 text-fog backdrop-blur-sm transition-colors hover:bg-ink/70"
          >
            <Printer className="h-3.5 w-3.5" />
          </a>
        </div>

        <ClickZones onPrev={prev} onNext={next} />
        <PresenterNotesPanel open={presenterOpen} notes={slide.presenterNotes} />
      </div>

      <CommandPalette
        open={navOpen}
        onClose={() => setNavOpen(false)}
        days={allDays}
        currentDay={day.day}
        onNavigate={navigate}
      />
    </div>
  );
}
