"use client"

import { Search, SlidersHorizontal } from "lucide-react"
import type { FormEvent } from "react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { notifyComingSoon } from "@/lib/coming-soon"
import { cn } from "@/lib/utils"

function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault()
  notifyComingSoon()
}

export function DashboardSearch({ className }: { className?: string }) {
  return (
    <form role="search" onSubmit={handleSubmit} className={cn("w-full", className)}>
      <InputGroup className="h-9.5 rounded-full border-stroke-muted bg-white shadow-[0px_2px_4px_0px_rgba(0,0,0,0.04)]">
        <InputGroupAddon>
          <Search aria-hidden="true" strokeWidth={1.5} className="size-5 text-ink-faint" />
        </InputGroupAddon>
        <InputGroupInput type="search" name="query" aria-label="Search" placeholder="Search..." />
        <InputGroupAddon align="inline-end" className="pr-2">
          <InputGroupButton
            size="icon-xs"
            aria-label="Filter search"
            onClick={notifyComingSoon}
            className="rounded-full border-[0.3px] border-stroke-muted text-ink-strong after:absolute after:-inset-2"
          >
            <SlidersHorizontal aria-hidden="true" />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form>
  )
}
