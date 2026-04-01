import type { ComponentPropsWithoutRef } from "react";

import { cn } from "../../lib/cn";

type SurfaceCardProps = ComponentPropsWithoutRef<"div">;

export function SurfaceCard({ className, ...props }: SurfaceCardProps) {
  return <div className={cn("border border-ink/15 bg-white shadow-plate", className)} {...props} />;
}
