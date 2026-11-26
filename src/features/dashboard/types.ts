import type { LucideIcon } from "lucide-react"
import type { StaticImageData } from "next/image"

export interface DashboardUser {
  firstName: string
  fullName: string
  location: string
  avatar: StaticImageData
  unreadNotifications: number
}

export interface DashboardNavItem {
  title: string
  icon: LucideIcon
  href?: string
}

export interface DashboardStat {
  icon: StaticImageData
  label: string
  value: number
  hint: string
}
