import { notFound } from "next/navigation";
import { ALL_DAYS, getDay } from "@/lib/content";
import { SlideRenderer } from "@/lib/slide-registry";
import { PrintButton } from "@/components/ui/PrintButton";

export function generateStaticParams() {
  return ALL_DAYS.map((d) => ({ day: String(d.day) }));
}

export default async function PrintPage({ params }: { params: Promise<{ day: string }> }) {
  const { day: dayParam } = await params;
  const day = getDay(Number(dayParam));
  if (!day) notFound();

  return (
    <div className="bg-fog-dim py-8">
      <PrintButton />
      <div className="mx-auto flex max-w-[1100px] flex-col gap-8 px-4">
        {day.slides.map((slide, i) => (
          <div
            key={slide.id}
            className="print-page relative aspect-[16/9.4] w-full overflow-hidden rounded-card shadow-md"
          >
            <div className="absolute left-3 top-3 z-30 font-mono text-[10px] text-slate/70 print:text-slate">
              {String(i + 1).padStart(2, "0")} / {String(day.slides.length).padStart(2, "0")}
            </div>
            <SlideRenderer slide={slide} />
          </div>
        ))}
      </div>
    </div>
  );
}
