"use client"

import { useSyncExternalStore } from "react"

import type { Booking } from "../types"
import { createBookingReference } from "./reference"

const NO_BOOKINGS: Booking[] = []

let createdBookings = NO_BOOKINGS
const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

/** Kept in memory only, so addresses and contact details never reach browser storage. */
export function addBooking(details: Omit<Booking, "id">, existing: Booking[]): Booking {
  const booking = { ...details, id: createBookingReference(details.start, existing) }
  createdBookings = [...createdBookings, booking]
  listeners.forEach((notify) => notify())
  return booking
}

export const useCreatedBookings = () =>
  useSyncExternalStore(
    subscribe,
    () => createdBookings,
    () => NO_BOOKINGS
  )
