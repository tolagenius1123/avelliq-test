"use client"

import { useState } from "react"

import { paginate } from "@/lib/pagination"

import { ALL_SERVICES, BOOKING_TABS, BOOKINGS_PAGE_SIZE } from "../data/options"
import { filterBookings, matchesTab, type BookingFilters } from "../lib/filter-bookings"
import type { Booking } from "../types"

const INITIAL_FILTERS: BookingFilters = {
  tab: "all",
  query: "",
  service: ALL_SERVICES,
  dateRange: "all",
  sort: "upcoming",
}

export function useBookingList(bookings: Booking[], now: Date) {
  const [filters, setFilters] = useState(INITIAL_FILTERS)
  const [page, setPage] = useState(1)

  const update = (changes: Partial<BookingFilters>) => {
    setFilters((current) => ({ ...current, ...changes }))
    setPage(1)
  }

  return {
    filters,
    update,
    setPage,
    tabs: BOOKING_TABS.map(({ value, label }) => ({
      value,
      label: `${label} (${bookings.filter((booking) => matchesTab(booking, value)).length})`,
    })),
    slice: paginate(filterBookings(bookings, filters, now), page, BOOKINGS_PAGE_SIZE),
    reset: () => update({ ...INITIAL_FILTERS, tab: filters.tab, sort: filters.sort }),
  }
}
