"use client"

import { useFormikContext } from "formik"
import { LockKeyhole } from "lucide-react"

import { FieldRow } from "@/components/form/field-row"
import { FieldShell } from "@/components/form/field-shell"
import { FormikCheckboxField } from "@/components/form/formik/formik-checkbox-field"
import { FormikInputField } from "@/components/form/formik/formik-input-field"
import { TextInput } from "@/components/form/text-input"
import { getSavedCard } from "@/features/bookings/data/payment-cards"
import type { Professional } from "@/features/professionals/types"
import type { BookingFormValues } from "@/schemas/validation-schemas"

import { BookingPanel } from "./booking-panel"
import { SavedCardPicker } from "./saved-card-picker"

interface SavedCardFieldProps {
  name: string
  label: string
  value: string
}

function SavedCardField({ name, label, value }: SavedCardFieldProps) {
  return (
    <FieldShell name={name} label={label}>
      {({ id }) => <TextInput id={id} value={value} readOnly />}
    </FieldShell>
  )
}

export function PaymentStep({ professional }: { professional: Professional }) {
  const { values, setFieldValue } = useFormikContext<BookingFormValues>()
  const card = getSavedCard(values.cardId)

  return (
    <BookingPanel
      title="Secure payment"
      description="Your card is only charged when you confirm on the next step."
    >
      <SavedCardPicker value={values.cardId} onChange={(id) => setFieldValue("cardId", id)} />
      <SavedCardField name="cardHolder" label="Name on card" value={card.holder} />
      <SavedCardField name="cardNumber" label="Card number" value={card.maskedNumber} />
      <FieldRow className="gap-y-6">
        <SavedCardField name="cardExpiry" label="Expiration date" value={card.expires} />
        <FormikInputField
          name="securityCode"
          label="Security code"
          type="password"
          inputMode="numeric"
          maxLength={4}
          placeholder="•••"
          autoComplete="off"
        />
      </FieldRow>
      <FormikCheckboxField
        name="billingSameAsCare"
        label="Billing address is the same as the care address"
      />
      {!values.billingSameAsCare && (
        <FormikInputField
          name="billingAddress"
          label="Billing address"
          placeholder="Street, city, state and ZIP code"
          autoComplete="billing street-address"
        />
      )}
      <p className="flex items-center gap-3 rounded-[12px] bg-background p-4 text-sm leading-[1.3] text-muted-foreground">
        <LockKeyhole
          aria-hidden="true"
          strokeWidth={1.5}
          className="size-5 shrink-0 text-ink-strong"
        />
        Your payment details stay private and are not shared with {professional.shortName}.
      </p>
    </BookingPanel>
  )
}
