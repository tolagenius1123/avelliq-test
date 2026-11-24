import keyllaRose from "@/assets/images/dashboard/keylla-rose.png"
import eneomaAdebayo from "@/assets/images/dashboard/eneoma-adebayo.jpg"
import { addDays, addHours } from "@/lib/date"

import type { Booking, DashboardUser } from "../types"

export const CURRENT_USER: DashboardUser = {
  firstName: "Keylla",
  fullName: "Keylla Rose",
  location: "Austin, TX",
  avatar: keyllaRose,
  unreadNotifications: 5,
}

export const ACCOUNT_SUMMARY = {
  activeCareRequests: 2,
  newApplicants: 3,
  savedProfessionals: 8,
  unreadMessages: 2,
}

type BookingTemplate = Omit<Booking, "start" | "end"> & {
  dayOffset: number
  startHour: number
  durationHours: number
}

const HOME_LOCATION = `At your home · ${CURRENT_USER.location}`

const BOOKING_TEMPLATES: BookingTemplate[] = [
  {
    id: "booking-1",
    professional: { name: "Dr. Eneoma Adebayo", shortName: "Eneoma", portrait: eneomaAdebayo },
    service: "Childcare",
    serviceDetail: "After-school care",
    location: HOME_LOCATION,
    status: "confirmed",
    dayOffset: 0,
    startHour: 15,
    durationHours: 4,
  },
  {
    id: "booking-2",
    professional: { name: "Emily Chen", shortName: "Emily" },
    service: "Housekeeping",
    serviceDetail: "Deep cleaning",
    location: HOME_LOCATION,
    status: "confirmed",
    dayOffset: 2,
    startHour: 10,
    durationHours: 3,
  },
  {
    id: "booking-3",
    professional: { name: "Sarah Mitchell", shortName: "Sarah" },
    service: "Pet Care",
    serviceDetail: "Dog walking",
    location: HOME_LOCATION,
    status: "pending",
    dayOffset: 5,
    startHour: 9,
    durationHours: 2,
  },
]

export function createMockBookings(today: Date): Booking[] {
  const midnight = new Date(today)
  midnight.setHours(0, 0, 0, 0)

  return BOOKING_TEMPLATES.map(({ dayOffset, startHour, durationHours, ...booking }) => {
    const start = addHours(addDays(midnight, dayOffset), startHour)
    return { ...booking, start, end: addHours(start, durationHours) }
  })
}
