"use client"

import { Calendar as CalendarIcon } from "lucide-react"
import { useState } from "react"

import { PILL_FIELD_CLASS } from "@/components/form/pill-field"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useNow } from "@/hooks/use-now"
import { formatMonthDayYear } from "@/lib/date"
import { cn } from "@/lib/utils"

const ANY_DATE = "Any date"

interface CareDatePickerProps {
  value: Date | null
  onChange: (date: Date | null) => void
}

export function CareDatePicker({ value, onChange }: CareDatePickerProps) {
  const [open, setOpen] = useState(false)
  const today = useNow()
  const label = value ? formatMonthDayYear(value) : ANY_DATE

  const selectDate = (date: Date | null) => {
    onChange(date)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="white"
            aria-label={`Date: ${label}`}
            className={cn(PILL_FIELD_CLASS, "justify-start")}
          />
        }
      >
        <CalendarIcon aria-hidden="true" strokeWidth={1.5} className="size-6 text-ink-body" />
        {label}
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto gap-1 p-2">
        <Calendar
          mode="single"
          selected={value ?? undefined}
          defaultMonth={value ?? undefined}
          disabled={today ? { before: today } : undefined}
          onSelect={(date) => selectDate(date ?? null)}
          className="[--cell-size:--spacing(9)]"
        />
        {value && (
          <Button variant="ghost" onClick={() => selectDate(null)}>
            {ANY_DATE}
          </Button>
        )}
      </PopoverContent>
    </Popover>
  )
}
