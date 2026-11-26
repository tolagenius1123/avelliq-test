import type { BookingPrice } from "../types"

export const SERVICE_FEE = 10

export function getBookingPrice(hours: number, hourlyRate: number): BookingPrice {
  const care = hours * hourlyRate
  return { hours, hourlyRate, care, serviceFee: SERVICE_FEE, total: care + SERVICE_FEE }
}
