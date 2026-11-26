import type { StaticImageData } from "next/image"

export type CareCategorySlug =
  | "housekeeping"
  | "house-sitters"
  | "concierge"
  | "childcare"
  | "senior-care"
  | "pet-care"

export interface CareCategory {
  slug: CareCategorySlug
  label: string
}

export interface ProfessionalPhoto {
  image: StaticImageData
  position?: string
}

export interface ProfessionalInterest {
  label: string
  image: StaticImageData
}

export interface ProfessionalGalleryImage {
  image: StaticImageData
  alt: string
}

export interface ProfessionalReview {
  id: string
  author: string
  avatar?: StaticImageData
  date: Date
  rating: number
  quote: string
}

export interface ProfessionalProfile {
  headline: string
  tagline: string
  about: string
  likes: string
  dislikes: string
  pitch: string
  interests: ProfessionalInterest[]
  gallery: ProfessionalGalleryImage[]
  reviews: ProfessionalReview[]
}

export interface Professional {
  id: string
  name: string
  shortName: string
  category: CareCategorySlug
  careType: string
  role: string
  hourlyRate: number
  experienceYears: number
  rating: number
  reviewCount: number
  area: string
  distanceMiles: number
  isVerified: boolean
  isBackgroundChecked: boolean
  /** Weekday numbers as returned by Date.getDay(), where 0 is Sunday. */
  availableDays: number[]
  photo?: ProfessionalPhoto
  profile?: ProfessionalProfile
}
