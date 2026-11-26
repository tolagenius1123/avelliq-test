import avaThompson from "@/assets/images/professionals/ava-thompson.jpg"
import emilyChen from "@/assets/images/professionals/emily-chen.jpg"
import eneomaAdebayo from "@/assets/images/professionals/eneoma-adebayo.jpg"
import graceOkafor from "@/assets/images/professionals/grace-okafor.jpg"
import jasmineWilliams from "@/assets/images/professionals/jasmine-williams.jpg"
import mariaSantos from "@/assets/images/professionals/maria-santos.jpg"
import { slugify } from "@/lib/utils"

import type { Professional } from "../types"
import { ENEOMA_PROFILE } from "./eneoma-profile"

const WEEKDAYS = [1, 2, 3, 4, 5]
const WEEKENDS = [0, 6]
const EVERY_DAY = [...WEEKDAYS, ...WEEKENDS]

type ProfessionalSeed = Omit<
  Professional,
  "id" | "shortName" | "isVerified" | "isBackgroundChecked" | "availableDays"
> &
  Partial<Professional>

function createProfessional(seed: ProfessionalSeed): Professional {
  return {
    id: slugify(seed.name),
    shortName: seed.name.split(" ")[0],
    isVerified: true,
    isBackgroundChecked: true,
    availableDays: EVERY_DAY,
    ...seed,
  }
}

const FEATURED_CHILDCARE: ProfessionalSeed[] = [
  {
    id: "eneoma-adebayo",
    name: "Dr. Eneoma Adebayo",
    shortName: "Eneoma",
    category: "childcare",
    careType: "Nannies",
    role: "Nanny",
    hourlyRate: 35,
    experienceYears: 8,
    rating: 4.9,
    reviewCount: 127,
    area: "Brooklyn, NY",
    distanceMiles: 3.2,
    photo: { image: eneomaAdebayo, position: "50% 6%" },
    profile: ENEOMA_PROFILE,
  },
  {
    name: "Grace Okafor",
    category: "childcare",
    careType: "Live-in caregivers",
    role: "Live-in Caregiver",
    hourlyRate: 45,
    experienceYears: 12,
    rating: 4.8,
    reviewCount: 93,
    area: "Manhattan, NY",
    distanceMiles: 1.8,
    photo: { image: graceOkafor, position: "50% 28%" },
  },
  {
    name: "Emily Chen",
    category: "childcare",
    careType: "Babysitters",
    role: "Babysitter",
    hourlyRate: 25,
    experienceYears: 3,
    rating: 4.7,
    reviewCount: 84,
    area: "Queens, NY",
    distanceMiles: 5.1,
    availableDays: WEEKENDS,
    photo: { image: emilyChen, position: "50% 11%" },
  },
  {
    name: "Jasmine Williams",
    category: "childcare",
    careType: "Doulas",
    role: "Doula",
    hourlyRate: 55,
    experienceYears: 10,
    rating: 5,
    reviewCount: 61,
    area: "Harlem, NY",
    distanceMiles: 4,
    availableDays: WEEKDAYS,
    photo: { image: jasmineWilliams, position: "50% 9%" },
  },
  {
    name: "Maria Santos",
    category: "childcare",
    careType: "Special needs childcare",
    role: "Special Needs Caregiver",
    hourlyRate: 50,
    experienceYears: 7,
    rating: 4.9,
    reviewCount: 72,
    area: "Bronx, NY",
    distanceMiles: 6.3,
    availableDays: WEEKDAYS,
    photo: { image: mariaSantos },
  },
  {
    name: "Ava Thompson",
    category: "childcare",
    careType: "Travel & event nannies",
    role: "Travel Nanny",
    hourlyRate: 40,
    experienceYears: 5,
    rating: 4.8,
    reviewCount: 56,
    area: "SoHo, NY",
    distanceMiles: 2.5,
    isBackgroundChecked: false,
    photo: { image: avaThompson, position: "50% 15%" },
  },
]

