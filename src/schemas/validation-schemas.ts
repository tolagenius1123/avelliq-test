import * as yup from "yup"

import { AVAILABILITY_OPTIONS, EXPERIENCE_OPTIONS, US_STATE_OPTIONS } from "@/features/auth/data/options"
import type { ProfessionalSignUpStep } from "@/features/auth/types"
import {
  HOURS_PER_SESSION_OPTIONS,
  NUMBER_OF_CHILDREN_OPTIONS,
  TIME_OF_DAY_OPTIONS,
} from "@/features/care-request/data/options"
import { SERVICE_OPTIONS } from "@/features/services/data/service-options"
import { optionValues } from "@/lib/options"
import { PHONE_PATTERN, SSN_LAST_FOUR_PATTERN, ZIP_CODE_PATTERN } from "@/lib/patterns"

const MINIMUM_AGE = 18
const MIN_PASSWORD_LENGTH = 8

const requiredText = (message: string) => yup.string().trim().required(message)

const emailAddress = yup
  .string()
  .trim()
  .email("Enter a valid email address.")
  .required("Email address is required.")

const newPassword = yup
  .string()
  .required("Password is required.")
  .min(MIN_PASSWORD_LENGTH, `Use at least ${MIN_PASSWORD_LENGTH} characters.`)
  .matches(/[A-Za-z]/, "Include at least one letter.")
  .matches(/\d/, "Include at least one number.")

const confirmPassword = yup
  .string()
  .required("Please confirm your password.")
  .oneOf([yup.ref("password")], "Passwords do not match.")

const phoneNumber = requiredText("Phone number is required.").matches(
  PHONE_PATTERN,
  "Enter a valid phone number."
)

const oneOfOptions = (values: string[], message: string) =>
  yup.string().required(message).oneOf(values, message)

const acceptance = (message: string) => yup.boolean().required(message).oneOf([true], message)

function isAtLeastAge(value: string | undefined, age: number) {
  if (!value) return false
  const birthDate = new Date(`${value}T00:00:00`)
  if (Number.isNaN(birthDate.getTime())) return false
  const cutoff = new Date()
  cutoff.setFullYear(cutoff.getFullYear() - age)
  return birthDate <= cutoff
}

export const loginValidationSchema = yup.object({
  emailAddress,
  password: yup.string().required("Password is required."),
  rememberMe: yup.boolean().default(false),
})

export const clientSignUpValidationSchema = yup.object({
  fullName: requiredText("Full name is required.").min(2, "Please enter your full name."),
  emailAddress,
  phoneNumber,
  city: requiredText("City is required."),
  homeAddress: requiredText("Home address is required."),
  password: newPassword,
  confirmPassword,
  agreeToTerms: acceptance("Please accept the Terms of Service and Privacy Policy."),
})

const professionalAccountSchema = yup.object({
  emailAddress,
  password: newPassword,
  agreeToTerms: acceptance(
    "Please accept the terms and consent to a background check to continue."
  ),
})

const professionalPersonalSchema = yup.object({
  firstName: requiredText("First name is required."),
  lastName: requiredText("Last name is required."),
  phoneNumber,
  dateOfBirth: yup
    .string()
    .required("Date of birth is required.")
    .test("minimum-age", `You must be at least ${MINIMUM_AGE} years old.`, (value) =>
      isAtLeastAge(value, MINIMUM_AGE)
    ),
  city: requiredText("City is required."),
  state: oneOfOptions(optionValues(US_STATE_OPTIONS), "Select your state."),
  homeAddress: requiredText("Home address is required."),
  zipCode: requiredText("Zip code is required.").matches(ZIP_CODE_PATTERN, "Enter a valid zip code."),
})

const professionalDetailsSchema = yup.object({
  serviceCategory: oneOfOptions(
    optionValues(SERVICE_OPTIONS),
    "Select a service category."
  ),
  yearsOfExperience: oneOfOptions(optionValues(EXPERIENCE_OPTIONS), "Select your experience."),
  availability: oneOfOptions(optionValues(AVAILABILITY_OPTIONS), "Select your availability."),
  certifications: yup.string().trim().max(300, "Keep this under 300 characters.").default(""),
})

const professionalSecuritySchema = yup.object({
  ssnLastFour: requiredText("Last 4 digits of your SSN are required.").matches(
    SSN_LAST_FOUR_PATTERN,
    "Enter exactly 4 digits."
  ),
})

export const PROFESSIONAL_SIGN_UP_SCHEMAS = {
  account: professionalAccountSchema,
  personal: professionalPersonalSchema,
  professional: professionalDetailsSchema,
  security: professionalSecuritySchema,
} satisfies Record<ProfessionalSignUpStep, yup.AnyObjectSchema>

function isTodayOrLater(value: string | undefined) {
  if (!value) return false
  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date >= today
}

export const careRequestValidationSchema = yup.object({
  serviceType: oneOfOptions(optionValues(SERVICE_OPTIONS), "Select a service type."),
  hoursPerSession: oneOfOptions(
    optionValues(HOURS_PER_SESSION_OPTIONS),
    "Select how many hours you need."
  ),
  numberOfChildren: oneOfOptions(
    optionValues(NUMBER_OF_CHILDREN_OPTIONS),
    "Select how many children."
  ),
  childrenAges: yup.string().trim().max(100, "Keep this under 100 characters.").default(""),
  location: requiredText("Location is required."),
  startDate: yup
    .string()
    .required("Preferred start date is required.")
    .test("not-in-past", "Choose today or a future date.", isTodayOrLater),
  timeOfDay: yup
    .array(yup.string().required().oneOf(optionValues(TIME_OF_DAY_OPTIONS)))
    .min(1, "Select at least one time of day.")
    .required(),
  specialRequirements: yup.string().trim().max(1000, "Keep this under 1000 characters.").default(""),
})

export type LoginFormValues = yup.InferType<typeof loginValidationSchema>
export type ClientSignUpFormValues = yup.InferType<typeof clientSignUpValidationSchema>
export type ProfessionalSignUpFormValues = yup.InferType<typeof professionalAccountSchema> &
  yup.InferType<typeof professionalPersonalSchema> &
  yup.InferType<typeof professionalDetailsSchema> &
  yup.InferType<typeof professionalSecuritySchema>

export type CareRequestFormValues = yup.InferType<typeof careRequestValidationSchema>

export const createCareRequestInitialValues = (serviceType = ""): CareRequestFormValues => ({
  serviceType,
  hoursPerSession: "",
  numberOfChildren: "",
  childrenAges: "",
  location: "",
  startDate: "",
  timeOfDay: [],
  specialRequirements: "",
})

export const LOGIN_INITIAL_VALUES: LoginFormValues = {
  emailAddress: "",
  password: "",
  rememberMe: false,
}

export const CLIENT_SIGN_UP_INITIAL_VALUES: ClientSignUpFormValues = {
  fullName: "",
  emailAddress: "",
  phoneNumber: "",
  city: "",
  homeAddress: "",
  password: "",
  confirmPassword: "",
  agreeToTerms: false,
}

export const PROFESSIONAL_SIGN_UP_INITIAL_VALUES: ProfessionalSignUpFormValues = {
  firstName: "",
  lastName: "",
  emailAddress: "",
  phoneNumber: "",
  dateOfBirth: "",
  city: "",
  state: "",
  homeAddress: "",
  zipCode: "",
  serviceCategory: "",
  yearsOfExperience: "",
  availability: "",
  certifications: "",
  ssnLastFour: "",
  password: "",
  agreeToTerms: false,
}
