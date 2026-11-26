import { CURRENT_USER } from "@/features/dashboard/data/mock"
import { getCategoryLabel } from "@/features/professionals/data/categories"
import { getProfessional } from "@/features/professionals/data/professionals"
import type { CareCategorySlug } from "@/features/professionals/types"
import { addDays, addHours } from "@/lib/date"

import { describeHomeLocation } from "../lib/location"
import { getBookingPrice } from "../lib/pricing"
import { getDateReference } from "../lib/reference"
import type { Booking, BookingCare, BookingStatus } from "../types"
import { SAVED_CARDS } from "./payment-cards"

interface BookingTemplate {
  professionalId: string
  serviceDetail: string
  dayOffset: number
  startHour: number
  durationHours: number
  status?: BookingStatus
}

const HOME_CONTACT = {
  address: "123 Example Street, Apt 4B",
  city: "Brooklyn, NY",
  zipCode: "11201",
  contactName: CURRENT_USER.fullName,
  contactPhone: "+1 (202) 555-0147",
}

const CARE_NEEDS: Record<CareCategorySlug, Pick<BookingCare, "recipient" | "notes">> = {
  childcare: {
    recipient: "Jamie · 6 years old",
    notes: "Help with homework and prepare a light snack.",
  },
  "senior-care": {
    recipient: "Ruth · 78 years old",
    notes: "A short walk before lunch, weather permitting.",
  },
  "pet-care": { recipient: "Biscuit · Beagle", notes: "Harness is by the front door." },
  housekeeping: { recipient: "Our home", notes: "Please focus on the kitchen and bathrooms." },
  "house-sitters": { recipient: "Our home", notes: "Water the plants and collect the mail." },
  concierge: { recipient: "Our household", notes: "Call before starting the errands list." },
}

/** One booking per day, so that references built from the date stay unique. */
const BOOKING_TEMPLATES: BookingTemplate[] = [
  { professionalId: "eneoma-adebayo", serviceDetail: "After-school care", dayOffset: 0, startHour: 15, durationHours: 4 },
  { professionalId: "emily-chen", serviceDetail: "Babysitting", dayOffset: 2, startHour: 10, durationHours: 3 },
  { professionalId: "grace-okafor", serviceDetail: "Care visit", dayOffset: 5, startHour: 9, durationHours: 4, status: "pending" },
  { professionalId: "grace-okafor", serviceDetail: "Care visit", dayOffset: 8, startHour: 9, durationHours: 4, status: "cancelled" },
  { professionalId: "eneoma-adebayo", serviceDetail: "After-school care", dayOffset: -3, startHour: 15, durationHours: 4 },
  { professionalId: "rosa-delgado", serviceDetail: "General housekeeping", dayOffset: -5, startHour: 9, durationHours: 3 },
  { professionalId: "emily-chen", serviceDetail: "Babysitting", dayOffset: -9, startHour: 18, durationHours: 3 },
  { professionalId: "noah-kim", serviceDetail: "Dog walking", dayOffset: -12, startHour: 8, durationHours: 1 },
  { professionalId: "eneoma-adebayo", serviceDetail: "After-school care", dayOffset: -16, startHour: 15, durationHours: 4 },
  { professionalId: "rosa-delgado", serviceDetail: "General housekeeping", dayOffset: -19, startHour: 9, durationHours: 3 },
  { professionalId: "maria-santos", serviceDetail: "Weekend support", dayOffset: -24, startHour: 11, durationHours: 5, status: "cancelled" },
  { professionalId: "noah-kim", serviceDetail: "Dog walking", dayOffset: -27, startHour: 8, durationHours: 1 },
  { professionalId: "jasmine-williams", serviceDetail: "Postpartum visit", dayOffset: -31, startHour: 10, durationHours: 2 },
  { professionalId: "emily-chen", serviceDetail: "Babysitting", dayOffset: -38, startHour: 17, durationHours: 4 },
  { professionalId: "eneoma-adebayo", serviceDetail: "After-school care", dayOffset: -44, startHour: 15, durationHours: 4 },
  { professionalId: "henry-adams", serviceDetail: "Companion visit", dayOffset: -52, startHour: 13, durationHours: 3 },
  { professionalId: "rosa-delgado", serviceDetail: "Deep cleaning", dayOffset: -61, startHour: 9, durationHours: 5 },
]

export function createMockBookings(today: Date): Booking[] {
  const midnight = new Date(today)
  midnight.setHours(0, 0, 0, 0)

  return BOOKING_TEMPLATES.map((template) => {
    const { professionalId, serviceDetail, dayOffset, startHour, durationHours, status } = template
    const professional = getProfessional(professionalId)
    const start = addHours(addDays(midnight, dayOffset), startHour)
    const care = { ...HOME_CONTACT, ...CARE_NEEDS[professional.category] }

    return {
      id: getDateReference(start),
      professional,
      service: getCategoryLabel(professional.category),
      serviceDetail,
      location: describeHomeLocation(care.city),
      status: status ?? "confirmed",
      start,
      end: addHours(start, durationHours),
      care,
      price: getBookingPrice(durationHours, professional.hourlyRate),
      paymentLabel: SAVED_CARDS[0].label,
    }
  })
}
