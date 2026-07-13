"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="no-print fixed right-5 top-5 z-30 flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-[13px] font-medium text-white shadow-lg"
    >
      <Printer className="h-4 w-4" />
      Imprimer / Exporter en PDF
    </button>
  );
}
