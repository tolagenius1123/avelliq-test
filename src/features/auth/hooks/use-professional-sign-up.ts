"use client"

import { useFormik } from "formik"
import { useState } from "react"
import { toast } from "sonner"

import { simulateRequest } from "@/lib/simulate-request"
import {
  PROFESSIONAL_SIGN_UP_INITIAL_VALUES,
  PROFESSIONAL_SIGN_UP_SCHEMAS,
  type ProfessionalSignUpFormValues,
} from "@/schemas/validation-schemas"

import { PROFESSIONAL_SIGN_UP_STAGES } from "../data/content"
import type { ProfessionalSignUpStep } from "../types"
import { authHref } from "../utils"
import { useAuthSubmit } from "./use-auth-submit"

const STEPS: ProfessionalSignUpStep[] = [
  "account",
  ...PROFESSIONAL_SIGN_UP_STAGES.map(({ stage }) => stage),
]

const EMAIL_ERROR_MESSAGE = "We couldn't verify your email. Please try again."

export function useProfessionalSignUp() {
  const [step, setStep] = useState<ProfessionalSignUpStep>("account")
  const stepIndex = STEPS.indexOf(step)

  const createAccount = useAuthSubmit<ProfessionalSignUpFormValues>({
    request: simulateRequest,
    redirectTo: authHref("sign-in", "professional"),
    successMessage: "Application received. Please sign in to continue.",
    errorMessage: "We couldn't create your account. Please try again.",
  })

  const formik = useFormik<ProfessionalSignUpFormValues>({
    initialValues: PROFESSIONAL_SIGN_UP_INITIAL_VALUES,
    validationSchema: PROFESSIONAL_SIGN_UP_SCHEMAS[step],
    onSubmit: async (values, helpers) => {
      if (step === "security") return createAccount(values, helpers)

      if (step === "account") {
        try {
          await simulateRequest()
        } catch (error) {
          console.error(EMAIL_ERROR_MESSAGE, error)
          toast.error(EMAIL_ERROR_MESSAGE)
          return
        }
      }
      goToStep(STEPS[stepIndex + 1])
    },
  })

  // Formik touches every field on submit, so untouched steps would otherwise open showing errors.
  function goToStep(target: ProfessionalSignUpStep) {
    formik.setErrors({})
    formik.setTouched({}, false)
    setStep(target)
  }

  return {
    formik,
    step,
    isSecurityComplete: PROFESSIONAL_SIGN_UP_SCHEMAS.security.isValidSync(formik.values),
    goToStep,
    goBack: () => goToStep(STEPS[stepIndex - 1]),
  }
}
