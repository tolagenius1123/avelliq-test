import { getDayDifference } from "@/lib/date"

import {
  ALL_SERVICES,
  DATE_RANGES,
  type BookingDateRange,
  type BookingSort,
  type BookingTab,
} from "../data/options"
import type { Booking } from "../types"
import { isUpcoming } from "./status"

export interface BookingFilters {
  tab: BookingTab
  query: string
  service: string
  dateRange: BookingDateRange
  sort: BookingSort
}

export function matchesTab(booking: Booking, tab: BookingTab) {
  if (tab === "all") return true
  return tab === "upcoming" ? isUpcoming(booking) : booking.status === tab
}

function matchesQuery({ id, professional }: Booking, query: string) {
  const term = query.trim().toLowerCase()
  return [id, professional.name].some((text) => text.toLowerCase().includes(term))
}

function isInDateRange({ start }: Booking, value: BookingDateRange, now: Date) {
  const range = DATE_RANGES.find((candidate) => candidate.value === value)
  const offset = getDayDifference(now, start)
  return range !== undefined && offset >= range.from && offset <= range.to
}

const byStart = (first: Booking, second: Booking) => first.start.getTime() - second.start.getTime()

function sortBookings(bookings: Booking[], sort: BookingSort, now: Date) {
  const oldestFirst = [...bookings].sort(byStart)
  if (sort === "oldest") return oldestFirst
  if (sort === "newest") return oldestFirst.reverse()

  const ahead = oldestFirst.filter(({ end }) => end > now)
  const behind = oldestFirst.filter(({ end }) => end <= now)
  return [
    ...ahead.filter(isUpcoming),
    ...ahead.filter((booking) => !isUpcoming(booking)),
    ...behind.reverse(),
  ]
}

export function filterBookings(bookings: Booking[], filters: BookingFilters, now: Date) {
  const { tab, query, service, dateRange, sort } = filters
  const matches = bookings.filter(
    (booking) =>
      matchesTab(booking, tab) &&
      matchesQuery(booking, query) &&
      (service === ALL_SERVICES || booking.service === service) &&
      isInDateRange(booking, dateRange, now)
  )

  return sortBookings(matches, sort, now)
}
