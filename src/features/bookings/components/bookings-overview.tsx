import { Calendar, CircleCheck, Clock, type LucideIcon } from "lucide-react"

import { DashboardCard } from "@/features/dashboard/components/dashboard-card"
import { formatWeekdayMonthDay } from "@/lib/date"

import type { Booking } from "../types"

interface BookingsOverviewProps {
  bookings: Booking[]
  upcoming: Booking[]
}

export function BookingsOverview({ bookings, upcoming }: BookingsOverviewProps) {
  const next = upcoming.at(0)

  const metrics: { icon: LucideIcon; label: string; value: number; hint: string }[] = [
    {
      icon: Calendar,
      label: "Upcoming bookings",
      value: upcoming.length,
      hint: next ? `Next: ${formatWeekdayMonthDay(next.start)}` : "Nothing scheduled",
    },
    {
      icon: Clock,
      label: "Awaiting confirmation",
      value: upcoming.filter(({ status }) => status === "pending").length,
      hint: "Included in upcoming",
    },
    {
      icon: CircleCheck,
      label: "Completed care",
      value: bookings.filter(({ status }) => status === "completed").length,
      hint: "Your past appointments",
    },
  ]

  return (
    <section aria-label="Bookings summary">
      <ul className="grid grid-cols-1 gap-3 @xl:grid-cols-3 @xl:gap-4">
        {metrics.map(({ icon: Icon, label, value, hint }) => (
          <li key={label}>
            <DashboardCard className="h-full gap-2 p-4">
              <dl className="contents">
                <dt className="flex items-center gap-2.5 leading-[1.3] text-ink-strong">
                  <span className="flex size-7.5 shrink-0 items-center justify-center rounded-[6px] bg-primary/7 text-primary">
                    <Icon aria-hidden="true" strokeWidth={1.5} className="size-4.5" />
                  </span>
                  {label}
                </dt>
                <dd className="flex flex-wrap items-center gap-x-4">
                  <span className="font-heading text-[32px] leading-[1.2] font-semibold text-primary">
                    {String(value).padStart(2, "0")}
                  </span>
                  <span className="leading-[1.3] text-muted-foreground">{hint}</span>
                </dd>
              </dl>
            </DashboardCard>
          </li>
        ))}
      </ul>
    </section>
  )
}
