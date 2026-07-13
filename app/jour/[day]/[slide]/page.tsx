import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ALL_DAYS, getDay, getSlideIndex } from "@/lib/content";
import { getSlideDisplayTitle } from "@/lib/search";
import { SlideDeck } from "@/components/deck/SlideDeck";

interface RouteParams {
  day: string;
  slide: string;
}

export function generateStaticParams({ params }: { params: { day: string } }) {
  const day = ALL_DAYS.find((d) => String(d.day) === params.day);
  if (!day) return [];
  return day.slides.map((_, i) => ({ slide: String(i + 1) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { day: dayParam, slide: slideParam } = await params;
  const day = getDay(Number(dayParam));
  const index = day ? getSlideIndex(day, Number(slideParam)) : undefined;
  if (!day || index === undefined) return {};

  const slideTitle = getSlideDisplayTitle(day.slides[index]);
  return {
    title: `${slideTitle} — Jour ${day.day} · Maîtrisez l'Analyse des Données avec Claude`,
  };
}

export default async function SlidePage({ params }: { params: Promise<RouteParams> }) {
  const { day: dayParam, slide: slideParam } = await params;
  const day = getDay(Number(dayParam));
  if (!day) notFound();

  const index = getSlideIndex(day, Number(slideParam));
  if (index === undefined) notFound();

  return <SlideDeck day={day} index={index} allDays={ALL_DAYS} />;
}
