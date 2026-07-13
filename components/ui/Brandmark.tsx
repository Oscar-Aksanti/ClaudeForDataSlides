interface BrandmarkProps {
  day: number;
}

/** Repère de marque permanent, discret, bas-gauche de chaque slide — brief section 4. */
export function Brandmark({ day }: BrandmarkProps) {
  return (
    <div className="no-print pointer-events-none absolute bottom-4 left-4 z-30 flex items-center gap-2 rounded-full bg-ink/55 px-3 py-1.5 font-mono text-[10px] tracking-wide text-fog backdrop-blur-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-signal" />
      JOUR {String(day).padStart(2, "0")} · FORMATIONS4DATA
    </div>
  );
}
