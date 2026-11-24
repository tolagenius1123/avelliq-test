"use client"

import { Calendar, MapPin } from "lucide-react"

import { ComingSoonButton } from "@/components/shared/coming-soon-button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatMonthDay, formatRelativeDay, formatTimeRange } from "@/lib/date"
import { cn, getInitials } from "@/lib/utils"

import { useBookings } from "../hooks/use-bookings"
import type { Booking } from "../types"
import { BookingStatusBadge } from "./booking-status-badge"
import { DashboardCard } from "./dashboard-card"

const HOUR_MS = 3_600_000
const PORTRAIT_SHAPE_CLASS = "rounded-[12px]"

function formatDuration({ start, end }: Booking) {
  const hours = (end.getTime() - start.getTime()) / HOUR_MS
  return `${hours} ${hours === 1 ? "hour" : "hours"}`
}

function BookingSummary({ booking, now }: { booking: Booking; now: Date }) {
  const { professional, service, serviceDetail, location, start, end } = booking

  return (
    <>
      <div className="flex items-start gap-4 @[23rem]:gap-5">
        <Avatar className={cn("size-20 after:rounded-[12px]", PORTRAIT_SHAPE_CLASS)}>
          <AvatarImage
            src={professional.portrait?.src}
            alt={professional.name}
            className={PORTRAIT_SHAPE_CLASS}
          />
          <AvatarFallback className={cn("font-heading text-xl text-primary", PORTRAIT_SHAPE_CLASS)}>
            {getInitials(professional.shortName)}
          </AvatarFallback>
        </Avatar>
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
              {formatTimeRange(start, end)} · {formatDuration(booking)}
            </p>
          </div>
        </div>
        <ComingSoonButton className="h-10 rounded-full px-6 font-normal">
          View booking
        </ComingSoonButton>
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
