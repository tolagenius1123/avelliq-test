"use client"

import { FormikCheckboxField } from "@/components/form/formik/formik-checkbox-field"
import { FormikForm } from "@/components/form/formik/formik-form"
import { FormikInputField } from "@/components/form/formik/formik-input-field"
import { FormikPasswordField } from "@/components/form/formik/formik-password-field"
import { SubmitButton } from "@/components/form/submit-button"
import { ComingSoonButton } from "@/components/shared/coming-soon-button"
import { LOGIN_INITIAL_VALUES, loginValidationSchema } from "@/schemas/validation-schemas"

import { simulateAuthRequest } from "../api"
import { SIGN_IN_REDIRECTS } from "../data/content"
import { useAuthForm } from "../hooks/use-auth-form"
import type { AuthRole } from "../types"

export function SignInForm({ role }: { role: AuthRole }) {
  const formik = useAuthForm({
    initialValues: LOGIN_INITIAL_VALUES,
    validationSchema: loginValidationSchema,
    request: simulateAuthRequest,
    redirectTo: SIGN_IN_REDIRECTS[role],
    successMessage: "Login successful",
    errorMessage: "Login failed. Please check your details and try again.",
  })

  return (
    <FormikForm formik={formik} aria-label="Sign in" className="flex flex-col gap-7">
      <div className="flex flex-col gap-4.5">
        <FormikInputField
          name="emailAddress"
          label="Email Address"
          type="email"
          placeholder="jane@example.com"
          autoComplete="email"
        />
        <FormikPasswordField name="password" label="Password" autoComplete="current-password" />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <FormikCheckboxField
          name="rememberMe"
          label={<span className="text-sm text-muted-foreground">Remember me</span>}
          className="w-auto"
        />
        <ComingSoonButton variant="link" className="h-auto p-0 text-sm font-semibold">
          Forgot Password?
        </ComingSoonButton>
      </div>

      <SubmitButton size="pill-lg" isLoading={formik.isSubmitting} loadingLabel="Signing in..." className="w-full">
        Sign In
      </SubmitButton>
    </FormikForm>
  )
}
