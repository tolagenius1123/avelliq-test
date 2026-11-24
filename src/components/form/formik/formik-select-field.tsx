"use client"

import { SelectInput, type SelectOption } from "../select-input"
import { FormikField, type FormikFieldBaseProps } from "./formik-field"

interface FormikSelectFieldProps extends FormikFieldBaseProps {
  options: readonly SelectOption[]
  placeholder?: string
  disabled?: boolean
}

export function FormikSelectField({
  name,
  label,
  optional,
  description,
  hint,
  className,
  options,
  placeholder,
  disabled,
}: FormikSelectFieldProps) {
  return (
    <FormikField<string>
      name={name}
      label={label}
      optional={optional}
      description={description}
      hint={hint}
      className={className}
    >
      {({ field, helpers, id, invalid, describedBy }) => (
        <SelectInput
          id={id}
          name={field.name}
          options={options}
          value={field.value || null}
          onValueChange={(value) => helpers.setValue(value ?? "")}
          onBlur={() => helpers.setTouched(true, false)}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={invalid}
          aria-describedby={describedBy}
        />
      )}
    </FormikField>
  )
}
