"use client"

import { FieldRow } from "@/components/form/field-row"
import { FormikCheckboxField } from "@/components/form/formik/formik-checkbox-field"
import { FormikForm } from "@/components/form/formik/formik-form"
import { FormikInputField } from "@/components/form/formik/formik-input-field"
import { FormikPasswordField } from "@/components/form/formik/formik-password-field"
import { SubmitButton } from "@/components/form/submit-button"
import {
  CLIENT_SIGN_UP_INITIAL_VALUES,
  clientSignUpValidationSchema,
} from "@/schemas/validation-schemas"

import { simulateAuthRequest } from "../api"
import { useAuthForm } from "../hooks/use-auth-form"
import { authHref } from "../utils"
import { TermsAgreementLabel } from "./terms-agreement-label"

export function ClientSignUpForm() {
  const formik = useAuthForm({
    initialValues: CLIENT_SIGN_UP_INITIAL_VALUES,
    validationSchema: clientSignUpValidationSchema,
    request: simulateAuthRequest,
    redirectTo: authHref("sign-in", "client"),
    successMessage: "Account created. Please sign in to continue.",
    errorMessage: "We couldn't create your account. Please try again.",
  })

  return (
    <FormikForm formik={formik} aria-label="Create account" className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <FormikInputField name="fullName" label="Full Name" placeholder="e.g. Jane Doe" autoComplete="name" />
        <FormikInputField
          name="emailAddress"
          label="Email Address"
          type="email"
          placeholder="jane@example.com"
          autoComplete="email"
        />
        <FieldRow>
          <FormikInputField
            name="phoneNumber"
            label="Phone Number"
            type="tel"
            placeholder="(555) 123-4567"
            autoComplete="tel"
          />
          <FormikInputField name="city" label="City" placeholder="San Francisco" autoComplete="address-level2" />
        </FieldRow>
        <FormikInputField
          name="homeAddress"
          label="Home Address"
          placeholder="123 Wellness Ave, Apt 4"
          autoComplete="street-address"
        />
        <FieldRow>
          <FormikPasswordField name="password" label="Password" autoComplete="new-password" />
          <FormikPasswordField
            name="confirmPassword"
            label="Confirm Password"
            autoComplete="new-password"
            revealable={false}
          />
        </FieldRow>
      </div>

      <div className="flex flex-col gap-4">
        <FormikCheckboxField name="agreeToTerms" label={<TermsAgreementLabel />} />
        <SubmitButton size="pill-lg" isLoading={formik.isSubmitting} loadingLabel="Creating account..." className="w-full">
          Create Account
        </SubmitButton>
      </div>
    </FormikForm>
  )
}
