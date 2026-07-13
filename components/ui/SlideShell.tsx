import { ReactNode } from "react";

interface SlideShellProps {
  tone: "light" | "dark" | "cover";
  children: ReactNode;
  className?: string;
  /** Mise en page ligne plutôt que colonne (ex. speaker-intro). */
  row?: boolean;
}

const TONE_BG: Record<SlideShellProps["tone"], string> = {
  light: "bg-fog text-ink",
  dark: "bg-[#0b0f14] text-fog",
  cover:
    "bg-[linear-gradient(150deg,var(--ink)_0%,var(--ink-soft)_58%,#16303049_100%)] text-fog",
};

/** Conteneur commun à toutes les slides : fond, padding, direction — brief section 4. */
export function SlideShell({ tone, children, className = "", row = false }: SlideShellProps) {
  return (
    <div
      className={`flex h-full w-full ${row ? "flex-row items-center gap-10" : "flex-col"} px-8 py-10 sm:px-14 sm:py-12 ${TONE_BG[tone]} ${className}`}
    >
      {children}
    </div>
  );
}
