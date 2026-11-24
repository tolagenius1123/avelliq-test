import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { PROFESSIONAL_SIGN_UP_STAGES } from "../data/content"
import type { ProfessionalSignUpStage } from "../types"

interface SignUpProgressProps {
  currentStage: ProfessionalSignUpStage
  isCurrentComplete: boolean
  disabled: boolean
  onSelect: (stage: ProfessionalSignUpStage) => void
}

export function SignUpProgress({
  currentStage,
  isCurrentComplete,
  disabled,
  onSelect,
}: SignUpProgressProps) {
  const currentIndex = PROFESSIONAL_SIGN_UP_STAGES.findIndex(({ stage }) => stage === currentStage)
  const completedCount = currentIndex + (isCurrentComplete ? 1 : 0)

  return (
    <nav aria-label="Sign up progress" className="flex flex-col gap-2 text-sm leading-[1.3]">
      <div className="flex justify-between gap-2">
        <p className="text-primary">
          Step {currentIndex + 1} of {PROFESSIONAL_SIGN_UP_STAGES.length}
        </p>
        <p className="text-muted-foreground">Getting started</p>
      </div>
      <ol className="grid grid-cols-3 gap-2">
        {PROFESSIONAL_SIGN_UP_STAGES.map(({ stage, label }, index) => (
          <li key={stage} className="group flex flex-col gap-2">
            <span
              aria-hidden="true"
              className={cn(
                "h-1.5 rounded-full transition-colors",
                index < completedCount ? "bg-support" : "bg-background"
              )}
            />
            <Button
              variant="link"
              disabled={disabled || index >= currentIndex}
              aria-current={index === currentIndex ? "step" : undefined}
              onClick={() => onSelect(stage)}
              className={cn(
                "h-auto border-0 p-0 text-sm leading-[1.3] font-normal group-first:self-start group-last:self-end disabled:opacity-100",
                index > currentIndex && "text-muted-foreground"
              )}
            >
              {label}
            </Button>
          </li>
        ))}
      </ol>
    </nav>
  )
}
