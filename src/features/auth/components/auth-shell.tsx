import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

import type { AuthTagline } from "../types"
import { AuthShowcase } from "./auth-showcase"

interface AuthShellProps {
  tagline: AuthTagline
  footer: ReactNode
  children: ReactNode
}

const FORM_THEME_CLASS =
  "**:data-[slot=field-label]:text-ink-strong **:data-[slot=input]:h-11 **:data-[slot=input]:rounded-[6px] **:data-[slot=select-trigger]:rounded-[6px] **:data-[slot=select-trigger]:data-[size=default]:h-11"

export function AuthShell({ tagline, footer, children }: AuthShellProps) {
  return (
    <div className="flex min-h-dvh w-full bg-background">
      <aside className="sticky top-0 hidden h-dvh w-1/2 shrink-0 items-center justify-center p-5 lg:flex">
        <AuthShowcase tagline={tagline} />
      </aside>
      <main className="flex min-h-dvh w-full min-w-0 flex-col justify-between gap-10 bg-white px-5 py-8 sm:px-10 sm:py-10 lg:w-1/2 lg:px-20">
        <div className={cn("mx-auto flex w-full max-w-140 flex-col gap-6", FORM_THEME_CLASS)}>
          {children}
        </div>
        <footer className="mx-auto w-full max-w-140">{footer}</footer>
      </main>
    </div>
  )
}
