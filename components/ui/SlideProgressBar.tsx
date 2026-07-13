interface SlideProgressBarProps {
  current: number;
  total: number;
}

/**
 * Barre de progression du jour en cours, toujours visible — brief section 8 :
 * "pas juste des points de navigation". Volontairement discrète (1px, coin haut).
 */
export function SlideProgressBar({ current, total }: SlideProgressBarProps) {
  const pct = total > 1 ? (current / (total - 1)) * 100 : 100;

  return (
    <div className="no-print absolute top-0 left-0 right-0 z-30 h-[3px] bg-fog-dim/40">
      <div
        className="h-full bg-signal transition-[width] duration-300 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
