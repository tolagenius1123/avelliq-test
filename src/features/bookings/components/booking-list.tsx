"use client"

import { PillSearchInput } from "@/components/form/pill-search-input"
import { PillSelect } from "@/components/form/pill-select"
import { EmptyResults } from "@/components/shared/empty-results"
import { ListFooter } from "@/components/shared/list-footer"
import { UnderlineTabs } from "@/components/shared/underline-tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent } from "@/components/ui/tabs"

import { BOOKING_SORTS, DATE_RANGES, getServiceOptions, type BookingTab } from "../data/options"
import { useBookingList } from "../hooks/use-booking-list"
import type { Booking } from "../types"
import { BookingRow } from "./booking-row"

interface BookingListProps {
  bookings: Booking[]
  now: Date
}

export function BookingList({ bookings, now }: BookingListProps) {
  const { filters, update, setPage, tabs, slice, reset } = useBookingList(bookings, now)
  const { tab, query, service, dateRange, sort } = filters

  return (
    <Tabs
      value={tab}
      onValueChange={(value: BookingTab) => update({ tab: value })}
      className="gap-4"
    >
      <UnderlineTabs items={tabs} selected={tab} aria-label="Booking status" />

      <div
        role="search"
        aria-label="Search bookings"
        className="grid grid-cols-1 gap-3 @xl:grid-cols-2 @xl:gap-4 @4xl:grid-cols-[minmax(0,1fr)_220px_240px] @[72rem]:grid-cols-[minmax(0,1fr)_232px_296px]"
      >
        <div className="@xl:col-span-2 @4xl:col-span-1">
          <PillSearchInput
            aria-label="Search professional or booking ID"
            placeholder="Search professional or booking ID"
            value={query}
            onChange={(event) => update({ query: event.target.value })}
          />
        </div>
        <PillSelect
          aria-label="Service"
          options={getServiceOptions(bookings)}
          value={service}
          onValueChange={(value) => update({ service: value })}
        />
        <PillSelect
          aria-label="Dates"
          options={DATE_RANGES}
          value={dateRange}
          onValueChange={(value) => update({ dateRange: value })}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-4 text-sm leading-[1.3]">
        <p className="text-muted-foreground">Times are shown in the booking&apos;s local time.</p>
        <Select
          items={BOOKING_SORTS}
          value={sort}
          onValueChange={(value) => update({ sort: value ?? "upcoming" })}
        >
          <SelectTrigger
            aria-label="Sort bookings"
            className="-mx-2 gap-1 border-transparent px-2 text-primary shadow-none"
          >
            Sort: <SelectValue />
          </SelectTrigger>
          <SelectContent align="end" alignItemWithTrigger={false}>
            {BOOKING_SORTS.map(({ value, label }) => (
              <SelectItem key={value} value={value} className="py-2">
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <TabsContent value={tab} className="flex flex-col gap-3">
        <p role="status" className="sr-only">
          {slice.total} {slice.total === 1 ? "booking" : "bookings"} found
        </p>
        {slice.total === 0 ? (
          <EmptyResults
            title="No bookings to show"
            description="Try a different name, service or date."
            onReset={reset}
          />
        ) : (
          <>
            <ul className="flex flex-col gap-3">
              {slice.items.map((booking) => (
                <li key={booking.id}>
                  <BookingRow booking={booking} />
                </li>
              ))}
            </ul>
            <ListFooter slice={slice} noun="bookings" onPageChange={setPage} />
          </>
        )}
      </TabsContent>
    </Tabs>
  )
}
