import type { DayContent, DayMetaEntry, ResourceLink, FeaturedResource } from "@/lib/types";
import jour1 from "@/content/jour-1.json";
import jour2 from "@/content/jour-2.json";
import jour3 from "@/content/jour-3.json";
import jour4 from "@/content/jour-4.json";
import jour5 from "@/content/jour-5.json";
import metaJson from "@/content/meta.json";
import resourcesJson from "@/content/ressources.json";

export const ALL_DAYS = [jour1, jour2, jour3, jour4, jour5] as unknown as DayContent[];

export const PROGRAM_META = metaJson as {
  program: string;
  organizer: string;
  days: DayMetaEntry[];
};

const RESOURCES_JSON = resourcesJson as { featured: FeaturedResource; resources: ResourceLink[] };
export const RESOURCES = RESOURCES_JSON.resources;
export const FEATURED_RESOURCE = RESOURCES_JSON.featured;

export function getDay(day: number): DayContent | undefined {
  return ALL_DAYS.find((d) => d.day === day);
}

export function getSlideIndex(day: DayContent, slidePosition: number): number | undefined {
  const index = slidePosition - 1;
  if (index < 0 || index >= day.slides.length) return undefined;
  return index;
}
