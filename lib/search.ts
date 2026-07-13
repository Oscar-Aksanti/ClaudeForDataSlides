import type { DayContent, Slide } from "@/lib/types";

export interface SearchableSlide {
  day: number;
  slidePosition: number;
  slideId: string;
  title: string;
  eyebrow: string;
}

/** Titre affichable d'une slide, quel que soit son type (cover a un titre multi-ligne, etc.). */
export function getSlideDisplayTitle(slide: Slide): string {
  switch (slide.type) {
    case "cover":
      return slide.title.join(" ");
    case "speaker-intro":
      return slide.name;
    case "quote-stat":
      return slide.label;
    default:
      return slide.title;
  }
}

export function buildSearchIndex(days: DayContent[]): SearchableSlide[] {
  return days.flatMap((day) =>
    day.slides.map((slide, i) => ({
      day: day.day,
      slidePosition: i + 1,
      slideId: slide.id,
      title: getSlideDisplayTitle(slide),
      eyebrow: "eyebrow" in slide ? slide.eyebrow : "",
    }))
  );
}

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

/** Correspondance floue simple : sous-séquence des caractères de la requête dans le texte. */
export function fuzzyMatch(query: string, text: string): boolean {
  const q = normalize(query);
  const t = normalize(text);
  if (q.length === 0) return true;
  if (t.includes(q)) return true;

  let qi = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) qi++;
  }
  return qi === q.length;
}

export function searchSlides(index: SearchableSlide[], query: string): SearchableSlide[] {
  if (!query.trim()) return index;
  return index.filter(
    (item) => fuzzyMatch(query, item.title) || fuzzyMatch(query, item.eyebrow)
  );
}
