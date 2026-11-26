import type { Professional } from "@/features/professionals/types"

import { ALL_AREAS, EXPERIENCE_BANDS, TOP_RATING } from "../data/options"
import type { CareCriteria, CareFilters, CareSearch, ExperienceBand, SortOrder } from "../types"

const COMPARATORS: Record<SortOrder, (first: Professional, second: Professional) => number> = {
  recommended: () => 0,
  rating: (first, second) => second.rating - first.rating || second.reviewCount - first.reviewCount,
  "price-asc": (first, second) => first.hourlyRate - second.hourlyRate,
  "price-desc": (first, second) => second.hourlyRate - first.hourlyRate,
  experience: (first, second) => second.experienceYears - first.experienceYears,
  distance: (first, second) => first.distanceMiles - second.distanceMiles,
}

function matchesCriteria(professional: Professional, { query, area, date }: CareCriteria) {
  const term = query.trim().toLowerCase()
  const { name, role, careType, availableDays } = professional
  const matchesQuery = [name, role, careType].some((text) => text.toLowerCase().includes(term))
  const matchesArea = area === ALL_AREAS || professional.area === area
  const matchesDate = !date || availableDays.includes(date.getDay())

  return matchesQuery && matchesArea && matchesDate
}

function isInExperienceBand(years: number, value: ExperienceBand) {
  const band = EXPERIENCE_BANDS.find((candidate) => candidate.value === value)
  return band !== undefined && years >= band.min && years <= band.max
}

function matchesFilters(professional: Professional, filters: CareFilters) {
  const { careTypes, hourlyRate, experience, trust, topRatedOnly } = filters
  const [minRate, maxRate] = hourlyRate
  const years = professional.experienceYears

  return (
    (careTypes.length === 0 || careTypes.includes(professional.careType)) &&
    professional.hourlyRate >= minRate &&
    professional.hourlyRate <= maxRate &&
    (experience.length === 0 || experience.some((band) => isInExperienceBand(years, band))) &&
    (!trust.includes("verified") || professional.isVerified) &&
    (!trust.includes("background-checked") || professional.isBackgroundChecked) &&
    (!topRatedOnly || professional.rating >= TOP_RATING)
  )
}

export function searchProfessionals(professionals: Professional[], search: CareSearch) {
  const { category, criteria, filters, sort } = search

  return professionals
    .filter(
      (professional) =>
        professional.category === category &&
        matchesCriteria(professional, criteria) &&
        matchesFilters(professional, filters)
    )
    .sort(COMPARATORS[sort])
}
