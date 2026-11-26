import type { Booking, BookingStatus } from "../types"

/** Elapsed bookings change status without being edited: confirmed care completes, unanswered requests lapse. */
export function resolveStatus({ status, end }: Booking, now: Date): BookingStatus {
  if (end > now) return status
  if (status === "confirmed") return "completed"
  if (status === "pending") return "cancelled"
  return status
}

export const isUpcoming = ({ status }: Booking) => status === "confirmed" || status === "pending"
