import { PROFESSIONALS } from "@/features/professionals/data/professionals"

import type { CareCriteria, CareFilters, ExperienceBand, SortOrder, TrustRequirement } from "../types"

interface Option<T extends string> {
  value: T
  label: string
}

export const PAGE_SIZE = 6
export const TOP_RATING = 4.5
export const ALL_AREAS = "New York, NY"

export const HOURLY_RATE = { min: 5, max: 85, step: 5 }

export const EXPERIENCE_BANDS: (Option<ExperienceBand> & { min: number; max: number })[] = [
  { value: "1-3", label: "1–3 years", min: 1, max: 3 },
  { value: "3-5", label: "3–5 years", min: 3, max: 5 },
  { value: "5+", label: "5+ years", min: 5, max: Infinity },
]

export const TRUST_REQUIREMENTS: Option<TrustRequirement>[] = [
  { value: "verified", label: "Verified professionals" },
  { value: "background-checked", label: "Background checked" },
]

export const SORT_OPTIONS: Option<SortOrder>[] = [
  { value: "recommended", label: "Recommended" },
  { value: "rating", label: "Top rated" },
  { value: "price-asc", label: "Lowest rate" },
  { value: "price-desc", label: "Highest rate" },
  { value: "experience", label: "Most experienced" },
  { value: "distance", label: "Nearest" },
]

export const AREA_OPTIONS: Option<string>[] = [
  ALL_AREAS,
  ...[...new Set(PROFESSIONALS.map(({ area }) => area))].sort(),
].map((area) => ({ value: area, label: area }))

export const DEFAULT_CRITERIA: CareCriteria = { query: "", area: ALL_AREAS, date: null }

export const DEFAULT_FILTERS: CareFilters = {
  careTypes: [],
  hourlyRate: [15, 75],
  experience: [],
  trust: ["verified"],
  topRatedOnly: false,
}
