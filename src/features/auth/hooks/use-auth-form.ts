"use client"

import { useFormik, type FormikValues } from "formik"
import type { AnyObjectSchema } from "yup"

import { useAuthSubmit, type AuthSubmitOptions } from "./use-auth-submit"

interface UseAuthFormOptions<TValues extends FormikValues> extends AuthSubmitOptions<TValues> {
  initialValues: TValues
  validationSchema: AnyObjectSchema
}

export function useAuthForm<TValues extends FormikValues>({
  initialValues,
  validationSchema,
  ...submitOptions
}: UseAuthFormOptions<TValues>) {
  const onSubmit = useAuthSubmit(submitOptions)

  return useFormik<TValues>({ initialValues, validationSchema, onSubmit })
}
