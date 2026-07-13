"use client";

const KEY_PREFIX = "claude-data-progress:";

/** Reprise de lecture — aucune base de données, juste localStorage côté navigateur. */
export function saveProgress(day: number, slidePosition: number) {
  try {
    localStorage.setItem(`${KEY_PREFIX}${day}`, String(slidePosition));
  } catch {
    // localStorage indisponible (navigation privée, quota) — silencieux, non bloquant.
  }
}

export function readProgress(day: number): number | null {
  try {
    const raw = localStorage.getItem(`${KEY_PREFIX}${day}`);
    return raw ? parseInt(raw, 10) : null;
  } catch {
    return null;
  }
}

export function readAllProgress(days: number[]): Record<number, number> {
  const result: Record<number, number> = {};
  for (const day of days) {
    const value = readProgress(day);
    if (value) result[day] = value;
  }
  return result;
}
