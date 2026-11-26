export function toIsoDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

const LOCALE = "en-US"
export const DAYS_PER_WEEK = 7
const HOUR_MS = 3_600_000
const DAY_MS = 24 * HOUR_MS

const longDateFormat = new Intl.DateTimeFormat(LOCALE, { dateStyle: "full" })
const monthDayYearFormat = new Intl.DateTimeFormat(LOCALE, { dateStyle: "long" })
const monthDayFormat = new Intl.DateTimeFormat(LOCALE, { month: "short", day: "numeric" })
const weekdayMonthDayFormat = new Intl.DateTimeFormat(LOCALE, {
  weekday: "short",
  month: "short",
  day: "numeric",
})
const weekdayDateFormat = new Intl.DateTimeFormat(LOCALE, {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
})
const weekdayFormat = new Intl.DateTimeFormat(LOCALE, { weekday: "short" })
const longWeekdayFormat = new Intl.DateTimeFormat(LOCALE, { weekday: "long" })
const longWeekdayMonthDayFormat = new Intl.DateTimeFormat(LOCALE, {
  weekday: "long",
  month: "long",
  day: "numeric",
})
const monthFormat = new Intl.DateTimeFormat(LOCALE, { month: "short" })
const weekdayInitialFormat = new Intl.DateTimeFormat(LOCALE, { weekday: "narrow" })
const timeFormat = new Intl.DateTimeFormat(LOCALE, { timeStyle: "short" })

const formatCompactRange = (format: Intl.DateTimeFormat, start: Date, end: Date) =>
  format.formatRange(start, end).replace(/\s*–\s*/g, "–")

export const formatLongDate = (date: Date) => longDateFormat.format(date)
export const formatMonthDayYear = (date: Date) => monthDayYearFormat.format(date)
export const formatMonthDay = (date: Date) => monthDayFormat.format(date)
export const formatMonth = (date: Date) => monthFormat.format(date)
export const formatWeekday = (date: Date) => weekdayFormat.format(date)
export const formatLongWeekday = (date: Date) => longWeekdayFormat.format(date)
export const formatLongWeekdayMonthDay = (date: Date) => longWeekdayMonthDayFormat.format(date)
export const formatWeekdayMonthDay = (date: Date) => weekdayMonthDayFormat.format(date)
export const formatWeekdayDate = (date: Date) => weekdayDateFormat.format(date)
export const formatWeekdayInitial = (date: Date) => weekdayInitialFormat.format(date)
export const formatTime = (date: Date) => timeFormat.format(date)

export const formatDateRange = (start: Date, end: Date) =>
  formatCompactRange(monthDayYearFormat, start, end)

export const formatTimeRange = (start: Date, end: Date) =>
  formatCompactRange(timeFormat, start, end)

export function addDays(date: Date, days: number) {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export function addHours(date: Date, hours: number) {
  const result = new Date(date)
  result.setHours(result.getHours() + hours)
  return result
}

export const getHoursBetween = (start: Date, end: Date) =>
  (end.getTime() - start.getTime()) / HOUR_MS

export const formatHours = (hours: number) => `${hours} ${hours === 1 ? "hour" : "hours"}`

export const parseLocalDateTime = (isoDate: string, time = "00:00") =>
  new Date(`${isoDate}T${time}:00`)

export function getDayDifference(from: Date, to: Date) {
  const midnights = [from, to].map((date) => new Date(date).setHours(0, 0, 0, 0))
  return Math.round((midnights[1] - midnights[0]) / DAY_MS)
}

export function isSameDay(first: Date, second: Date) {
  return toIsoDate(first) === toIsoDate(second)
}

export function getWeekDays(date: Date) {
  const daysSinceMonday = (date.getDay() + DAYS_PER_WEEK - 1) % DAYS_PER_WEEK
  const monday = addDays(date, -daysSinceMonday)
  return Array.from({ length: DAYS_PER_WEEK }, (_, index) => addDays(monday, index))
}

export function formatRelativeDay(date: Date, today: Date) {
  if (isSameDay(date, today)) return "Today"
  if (isSameDay(date, addDays(today, 1))) return "Tomorrow"
  return weekdayFormat.format(date)
}

export function getDayPeriod(date: Date) {
  const hour = date.getHours()
  if (hour < 12) return "morning"
  if (hour < 17) return "afternoon"
  return "evening"
}
