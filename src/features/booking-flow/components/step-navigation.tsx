import Link from "next/link"

import { SubmitButton } from "@/components/form/submit-button"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const STEP_NAVIGATION_CLASS =
  "flex flex-col-reverse gap-3 pt-2 @md/page:flex-row @md/page:justify-between"
export const STEP_BACK_CLASS = "border font-normal @md/page:min-w-30"
export const STEP_NEXT_CLASS = "font-normal @md/page:min-w-70"

interface StepNavigationProps {
  onBack: (() => void) | string
  submitLabel: string
  isSubmitting: boolean
}

export function StepNavigation({ onBack, submitLabel, isSubmitting }: StepNavigationProps) {
  return (
    <div className={STEP_NAVIGATION_CLASS}>
      {typeof onBack === "string" ? (
        <Link
          href={onBack}
          className={cn(
            buttonVariants({ variant: "outline-primary", size: "pill-lg" }),
            STEP_BACK_CLASS
          )}
        >
          Back
        </Link>
      ) : (
        <Button
          variant="outline-primary"
          size="pill-lg"
          disabled={isSubmitting}
          onClick={onBack}
          className={STEP_BACK_CLASS}
        >
          Back
        </Button>
      )}
      <SubmitButton
        size="pill-lg"
        isLoading={isSubmitting}
        loadingLabel="Confirming..."
        className={STEP_NEXT_CLASS}
      >
        {submitLabel}
      </SubmitButton>
    </div>
  )
}
