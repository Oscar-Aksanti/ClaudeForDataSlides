import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { RESOURCES } from "@/lib/content";
import type { ResourceLink } from "@/lib/types";

function groupByCategory(resources: ResourceLink[]) {
  const groups = new Map<string, ResourceLink[]>();
  for (const r of resources) {
    const list = groups.get(r.category) ?? [];
    list.push(r);
    groups.set(r.category, list);
  }
  return Array.from(groups.entries());
}

export default function RessourcesPage() {
  const grouped = groupByCategory(RESOURCES);

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
            Ressources
          </div>
          <h1 className="mt-4 text-[clamp(26px,4.5vw,38px)] font-bold leading-tight text-white">
            Jeux de données, échantillons et prompts pour t&apos;exercer
          </h1>
          <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-fog/65">
            Des ressources gratuites et vérifiées — pas de compte requis. Chaque lien pointe vers la
            source officielle ; la licence indiquée doit être revérifiée sur la page d&apos;origine avant
            tout usage commercial ou redistribution.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-10 sm:px-16">
        {grouped.map(([category, items]) => (
          <div key={category} className="mb-9">
            <h2 className="mb-3 text-[15px] font-semibold text-ink">{category}</h2>
            <div className="flex flex-col gap-2.5">
              {items.map((r) => (
                <a
                  key={r.url}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-card border border-fog-dim bg-white px-5 py-4 transition-colors hover:border-signal"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[14px] font-semibold text-ink">{r.title}</p>
                    <ExternalLink className="h-3.5 w-3.5 flex-none text-slate transition-colors group-hover:text-signal" />
                  </div>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate">{r.description}</p>
                  <p className="mt-2 font-mono text-[10.5px] uppercase tracking-wide text-signal/80">
                    {r.license}
                    {r.day ? ` · Jour ${r.day}` : ""}
                  </p>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
