import type { CareCategorySlug } from "@/features/professionals/types"

export type ExperienceBand = "1-3" | "3-5" | "5+"
export type TrustRequirement = "verified" | "background-checked"
export type SortOrder = "recommended" | "rating" | "price-asc" | "price-desc" | "experience" | "distance"

export interface CareCriteria {
  query: string
  area: string
  date: Date | null
}

export interface CareFilters {
  careTypes: string[]
  hourlyRate: [min: number, max: number]
  experience: ExperienceBand[]
  trust: TrustRequirement[]
  topRatedOnly: boolean
}

export interface CareSearch {
  category: CareCategorySlug
  criteria: CareCriteria
  filters: CareFilters
  sort: SortOrder
  page: number
}
