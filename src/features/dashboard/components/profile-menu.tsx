"use client"

import { ChevronDown, LogOut, Settings } from "lucide-react"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ROUTES } from "@/config/site"
import { notifyComingSoon } from "@/lib/coming-soon"
import { getInitials } from "@/lib/utils"

import { CURRENT_USER } from "../data/mock"

export function ProfileMenu() {
  const { fullName, avatar } = CURRENT_USER

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            aria-label={`Account menu for ${fullName}`}
            className="h-9.5 gap-1.5 rounded-full bg-linen px-1 pr-2 text-xs font-normal text-ink-body"
          />
        }
      >
        <Avatar className="size-7.5">
          <AvatarImage src={avatar.src} alt="" />
          <AvatarFallback className="text-xs">{getInitials(fullName)}</AvatarFallback>
        </Avatar>
        <span className="hidden sm:inline">{fullName}</span>
        <ChevronDown aria-hidden="true" strokeWidth={1.5} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem onClick={notifyComingSoon}>
          <Settings aria-hidden="true" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem render={<Link href={ROUTES.signIn} />}>
          <LogOut aria-hidden="true" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
