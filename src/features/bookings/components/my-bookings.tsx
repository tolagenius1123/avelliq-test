"use client"

import { Plus } from "lucide-react"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ROUTES } from "@/config/site"
import { DashboardPageHeader } from "@/features/dashboard/components/dashboard-page-header"
import { cn } from "@/lib/utils"

import { useBookings } from "../hooks/use-bookings"
import { BookingList } from "./booking-list"
import { BookingsOverview } from "./bookings-overview"
import { NextBookingHero } from "./next-booking-hero"
import { WeekOverviewCard } from "./week-overview-card"

export function MyBookings() {
  const data = useBookings()

  return (
    <>
      <DashboardPageHeader
        title="My bookings"
        description="Your care plans, all in one place."
        action={
          <Link
            href={ROUTES.findCare}
            className={cn(buttonVariants({ size: "pill-lg" }), "font-normal")}
          >
            <Plus aria-hidden="true" strokeWidth={1.5} />
            Book new care
          </Link>
        }
      />
      {data ? (
        <>
          <BookingsOverview bookings={data.bookings} upcoming={data.upcoming} />
          <div className="grid grid-cols-1 gap-6 @5xl:grid-cols-[minmax(0,1fr)_360px]">
            <NextBookingHero booking={data.next} />
            <WeekOverviewCard scheduled={data.scheduled} next={data.next} today={data.now} />
          </div>
          <BookingList bookings={data.bookings} now={data.now} />
        </>
      ) : (
        <>
          <Skeleton className="h-27 rounded-[12px] bg-white" />
          <Skeleton className="h-80 rounded-[16px] bg-white" />
          <Skeleton className="h-150 rounded-[12px] bg-white" />
        </>
      )}
    </>
  )
}
