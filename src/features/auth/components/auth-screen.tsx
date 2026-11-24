import type { ReactNode } from "react"

import { AUTH_CONTENT } from "../data/content"
import type { AuthMode, AuthRole } from "../types"
import { AuthHeader } from "./auth-header"
import { AuthShell } from "./auth-shell"
import { AuthSwitchPrompt } from "./auth-switch-prompt"

interface AuthScreenProps {
  mode: AuthMode
  role: AuthRole
  children: ReactNode
}

export function AuthScreen({ mode, role, children }: AuthScreenProps) {
  const { title, description, tagline } = AUTH_CONTENT[mode][role]

  return (
    <AuthShell tagline={tagline} footer={<AuthSwitchPrompt mode={mode} role={role} />}>
      <AuthHeader title={title} description={description} />
      {children}
    </AuthShell>
  )
}
