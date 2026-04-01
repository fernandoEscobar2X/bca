import { cn } from "../../lib/cn";
import type { LeadStatus } from "../../lib/quote";

type StatusBadgeProps = {
  status: LeadStatus;
  compact?: boolean;
};

const statusMap: Record<LeadStatus, string> = {
  Nuevo: "border-hydro-cyan/35 bg-hydro-cyan/10 text-ink",
  "En revision": "border-industrial-gold/45 bg-industrial-gold/15 text-ink",
  Contactado: "border-ink/15 bg-ink text-white",
};

export function StatusBadge({ compact = false, status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center border font-sans font-semibold uppercase",
        compact ? "px-2.5 py-1 text-[0.65rem] tracking-[0.14em]" : "px-3 py-1.5 text-[0.72rem] tracking-[0.14em]",
        statusMap[status],
      )}
    >
      {status}
    </span>
  );
}
