interface EyebrowLabelProps {
  children: string;
  tone?: "signal" | "slate";
}

/**
 * Le petit label mono en majuscules avec puce, utilisé en tête de chaque slide.
 * Couleur = signal (fonds sombres) ou slate (fonds clairs) — jamais une 3e couleur.
 */
export function EyebrowLabel({ children, tone = "slate" }: EyebrowLabelProps) {
  const color = tone === "signal" ? "text-signal-bright" : "text-slate";
  const dot = tone === "signal" ? "bg-signal-bright" : "bg-slate";

  return (
    <div className={`font-mono-label flex items-center gap-2.5 text-[12.5px] font-medium ${color}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {children}
    </div>
  );
}
