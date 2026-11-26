"use client"

import { useFormikContext } from "formik"

import { FieldShell } from "@/components/form/field-shell"
import { FormikSelectField } from "@/components/form/formik/formik-select-field"
import { SelectInput } from "@/components/form/select-input"
import { TIME_ZONE } from "@/features/bookings/lib/time-zone"
import type { Professional } from "@/features/professionals/types"
import { formatCompactCurrency } from "@/lib/currency"
import { formatHours, formatTimeRange, formatWeekdayMonthDay } from "@/lib/date"
import type { BookingFormValues } from "@/schemas/validation-schemas"

import {
  getEndTimeOptions,
  shiftEndTime,
  START_TIME_OPTIONS,
} from "../lib/schedule"
import { summarizeBooking } from "../lib/summary"
import { BookingPanel } from "./booking-panel"
import { ScheduleCalendar } from "./schedule-calendar"

interface ScheduleStepProps {
  professional: Professional
  today: Date
}

export function ScheduleStep({ professional, today }: ScheduleStepProps) {
  const { values, setFieldValue, setValues } = useFormikContext<BookingFormValues>()
  const { start, end, price } = summarizeBooking(values, professional)

  const changeStartTime = (startTime: string | null) => {
    if (!startTime) return
    const endTime = shiftEndTime(values.startTime, values.endTime, startTime)
    setValues({ ...values, startTime, endTime })
  }

  return (
    <BookingPanel
      title="Date & time"
      description="Choose a day and a time that work for your family."
    >
      <div className="grid grid-cols-1 gap-6 @2xl:grid-cols-2">
        <ScheduleCalendar
          value={start}
          today={today}
          availableDays={professional.availableDays}
          onChange={(date) => setFieldValue("date", date)}
        />
        <div className="flex flex-col gap-4">
          <FieldShell name="startTime" label="Start time">
            {({ id }) => (
              <SelectInput
                id={id}
                name="startTime"
                options={START_TIME_OPTIONS}
                value={values.startTime}
                onValueChange={changeStartTime}
              />
            )}
          </FieldShell>
          <FormikSelectField
            name="endTime"
            label="End time"
            options={getEndTimeOptions(values.startTime)}
          />
          <p className="text-sm leading-[1.3] text-muted-foreground">{TIME_ZONE.label} (ET)</p>
          <div className="flex flex-col gap-2 rounded-[12px] bg-background p-4">
            <p className="font-heading text-xl leading-[1.2] font-medium text-primary">
              {formatHours(price.hours)} of care
            </p>
            <p className="text-sm leading-[1.3] text-muted-foreground">
              {formatCompactCurrency(price.hourlyRate)} per hour ·{" "}
              {formatCompactCurrency(price.care)} before fees
            </p>
          </div>
        </div>
      </div>
      <p
        aria-live="polite"
        className="rounded-[12px] bg-background p-4 text-base leading-[1.4] text-primary"
      >
        Selected: {formatWeekdayMonthDay(start)} · {formatTimeRange(start, end)}
      </p>
    </BookingPanel>
  )
}
