import type { ReactNode, Ref } from "react"

import { FieldLegend, FieldSet } from "@/components/ui/field"
import { cn } from "@/lib/utils"

interface FormSectionProps {
  title: string
  titleHidden?: boolean
  titleRef?: Ref<HTMLLegendElement>
  children: ReactNode
}

export function FormSection({ title, titleHidden = false, titleRef, children }: FormSectionProps) {
  return (
    <FieldSet className="min-w-0 gap-4">
      <FieldLegend
        ref={titleRef}
        tabIndex={-1}
        className={cn(
          "mb-3 font-heading leading-5 font-semibold text-primary outline-none data-[variant=legend]:text-sm",
          titleHidden && "sr-only"
        )}
      >
        {title}
      </FieldLegend>
      {children}
    </FieldSet>
  )
}
