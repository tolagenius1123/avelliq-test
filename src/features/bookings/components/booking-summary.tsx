import { Calendar, Clock, LockKeyhole, MapPin, type LucideIcon } from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { DashboardCard } from "@/features/dashboard/components/dashboard-card"
import { ProfessionalPortrait } from "@/features/professionals/components/professional-portrait"
import { getCategoryLabel } from "@/features/professionals/data/categories"
import { formatRating } from "@/features/professionals/lib/format"
import { formatCompactCurrency, formatCurrency } from "@/lib/currency"
import { formatHours, formatTimeRange, formatWeekdayDate } from "@/lib/date"

import type { BookingSummaryData } from "../lib/summary"

interface BookingSummaryProps {
  title: string
  summary: BookingSummaryData
  note: string
}

function SummaryDivider() {
  return <Separator className="bg-stroke/60" />
}

export function BookingSummary({ title, summary, note }: BookingSummaryProps) {
  const { professional, location, start, end, price } = summary
  const { name, role, category, rating, reviewCount } = professional
  const duration = formatHours(price.hours)

  const appointment: { icon: LucideIcon; text: string }[] = [
    { icon: Calendar, text: formatWeekdayDate(start) },
    { icon: Clock, text: `${formatTimeRange(start, end)} · ${duration}` },
    { icon: MapPin, text: location },
  ]

  const lines = [
    { label: `Care · ${duration} × ${formatCompactCurrency(price.hourlyRate)}`, amount: price.care },
    { label: "Service fee", amount: price.serviceFee },
  ]

  return (
    <aside aria-label={title}>
      <DashboardCard className="gap-5 rounded-[16px] p-4 text-sm leading-[1.3] @md/page:p-6">
        <h2 className="font-heading text-xl leading-[1.2] font-medium text-ink-strong">{title}</h2>
        <div className="flex items-center gap-4">
          <ProfessionalPortrait
            professional={professional}
            sizes="64px"
            className="size-16 shrink-0 rounded-full text-xl"
          />
          <div className="flex min-w-0 flex-col gap-1.5 text-muted-foreground">
            <p className="text-lg leading-[1.2] font-medium text-ink-strong">{name}</p>
            <p>
              {role} · {getCategoryLabel(category)}
            </p>
            <p>
              {formatRating(rating)} / 5 · {reviewCount} reviews
            </p>
          </div>
        </div>
        <SummaryDivider />
        <ul className="flex flex-col gap-5 text-ink-strong">
          {appointment.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-start gap-2.5">
              <Icon aria-hidden="true" strokeWidth={1.5} className="size-4.5 shrink-0" />
              {text}
            </li>
          ))}
        </ul>
        <SummaryDivider />
        <dl className="flex flex-col gap-5">
          {lines.map(({ label, amount }) => (
            <div key={label} className="flex items-center justify-between gap-3">
              <dt className="text-muted-foreground">{label}</dt>
              <dd className="text-ink-strong">{formatCurrency(amount)}</dd>
            </div>
          ))}
        </dl>
        <SummaryDivider />
        <dl
          aria-live="polite"
          className="flex items-center justify-between gap-3 font-heading leading-[1.2] font-medium"
        >
          <dt className="text-xl text-ink-strong">Total</dt>
          <dd className="text-2xl text-primary">{formatCurrency(price.total)}</dd>
        </dl>
        <p className="flex items-start gap-2.5 rounded-[8px] bg-background p-3 text-primary">
          <LockKeyhole aria-hidden="true" strokeWidth={1.5} className="size-4.5 shrink-0" />
          {note}
        </p>
      </DashboardCard>
    </aside>
  )
}
