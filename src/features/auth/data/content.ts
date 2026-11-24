import type { StaticImageData } from "next/image"

import slide1 from "@/assets/images/auth/auth-slide-1.webp"
import slide2 from "@/assets/images/auth/auth-slide-2.webp"
import slide3 from "@/assets/images/auth/auth-slide-3.webp"
import slide4 from "@/assets/images/auth/auth-slide-4.webp"
import slide5 from "@/assets/images/auth/auth-slide-5.webp"
import slide6 from "@/assets/images/auth/auth-slide-6.webp"
import { LEGAL_NAV, ROUTES } from "@/config/site"

import type {
  AuthMode,
  AuthRole,
  AuthScreenContent,
  AuthTagline,
  ProfessionalSignUpStage,
} from "../types"

export const AUTH_SLIDES: { image: StaticImageData; alt: string }[] = [
  { image: slide1, alt: "A caregiver and a mother laughing with a young boy at home" },
  { image: slide2, alt: "A housekeeper arranging pillows on a freshly made bed" },
  { image: slide3, alt: "A dog walker out with a large dog on a snowy street" },
  { image: slide4, alt: "A concierge assistant on a phone call while working on a laptop" },
  { image: slide5, alt: "A caregiver sharing a warm moment with an older woman" },
  { image: slide6, alt: "Two household helpers in aprons caring for houseplants at home" },
]

const CLIENT_TAGLINE: AuthTagline = {
  title: "Find Trusted Care for Your Daily Needs",
  description: "Connect with verified professionals near you.",
}

export const AUTH_CONTENT: Record<AuthMode, Record<AuthRole, AuthScreenContent>> = {
  "sign-up": {
    client: {
      title: "Create Your Account",
      description: "Join thousands of families finding trusted care professionals on Avelliq.",
      tagline: CLIENT_TAGLINE,
    },
    professional: {
      title: "Create Your Professional Account",
      description: "Join our network of verified care professionals across the US.",
      tagline: {
        title: "Build Your Care Career with Avelliq",
        description: "Join a trusted platform connecting you with families who need your skills.",
      },
    },
  },
  "sign-in": {
    client: {
      title: "Sign In to Your Account",
      description: "Welcome back! Enter your credentials to continue.",
      tagline: CLIENT_TAGLINE,
    },
    professional: {
      title: "Sign In to Your Account",
      description: "Welcome back! Access your dashboard and bookings.",
      tagline: {
        title: "Welcome to Avelliq",
        description: "Access your dashboard and manage household care seamlessly.",
      },
    },
  },
}

export const AUTH_ROLE_TABS: { role: AuthRole; label: string }[] = [
  { role: "client", label: "I'm looking for care" },
  { role: "professional", label: "I'm a Professional" },
]

export const AUTH_ROUTES: Record<AuthMode, string> = {
  "sign-in": ROUTES.signIn,
  "sign-up": ROUTES.signUp,
}

export const SIGN_IN_REDIRECTS: Record<AuthRole, string> = {
  client: ROUTES.dashboard,
  professional: ROUTES.home,
}

export const PROFESSIONAL_SIGN_UP_STAGES: { stage: ProfessionalSignUpStage; label: string }[] = [
  { stage: "personal", label: "Personal" },
  { stage: "professional", label: "Professional" },
  { stage: "security", label: "Security" },
]

const legalHref = (title: string) => LEGAL_NAV.find((item) => item.title === title)?.href ?? "#"

export const TERMS_HREF = legalHref("Terms and Conditions")
export const PRIVACY_HREF = legalHref("Privacy Policy")
