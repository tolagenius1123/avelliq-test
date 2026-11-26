"use client"

import { SlidersHorizontal } from "lucide-react"
import { useState, type ComponentProps } from "react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

import type { CareFilters } from "../types"
import { CareFiltersForm } from "./care-filters-form"

export function CareFiltersSheet({ onApply, ...formProps }: ComponentProps<typeof CareFiltersForm>) {
  const [open, setOpen] = useState(false)

  const handleApply = (filters: CareFilters) => {
    onApply(filters)
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="white"
            className="h-10 gap-2 rounded-[8px] border-[0.3px] border-stroke px-3 font-inter text-ink-soft shadow-none @5xl/page:hidden"
          />
        }
      >
        <SlidersHorizontal aria-hidden="true" />
        Filters
      </SheetTrigger>
      <SheetContent
        side="left"
        showCloseButton={false}
        className="overflow-y-auto overscroll-contain p-5 data-[side=left]:w-[85%]"
      >
        <SheetTitle className="sr-only">Filter professionals</SheetTitle>
        <CareFiltersForm onApply={handleApply} {...formProps} />
      </SheetContent>
    </Sheet>
  )
}
