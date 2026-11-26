"use client"

import type { ReactNode } from "react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { SORT_OPTIONS } from "../data/options"
import type { SortOrder } from "../types"

interface ResultsToolbarProps {
  title: string
  sort: SortOrder
  onSortChange: (sort: SortOrder) => void
  filtersTrigger: ReactNode
}

export function ResultsToolbar({ title, sort, onSortChange, filtersTrigger }: ResultsToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
      <h2
        aria-live="polite"
        className="font-heading text-xl leading-[1.2] font-medium text-ink-strong"
      >
        {title}
      </h2>
      <div className="flex flex-wrap items-center gap-2">
        {filtersTrigger}
        <Select
          items={SORT_OPTIONS}
          value={sort}
          onValueChange={(value) => onSortChange(value ?? "recommended")}
        >
          <SelectTrigger
            aria-label="Sort by"
            className="gap-2 rounded-[8px] border-[0.3px] border-stroke bg-white px-3 font-inter shadow-none data-[size=default]:h-10 @5xl/page:data-[size=default]:h-8"
          >
            <span className="text-muted-foreground">Sort by:</span>
            <SelectValue className="font-semibold text-ink-soft" />
          </SelectTrigger>
          <SelectContent align="end" alignItemWithTrigger={false}>
            {SORT_OPTIONS.map(({ value, label }) => (
              <SelectItem key={value} value={value} className="py-2">
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
