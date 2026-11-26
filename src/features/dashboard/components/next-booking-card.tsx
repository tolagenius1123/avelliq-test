"use client"

import { Calendar, MapPin } from "lucide-react"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { BookingStatusBadge } from "@/features/bookings/components/booking-status-badge"
import { useBookings } from "@/features/bookings/hooks/use-bookings"
import { bookingDetailsHref } from "@/features/bookings/lib/routes"
import type { Booking } from "@/features/bookings/types"
import { ProfessionalPortrait } from "@/features/professionals/components/professional-portrait"
import {
  formatHours,
  formatMonthDay,
  formatRelativeDay,
  formatTimeRange,
  getHoursBetween,
} from "@/lib/date"
import { cn } from "@/lib/utils"

import { DashboardCard } from "./dashboard-card"

function BookingSummary({ booking, now }: { booking: Booking; now: Date }) {
  const { professional, service, serviceDetail, location, start, end } = booking

  return (
    <>
      <div className="flex items-start gap-4 @[23rem]:gap-5">
        <ProfessionalPortrait
          professional={professional}
          sizes="80px"
          className="size-20 shrink-0 rounded-[12px] text-xl"
        />
        <div className="flex min-w-0 flex-col gap-2 leading-[1.3] text-muted-foreground">
          <h3 className="font-heading text-xl leading-[1.2] font-medium text-ink-strong">
            {professional.name}
          </h3>
          <p>
            {service} · {serviceDetail}
          </p>
          <p className="flex items-start gap-1.5">
            <MapPin aria-hidden="true" strokeWidth={1.5} className="size-4.25 shrink-0" />
            {location}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-[20px] bg-background p-3 @[23rem]:flex-row @[23rem]:items-center @[23rem]:justify-between @[23rem]:rounded-full @[23rem]:py-1.75 @[23rem]:pr-2.5 @[23rem]:pl-4.25">
        <div className="flex items-center gap-3 leading-[1.3]">
          <Calendar aria-hidden="true" strokeWidth={1.5} className="size-5 shrink-0 text-ink-body" />
          <div className="flex flex-col gap-0.5">
            <p className="text-primary">
              {formatRelativeDay(start, now)}, {formatMonthDay(start)}
            </p>
            <p className="text-muted-foreground">
              {formatTimeRange(start, end)} · {formatHours(getHoursBetween(start, end))}
            </p>
          </div>
        </div>
        <Link
          href={bookingDetailsHref(booking.id)}
          className={cn(buttonVariants(), "h-10 rounded-full px-6 font-normal")}
        >
          View booking
        </Link>
      </div>
    </>
  )
}

export function NextBookingCard({ className }: { className?: string }) {
  const data = useBookings()

  return (
    <DashboardCard className={className}>
      <CardHeader>
        <CardTitle className="text-xl leading-[1.2] text-ink-strong">
          <h2>Your next bookings</h2>
        </CardTitle>
        {data?.next && (
          <CardAction>
            <BookingStatusBadge status={data.next.status} />
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="@container flex-1 justify-between gap-6">
        {!data && <Skeleton className="h-39.5 rounded-[12px]" />}
        {data?.next && <BookingSummary booking={data.next} now={data.now} />}
        {data && !data.next && (
          <p className="text-muted-foreground">You have no upcoming bookings yet.</p>
        )}
      </CardContent>
    </DashboardCard>
  )
}
