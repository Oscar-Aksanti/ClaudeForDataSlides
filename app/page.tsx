import Link from "next/link";
import { ALL_DAYS, PROGRAM_META } from "@/lib/content";
import { DayCard } from "@/components/home/DayCard";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-fog">
      <div className="bg-[linear-gradient(150deg,var(--ink)_0%,var(--ink-soft)_58%,#16303049_100%)] px-6 py-16 sm:px-16">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-2.5 font-mono text-[12.5px] font-medium uppercase tracking-[0.14em] text-signal-bright">
            <span className="h-1.5 w-1.5 rounded-full bg-signal-bright" />
            {PROGRAM_META.organizer}
          </div>
          <h1 className="mt-4 text-[clamp(28px,5vw,44px)] font-bold leading-tight text-white">
            {PROGRAM_META.program}
          </h1>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-fog/65">
            Support de présentation interactif des 5 jours de formation. Choisis un jour pour
            reprendre depuis le début, ou depuis la dernière slide consultée.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-10 sm:px-16">
        <div className="flex flex-col gap-3">
          {PROGRAM_META.days.map((meta) => {
            const day = ALL_DAYS.find((d) => d.day === meta.day);
            return (
              <DayCard key={meta.day} meta={meta} slideCount={day?.slides.length ?? 0} />
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <p className="font-mono text-[11px] text-slate">
            ↵ Ouvre un jour · à l&apos;intérieur, Échap ou Ctrl/⌘+K pour le plan de navigation complet
          </p>
          <Link
            href="/ressources"
            className="font-mono text-[11px] font-medium text-signal transition-colors hover:text-signal-bright"
          >
            Ressources →
          </Link>
        </div>
      </div>
    </div>
  );
}
