import type { StaticImageData } from "next/image"

import facebookIcon from "@/assets/icons/social/facebook.svg"
import instagramIcon from "@/assets/icons/social/instagram.svg"
import linkedinIcon from "@/assets/icons/social/linkedin.svg"
import twitterIcon from "@/assets/icons/social/twitter.svg"
import youtubeIcon from "@/assets/icons/social/youtube.svg"

export interface NavItem {
  title: string
  href: string
  hasMenu?: boolean
}

export interface NavGroup {
  title: string
  items: NavItem[]
}

export interface SocialLink {
  label: string
  href: string
  icon: StaticImageData
}

export const siteConfig = {
  name: "Avelliq",
  description:
    "Connect with verified professionals for childcare, senior care, housekeeping, pet care, concierge services, and more.",
  contact: {
    email: "avelliqsupport@gmail.com",
    phone: "+224 7879 88 99",
    phoneHref: "tel:+22478798899",
    hours: "Mon–Fri 8am–8pm ET · Sat 9am–5pm ET",
  },
} as const

export const ROUTES = {
  home: "/",
  services: "/services",
  trustSafety: "/trust-safety",
  contact: "/contact",
  faqs: "/faqs",
  signIn: "/sign-in",
  signUp: "/sign-up",
  dashboard: "/dashboard",
} as const

export const MAIN_NAV: NavItem[] = [
  { title: "Home", href: ROUTES.home },
  { title: "Services", href: ROUTES.services },
  { title: "Trust & Safety", href: ROUTES.trustSafety },
  { title: "Resources", href: "#", hasMenu: true },
  { title: "Contact Us", href: ROUTES.contact },
  { title: "FAQs", href: ROUTES.faqs },
]

export const FOOTER_NAV: NavGroup[] = [
  {
    title: "About us",
    items: [
      { title: "Home", href: ROUTES.home },
      { title: "Services", href: ROUTES.services },
      { title: "How It Works", href: `${ROUTES.home}#how-it-works` },
      { title: "Resources", href: "#" },
      { title: "Contact Us", href: ROUTES.contact },
      { title: "FAQs", href: ROUTES.faqs },
    ],
  },
  {
    title: "Services",
    items: [
      { title: "Childcare", href: `${ROUTES.services}#childcare` },
      { title: "Housekeeping", href: `${ROUTES.services}#housekeeping` },
      { title: "House Sitters", href: `${ROUTES.services}#house-sitters` },
      { title: "Senior Care", href: `${ROUTES.services}#senior-care` },
      { title: "Concierge", href: `${ROUTES.services}#concierge` },
      { title: "Pet Care", href: `${ROUTES.services}#pet-care` },
    ],
  },
  {
    title: "Contact us",
    items: [
      { title: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
      { title: siteConfig.contact.phone, href: siteConfig.contact.phoneHref },
      { title: "Help center", href: ROUTES.contact },
      { title: "Terms and conditions", href: "#" },
    ],
  },
]

export const LEGAL_NAV: NavItem[] = [
  { title: "Terms and Conditions", href: "#" },
  { title: "Privacy Policy", href: "#" },
]

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "Facebook", href: "#", icon: facebookIcon },
  { label: "Twitter", href: "#", icon: twitterIcon },
  { label: "Instagram", href: "#", icon: instagramIcon },
  { label: "LinkedIn", href: "#", icon: linkedinIcon },
  { label: "YouTube", href: "#", icon: youtubeIcon },
]

export const ANNOUNCEMENT = {
  title: "LOREM IPSUM!",
  message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  ctaLabel: "Join as a Professional",
} as const
