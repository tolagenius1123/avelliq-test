export type AuthMode = "sign-in" | "sign-up"

export type AuthRole = "client" | "professional"

export interface AuthTagline {
  title: string
  description: string
}

export interface AuthScreenContent {
  title: string
  description: string
  tagline: AuthTagline
}

export type ProfessionalSignUpStage = "personal" | "professional" | "security"

export type ProfessionalSignUpStep = "account" | ProfessionalSignUpStage
