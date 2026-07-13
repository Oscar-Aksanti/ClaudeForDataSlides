interface SlideCounterProps {
  current: number;
  total: number;
}

/** Compteur discret "12 / 15" en haut à droite, complète la barre de progression. */
export function SlideCounter({ current, total }: SlideCounterProps) {
  return (
    <div className="no-print absolute top-4 right-4 z-30 font-mono text-[11px] tracking-wide text-slate/70">
      {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
    </div>
  );
}
