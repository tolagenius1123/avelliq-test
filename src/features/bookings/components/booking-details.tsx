"use client"

import { ChevronLeft, CreditCard } from "lucide-react"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ROUTES } from "@/config/site"
import { BookingProgress } from "@/features/booking-flow/components/booking-progress"
import { BOOKING_STEPS } from "@/features/booking-flow/data/steps"
import { DashboardCard } from "@/features/dashboard/components/dashboard-card"
import { DashboardPageHeader } from "@/features/dashboard/components/dashboard-page-header"
import { getCategoryLabel } from "@/features/professionals/data/categories"
import { bookingHref, profileHref } from "@/features/professionals/lib/routes"
import { formatCurrency } from "@/lib/currency"
import { formatTimeRange, formatWeekdayDate } from "@/lib/date"
import { cn } from "@/lib/utils"

import { useBookings } from "../hooks/use-bookings"
import { describePayment } from "../lib/payment"
import { formatCareAddress } from "../lib/summary"
import { TIME_ZONE } from "../lib/time-zone"
import type { Booking, BookingStatus } from "../types"
import { BookingStatusBadge } from "./booking-status-badge"
import { BookingSummary } from "./booking-summary"

const DESCRIPTIONS: Record<BookingStatus, (booking: Booking) => string> = {
  confirmed: () => "Everything you need for your upcoming care.",
  pending: ({ professional }) => `Waiting for ${professional.shortName} to confirm this booking.`,
  completed: () => "A record of your past care.",
  cancelled: () => "This booking was cancelled.",
}

const ACTION_CLASS = "font-normal @md/page:min-w-55"

function BackToBookings() {
  return (
    <Link
      href={ROUTES.bookings}
      className={cn(
        buttonVariants({ variant: "link" }),
        "relative -ml-1 h-auto gap-1 self-start p-0 font-normal after:absolute after:-inset-2"
      )}
    >
      <ChevronLeft aria-hidden="true" strokeWidth={1.5} />
      My bookings
    </Link>
  )
}

function BookingRecord({ booking }: { booking: Booking }) {
  const { id, professional, start, end, care, price, status } = booking
  const payment = describePayment(booking)

  const details = [
    {
      term: "Care professional",
      value: `${professional.name} · ${professional.role} / ${getCategoryLabel(professional.category)}`,
    },
    {
      term: "Date & time",
      value: `${formatWeekdayDate(start)} · ${formatTimeRange(start, end)} · ${TIME_ZONE.label}`,
    },
    { term: "Care recipient", value: care.recipient },
    { term: "Care address", value: formatCareAddress(care) },
    { term: "Booking contact", value: `${care.contactName} · ${care.contactPhone}` },
    { term: "Care notes", value: care.notes },
  ]

  return (
    <DashboardCard className="gap-6 rounded-[16px] p-4 @md/page:p-6">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
        <h2 className="font-heading text-xl leading-[1.2] font-medium text-ink-strong">
          Booking {id}
        </h2>
        <BookingStatusBadge status={status} withIcon />
      </div>

      <dl className="flex flex-col gap-6">
        {details
          .filter(({ value }) => value)
          .map(({ term, value }) => (
            <div key={term} className="flex flex-col gap-1.5">
              <dt className="text-sm leading-[1.3] text-muted-foreground">{term}</dt>
              <dd className="text-base leading-[1.4] wrap-break-word text-ink-strong">{value}</dd>
            </div>
          ))}
      </dl>

      <div className="flex items-center gap-3 rounded-[12px] bg-background p-4">
        <span className="flex size-8.5 shrink-0 items-center justify-center rounded-full bg-secondary text-support">
          <CreditCard aria-hidden="true" strokeWidth={1.5} className="size-4.5" />
        </span>
        <div className="flex min-w-0 flex-col gap-1.5">
          <p className="text-base leading-[1.4] text-primary">
            {payment.receipt}
          </p>
          <p className="text-sm leading-[1.3] text-muted-foreground">
            Care {formatCurrency(price.care)} + service fee {formatCurrency(price.serviceFee)}
          </p>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 @md/page:flex-row @md/page:justify-between">
        <Link
          href={profileHref(professional.id)}
          className={cn(
            buttonVariants({ variant: "outline-primary", size: "pill-lg" }),
            "border",
            ACTION_CLASS
          )}
        >
          View professional
        </Link>
        <Link
          href={bookingHref(professional.id)}
          className={cn(buttonVariants({ size: "pill-lg" }), ACTION_CLASS)}
        >
          Book again
        </Link>
      </div>
    </DashboardCard>
  )
}

export function BookingDetails({ bookingId }: { bookingId: string }) {
  const data = useBookings()
  const booking = data?.bookings.find(({ id }) => id === bookingId)

  if (!data) {
    return (
      <>
        <Skeleton className="h-17 max-w-120 bg-white" />
        <Skeleton className="h-150 rounded-[16px] bg-white" />
      </>
    )
  }

  if (!booking) {
    return (
      <DashboardPageHeader
        eyebrow={<BackToBookings />}
        title="Booking not found"
        description={`We couldn't find booking ${bookingId}. It may have been removed.`}
      />
    )
  }

  return (
    <>
      <DashboardPageHeader
        eyebrow={<BackToBookings />}
        title="Booking details"
        description={DESCRIPTIONS[booking.status](booking)}
      />
      {booking.status !== "cancelled" && <BookingProgress currentIndex={BOOKING_STEPS.length} />}
      <div className="grid grid-cols-1 items-start gap-6 @5xl/page:grid-cols-[minmax(0,1fr)_384px]">
        <BookingRecord booking={booking} />
        <BookingSummary
          title="Your Booking"
          summary={booking}
          note={describePayment(booking).note}
        />
      </div>
    </>
  )
}
