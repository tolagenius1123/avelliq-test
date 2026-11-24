import {
  Calendar,
  CircleHelp,
  Contact,
  CreditCard,
  LayoutGrid,
  MessageSquareMore,
  Search,
  Settings,
} from "lucide-react"

import { ROUTES } from "@/config/site"

import type { DashboardNavItem } from "../types"

export const DASHBOARD_MENUS = {
  main: [
    { title: "Dashboard", icon: LayoutGrid, href: ROUTES.dashboard },
    { title: "Find Care", icon: Search },
    { title: "My bookings", icon: Calendar },
    { title: "Booking Details", icon: Contact },
    { title: "Message", icon: MessageSquareMore },
  ],
  report: [
    { title: "Payment", icon: CreditCard },
    { title: "Settings", icon: Settings },
    { title: "Help & Support", icon: CircleHelp, href: ROUTES.contact },
  ],
} satisfies Record<string, DashboardNavItem[]>

export type DashboardMenu = keyof typeof DASHBOARD_MENUS
