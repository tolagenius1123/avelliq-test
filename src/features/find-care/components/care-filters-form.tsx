"use client"

import type { FormEvent } from "react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { getCareTypes } from "@/features/professionals/data/categories"
import type { CareCategorySlug } from "@/features/professionals/types"

import {
  DEFAULT_FILTERS,
  EXPERIENCE_BANDS,
  HOURLY_RATE,
  TOP_RATING,
  TRUST_REQUIREMENTS,
} from "../data/options"
import { useSyncedDraft } from "../hooks/use-synced-draft"
import type { CareFilters } from "../types"
import { FilterCheckboxGroup } from "./filter-checkbox-group"

const THUMB_LABELS = ["Minimum hourly rate", "Maximum hourly rate"]
const TOP_RATED_OPTION = { value: "top-rated", label: `${TOP_RATING} stars & above` }

interface CareFiltersFormProps {
  category: CareCategorySlug
  filters: CareFilters
  onApply: (filters: CareFilters) => void
}

export function CareFiltersForm({ category, filters, onApply }: CareFiltersFormProps) {
  const { draft, setDraft, updateDraft } = useSyncedDraft(filters)
  const [minRate, maxRate] = draft.hourlyRate
  const careTypes = getCareTypes(category).map((type) => ({ value: type, label: type }))

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onApply(draft)
  }

  const handleReset = () => {
    setDraft(DEFAULT_FILTERS)
    onApply(DEFAULT_FILTERS)
  }

  return (
    <form aria-label="Filters" onSubmit={handleSubmit} className="flex flex-col">
      <div className="flex items-center justify-between gap-4 pb-4">
        <h2 className="font-heading text-xl leading-[1.2] font-medium text-primary">Filters</h2>
        <Button
          variant="ghost"
          onClick={handleReset}
          className="-mr-2 px-2 font-normal text-muted-foreground"
        >
          Reset all
        </Button>
      </div>

      <FilterCheckboxGroup
        legend="Care type"
        options={careTypes}
        selected={draft.careTypes}
        onChange={(next) => updateDraft({ careTypes: next })}
      />

      <Separator className="bg-stroke/50" />
      <fieldset className="flex flex-col gap-3 py-5">
        <legend className="float-left mb-3 w-full font-inter text-sm leading-[1.3] font-semibold text-primary">
          Hourly Rate
        </legend>
        <Slider
          value={draft.hourlyRate}
          min={HOURLY_RATE.min}
          max={HOURLY_RATE.max}
          step={HOURLY_RATE.step}
          minStepsBetweenValues={1}
          getThumbLabel={(index) => THUMB_LABELS[index]}
          onValueChange={(value) => {
            if (Array.isArray(value)) updateDraft({ hourlyRate: [value[0], value[1]] })
          }}
          className="px-px **:data-[slot=slider-thumb]:size-4 **:data-[slot=slider-thumb]:bg-primary **:data-[slot=slider-track]:bg-mint"
        />
        <p className="flex justify-between font-inter text-xs font-semibold text-ink-strong">
          <span>${minRate}/hr</span>
          <span>${maxRate}/hr</span>
        </p>
      </fieldset>

      <Separator className="bg-stroke/50" />
      <FilterCheckboxGroup
        legend="Experience"
        options={EXPERIENCE_BANDS}
        selected={draft.experience}
        onChange={(next) => updateDraft({ experience: next })}
      />

      <Separator className="bg-stroke/50" />
      <FilterCheckboxGroup
        legend="Trust & safety"
        options={TRUST_REQUIREMENTS}
        selected={draft.trust}
        onChange={(next) => updateDraft({ trust: next })}
      />

      <Separator className="bg-stroke/50" />
      <FilterCheckboxGroup
        legend="Minimum rating"
        options={[TOP_RATED_OPTION]}
        selected={draft.topRatedOnly ? [TOP_RATED_OPTION.value] : []}
        onChange={(next) => updateDraft({ topRatedOnly: next.length > 0 })}
      />

      <Button type="submit" className="h-11 rounded-[4px] text-base font-normal @5xl:h-10">
        Apply filters
      </Button>
    </form>
  )
}
