import { describeHomeLocation } from "@/features/bookings/lib/location"
import { getBookingPrice } from "@/features/bookings/lib/pricing"
import type { BookingSummaryData } from "@/features/bookings/lib/summary"
import type { Professional } from "@/features/professionals/types"
import { getHoursBetween, parseLocalDateTime } from "@/lib/date"
import type { BookingFormValues } from "@/schemas/validation-schemas"

export function summarizeBooking(
  values: BookingFormValues,
  professional: Professional
): BookingSummaryData {
  const start = parseLocalDateTime(values.date, values.startTime)
  const end = parseLocalDateTime(values.date, values.endTime)

  return {
    professional,
    location: describeHomeLocation(values.city.trim()),
    start,
    end,
    price: getBookingPrice(getHoursBetween(start, end), professional.hourlyRate),
  }
}
