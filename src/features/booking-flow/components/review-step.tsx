"use client"

import { useFormikContext } from "formik"

import { Button } from "@/components/ui/button"
import { getSavedCard } from "@/features/bookings/data/payment-cards"
import { formatCareAddress } from "@/features/bookings/lib/summary"
import { TIME_ZONE } from "@/features/bookings/lib/time-zone"
import { getCategoryLabel } from "@/features/professionals/data/categories"
import type { Professional } from "@/features/professionals/types"
import { formatCompactCurrency, formatCurrency } from "@/lib/currency"
import { formatHours, formatLongDate, formatTimeRange } from "@/lib/date"
import type { BookingFormValues } from "@/schemas/validation-schemas"

import { summarizeBooking } from "../lib/summary"
import type { BookingStep } from "../types"
import { BookingPanel } from "./booking-panel"

interface ReviewStepProps {
  professional: Professional
  onEdit: (step: BookingStep) => void
  disabled: boolean
}

export function ReviewStep({ professional, onEdit, disabled }: ReviewStepProps) {
  const { values } = useFormikContext<BookingFormValues>()
  const { start, end, price } = summarizeBooking(values, professional)
  const category = getCategoryLabel(professional.category)
  const duration = formatHours(price.hours)

  const sections: { step: BookingStep; title: string; lines: string[] }[] = [
    {
      step: "schedule",
      title: "Schedule",
      lines: [
        `${formatLongDate(start)} · ${formatTimeRange(start, end)}`,
        `One-time booking · ${duration} · ${TIME_ZONE.label}`,
      ],
    },
    {
      step: "care",
      title: "Care details",
      lines: [
        `${values.recipient} · ${professional.role} / ${category}`,
        formatCareAddress(values),
        `${values.contactName} · ${values.contactPhone}`,
        values.notes,
      ],
    },
    {
      step: "payment",
      title: "Payment",
      lines: [
        `${getSavedCard(values.cardId).label} · Total ${formatCurrency(price.total)}`,
        `${duration} × ${formatCompactCurrency(price.hourlyRate)} = ${formatCurrency(price.care)} · Service fee ${formatCurrency(price.serviceFee)}`,
      ],
    },
  ]

  return (
    <BookingPanel
      title="Ready to confirm?"
      description="Check the details below. You can go back and make changes."
    >
      {sections.map(({ step, title, lines }) => (
        <section
          key={step}
          aria-label={title}
          className="flex flex-col gap-3 rounded-[12px] border border-stroke p-4"
        >
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-heading text-xl leading-[1.2] font-medium text-ink-strong">
              {title}
            </h3>
            <Button
              variant="link"
              disabled={disabled}
              aria-label={`Edit ${title.toLowerCase()}`}
              onClick={() => onEdit(step)}
              className="relative h-auto p-0 font-normal after:absolute after:-inset-3"
            >
              Edit
            </Button>
          </div>
          {lines.filter(Boolean).map((line) => (
            <p
              key={line}
              className="text-sm leading-[1.3] wrap-break-word text-muted-foreground"
            >
              {line}
            </p>
          ))}
        </section>
      ))}
      <section className="flex flex-col gap-2 rounded-[12px] bg-background p-4">
        <h3 className="font-heading text-xl leading-[1.2] font-medium text-primary">
          Before you book
        </h3>
        <p className="text-sm leading-[1.3] text-muted-foreground">
          This booking covers {category.toLowerCase()} at the address above. Keep any changes and
          communication on Avelliq. Your receipt and booking details will be available after
          confirmation.
        </p>
      </section>
    </BookingPanel>
  )
}
