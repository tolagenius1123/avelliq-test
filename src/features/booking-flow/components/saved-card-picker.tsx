"use client"

import { CreditCard } from "lucide-react"
import { useId } from "react"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { SAVED_CARDS } from "@/features/bookings/data/payment-cards"

interface SavedCardPickerProps {
  value: string
  onChange: (id: string) => void
}

export function SavedCardPicker({ value, onChange }: SavedCardPickerProps) {
  const groupId = useId()

  return (
    <RadioGroup
      aria-label="Saved cards"
      value={value}
      onValueChange={(id) => onChange(String(id))}
    >
      {SAVED_CARDS.map(({ id, label, expires }) => (
        <label
          key={id}
          htmlFor={`${groupId}-${id}`}
          className="flex cursor-pointer items-center gap-4 rounded-[12px] border border-stroke p-4 has-data-checked:border-primary @md/page:p-5"
        >
          <CreditCard aria-hidden="true" strokeWidth={1.5} className="size-7 shrink-0 text-ink-strong" />
          <span className="flex min-w-0 flex-1 flex-col gap-1.5">
            <span className="text-base leading-[1.4] text-ink-strong">{label}</span>
            <span className="text-sm leading-[1.3] text-muted-foreground">
              Expires {expires} · Saved card
            </span>
          </span>
          <RadioGroupItem
            id={`${groupId}-${id}`}
            value={id}
            className="size-6 border-stroke data-checked:bg-white data-checked:text-primary [&_[data-slot=radio-group-indicator]]:size-full [&_[data-slot=radio-group-indicator]>span]:size-2.5 [&_[data-slot=radio-group-indicator]>span]:bg-primary"
          />
        </label>
      ))}
    </RadioGroup>
  )
}
