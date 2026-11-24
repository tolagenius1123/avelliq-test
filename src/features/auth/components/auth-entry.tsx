import type { ReactNode } from "react"

import type { AuthMode, AuthRole } from "../types"
import { AuthRoleTabs } from "./auth-role-tabs"
import { AuthSocialSection } from "./auth-social-section"

interface AuthEntryProps {
  mode: AuthMode
  role: AuthRole
  children: ReactNode
}

export function AuthEntry({ mode, role, children }: AuthEntryProps) {
  return (
    <>
      <AuthRoleTabs mode={mode} activeRole={role} />
      {children}
      <AuthSocialSection />
    </>
  )
}
