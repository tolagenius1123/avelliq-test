"use client"

import { useFormik } from "formik"
import { useState } from "react"
import { toast } from "sonner"

import { getSavedCard, SAVED_CARDS } from "@/features/bookings/data/payment-cards"
import { useBookings } from "@/features/bookings/hooks/use-bookings"
import { addBooking } from "@/features/bookings/lib/booking-store"
import type { Booking } from "@/features/bookings/types"
import { CURRENT_USER } from "@/features/dashboard/data/mock"
import { getCategoryLabel } from "@/features/professionals/data/categories"
import type { Professional } from "@/features/professionals/types"
import { toIsoDate } from "@/lib/date"
import { simulateRequest } from "@/lib/simulate-request"
import { BOOKING_SCHEMAS, type BookingFormValues } from "@/schemas/validation-schemas"

import { BOOKING_STEPS } from "../data/steps"
import { DEFAULT_END_TIME, DEFAULT_START_TIME, getFirstAvailableDate } from "../lib/schedule"
import { summarizeBooking } from "../lib/summary"
import type { BookingStep } from "../types"

const ERROR_MESSAGE = "We couldn't confirm your booking. Please try again."

const createInitialValues = (professional: Professional, today: Date): BookingFormValues => ({
  date: toIsoDate(getFirstAvailableDate(today, professional.availableDays)),
  startTime: DEFAULT_START_TIME,
  endTime: DEFAULT_END_TIME,
  recipient: "",
  careService: professional.careType,
  address: "",
  city: CURRENT_USER.location,
  zipCode: "",
  contactName: CURRENT_USER.fullName,
  contactPhone: "",
  notes: "",
  cardId: SAVED_CARDS[0].id,
  securityCode: "",
  billingSameAsCare: true,
  billingAddress: "",
})

function createBooking(
  values: BookingFormValues,
  professional: Professional,
  existing: Booking[]
) {
  const { recipient, address, city, zipCode, contactName, contactPhone, notes } = values

  return addBooking(
    {
      ...summarizeBooking(values, professional),
      service: getCategoryLabel(professional.category),
      serviceDetail: professional.role,
      status: "confirmed",
      care: { recipient, address, city, zipCode, contactName, contactPhone, notes },
      paymentLabel: getSavedCard(values.cardId).label,
    },
    existing
  )
}

export function useBookingFlow(professional: Professional, today: Date) {
  const data = useBookings()
  const [step, setStep] = useState<BookingStep>("schedule")
  const [booking, setBooking] = useState<Booking | null>(null)
  const [initialValues] = useState(() => createInitialValues(professional, today))
  const stepIndex = BOOKING_STEPS.findIndex((content) => content.step === step)

  const formik = useFormik<BookingFormValues>({
    initialValues,
    validationSchema: BOOKING_SCHEMAS[step],
    onSubmit: async (values, { resetForm }) => {
      if (step !== "review") {
        goToStep(BOOKING_STEPS[stepIndex + 1].step)
        return
      }

      try {
        await simulateRequest()
        setBooking(createBooking(values, professional, data?.bookings ?? []))
        resetForm()
      } catch (error) {
        console.error(ERROR_MESSAGE, error)
        toast.error(ERROR_MESSAGE)
      }
    },
  })

  // Formik touches every field on submit, so untouched steps would otherwise open showing errors.
  function goToStep(target: BookingStep) {
    formik.setErrors({})
    formik.setTouched({}, false)
    setStep(target)
  }

  return {
    formik,
    step,
    stepIndex,
    booking,
    goToStep,
    goBack: () => goToStep(BOOKING_STEPS[stepIndex - 1].step),
  }
}
