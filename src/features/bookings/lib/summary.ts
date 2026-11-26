import type { Booking, BookingCare } from "../types"

export type BookingSummaryData = Pick<
  Booking,
  "professional" | "location" | "start" | "end" | "price"
>

export const formatCareAddress = ({
  address,
  city,
  zipCode,
}: Pick<BookingCare, "address" | "city" | "zipCode">) => `${address} · ${city} ${zipCode}`
