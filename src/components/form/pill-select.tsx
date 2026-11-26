"use client"

import type { LucideIcon } from "lucide-react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { PILL_FIELD_CLASS } from "./pill-field"

interface PillSelectProps<T extends string> {
  options: readonly { value: T; label: string }[]
  value: T
  onValueChange: (value: T) => void
  startIcon?: LucideIcon
  "aria-label": string
}

export function PillSelect<T extends string>({
  options,
  value,
  onValueChange,
  startIcon: StartIcon,
  "aria-label": ariaLabel,
}: PillSelectProps<T>) {
  return (
    <Select
      items={options}
      value={value}
      onValueChange={(next) => {
        if (next !== null) onValueChange(next)
      }}
    >
      <SelectTrigger aria-label={ariaLabel} className={PILL_FIELD_CLASS}>
        {StartIcon && (
          <StartIcon aria-hidden="true" strokeWidth={1.5} className="size-6 text-ink-body" />
        )}
        <SelectValue />
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false}>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value} className="py-2">
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
