"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination"
import { getPageItems } from "@/lib/pagination"

interface PageNavigationProps {
  page: number
  pageCount: number
  onPageChange: (page: number) => void
}

export function PageNavigation({ page, pageCount, onPageChange }: PageNavigationProps) {
  return (
    <Pagination aria-label="Results pages" className="mx-0 w-auto">
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Previous page"
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
          >
            <ChevronLeft aria-hidden="true" className="size-5" />
          </Button>
        </PaginationItem>
        {getPageItems(page, pageCount).map((item) => (
          <PaginationItem key={item}>
            {typeof item === "number" ? (
              <Button
                variant={item === page ? "default" : "ghost"}
                size="icon-sm"
                aria-label={`Page ${item}`}
                aria-current={item === page ? "page" : undefined}
                onClick={() => onPageChange(item)}
                className="rounded-[4px] text-base font-normal"
              >
                {item}
              </Button>
            ) : (
              <PaginationEllipsis className="size-8" />
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Next page"
            disabled={page === pageCount}
            onClick={() => onPageChange(page + 1)}
          >
            <ChevronRight aria-hidden="true" className="size-5" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
