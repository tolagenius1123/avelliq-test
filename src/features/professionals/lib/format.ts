import { getCategoryLabel } from "../data/categories"
import type { Professional } from "../types"

export const formatRating = (rating: number) => rating.toFixed(1)

export const formatDistance = (miles: number) => `${miles.toFixed(1)} mi`

export const formatExperience = (years: number) => `${years} ${years === 1 ? "year" : "years"}`

const withArticle = (noun: string) => `${/^[aeiou]/i.test(noun) ? "an" : "a"} ${noun}`

export function describeProfessional({ role, area, experienceYears, category }: Professional) {
  const experience = formatExperience(experienceYears)
  const field = getCategoryLabel(category).toLowerCase()
  return `I'm ${withArticle(role.toLowerCase())} based in ${area}, with ${experience} of experience in ${field}. Get to know my approach and discuss your needs before arranging care.`
}
