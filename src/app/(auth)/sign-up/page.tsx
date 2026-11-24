import type { Metadata } from "next"

import { AuthEntry } from "@/features/auth/components/auth-entry"
import { AuthScreen } from "@/features/auth/components/auth-screen"
import { ClientSignUpForm } from "@/features/auth/components/client-sign-up-form"
import { ProfessionalSignUpForm } from "@/features/auth/components/professional-sign-up-form"
import { parseAuthRole } from "@/features/auth/utils"

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create an Avelliq account to find trusted care or join as a verified professional.",
}

export default async function SignUpPage({ searchParams }: PageProps<"/sign-up">) {
  const role = parseAuthRole((await searchParams).role)

  return (
    <AuthScreen mode="sign-up" role={role}>
      {role === "professional" ? (
        <ProfessionalSignUpForm />
      ) : (
        <AuthEntry mode="sign-up" role={role}>
          <ClientSignUpForm />
        </AuthEntry>
      )}
    </AuthScreen>
  )
}
