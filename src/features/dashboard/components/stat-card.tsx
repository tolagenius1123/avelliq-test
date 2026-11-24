import Image from "next/image"

import type { DashboardStat } from "../types"
import { DashboardCard } from "./dashboard-card"

export function StatCard({ icon, label, value, hint }: DashboardStat) {
  return (
    <DashboardCard className="h-full rounded-[8px] [--card-spacing:--spacing(4)] @xl:[--card-spacing:--spacing(5)]">
      <div className="flex flex-col items-start gap-3 px-(--card-spacing) @xl:flex-row @xl:gap-4">
        <span className="flex size-7.5 shrink-0 items-center justify-center rounded-[6px] bg-primary/7">
          <Image src={icon} alt="" width={18} height={18} />
        </span>
        <dl className="flex min-w-0 flex-col gap-0.75">
          <dt className="leading-5 font-medium text-ink-strong">{label}</dt>
          <dd className="font-heading text-2xl leading-[1.33] font-medium text-primary">
            {String(value).padStart(2, "0")}
          </dd>
          <dd className="leading-4 text-muted-foreground">{hint}</dd>
        </dl>
      </div>
    </DashboardCard>
  )
}
