import type { Metadata } from "next"

import { AuthEntry } from "@/features/auth/components/auth-entry"
import { AuthScreen } from "@/features/auth/components/auth-screen"
import { SignInForm } from "@/features/auth/components/sign-in-form"
import { parseAuthRole } from "@/features/auth/utils"

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Avelliq account to manage care, bookings and messages.",
}

export default async function SignInPage({ searchParams }: PageProps<"/sign-in">) {
  const role = parseAuthRole((await searchParams).role)

  return (
    <AuthScreen mode="sign-in" role={role}>
      <AuthEntry mode="sign-in" role={role}>
        <SignInForm role={role} />
      </AuthEntry>
    </AuthScreen>
  )
}
