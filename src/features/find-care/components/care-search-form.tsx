"use client"

import { MapPin } from "lucide-react"
import type { FormEvent } from "react"

import { PillSearchInput } from "@/components/form/pill-search-input"
import { PillSelect } from "@/components/form/pill-select"
import { Button } from "@/components/ui/button"

import { AREA_OPTIONS } from "../data/options"
import { useSyncedDraft } from "../hooks/use-synced-draft"
import type { CareCriteria } from "../types"
import { CareDatePicker } from "./care-date-picker"

interface CareSearchFormProps {
  criteria: CareCriteria
  onSearch: (criteria: CareCriteria) => void
}

export function CareSearchForm({ criteria, onSearch }: CareSearchFormProps) {
  const { draft, updateDraft } = useSyncedDraft(criteria)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSearch(draft)
  }

  return (
    <form
      role="search"
      aria-label="Find professionals"
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-3 @xl:grid-cols-2 @xl:gap-4 @5xl:grid-cols-[minmax(0,1fr)_236px_260px_auto] @[72rem]:grid-cols-[minmax(0,1fr)_236px_292px_auto] @5xl:items-center"
    >
      <PillSearchInput
        name="query"
        aria-label="Name or specialty"
        placeholder="Name or specialty..."
        value={draft.query}
        onChange={(event) => updateDraft({ query: event.target.value })}
      />
      <PillSelect
        aria-label="Location"
        startIcon={MapPin}
        options={AREA_OPTIONS}
        value={draft.area}
        onValueChange={(area) => updateDraft({ area })}
      />
      <CareDatePicker value={draft.date} onChange={(date) => updateDraft({ date })} />

      <Button type="submit" size="pill-lg" className="h-14 font-normal @5xl:h-12">
        Search
      </Button>
    </form>
  )
}
