"use client"

import { useId } from "react"

import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field"

interface FilterCheckboxGroupProps<T extends string> {
  legend: string
  options: readonly { value: T; label: string }[]
  selected: T[]
  onChange: (selected: T[]) => void
}

export function FilterCheckboxGroup<T extends string>({
  legend,
  options,
  selected,
  onChange,
}: FilterCheckboxGroupProps<T>) {
  const groupId = useId()

  const toggle = (value: T, isChecked: boolean) =>
    onChange(
      isChecked ? [...selected, value] : selected.filter((candidate) => candidate !== value)
    )

  return (
    <FieldSet className="gap-3.5 py-5">
      <FieldLegend className="float-left mb-1 w-full text-sm! leading-[1.3] font-normal text-ink-strong">
        {legend}
      </FieldLegend>
      {options.map(({ value, label }) => {
        const id = `${groupId}-${value}`

        return (
          <Field key={value} orientation="horizontal" className="gap-2.5">
            <Checkbox
              id={id}
              checked={selected.includes(value)}
              onCheckedChange={(isChecked) => toggle(value, isChecked)}
              className="size-5 rounded-[4px] border-stroke-muted bg-white shadow-none"
            />
            <FieldLabel
              htmlFor={id}
              className="cursor-pointer leading-[1.3] font-normal text-ink-strong"
            >
              {label}
            </FieldLabel>
          </Field>
        )
      })}
    </FieldSet>
  )
}
