import { SERVICES } from "@/features/services/data/services"

import type { CareCategory, CareCategorySlug } from "../types"

export const CARE_CATEGORIES: CareCategory[] = [
  { slug: "housekeeping", label: "Housekeeping" },
  { slug: "house-sitters", label: "House Sitting" },
  { slug: "concierge", label: "Concierge" },
  { slug: "childcare", label: "Childcare" },
  { slug: "senior-care", label: "Senior Care" },
  { slug: "pet-care", label: "Pet Care" },
]

export const DEFAULT_CARE_CATEGORY: CareCategorySlug = "childcare"

export const getCategoryLabel = (slug: CareCategorySlug) =>
  CARE_CATEGORIES.find((category) => category.slug === slug)?.label ?? ""

export const getCareTypes = (slug: CareCategorySlug) =>
  SERVICES.find((service) => service.slug === slug)?.offerings ?? []
