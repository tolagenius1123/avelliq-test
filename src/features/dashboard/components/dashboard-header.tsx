"use client"

import { Bell } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { notifyComingSoon } from "@/lib/coming-soon"
import { cn } from "@/lib/utils"

import { CURRENT_USER } from "../data/mock"
import { CurrentPlaceAndDate } from "./current-place-and-date"
import { DashboardSearch } from "./dashboard-search"
import { ProfileMenu } from "./profile-menu"

export function DashboardHeader() {
  const { state } = useSidebar()
  const { unreadNotifications } = CURRENT_USER
  const notificationsLabel = unreadNotifications
    ? `Notifications, ${unreadNotifications} unread`
    : "Notifications"

  return (
    <header className="sticky top-0 z-20 flex min-h-20 flex-wrap items-center gap-x-4 gap-y-3 bg-white px-4 py-4 md:px-6">
      <SidebarTrigger
        className={cn("size-9.5 bg-linen text-primary", state === "expanded" && "xl:hidden")}
      />
      <DashboardSearch className="order-last md:order-0 md:w-auto md:max-w-97 md:flex-1" />

      <div className="ml-auto flex items-center gap-3 md:gap-4">
        <CurrentPlaceAndDate className="hidden xl:flex" />
        <Separator orientation="vertical" className="hidden h-11 self-center! xl:block" />
        <Button
          variant="ghost"
          size="icon"
          aria-label={notificationsLabel}
          onClick={notifyComingSoon}
          className="relative size-9.5 rounded-full bg-linen text-ink-strong"
        >
          <Bell aria-hidden="true" className="size-4.5" />
          {unreadNotifications > 0 && (
            <span
              aria-hidden="true"
              className="absolute top-2 right-2 size-2 rounded-full bg-destructive"
            />
          )}
        </Button>
        <ProfileMenu />
      </div>
    </header>
  )
}
