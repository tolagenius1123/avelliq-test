import { toIsoDate } from "@/lib/date"

const REFERENCE_PREFIX = "AV-"

export const getDateReference = (date: Date) =>
  `${REFERENCE_PREFIX}${toIsoDate(date).slice(2).replaceAll("-", "")}`

export function createBookingReference(date: Date, existing: { id: string }[]) {
  const base = getDateReference(date)
  const sameDayCount = existing.filter(({ id }) => id.startsWith(base)).length
  return sameDayCount === 0 ? base : `${base}-${sameDayCount + 1}`
}
