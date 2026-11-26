"use client"

import type { PageSlice } from "@/lib/pagination"

import { PageNavigation } from "./page-navigation"

interface ListFooterProps {
  slice: PageSlice<unknown>
  noun?: string
  onPageChange: (page: number) => void
}

export function ListFooter({ slice, noun, onPageChange }: ListFooterProps) {
  const { items, firstIndex, total, page, pageCount } = slice

  return (
    <div className="flex flex-col items-center gap-4 pt-4 @md/page:flex-row @md/page:justify-between">
      <p className="text-sm leading-[1.3] text-muted-foreground">
        Showing {firstIndex + 1}–{firstIndex + items.length} of {total}
        {noun && ` ${noun}`}
      </p>
      {pageCount > 1 && (
        <PageNavigation page={page} pageCount={pageCount} onPageChange={onPageChange} />
      )}
    </div>
  )
}
