import { addDays, formatTime, parseLocalDateTime } from "@/lib/date"

const MINUTES_PER_HOUR = 60
const SLOT_MINUTES = 30
const MIN_DURATION_MINUTES = 60
const EARLIEST_MINUTES = 6 * MINUTES_PER_HOUR
const LATEST_MINUTES = 22 * MINUTES_PER_HOUR
const DAYS_TO_SEARCH = 7
const LABEL_DATE = "2026-01-01"

export const DEFAULT_START_TIME = "15:00"
export const DEFAULT_END_TIME = "19:00"

function toMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number)
  return hours * MINUTES_PER_HOUR + minutes
}

function toTime(totalMinutes: number) {
  const hours = String(Math.floor(totalMinutes / MINUTES_PER_HOUR)).padStart(2, "0")
  const minutes = String(totalMinutes % MINUTES_PER_HOUR).padStart(2, "0")
  return `${hours}:${minutes}`
}

function createTimeOptions(from: number, to: number) {
  const count = Math.floor((to - from) / SLOT_MINUTES) + 1
  return Array.from({ length: count }, (_, index) => {
    const value = toTime(from + index * SLOT_MINUTES)
    return { value, label: formatTime(parseLocalDateTime(LABEL_DATE, value)) }
  })
}

export const START_TIME_OPTIONS = createTimeOptions(
  EARLIEST_MINUTES,
  LATEST_MINUTES - MIN_DURATION_MINUTES
)

export const getEndTimeOptions = (startTime: string) =>
  createTimeOptions(toMinutes(startTime) + MIN_DURATION_MINUTES, LATEST_MINUTES)

/** Keeps the booked duration when the start moves, capped at closing time. */
export function shiftEndTime(previousStart: string, previousEnd: string, nextStart: string) {
  const duration = toMinutes(previousEnd) - toMinutes(previousStart)
  return toTime(Math.min(toMinutes(nextStart) + duration, LATEST_MINUTES))
}

export function getFirstAvailableDate(today: Date, availableDays: number[]) {
  const tomorrow = addDays(today, 1)
  const candidates = Array.from({ length: DAYS_TO_SEARCH }, (_, offset) => addDays(tomorrow, offset))
  return candidates.find((date) => availableDays.includes(date.getDay())) ?? tomorrow
}
