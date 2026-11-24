"use client"

import type { FormikHelpers, FormikValues } from "formik"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export interface AuthSubmitOptions<TValues extends FormikValues> {
  request: (values: TValues) => Promise<void>
  redirectTo: string
  successMessage: string
  errorMessage: string
}

export function useAuthSubmit<TValues extends FormikValues>({
  request,
  redirectTo,
  successMessage,
  errorMessage,
}: AuthSubmitOptions<TValues>) {
  const router = useRouter()

  return async (values: TValues, { resetForm }: FormikHelpers<TValues>) => {
    try {
      await request(values)
      toast.success(successMessage)
      resetForm()
      router.push(redirectTo)
    } catch (error) {
      console.error(errorMessage, error)
      toast.error(errorMessage)
    }
  }
}
