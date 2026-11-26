import { CalendarDays, Check, CircleCheck, type LucideIcon } from "lucide-react"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { bookingDetailsHref } from "@/features/bookings/lib/routes"
import { formatCareAddress } from "@/features/bookings/lib/summary"
import { TIME_ZONE } from "@/features/bookings/lib/time-zone"
import type { Booking } from "@/features/bookings/types"
import { DashboardCard } from "@/features/dashboard/components/dashboard-card"
import { CURRENT_USER } from "@/features/dashboard/data/mock"
import { profileHref } from "@/features/professionals/lib/routes"
import { formatHours, formatLongDate, formatTimeRange, getHoursBetween } from "@/lib/date"
import { cn } from "@/lib/utils"

import { STEP_BACK_CLASS, STEP_NAVIGATION_CLASS, STEP_NEXT_CLASS } from "./step-navigation"

const NEXT_STEPS: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: CircleCheck,
    title: "Your details are ready",
    description: "Your care notes and contact details are included in the booking.",
  },
  {
    icon: CalendarDays,
    title: "Keep everything together",
    description: "Find the appointment and payment receipt in your booking details.",
  },
]

export function BookingConfirmed({ booking }: { booking: Booking }) {
  const { id, professional, start, end, care } = booking
  const duration = formatHours(getHoursBetween(start, end))

  return (
    <DashboardCard className="gap-6 rounded-[16px] p-4 @md/page:p-6">
      <div className="flex flex-col items-center gap-4 py-4 text-center">
        <span className="flex size-18 items-center justify-center rounded-full bg-primary text-white">
          <Check aria-hidden="true" strokeWidth={1.5} className="size-9" />
        </span>
        <h2 className="font-heading text-2xl leading-[1.2] font-medium text-primary">
          You&apos;re all set, {CURRENT_USER.firstName}.
        </h2>
        <p className="text-base leading-[1.4] text-muted-foreground">
          Your booking with {professional.name} is confirmed.
        </p>
        <p className="text-sm leading-[1.3] text-ink-strong">Booking reference · {id}</p>
      </div>

      <div className="flex flex-col gap-2.5 rounded-[12px] bg-background p-4 @md/page:p-5">
        <p className="font-heading text-xl leading-[1.2] font-medium text-primary">
          {formatLongDate(start)}
        </p>
        <div className="flex flex-col gap-2 @2xl/page:flex-row @2xl/page:items-center @2xl/page:gap-4">
          <p className="text-base leading-[1.4] text-ink-strong @2xl/page:shrink-0">
            {formatTimeRange(start, end)} · {duration} · {TIME_ZONE.label}
          </p>
          <p className="min-w-0 text-sm leading-[1.3] wrap-break-word text-muted-foreground @2xl/page:border-l-[0.5px] @2xl/page:border-stroke @2xl/page:py-1.25 @2xl/page:pl-2.5">
            {formatCareAddress(care)}
          </p>
        </div>
      </div>

      <h3 className="font-heading text-xl leading-[1.2] font-medium text-ink-strong">
        What happens next
      </h3>
      <ul className="flex flex-col gap-6">
        {NEXT_STEPS.map(({ icon: Icon, title, description }) => (
          <li key={title} className="flex items-center gap-4">
            <Icon aria-hidden="true" strokeWidth={1.5} className="size-6 shrink-0 text-ink-strong" />
            <div className="flex flex-col gap-1.5">
              <p className="text-base leading-[1.4] text-ink-strong">{title}</p>
              <p className="text-sm leading-[1.3] text-muted-foreground">{description}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className={STEP_NAVIGATION_CLASS}>
        <Link
          href={profileHref(professional.id)}
          className={cn(
            buttonVariants({ variant: "outline-primary", size: "pill-lg" }),
            STEP_BACK_CLASS
          )}
        >
          Back to profile
        </Link>
        <Link
          href={bookingDetailsHref(id)}
          className={cn(buttonVariants({ size: "pill-lg" }), STEP_NEXT_CLASS)}
        >
          View booking details
        </Link>
      </div>
    </DashboardCard>
  )
}
