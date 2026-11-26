import type { Professional } from "@/features/professionals/types"

export type BookingStatus = "confirmed" | "pending" | "completed" | "cancelled"

export interface BookingPrice {
  hours: number
  hourlyRate: number
  care: number
  serviceFee: number
  total: number
}

export interface BookingCare {
  recipient: string
  address: string
  city: string
  zipCode: string
  contactName: string
  contactPhone: string
  notes: string
}

export interface Booking {
  id: string
  professional: Professional
  service: string
  serviceDetail: string
  location: string
  status: BookingStatus
  start: Date
  end: Date
  care: BookingCare
  price: BookingPrice
  paymentLabel: string
}

export interface PaymentCard {
  id: string
  label: string
  holder: string
  maskedNumber: string
  expires: string
}
