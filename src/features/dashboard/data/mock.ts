import keyllaRose from "@/assets/images/dashboard/keylla-rose.png"

import type { DashboardUser } from "../types"

export const CURRENT_USER: DashboardUser = {
  firstName: "Keylla",
  fullName: "Keylla Rose",
  location: "New York, NY",
  avatar: keyllaRose,
  unreadNotifications: 5,
}

export const ACCOUNT_SUMMARY = {
  activeCareRequests: 2,
  newApplicants: 3,
  savedProfessionals: 8,
}
