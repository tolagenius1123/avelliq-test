"use client"

import { useBookings } from "@/features/bookings/hooks/use-bookings"

/** The next booking with this professional, or the latest one when nothing is upcoming. */
export function useLinkedBooking(professionalId: string) {
  const data = useBookings()
  if (!data) return undefined

  const isWithProfessional = ({ professional }: { professional: { id: string } }) =>
    professional.id === professionalId

  return data.upcoming.find(isWithProfessional) ?? data.scheduled.findLast(isWithProfessional)
}
