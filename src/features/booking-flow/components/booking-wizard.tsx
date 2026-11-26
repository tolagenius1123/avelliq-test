"use client"

import { useEffect, useRef, type ReactNode } from "react"

import { FormikForm } from "@/components/form/formik/formik-form"
import { BookingSummary } from "@/features/bookings/components/booking-summary"
import { describePayment } from "@/features/bookings/lib/payment"
import { DashboardCard } from "@/features/dashboard/components/dashboard-card"
import { DashboardPageHeader } from "@/features/dashboard/components/dashboard-page-header"
import { profileHref } from "@/features/professionals/lib/routes"
import type { Professional } from "@/features/professionals/types"
import { formatCurrency } from "@/lib/currency"
import { cn } from "@/lib/utils"

import { BOOKING_STEPS, CONFIRMED_CONTENT } from "../data/steps"
import { useBookingFlow } from "../hooks/use-booking-flow"
import { summarizeBooking } from "../lib/summary"
import type { BookingStep } from "../types"
import { BookingConfirmed } from "./booking-confirmed"
import { BookingProgress } from "./booking-progress"
import { CancelBookingButton } from "./cancel-booking-button"
import { CareStep } from "./care-step"
import { PaymentStep } from "./payment-step"
import { ReviewStep } from "./review-step"
import { ScheduleStep } from "./schedule-step"
import { StepNavigation } from "./step-navigation"

const WORKSPACE_CLASS =
  "grid grid-cols-1 items-start gap-6 @5xl/page:grid-cols-[minmax(0,1fr)_384px]"

const FIELD_CLASS = cn(
  "[&_[data-slot=field-label]]:text-sm [&_[data-slot=field-label]]:font-normal [&_[data-slot=field-label]]:text-ink-strong",
  "[&_[data-slot=input]]:h-14 [&_[data-slot=input]]:px-5 [&_[data-slot=input]]:text-base",
  "[&_[data-slot=select-trigger]]:h-14! [&_[data-slot=select-trigger]]:px-5 [&_[data-slot=select-trigger]]:text-base",
  "[&_[data-slot=textarea]]:min-h-14 [&_[data-slot=textarea]]:px-5 [&_[data-slot=textarea]]:py-4 [&_[data-slot=textarea]]:text-base",
  "[&_[data-slot=checkbox]]:size-6 [&_[data-slot=checkbox]_svg]:size-4 [&_[data-slot=checkbox][data-checked]]:bg-primary [&_[data-slot=checkbox][data-checked]]:text-white"
)

interface BookingWizardProps {
  professional: Professional
  today: Date
}

export function BookingWizard({ professional, today }: BookingWizardProps) {
  const { formik, step, stepIndex, booking, goToStep, goBack } = useBookingFlow(professional, today)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const stage = booking ? "confirmed" : step
  const previousStage = useRef<typeof stage>(stage)

  useEffect(() => {
    if (previousStage.current === stage) return
    previousStage.current = stage
    window.scrollTo({ top: 0 })
    headingRef.current?.focus({ preventScroll: true })
  }, [stage])

  if (booking) {
    return (
      <>
        <DashboardPageHeader headingRef={headingRef} {...CONFIRMED_CONTENT} />
        <BookingProgress currentIndex={BOOKING_STEPS.length} />
        <div className={WORKSPACE_CLASS}>
          <BookingConfirmed booking={booking} />
          <BookingSummary
            title="Your Booking"
            summary={booking}
            note={describePayment(booking).note}
          />
        </div>
      </>
    )
  }

  const { title, describe } = BOOKING_STEPS[stepIndex]
  const summary = summarizeBooking(formik.values, professional)
  const { isSubmitting } = formik

  const submitLabels: Record<BookingStep, string> = {
    schedule: "Continue to care details",
    care: "Continue to payment",
    payment: "Review booking",
    review: `Confirm & pay ${formatCurrency(summary.price.total)}`,
  }

  const stepFields: Record<BookingStep, ReactNode> = {
    schedule: <ScheduleStep professional={professional} today={today} />,
    care: <CareStep professional={professional} />,
    payment: <PaymentStep professional={professional} />,
    review: <ReviewStep professional={professional} onEdit={goToStep} disabled={isSubmitting} />,
  }

  return (
    <>
      <DashboardPageHeader
        headingRef={headingRef}
        title={title}
        description={describe(professional)}
        action={<CancelBookingButton disabled={isSubmitting} />}
      />
      <BookingProgress currentIndex={stepIndex} />
      <div className={WORKSPACE_CLASS}>
        <DashboardCard className="rounded-[16px] p-4 @md/page:p-6">
          <FormikForm
            formik={formik}
            aria-label={title}
            className={cn("flex flex-col gap-6", FIELD_CLASS)}
          >
            {stepFields[step]}
            <StepNavigation
              onBack={stepIndex === 0 ? profileHref(professional.id) : goBack}
              submitLabel={submitLabels[step]}
              isSubmitting={isSubmitting && step === "review"}
            />
          </FormikForm>
        </DashboardCard>
        <BookingSummary
          title="Booking summary"
          summary={summary}
          note="You'll review everything before paying."
        />
      </div>
    </>
  )
}
