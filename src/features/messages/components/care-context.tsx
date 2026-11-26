import { Calendar, Clock, MapPin, Shield, type LucideIcon } from "lucide-react"
import Link from "next/link"

import { ComingSoonButton } from "@/components/shared/coming-soon-button"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { BookingStatusBadge } from "@/features/bookings/components/booking-status-badge"
import { describePayment } from "@/features/bookings/lib/payment"
import { bookingDetailsHref } from "@/features/bookings/lib/routes"
import { TIME_ZONE } from "@/features/bookings/lib/time-zone"
import type { Booking } from "@/features/bookings/types"
import { bookingHref } from "@/features/professionals/lib/routes"
import type { Professional } from "@/features/professionals/types"
import { formatHours, formatTimeRange, formatWeekdayDate } from "@/lib/date"
import { cn } from "@/lib/utils"

import type { Message } from "../types"

const ACTION_CLASS = cn(
  buttonVariants({ variant: "ghost" }),
  "h-10 w-full rounded-full border-stroke bg-white font-normal text-primary"
)

function LinkedBooking({ booking, fileCount }: { booking: Booking; fileCount: number }) {
  const { id, service, serviceDetail, start, end, price, care, status } = booking

  const facts: { icon: LucideIcon; text: string }[] = [
    { icon: Calendar, text: formatWeekdayDate(start) },
    {
      icon: Clock,
      text: `${formatTimeRange(start, end)} · ${TIME_ZONE.abbreviation} · ${formatHours(price.hours)}`,
    },
    { icon: MapPin, text: `${care.address} · ${care.city}` },
  ]

  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <BookingStatusBadge status={status} compact />
        <Separator orientation="vertical" className="h-7 self-center! bg-support/50" />
        <span className="text-muted-foreground">{id}</span>
      </div>
      <p className="text-base leading-[1.4] text-ink-strong">
        {service} · {serviceDetail}
      </p>
      <ul className="flex flex-col gap-3.5 text-muted-foreground">
        {facts.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-start gap-2">
            <Icon aria-hidden="true" strokeWidth={1.5} className="size-4.5 shrink-0 text-ink-strong" />
            {text}
          </li>
        ))}
      </ul>
      <p className="text-muted-foreground">
        Care for {care.recipient}. {care.notes}
      </p>
      <p className="font-heading text-xl leading-[1.2] font-medium text-primary">
        {describePayment(booking).amount}
      </p>
      {fileCount > 0 && (
        <ComingSoonButton
          variant="link"
          className="relative h-auto self-start p-0 font-normal after:absolute after:-inset-2"
        >
          Shared files ({fileCount})
        </ComingSoonButton>
      )}
      <Link href={bookingDetailsHref(id)} className={ACTION_CLASS}>
        View booking
      </Link>
    </>
  )
}

interface CareContextProps {
  professional: Professional
  booking?: Booking
  messages: Message[]
  className?: string
}

export function CareContext({ professional, booking, messages, className }: CareContextProps) {
  return (
    <aside
      aria-label="Linked booking"
      className={cn(
        "min-h-0 flex-col justify-between gap-6 overflow-y-auto rounded-[16px] bg-white p-5 text-sm leading-[1.3]",
        className
      )}
    >
      <div className="flex flex-col gap-3.5">
        <h2 className="font-heading text-xl leading-[1.2] font-medium text-ink-strong">
          Linked booking
        </h2>
        {booking ? (
          <LinkedBooking
            booking={booking}
            fileCount={messages.filter(({ file }) => file).length}
          />
        ) : (
          <>
            <p className="text-muted-foreground">
              You have no booking with {professional.shortName} yet.
            </p>
            <Link href={bookingHref(professional.id)} className={ACTION_CLASS}>
              Book {professional.shortName}
            </Link>
          </>
        )}
      </div>
      <div className="flex flex-col items-center gap-2 rounded-[12px] bg-background p-3 text-center">
        <Shield aria-hidden="true" strokeWidth={1.5} className="size-6 text-support" />
        <p className="font-heading text-xl leading-[1.2] font-medium text-support">
          A little peace of mind
        </p>
        <p className="text-muted-foreground">
          Keep care details and conversations together on Avelliq.
        </p>
      </div>
    </aside>
  )
}
