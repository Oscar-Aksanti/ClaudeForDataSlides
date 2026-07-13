"use client";

import { useEffect, useState } from "react";

/**
 * Utilisé pour basculer entre le deck plein écran et le mode lecture empilé sous un breakpoint.
 * La valeur initiale reste `false` (desktop) pour matcher le HTML pré-rendu côté serveur ;
 * l'effet ajuste ensuite vers la vraie valeur client, évitant un mismatch d'hydratation.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- synchronise avec window.matchMedia, indisponible côté serveur
    setMatches(mql.matches);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
