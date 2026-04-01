import type { ReactNode } from "react";

import { cn } from "../../lib/cn";

type SectionIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  aside?: ReactNode;
  className?: string;
};

export function SectionIntro({ aside, className, description, eyebrow, title }: SectionIntroProps) {
  return (
    <div className={cn("grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end", className)}>
      <div className="space-y-4">
        <p className="font-sans text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-hydro-cyan">{eyebrow}</p>
        <h2 className="max-w-4xl font-display text-[clamp(2.25rem,4.5vw,4rem)] font-bold leading-[0.96] tracking-[-0.045em] text-ink">
          {title}
        </h2>
      </div>

      <div className="grid gap-4 lg:justify-items-end">
        <p className="max-w-2xl text-sm leading-7 text-graphite/84 sm:text-[1rem]">{description}</p>
        {aside}
      </div>
    </div>
  );
}
