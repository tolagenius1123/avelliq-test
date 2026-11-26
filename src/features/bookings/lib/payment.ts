import { formatCurrency } from "@/lib/currency"

import type { Booking } from "../types"

type PaymentDetails = Pick<Booking, "status" | "price" | "paymentLabel">

/** A booking that is still awaiting confirmation has not been charged. */
export function describePayment({ status, price, paymentLabel }: PaymentDetails) {
  const total = formatCurrency(price.total)

  if (status === "pending") {
    return {
      amount: `${total} estimated`,
      headline: `Estimated ${total}`,
      receipt: `Estimated ${total} · No charge yet`,
      note: `${paymentLabel} is only charged once confirmed.`,
    }
  }

  return {
    amount: `${total} paid`,
    headline: `Paid ${total}`,
    receipt: `Paid ${total} · ${paymentLabel}`,
    note: `Paid with ${paymentLabel}.`,
  }
}
