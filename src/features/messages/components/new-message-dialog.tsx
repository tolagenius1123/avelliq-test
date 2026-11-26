"use client"

import Link from "next/link"
import { useState } from "react"

import { PillSearchInput } from "@/components/form/pill-search-input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ProfessionalPortrait } from "@/features/professionals/components/professional-portrait"
import { getCategoryLabel } from "@/features/professionals/data/categories"
import { PROFESSIONALS } from "@/features/professionals/data/professionals"

import { conversationHref } from "../lib/routes"

export function NewMessageDialog() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")

  const term = query.trim().toLowerCase()
  const matches = PROFESSIONALS.filter(({ name, role }) =>
    [name, role].some((text) => text.toLowerCase().includes(term))
  )

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)
    if (!nextOpen) setQuery("")
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<Button size="pill-lg" className="font-normal" />}>
        New message
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100svh-2rem)] grid-rows-[auto_auto_minmax(0,1fr)] gap-4">
        <DialogHeader>
          <DialogTitle className="text-xl text-primary">New message</DialogTitle>
          <DialogDescription>Choose a professional to talk to.</DialogDescription>
        </DialogHeader>
        <PillSearchInput
          aria-label="Search professionals"
          placeholder="Name or role"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        {matches.length === 0 ? (
          <p role="status" className="py-6 text-center text-muted-foreground">
            No professionals match your search.
          </p>
        ) : (
          <ul className="-mx-2 flex max-h-90 flex-col gap-1 overflow-y-auto overscroll-contain px-2">
            {matches.map((professional) => (
              <li key={professional.id}>
                <Link
                  href={conversationHref(professional.id)}
                  onClick={() => handleOpenChange(false)}
                  className="flex items-center gap-3 rounded-[8px] p-2 leading-[1.3] outline-none hover:bg-background focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <ProfessionalPortrait
                    professional={professional}
                    sizes="40px"
                    className="size-10 shrink-0 rounded-full text-sm"
                  />
                  <span className="flex min-w-0 flex-col gap-1">
                    <span className="truncate text-ink-strong">{professional.name}</span>
                    <span className="truncate text-muted-foreground">
                      {professional.role} · {getCategoryLabel(professional.category)}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </DialogContent>
    </Dialog>
  )
}
