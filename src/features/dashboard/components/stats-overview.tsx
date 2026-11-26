"use client"

import checkIcon from "@/assets/icons/dashboard/check.svg"
import heartIcon from "@/assets/icons/dashboard/heart.svg"
import messageIcon from "@/assets/icons/dashboard/message.svg"
import walletIcon from "@/assets/icons/dashboard/wallet.svg"
import { Skeleton } from "@/components/ui/skeleton"
import { useBookings } from "@/features/bookings/hooks/use-bookings"
import type { Booking } from "@/features/bookings/types"
import { useConversations } from "@/features/messages/hooks/use-conversations"
import { formatRelativeDay, formatTime } from "@/lib/date"

import { ACCOUNT_SUMMARY } from "../data/mock"
import type { DashboardStat } from "../types"
import { StatCard } from "./stat-card"

const STAT_COUNT = 4

const describeNextBooking = (booking: Booking | undefined, now: Date) =>
  booking
    ? `Next: ${formatRelativeDay(booking.start, now).toLowerCase()}, ${formatTime(booking.start)}`
    : "Nothing scheduled"

export function StatsOverview() {
  const data = useBookings()
  const messages = useConversations()
  const { activeCareRequests, newApplicants, savedProfessionals } = ACCOUNT_SUMMARY

  const stats: DashboardStat[] = data
    ? [
        {
          icon: walletIcon,
          label: "Upcoming bookings",
          value: data.upcoming.length,
          hint: describeNextBooking(data.next, data.now),
        },
        {
          icon: checkIcon,
          label: "Active care requests",
          value: activeCareRequests,
          hint: `${newApplicants} new applicants`,
        },
        {
          icon: heartIcon,
          label: "Saved professionals",
          value: savedProfessionals,
          hint: "Your trusted shortlist",
        },
        {
          icon: messageIcon,
          label: "Unread messages",
          value: messages?.unreadTotal ?? 0,
          hint: "Stay in the loop",
        },
      ]
    : []

  return (
    <section aria-label="Account summary">
      <ul className="grid grid-cols-2 gap-3 @xl:gap-5 @5xl:grid-cols-4">
        {data
          ? stats.map((stat) => (
              <li key={stat.label}>
                <StatCard {...stat} />
              </li>
            ))
          : Array.from({ length: STAT_COUNT }, (_, index) => (
              <li key={index}>
                <Skeleton className="h-28.75 rounded-[8px] bg-white" />
              </li>
            ))}
      </ul>
    </section>
  )
}
