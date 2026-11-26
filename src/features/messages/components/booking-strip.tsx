import Link from "next/link"

import { bookingDetailsHref } from "@/features/bookings/lib/routes"
import { TIME_ZONE } from "@/features/bookings/lib/time-zone"
import type { Booking } from "@/features/bookings/types"
import { formatHours, formatTimeRange, formatWeekdayDate } from "@/lib/date"

export function BookingStrip({ booking }: { booking: Booking }) {
  const { id, start, end, price } = booking

  return (
    <Link
      href={bookingDetailsHref(id)}
      className="flex flex-col gap-1.5 bg-background px-4 py-3 text-sm leading-[1.3] outline-none hover:bg-background/70 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset @3xl/page:px-5"
    >
      <span className="text-primary">Linked booking · {id}</span>
      <span className="text-muted-foreground">
        {formatWeekdayDate(start)} · {formatTimeRange(start, end)} · {TIME_ZONE.abbreviation} ·{" "}
        {formatHours(price.hours)}
      </span>
    </Link>
  )
}
