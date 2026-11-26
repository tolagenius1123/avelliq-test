"use client"

import { FieldRow } from "@/components/form/field-row"
import { FormikInputField } from "@/components/form/formik/formik-input-field"
import { FormikSelectField } from "@/components/form/formik/formik-select-field"
import { FormikTextareaField } from "@/components/form/formik/formik-textarea-field"
import { getCategoryLabel } from "@/features/professionals/data/categories"
import type { Professional } from "@/features/professionals/types"

import { BookingPanel } from "./booking-panel"

export function CareStep({ professional }: { professional: Professional }) {
  const { shortName, role, category, careType } = professional
  const services = [{ value: careType, label: `${role} · ${getCategoryLabel(category)}` }]

  return (
    <BookingPanel
      title="Care for your family"
      description={`These details will be shared with ${shortName} for this booking.`}
    >
      <FieldRow className="gap-y-6">
        <FormikInputField
          name="recipient"
          label="Who needs care?"
          placeholder="Jamie · 6 years old"
          autoComplete="off"
        />
        <FormikSelectField name="careService" label="Care service" options={services} />
      </FieldRow>
      <FormikInputField
        name="address"
        label="House address"
        placeholder="123 Example Street, Apt 4B"
        autoComplete="street-address"
      />
      <FieldRow className="gap-y-6">
        <FormikInputField
          name="city"
          label="City"
          placeholder="Brooklyn, NY"
          autoComplete="address-level2"
        />
        <FormikInputField
          name="zipCode"
          label="ZIP code"
          placeholder="11201"
          inputMode="numeric"
          autoComplete="postal-code"
        />
      </FieldRow>
      <FieldRow className="gap-y-6">
        <FormikInputField name="contactName" label="Contact name" autoComplete="name" />
        <FormikInputField
          name="contactPhone"
          label="Contact phone"
          type="tel"
          placeholder="+1 (202) 555-0147"
          autoComplete="tel"
        />
      </FieldRow>
      <FormikTextareaField
        name="notes"
        label="Care notes"
        optional
        rows={1}
        placeholder="Help with homework and prepare a light snack."
      />
      <p className="text-sm leading-[1.3] text-muted-foreground">
        Your address and contact details are only shared for this booking.
      </p>
    </BookingPanel>
  )
}
