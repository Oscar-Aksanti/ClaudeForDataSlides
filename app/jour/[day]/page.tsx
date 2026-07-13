import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, ListChecks } from "lucide-react";
import { ALL_DAYS, getDay } from "@/lib/content";
import { getChapterRanges } from "@/lib/chapters";
import { StartOrResumeCTA } from "@/components/day/StartOrResumeCTA";

export function generateStaticParams() {
  return ALL_DAYS.map((d) => ({ day: String(d.day) }));
}

function formatFrenchDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export default async function DaySyllabusPage({ params }: { params: Promise<{ day: string }> }) {
  const { day: dayParam } = await params;
  const day = getDay(Number(dayParam));
  if (!day) notFound();

  const chapters = getChapterRanges(day);
  const totalMinutes = chapters.reduce((sum, c) => sum + c.minutes, 0);

  return (
    <div className="min-h-screen bg-fog">
      <div className="bg-[linear-gradient(150deg,var(--ink)_0%,var(--ink-soft)_58%,#16303049_100%)] px-6 py-14 sm:px-16">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="mb-6 flex items-center gap-1.5 text-[12.5px] font-medium text-fog/55 transition-colors hover:text-fog"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Les 5 jours
          </Link>
          <div className="flex items-center gap-2.5 font-mono text-[12.5px] font-medium uppercase tracking-[0.14em] text-signal-bright">
            <span className="h-1.5 w-1.5 rounded-full bg-signal-bright" />
            Jour {String(day.day).padStart(2, "0")} · {formatFrenchDate(day.date)}
          </div>
          <h1 className="mt-4 text-[clamp(26px,4.5vw,40px)] font-bold leading-tight text-white">
            {day.title}
          </h1>
          {day.objective && (
            <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-fog/65">{day.objective}</p>
          )}
          <div className="mt-7">
            <StartOrResumeCTA day={day.day} totalSlides={day.slides.length} />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-10 sm:px-16">
        <div className="mb-8 flex items-center gap-5 font-mono text-[11.5px] text-slate">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />~{totalMinutes} min au total
          </span>
          <span className="flex items-center gap-1.5">
            <ListChecks className="h-3.5 w-3.5" />
            {day.slides.length} slides
          </span>
        </div>

        <h2 className="mb-3 text-[15px] font-semibold text-ink">Ce qu&apos;on va couvrir</h2>
        <div className="flex flex-col gap-2">
          {chapters.map((chapter, i) => (
            <Link
              key={chapter.firstSlideId}
              href={`/jour/${day.day}/${chapter.startIndex + 1}`}
              className="group flex items-center gap-4 rounded-card border border-fog-dim bg-white px-4.5 py-3 transition-colors hover:border-signal"
            >
              <span className="w-6 flex-none font-mono text-[12px] text-signal">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 text-[13.5px] font-medium text-ink">{chapter.title}</span>
              <span className="flex-none font-mono text-[11px] text-slate">
                {chapter.slideCount} slide{chapter.slideCount > 1 ? "s" : ""} · {chapter.minutes} min
              </span>
            </Link>
          ))}
        </div>

        {day.deliverables && day.deliverables.length > 0 && (
          <>
            <h2 className="mb-3 mt-9 text-[15px] font-semibold text-ink">Livrables attendus</h2>
            <div className="flex flex-col gap-2">
              {day.deliverables.map((item) => (
                <div
                  key={item}
                  className="rounded-card border border-fog-dim bg-white px-4.5 py-3 text-[13px] text-slate"
                >
                  {item}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
