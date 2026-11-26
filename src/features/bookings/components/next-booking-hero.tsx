import { Clock, MapPin, type LucideIcon } from "lucide-react"
import Link from "next/link"

import { ComingSoonButton } from "@/components/shared/coming-soon-button"
import { buttonVariants } from "@/components/ui/button"
import { ROUTES } from "@/config/site"
import { conversationHref } from "@/features/messages/lib/routes"
import { ProfessionalPortrait } from "@/features/professionals/components/professional-portrait"
import { formatHours, formatTimeRange } from "@/lib/date"
import { cn } from "@/lib/utils"

import { describePayment } from "../lib/payment"
import { bookingDetailsHref } from "../lib/routes"
import { TIME_ZONE } from "../lib/time-zone"
import type { Booking } from "../types"
import { BookingDateTile } from "./booking-date-tile"

const HERO_CLASS =
  "flex flex-col justify-between gap-6 rounded-[16px] bg-primary p-4 text-white @md/page:p-5"

function BookingHeroDetails({ booking }: { booking: Booking }) {
  const { id, professional, service, serviceDetail, start, end, price, care } = booking

  const facts: { icon: LucideIcon; title: string; detail: string }[] = [
    {
      icon: Clock,
      title: `${formatTimeRange(start, end)} · ${TIME_ZONE.label}`,
      detail: `${formatHours(price.hours)} · Care for ${care.recipient}`,
    },
    { icon: MapPin, title: "At your home", detail: `${care.address} · ${care.city}` },
  ]

  return (
    <>
      <div className="flex items-start gap-4 @md/page:items-center">
        <ProfessionalPortrait
          professional={professional}
          sizes="72px"
          className="size-14 shrink-0 rounded-full text-xl @md/page:size-18"
        />
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <h3 className="font-heading text-xl leading-[1.2] font-medium @md/page:text-2xl">
            {professional.name}
          </h3>
          <p className="text-base leading-[1.4]">
            {service} · {serviceDetail}
          </p>
          <p className="text-sm leading-[1.3]">
            {id} · {describePayment(booking).headline}
          </p>
        </div>
        <BookingDateTile
          date={start}
          className="rounded-[12px] p-2 @md/page:w-18"
          dayClassName="font-semibold @md/page:text-[32px]"
        />
      </div>

      <ul className="flex flex-col gap-4 text-sm leading-[1.3] @2xl/page:flex-row @2xl/page:gap-8">
        {facts.map(({ icon: Icon, title, detail }) => (
          <li
            key={title}
            className="flex min-w-0 items-start gap-2.5 @2xl/page:not-first:border-l-[0.5px] @2xl/page:not-first:border-white/60 @2xl/page:not-first:pl-8"
          >
            <Icon aria-hidden="true" strokeWidth={1.5} className="size-4.5 shrink-0" />
            <div className="flex min-w-0 flex-col gap-1.5 wrap-break-word">
              <p>{title}</p>
              <p>{detail}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-3">
        <Link
          href={bookingDetailsHref(id)}
          className={cn(
            buttonVariants({ variant: "white" }),
            "h-11 rounded-full px-7 font-normal @2xl/page:h-10"
          )}
        >
          View booking
        </Link>
        <Link
          href={conversationHref(professional.id)}
          aria-label={`Message ${professional.shortName}`}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "h-11 rounded-full border-white px-7 font-normal text-white hover:bg-white/10 hover:text-white @2xl/page:h-10"
          )}
        >
          Message
        </Link>
      </div>
    </>
  )
}

export function NextBookingHero({ booking }: { booking?: Booking }) {
  return (
    <section aria-labelledby="next-booking" className={HERO_CLASS}>
      <div className="flex items-center justify-between gap-4">
        <h2
          id="next-booking"
          className="font-heading text-xl leading-[1.2] font-medium uppercase"
        >
          Next booking
        </h2>
        {booking && (
          <ComingSoonButton
            variant="link"
            className="relative h-auto p-0 font-normal text-white underline after:absolute after:-inset-3"
          >
            Reschedule
          </ComingSoonButton>
        )}
      </div>
      {booking ? (
        <BookingHeroDetails booking={booking} />
      ) : (
        <div className="flex flex-col items-start gap-5 pb-2">
          <p className="text-base leading-[1.4]">You have no upcoming bookings yet.</p>
          <Link
            href={ROUTES.findCare}
            className={cn(buttonVariants({ variant: "white" }), "h-11 rounded-full px-7 font-normal")}
          >
            Find care
          </Link>
        </div>
      )}
    </section>
  )
}
