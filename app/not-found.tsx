import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-ink px-6 text-center text-fog">
      <p className="font-mono text-[12.5px] uppercase tracking-[0.14em] text-signal-bright">
        404 · Slide introuvable
      </p>
      <h1 className="text-[28px] font-semibold text-white">Cette page n&apos;existe pas</h1>
      <p className="max-w-sm text-[14px] text-fog/60">
        Le jour ou la slide demandée n&apos;existe pas dans le programme.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-full bg-signal px-5 py-2 text-[13px] font-medium text-white transition-colors hover:bg-signal-bright"
      >
        Retour au plan des 5 jours
      </Link>
    </div>
  );
}
