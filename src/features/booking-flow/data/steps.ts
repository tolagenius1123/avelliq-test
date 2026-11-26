import type { Professional } from "@/features/professionals/types"

import type { BookingStep } from "../types"

interface BookingStepContent {
  step: BookingStep
  label: string
  title: string
  describe: (professional: Professional) => string
}

export const BOOKING_STEPS: BookingStepContent[] = [
  {
    step: "schedule",
    label: "Schedule",
    title: "Choose when you need care",
    describe: ({ name }) => `Book time with ${name}.`,
  },
  {
    step: "care",
    label: "Care details",
    title: "Tell us about your care needs",
    describe: ({ shortName }) => `A few details help ${shortName} prepare for your family.`,
  },
  {
    step: "payment",
    label: "Payment",
    title: "Choose your payment method",
    describe: () => "Review your saved card before continuing.",
  },
  {
    step: "review",
    label: "Review",
    title: "Review your booking",
    describe: () => "One last look before you confirm and pay.",
  },
]

export const CONFIRMED_CONTENT = {
  title: "Your care is booked",
  description: "Your booking is confirmed. Keep all the details in one place.",
}
