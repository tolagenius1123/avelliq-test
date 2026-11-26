import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { ProfessionalPortrait } from "@/features/professionals/components/professional-portrait"
import { formatHours, formatTimeRange } from "@/lib/date"
import { cn } from "@/lib/utils"

import { describePayment } from "../lib/payment"
import { bookingDetailsHref } from "../lib/routes"
import { TIME_ZONE } from "../lib/time-zone"
import type { Booking } from "../types"
import { BookingDateTile } from "./booking-date-tile"
import { BookingStatusBadge } from "./booking-status-badge"

const DIVIDED_CELL_CLASS =
  "@5xl/page:flex @5xl/page:h-22 @5xl/page:items-center @5xl/page:border-l-[0.5px] @5xl/page:border-stroke/60 @5xl/page:pl-4 @[72rem]/page:pl-6"

export function BookingRow({ booking }: { booking: Booking }) {
  const { id, professional, service, serviceDetail, start, end, price, care, status } = booking

  return (
    <article className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-4 rounded-[12px] bg-white p-4 text-sm leading-[1.3] @5xl/page:grid-cols-[minmax(0,1fr)_202px_110px_140px_auto] @[72rem]/page:grid-cols-[minmax(0,1fr)_224px_146px_138px_auto] @5xl/page:gap-x-0 @5xl/page:px-5 @5xl/page:py-3">
      <div className="col-span-2 flex items-center gap-3 @md/page:gap-5 @5xl/page:col-span-1 @5xl/page:gap-3 @[72rem]/page:gap-5">
        <BookingDateTile date={start} />
        <div className="flex min-w-0 items-center gap-3">
          <ProfessionalPortrait
            professional={professional}
            sizes="48px"
            className="hidden size-12 shrink-0 rounded-full text-base @md/page:flex"
          />
          <div className="flex min-w-0 flex-col gap-1.5 text-muted-foreground">
            <h3 className="font-heading text-xl leading-[1.2] font-medium text-ink-strong">
              {professional.name}
            </h3>
            <p>
              {service} · {serviceDetail}
            </p>
            <p>{id}</p>
          </div>
        </div>
      </div>

      <div className={cn("col-span-2 @md/page:col-span-1", DIVIDED_CELL_CLASS)}>
        <div className="flex flex-col gap-1.5">
          <p className="text-base leading-[1.4] text-ink-strong">{formatTimeRange(start, end)}</p>
          <p className="text-muted-foreground">
            {formatHours(price.hours)} · {TIME_ZONE.abbreviation} | {care.city}
          </p>
        </div>
      </div>

      <p
        className={cn(
          "text-ink-strong @md/page:justify-self-end @5xl/page:w-full",
          DIVIDED_CELL_CLASS
        )}
      >
        {describePayment(booking).amount}
      </p>

      <div
        className={cn(
          "justify-self-end @md/page:justify-self-start @5xl/page:w-full",
          DIVIDED_CELL_CLASS
        )}
      >
        <BookingStatusBadge status={status} compact />
      </div>

      <Link
        href={bookingDetailsHref(id)}
        aria-label={`View details for booking ${id}`}
        className={cn(
          buttonVariants({ variant: "outline-primary" }),
          "col-span-2 h-11 rounded-full px-6 font-normal @md/page:col-span-1 @5xl/page:h-10"
        )}
      >
        View details
      </Link>
    </article>
  )
}
