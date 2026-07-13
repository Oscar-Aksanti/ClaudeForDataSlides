"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import type { DayContent } from "@/lib/types";
import { buildSearchIndex, searchSlides } from "@/lib/search";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  days: DayContent[];
  currentDay: number;
  onNavigate: (day: number, slidePosition: number) => void;
}

/**
 * Panneau de navigation global — brief section 8 : liste les 5 jours, recherche texte,
 * ouverture via Échap ou Cmd/Ctrl+K.
 */
export function CommandPalette({ open, onClose, days, currentDay, onNavigate }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const index = useMemo(() => buildSearchIndex(days), [days]);
  const results = useMemo(() => searchSlides(index, query), [index, query]);

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- réinitialise la recherche à chaque ouverture du panneau
      setQuery("");
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="no-print fixed inset-0 z-50 flex items-start justify-center bg-ink/60 pt-[10vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="flex max-h-[70vh] w-[min(92vw,640px)] flex-col overflow-hidden rounded-card border border-fog-dim bg-white shadow-2xl"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-fog-dim px-4 py-3">
              <Search className="h-4 w-4 flex-none text-slate" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher une slide, un jour, un chapitre…"
                className="flex-1 bg-transparent text-[14px] text-ink placeholder:text-slate focus:outline-none"
              />
              <button onClick={onClose} aria-label="Fermer" className="text-slate hover:text-ink">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
              {days.map((day) => {
                const dayResults = results.filter((r) => r.day === day.day);
                if (query && dayResults.length === 0) return null;
                return (
                  <div key={day.day} className="mb-1">
                    <button
                      onClick={() => {
                        onNavigate(day.day, 1);
                        onClose();
                      }}
                      className={`w-full rounded-[8px] px-3 py-1.5 text-left font-mono text-[11px] uppercase tracking-wide transition-colors hover:bg-fog ${
                        day.day === currentDay ? "text-signal" : "text-slate"
                      }`}
                    >
                      Jour {String(day.day).padStart(2, "0")} · {day.title}
                    </button>
                    {(query ? dayResults : dayResults.slice(0, 0)).map((r) => (
                      <button
                        key={`${r.day}-${r.slideId}`}
                        onClick={() => {
                          onNavigate(r.day, r.slidePosition);
                          onClose();
                        }}
                        className="flex w-full items-center gap-3 rounded-[8px] px-3 py-2 text-left transition-colors hover:bg-fog"
                      >
                        <span className="font-mono text-[11px] text-slate">
                          {String(r.slidePosition).padStart(2, "0")}
                        </span>
                        <span className="text-[13.5px] text-ink">{r.title}</span>
                      </button>
                    ))}
                  </div>
                );
              })}

              {!query &&
                days
                  .find((d) => d.day === currentDay)
                  ?.slides.map((slide, i) => (
                    <button
                      key={slide.id}
                      onClick={() => {
                        onNavigate(currentDay, i + 1);
                        onClose();
                      }}
                      className="flex w-full items-center gap-3 rounded-[8px] px-3 py-2 text-left transition-colors hover:bg-fog"
                    >
                      <span className="font-mono text-[11px] text-slate">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[13.5px] text-ink">
                        {index.find((r) => r.day === currentDay && r.slideId === slide.id)?.title}
                      </span>
                    </button>
                  ))}
            </div>

            <div className="flex items-center justify-between border-t border-fog-dim px-4 py-2 font-mono text-[10.5px] text-slate">
              <span>↑↓ naviguer · ↵ ouvrir · Échap fermer</span>
              <a href="/ressources" className="text-signal hover:text-signal-bright">
                Ressources →
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
