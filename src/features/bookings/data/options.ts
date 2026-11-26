import type { Booking } from "../types"

export const BOOKINGS_PAGE_SIZE = 5

export type BookingTab = "all" | "upcoming" | "completed" | "cancelled"
export type BookingDateRange = "all" | "next-7" | "next-30" | "past-30" | "past-90"
export type BookingSort = "upcoming" | "newest" | "oldest"

export const ALL_SERVICES = "All services"

export const BOOKING_TABS: { value: BookingTab; label: string }[] = [
  { value: "all", label: "All Bookings" },
  { value: "upcoming", label: "Upcoming" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
]

/** Day offsets from today that each range covers, inclusive. */
export const DATE_RANGES: { value: BookingDateRange; label: string; from: number; to: number }[] = [
  { value: "all", label: "All dates", from: -Infinity, to: Infinity },
  { value: "next-7", label: "Next 7 days", from: 0, to: 7 },
  { value: "next-30", label: "Next 30 days", from: 0, to: 30 },
  { value: "past-30", label: "Past 30 days", from: -30, to: 0 },
  { value: "past-90", label: "Past 90 days", from: -90, to: 0 },
]

export const BOOKING_SORTS: { value: BookingSort; label: string }[] = [
  { value: "upcoming", label: "Upcoming first" },
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
]

export const getServiceOptions = (bookings: Booking[]) =>
  [ALL_SERVICES, ...new Set(bookings.map(({ service }) => service))].map((service) => ({
    value: service,
    label: service,
  }))
