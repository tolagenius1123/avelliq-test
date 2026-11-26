"use client"

import { useMemo } from "react"

import { useNow } from "@/hooks/use-now"

import { createMockBookings } from "../data/mock-bookings"
import { useCreatedBookings } from "../lib/booking-store"
import { isUpcoming, resolveStatus } from "../lib/status"

export function useBookings() {
  const now = useNow()
  const createdBookings = useCreatedBookings()

  return useMemo(() => {
    if (!now) return null

    const bookings = [...createMockBookings(now), ...createdBookings]
      .map((booking) => ({ ...booking, status: resolveStatus(booking, now) }))
      .sort((first, second) => first.start.getTime() - second.start.getTime())
    const scheduled = bookings.filter(({ status }) => status !== "cancelled")
    const upcoming = bookings.filter(isUpcoming)

    return { now, bookings, scheduled, upcoming, next: upcoming.at(0) }
  }, [now, createdBookings])
}
