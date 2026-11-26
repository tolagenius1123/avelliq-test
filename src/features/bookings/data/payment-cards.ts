import { CURRENT_USER } from "@/features/dashboard/data/mock"

import type { PaymentCard } from "../types"

export const SAVED_CARDS: PaymentCard[] = [
  {
    id: "visa-4242",
    label: "Visa ending in 4242",
    holder: CURRENT_USER.fullName,
    maskedNumber: "••••  ••••  ••••  4242",
    expires: "08/29",
  },
]

export const getSavedCard = (id: string) =>
  SAVED_CARDS.find((card) => card.id === id) ?? SAVED_CARDS[0]
