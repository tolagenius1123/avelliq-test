"use client"

import { useMemo } from "react"

import { useNow } from "@/hooks/use-now"

import { createMockBookings } from "../data/mock"

export function useBookings() {
  const now = useNow()

  return useMemo(() => {
    if (!now) return null

    const bookings = createMockBookings(now)
    const upcoming = bookings.filter(({ end }) => end > now)
    return { now, bookings, upcoming, next: upcoming.at(0) }
  }, [now])
}
