"use client"

import { Archive, ArchiveRestore, CalendarDays, ChevronLeft, Info, User } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ROUTES } from "@/config/site"
import { bookingDetailsHref } from "@/features/bookings/lib/routes"
import type { Booking } from "@/features/bookings/types"
import { ProfessionalPortrait } from "@/features/professionals/components/professional-portrait"
import { profileHref } from "@/features/professionals/lib/routes"
import { cn } from "@/lib/utils"

import { toggleArchived } from "../lib/message-store"
import type { Conversation } from "../types"

interface ConversationHeaderProps {
  conversation: Conversation
  booking?: Booking
}

export function ConversationHeader({ conversation, booking }: ConversationHeaderProps) {
  const { id, professional, messages, isArchived } = conversation
  const { name, isVerified } = professional

  const handleArchive = () => {
    toggleArchived(id)
    toast.success(isArchived ? "Conversation moved to inbox." : "Conversation archived.")
  }

  return (
    <header className="flex items-center gap-3 p-4 @3xl/page:p-5">
      <Link
        href={ROUTES.messages}
        aria-label="Back to inbox"
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon-lg" }),
          "-ml-2 @3xl/page:hidden"
        )}
      >
        <ChevronLeft aria-hidden="true" strokeWidth={1.5} className="size-6" />
      </Link>
      <ProfessionalPortrait
        professional={professional}
        sizes="44px"
        className="size-11 shrink-0 rounded-full text-base"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <h2 className="truncate font-heading text-xl leading-[1.2] font-medium text-ink-strong">
          {name}
        </h2>
        <p className="text-sm leading-[1.3] text-muted-foreground">
          Care professional{isVerified && " · Verified"}
        </p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="icon-lg"
              aria-label="Conversation options"
              className="-mr-2 shrink-0 text-ink-strong"
            />
          }
        >
          <Info aria-hidden="true" strokeWidth={1.5} className="size-6" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuItem render={<Link href={profileHref(id)} />}>
            <User aria-hidden="true" />
            View profile
          </DropdownMenuItem>
          {booking && (
            <DropdownMenuItem render={<Link href={bookingDetailsHref(booking.id)} />}>
              <CalendarDays aria-hidden="true" />
              View booking
            </DropdownMenuItem>
          )}
          {messages.length > 0 && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleArchive}>
                {isArchived ? (
                  <ArchiveRestore aria-hidden="true" />
                ) : (
                  <Archive aria-hidden="true" />
                )}
                {isArchived ? "Move to inbox" : "Archive conversation"}
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
