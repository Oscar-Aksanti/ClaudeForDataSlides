import type { DayContent, DayChapter } from "@/lib/types";

export interface ChapterRange extends DayChapter {
  startIndex: number;
  slideCount: number;
}

/** Calcule la plage de slides de chaque chapitre à partir de `firstSlideId` — évite de dupliquer les index dans le JSON. */
export function getChapterRanges(day: DayContent): ChapterRange[] {
  const chapters = day.chapters ?? [];
  return chapters.map((chapter, i) => {
    const startIndex = day.slides.findIndex((s) => s.id === chapter.firstSlideId);
    const nextChapter = chapters[i + 1];
    const endIndex = nextChapter
      ? day.slides.findIndex((s) => s.id === nextChapter.firstSlideId)
      : day.slides.length;
    return {
      ...chapter,
      startIndex: Math.max(0, startIndex),
      slideCount: Math.max(1, endIndex - Math.max(0, startIndex)),
    };
  });
}
