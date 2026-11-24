import type { ComponentType, Ref } from "react"

import { FieldRow } from "@/components/form/field-row"
import { FormikCheckboxField } from "@/components/form/formik/formik-checkbox-field"
import { FormikInputField } from "@/components/form/formik/formik-input-field"
import { FormikPasswordField } from "@/components/form/formik/formik-password-field"
import { FormikSelectField } from "@/components/form/formik/formik-select-field"
import { SERVICE_OPTIONS } from "@/features/services/data/service-options"

import { AVAILABILITY_OPTIONS, EXPERIENCE_OPTIONS, US_STATE_OPTIONS } from "../data/options"
import type { ProfessionalSignUpStep } from "../types"
import { FormSection } from "./form-section"
import { TermsAgreementLabel } from "./terms-agreement-label"

interface StepFieldsProps {
  titleRef: Ref<HTMLLegendElement>
}

function AccountFields({ titleRef }: StepFieldsProps) {
  return (
    <FormSection title="Account Details" titleHidden titleRef={titleRef}>
      <FormikInputField
        name="emailAddress"
        label="Email Address"
        type="email"
        placeholder="jane.doe@example.com"
        autoComplete="email"
      />
      <FormikPasswordField name="password" label="Password" autoComplete="new-password" />
      <FormikCheckboxField
        name="agreeToTerms"
        label={<TermsAgreementLabel withBackgroundCheck />}
        className="mt-2"
      />
      <p className="rounded-[8px] bg-background px-4 py-3 text-sm leading-[1.3] text-muted-foreground">
        Choose a strong, unique password. Review your details and the agreement before creating your
        account.
      </p>
    </FormSection>
  )
}

function PersonalFields({ titleRef }: StepFieldsProps) {
  return (
    <FormSection title="Personal Information" titleRef={titleRef}>
      <FieldRow>
        <FormikInputField name="firstName" label="First Name" placeholder="e.g. Jane" autoComplete="given-name" />
        <FormikInputField name="lastName" label="Last Name" placeholder="e.g. Doe" autoComplete="family-name" />
      </FieldRow>
      <FieldRow>
        <FormikInputField
          name="phoneNumber"
          label="Phone Number"
          type="tel"
          placeholder="(555) 123-4567"
          autoComplete="tel"
        />
        <FormikInputField name="dateOfBirth" label="Date of Birth" type="date" autoComplete="bday" />
      </FieldRow>
      <FieldRow>
        <FormikInputField name="city" label="City" placeholder="San Francisco" autoComplete="address-level2" />
        <FormikSelectField name="state" label="State" placeholder="Select state" options={US_STATE_OPTIONS} />
      </FieldRow>
      <FieldRow>
        <FormikInputField
          name="homeAddress"
          label="Home Address"
          placeholder="123 Wellness Ave, Apt 4"
          autoComplete="street-address"
        />
        <FormikInputField
          name="zipCode"
          label="Zip Code"
          placeholder="94102"
          inputMode="numeric"
          autoComplete="postal-code"
        />
      </FieldRow>
    </FormSection>
  )
}

function ProfessionalFields({ titleRef }: StepFieldsProps) {
  return (
    <FormSection title="Professional Details" titleRef={titleRef}>
      <FormikSelectField
        name="serviceCategory"
        label="Service Category"
        placeholder="Select a service"
        options={SERVICE_OPTIONS}
      />
      <FieldRow>
        <FormikSelectField
          name="yearsOfExperience"
          label="Years of Experience"
          placeholder="Select experience"
          options={EXPERIENCE_OPTIONS}
        />
        <FormikSelectField
          name="availability"
          label="Availability"
          placeholder="Select availability"
          options={AVAILABILITY_OPTIONS}
        />
      </FieldRow>
      <FormikInputField
        name="certifications"
        label="Certifications & Licenses"
        optional
        placeholder="e.g. CNA, CPR Certified, First Aid"
      />
    </FormSection>
  )
}

function SecurityFields({ titleRef }: StepFieldsProps) {
  return (
    <FormSection title="Security Details" titleRef={titleRef}>
      <FormikInputField
        name="ssnLastFour"
        label="SSN (Last 4 digits)"
        hint="Required for background verification"
        placeholder="e.g. 1234"
        inputMode="numeric"
        maxLength={4}
        autoComplete="off"
      />
    </FormSection>
  )
}

export const PROFESSIONAL_SIGN_UP_FIELDS: Record<
  ProfessionalSignUpStep,
  ComponentType<StepFieldsProps>
> = {
  account: AccountFields,
  personal: PersonalFields,
  professional: ProfessionalFields,
  security: SecurityFields,
}