/** Placeholder listings without photos, used until the search is backed by an API. */
const PLACEHOLDERS: ProfessionalSeed[] = [
  { name: "Hannah Brooks", category: "childcare", careType: "Nannies", role: "Nanny", hourlyRate: 32, experienceYears: 4, rating: 4.6, reviewCount: 38, area: "Brooklyn, NY", distanceMiles: 3.9 },
  { name: "Olivia Park", category: "childcare", careType: "Babysitters", role: "Babysitter", hourlyRate: 22, experienceYears: 2, rating: 4.4, reviewCount: 19, area: "Queens, NY", distanceMiles: 5.8, availableDays: WEEKENDS, isBackgroundChecked: false },
  { name: "Daniel Reyes", category: "childcare", careType: "Special needs childcare", role: "Special Needs Caregiver", hourlyRate: 48, experienceYears: 9, rating: 4.9, reviewCount: 64, area: "Manhattan, NY", distanceMiles: 2.1, availableDays: WEEKDAYS },
  { name: "Nadia Hassan", category: "childcare", careType: "Live-in caregivers", role: "Live-in Caregiver", hourlyRate: 42, experienceYears: 6, rating: 4.7, reviewCount: 45, area: "Harlem, NY", distanceMiles: 4.4 },
  { name: "Chloe Martin", category: "childcare", careType: "Babysitters", role: "Babysitter", hourlyRate: 20, experienceYears: 1, rating: 4.3, reviewCount: 11, area: "SoHo, NY", distanceMiles: 2.7, isVerified: false, isBackgroundChecked: false },
  { name: "Ruth Alvarez", category: "childcare", careType: "Doulas", role: "Doula", hourlyRate: 60, experienceYears: 14, rating: 5, reviewCount: 88, area: "Bronx, NY", distanceMiles: 6.8, availableDays: WEEKDAYS },
  { name: "Priya Nair", category: "childcare", careType: "Travel & event nannies", role: "Travel Nanny", hourlyRate: 44, experienceYears: 5, rating: 4.8, reviewCount: 52, area: "Manhattan, NY", distanceMiles: 1.4 },
  { name: "Lucy Bennett", category: "childcare", careType: "Nannies", role: "Nanny", hourlyRate: 36, experienceYears: 11, rating: 4.9, reviewCount: 97, area: "Brooklyn, NY", distanceMiles: 3.4, availableDays: WEEKDAYS },
  { name: "Rosa Delgado", category: "housekeeping", careType: "General housekeeping", role: "Housekeeper", hourlyRate: 28, experienceYears: 9, rating: 4.8, reviewCount: 112, area: "Queens, NY", distanceMiles: 4.9, availableDays: WEEKDAYS },
  { name: "Amara Cole", category: "housekeeping", careType: "Deep cleaning", role: "Deep Cleaner", hourlyRate: 38, experienceYears: 6, rating: 4.7, reviewCount: 58, area: "Brooklyn, NY", distanceMiles: 3.1 },
  { name: "Victor Moreau", category: "housekeeping", careType: "Move-in & move-out", role: "Move Cleaner", hourlyRate: 42, experienceYears: 4, rating: 4.5, reviewCount: 27, area: "Manhattan, NY", distanceMiles: 2.2 },
  { name: "Ines Costa", category: "housekeeping", careType: "Laundry & ironing", role: "Laundry Specialist", hourlyRate: 24, experienceYears: 3, rating: 4.6, reviewCount: 34, area: "Harlem, NY", distanceMiles: 4.2, isVerified: false },
  { name: "Samuel Grant", category: "house-sitters", careType: "House supervision", role: "House Sitter", hourlyRate: 26, experienceYears: 7, rating: 4.9, reviewCount: 49, area: "Brooklyn, NY", distanceMiles: 2.9 },
  { name: "Mei Tanaka", category: "house-sitters", careType: "Property check-ins", role: "Property Caretaker", hourlyRate: 22, experienceYears: 4, rating: 4.7, reviewCount: 31, area: "SoHo, NY", distanceMiles: 2.4 },
  { name: "Elena Petrova", category: "house-sitters", careType: "Home routines", role: "Home Caretaker", hourlyRate: 30, experienceYears: 5, rating: 4.6, reviewCount: 22, area: "Queens, NY", distanceMiles: 5.5, isBackgroundChecked: false },
  { name: "Julian Frost", category: "concierge", careType: "Personal concierge", role: "Personal Concierge", hourlyRate: 65, experienceYears: 10, rating: 4.9, reviewCount: 73, area: "Manhattan, NY", distanceMiles: 1.2, availableDays: WEEKDAYS },
  { name: "Simone Laurent", category: "concierge", careType: "Lifestyle assistant", role: "Lifestyle Assistant", hourlyRate: 55, experienceYears: 6, rating: 4.8, reviewCount: 41, area: "SoHo, NY", distanceMiles: 2.6 },
  { name: "Theo Walsh", category: "concierge", careType: "Errand services", role: "Errand Assistant", hourlyRate: 25, experienceYears: 2, rating: 4.4, reviewCount: 18, area: "Brooklyn, NY", distanceMiles: 3.7, isBackgroundChecked: false },
  { name: "Margaret Osei", category: "senior-care", careType: "Certified Nursing Assistants", role: "Nursing Assistant", hourlyRate: 48, experienceYears: 13, rating: 4.9, reviewCount: 134, area: "Bronx, NY", distanceMiles: 6.1 },
  { name: "Henry Adams", category: "senior-care", careType: "Elder caregivers", role: "Elder Caregiver", hourlyRate: 36, experienceYears: 8, rating: 4.8, reviewCount: 66, area: "Queens, NY", distanceMiles: 5.2 },
  { name: "Fatima Diallo", category: "senior-care", careType: "Companion caregivers", role: "Companion Caregiver", hourlyRate: 30, experienceYears: 5, rating: 4.7, reviewCount: 43, area: "Harlem, NY", distanceMiles: 4.1, availableDays: WEEKDAYS },
  { name: "Carla Jensen", category: "senior-care", careType: "Special needs caregivers", role: "Special Needs Caregiver", hourlyRate: 46, experienceYears: 10, rating: 5, reviewCount: 59, area: "Manhattan, NY", distanceMiles: 1.9 },
  { name: "Noah Kim", category: "pet-care", careType: "Pet walkers", role: "Pet Walker", hourlyRate: 20, experienceYears: 3, rating: 4.8, reviewCount: 81, area: "Brooklyn, NY", distanceMiles: 2.8 },
  { name: "Isla Murphy", category: "pet-care", careType: "Pet sitters", role: "Pet Sitter", hourlyRate: 27, experienceYears: 5, rating: 4.9, reviewCount: 68, area: "SoHo, NY", distanceMiles: 2.3, availableDays: WEEKENDS },
  { name: "Andre Lewis", category: "pet-care", careType: "At-home check-ins", role: "Pet Caregiver", hourlyRate: 18, experienceYears: 2, rating: 4.5, reviewCount: 26, area: "Queens, NY", distanceMiles: 5.7, isVerified: false },
]

export const PROFESSIONALS = [...FEATURED_CHILDCARE, ...PLACEHOLDERS].map(createProfessional)

export const findProfessional = (id: string | undefined) =>
  PROFESSIONALS.find((professional) => professional.id === id)

export function getProfessional(id: string) {
  const professional = findProfessional(id)
  if (!professional) throw new Error(`Unknown professional: ${id}`)
  return professional
}
