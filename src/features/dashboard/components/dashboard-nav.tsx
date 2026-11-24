"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { notifyComingSoon } from "@/lib/coming-soon"

import { DASHBOARD_MENUS, type DashboardMenu } from "../data/navigation"
import type { DashboardNavItem } from "../types"

const NAV_BUTTON_CLASS =
  "relative h-12 gap-3 rounded-[4px] pr-2 pl-4 text-base text-white/75 hover:bg-white/10 hover:text-white active:bg-white/10 active:text-white data-active:before:absolute data-active:before:left-0 data-active:before:h-9 data-active:before:w-1.5 data-active:before:rounded-[4px] data-active:before:bg-support data-active:hover:bg-sidebar-accent data-active:hover:text-sidebar-accent-foreground [&_svg]:size-6 [&_svg]:stroke-[1.5]"

export function DashboardNav({ menu }: { menu: DashboardMenu }) {
  const items: DashboardNavItem[] = DASHBOARD_MENUS[menu]
  const pathname = usePathname()
  const { setOpenMobile } = useSidebar()

  return (
    <SidebarMenu className="gap-2">
      {items.map(({ title, icon: Icon, href }) => {
        const isActive = pathname === href

        return (
          <SidebarMenuItem key={title}>
            <SidebarMenuButton
              isActive={isActive}
              aria-current={isActive ? "page" : undefined}
              className={NAV_BUTTON_CLASS}
              onClick={href ? () => setOpenMobile(false) : notifyComingSoon}
              render={href ? <Link href={href} /> : undefined}
            >
              <Icon aria-hidden="true" />
              <span>{title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      })}
    </SidebarMenu>
  )
}
