"use client"

import { useEffect, useRef } from "react"

import { FormikForm } from "@/components/form/formik/formik-form"
import { SubmitButton } from "@/components/form/submit-button"
import { Button } from "@/components/ui/button"

import { useProfessionalSignUp } from "../hooks/use-professional-sign-up"
import { AuthEntry } from "./auth-entry"
import { PROFESSIONAL_SIGN_UP_FIELDS } from "./professional-sign-up-fields"
import { SignUpProgress } from "./sign-up-progress"

export function ProfessionalSignUpForm() {
  const { formik, step, isSecurityComplete, goToStep, goBack } = useProfessionalSignUp()
  const titleRef = useRef<HTMLLegendElement>(null)
  const previousStep = useRef(step)

  useEffect(() => {
    if (previousStep.current === step) return
    previousStep.current = step
    window.scrollTo({ top: 0 })
    titleRef.current?.focus({ preventScroll: true })
  }, [step])

  const StepFields = PROFESSIONAL_SIGN_UP_FIELDS[step]
  const { isSubmitting } = formik

  if (step === "account") {
    return (
      <AuthEntry mode="sign-up" role="professional">
        <FormikForm formik={formik} aria-label="Create professional account" className="flex flex-col gap-4">
          <StepFields titleRef={titleRef} />
          <SubmitButton
            size="pill"
            isLoading={isSubmitting}
            loadingLabel="Verifying email..."
            className="w-full"
          >
            Verify Email & Continue
          </SubmitButton>
        </FormikForm>
      </AuthEntry>
    )
  }

  const isReadyToCreate = step === "security" && isSecurityComplete

  return (
    <>
      <SignUpProgress
        currentStage={step}
        isCurrentComplete={isReadyToCreate}
        disabled={isSubmitting}
        onSelect={goToStep}
      />
      <FormikForm
        formik={formik}
        aria-label="Create professional account"
        className="@container flex flex-col gap-6"
      >
        <StepFields titleRef={titleRef} />
        <div className="flex flex-col-reverse gap-3 @md:flex-row @md:gap-4">
          <Button
            variant="outline-primary"
            size="pill-lg"
            disabled={isSubmitting}
            onClick={goBack}
            className="border @md:w-28"
          >
            Back
          </Button>
          <SubmitButton
            size="pill-lg"
            isLoading={isSubmitting}
            loadingLabel="Creating account..."
            className="@md:flex-1"
          >
            {isReadyToCreate ? "Create Professional Account" : "Continue"}
          </SubmitButton>
        </div>
      </FormikForm>
    </>
  )
}
