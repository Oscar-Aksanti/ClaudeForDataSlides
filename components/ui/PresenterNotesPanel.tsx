"use client";

import { motion, AnimatePresence } from "framer-motion";
import { NotebookText } from "lucide-react";

interface PresenterNotesPanelProps {
  open: boolean;
  notes?: string;
}

/** Mode présentateur : notes de script de la slide active — brief section 8. Masquable, jamais public. */
export function PresenterNotesPanel({ open, notes }: PresenterNotesPanelProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="no-print absolute inset-x-0 bottom-0 z-40 border-t border-fog-dim bg-white/97 backdrop-blur-sm"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.28, ease: [0.22, 0.9, 0.28, 1] }}
        >
          <div className="flex items-start gap-3 px-6 py-4">
            <NotebookText className="mt-0.5 h-4 w-4 flex-none text-signal" />
            <div>
              <p className="font-mono text-[10.5px] uppercase tracking-wide text-slate">
                Notes du présentateur
              </p>
              <p className="mt-1 max-w-3xl text-[13.5px] leading-relaxed text-ink">
                {notes ?? "Pas de note pour cette slide."}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
