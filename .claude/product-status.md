# Product Status

Last updated: 2026-11-24. Branch: `dev`.

Read `.claude/rules/rules.md` before starting any task. Those rules are mandatory.

## Summary

| Area | Status |
|---|---|
| Architecture restructure | Done (`d7369b9`) |
| Home page, new Figma design | Done (`e5224a9`) |
| Home page animations (Awwwards style) | Done (`2edf050`) |
| Services page, new Figma design | Done (hero with live search, six-card grid, service CTA modals) |
| Trust & Safety page, new Figma design | Done (`/trust-safety`) |
| Contact Us page, new Figma design | Done (`/contact`, validated form, FAQ preview) |
| FAQs page, new Figma design | Done (`/faqs`, hero illustration, category tabs, four FAQ categories) |
| Remaining pages (Resources) | Not started |
| User Dashboard | Done (`/dashboard`, overview page only, mock data, no auth guard) |
| Auth screens | Done (`/sign-in`, `/sign-up`; professional sign up is an account step plus three stages; Formik + Yup, simulated requests, no backend) |
| Real CTAs, backend | Partial (Sign In and Join as a Professional link to auth; other buttons still show "Coming soon") |

## Stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS v4
- shadcn/ui on Base UI (`components.json` style `base-vega`). Installed: accordion, avatar, badge, button, card, carousel, checkbox, dialog, dropdown-menu, field, input, input-group, label, scroll-area, select, separator, sheet, sidebar, skeleton, textarea, tooltip
- Forms: react-hook-form + zod (`@hookform/resolvers`), reusable fields in `src/components/form`
- Embla Carousel with `embla-carousel-autoplay`
- GSAP 3 (ScrollTrigger, SplitText, `@gsap/react`) and Lenis smooth scroll
- Fonts via `next/font`: Playfair Display (`font-heading`), Montserrat (`font-sans`), Inter (`font-inter`)

## Project Structure

```
src/
  app/
    layout.tsx               root: fonts, metadata template "%s - Avelliq"
    globals.css              theme tokens, Lenis CSS, SplitText mask spacing, intro fallback keyframes
    (marketing)/
      layout.tsx             SmoothScroll > IntroOverlay, AnnouncementBar, SiteHeader, main, CtaBanner, SiteFooter
      page.tsx               home page (composes feature sections)
      services/page.tsx      services page (ServicesCatalog: hero, live search, card grid)
      trust-safety/page.tsx  trust & safety page (hero, framework, screening, safety features, stats, guidelines, support)
      contact/page.tsx       contact page (hero, highlights strip, contact form, contact methods, FAQ preview)
      faqs/page.tsx          FAQs page (hero, category tab strip, one section per FAQ category)
  components/
    ui/                      shadcn primitives only (button has custom variants and sizes)
    form/                    TextInput, SelectInput (styled, usable without a form) and react-hook-form bound InputField, SelectField, TextareaField, CheckboxField built on a shared FormField (label, optional marker, description, error, aria wiring)
    layout/                  announcement-bar, site-header, header-actions, main-nav, mobile-nav (Sheet), logo, site-footer, newsletter-form, cta-banner
    shared/                  Section, SectionHeading (eyebrow or label, title, description, align), HeroTexture, SectionTitle, SectionDescription, EyebrowBadge, PhotoCard, CarouselDots, CheckListItem, IconTile, StarRating, CirclePattern, ComingSoonButton
    motion/                  HeroMotion (intro-synced hero entrance), SmoothScroll, IntroOverlay, Reveal, RevealText, ImageReveal, Magnetic, CountUp
  features/
    home/                    components (one file per section plus hero-motion, how-it-works-motion, match-profile-card), data/content.ts
    services/                service-card, service-grid, services-heading, services-catalog, service-search, services-empty-state, service-gallery, service-detail (gallery dialog), service-insight + service-insight-dialog (card CTA modals, data/service-insights.ts), lib/filter-services, data, types
    trust-safety/            hero, framework, screening, safety-features (families and professionals), stats, guidelines, support, feature-card, data, types
    contact/                 hero, highlights, form section, contact-form (client), methods, faq preview, schema (zod), actions (server action), data, types
    faq/                     FaqAccordion (preview and list variants), hero, category nav and section, FAQ_CATEGORIES data (FAQS is the contact preview subset)
    testimonials/            section, carousel, card, data, types
  config/site.ts             site config, ROUTES, MAIN_NAV, FOOTER_NAV, LEGAL_NAV, SOCIAL_LINKS, ANNOUNCEMENT
  hooks/                     use-autoplay, use-carousel-index, use-scroll-lock
  lib/                       utils (cn, getInitials, slugify), gsap (plugin registration), motion (media queries, reveal trigger, intro state, pin helpers)
  assets/
    images/                  home/, services/cards, services/gallery, services/* (dialog images), testimonials/, textures/
    icons/                   Figma SVG icons, social/
    patterns/                circle pattern SVGs
```

## Design System

- Figma file: `https://www.figma.com/design/dVxdWlGsVpYkiB0j8zRASf/Avelliq`
  - Home page frame: node `14148:1346`
  - Hero images: node `14152:3648`
  - Services page frame: node `13620:85`
  - Service CTA modals: `14458:5084` (childcare), `13943:5890` (housekeeping), `13943:5967` (house sitters), `13943:6044` (senior care), `13944:5889` (concierge), `13944:5975` (pet care)
  - Trust & Safety page frame: node `13738:3382`
  - Contact Us page frame: node `13819:2849`
  - FAQs page frame: node `13745:4944`
  - Sign up and sign in section: node `13980:2110`
  - User Dashboard section: node `14483:1068` (overview page: `14501:5783`)
- Use the Figma MCP (`get_design_context`) and follow the `figma-design-to-code` skill. Download assets locally, compress large photos with `sips` (resize, JPEG quality 80).
- Theme tokens live in `src/app/globals.css`:
  - shadcn tokens: `background` #F5F2E8, `foreground` #111827, `primary` #4C5A3D, `secondary`/`muted` #F5EFE6, `muted-foreground` #5F6B67, `border` #D2CEC3
  - Extra tokens: `support` #50160D, `sand`, `mint`, `sage`, `tan`, `ink`, `ink-strong`, `ink-soft`, `stroke`, `stroke-muted`, `stroke-subtle`, `footer-muted`, `gold`
- Button (`src/components/ui/button.tsx`): variants `default`, `outline`, `outline-primary`, `light`, `white`, plus shadcn defaults; sizes `pill-lg` (48px, 16px text), `pill` (48px, 14px text), `pill-sm` (36px)
- Layout gutter: `Section` uses `px-5 py-17.5 sm:px-10 lg:px-17.5` (70px at desktop, content width 1300 at 1440)

## Home Page

Sections in order: AnnouncementBar, header, Hero (carousel plus five category cards), TrustHighlights, ServicesPreview (circle pattern), Professionals, HowItWorks, Safety, ServiceGallery, Agencies, Match (profile card plus match factors), Testimonials, CtaBanner, footer.

Responsive behaviour:
- Header nav and actions show at `xl` (1280px); below that a Sheet menu opens from the hamburger
- Hero and How It Works switch to two columns at `xl`; Professionals cards go to three columns at `lg`; Match goes to two columns at `lg` and three at `xl`
- Verified at 375, 768, 1024 and 1440px with no horizontal overflow

Carousels:
- Hero, gallery and testimonials autoplay (4s, pause on hover, disabled for reduced motion) via `useAutoplay`
- Gallery on desktop (1024px and up, motion allowed) is a pinned, scroll-driven horizontal track; Embla and autoplay are disabled at that breakpoint. Mobile keeps the autoplay carousel

## Animation System

- All media queries and shared settings are in `src/lib/motion.ts`: `MOTION_OK`, `DESKTOP_MOTION`, `WIDE_MOTION`, `FINE_POINTER_MOTION`, `REVEAL_TRIGGER`
- Always use `REVEAL_TRIGGER` for scroll reveals. It uses `toggleActions: "play complete none none"` so fast flicks never leave content invisible
- `SmoothScroll` refreshes ScrollTrigger on body resize and `document.fonts.ready`; needed because font loading re-wraps headings on mobile
- `SectionTitle` reveals line by line automatically; `SectionDescription` and `EyebrowBadge` fade up (pass `animate={false}` to opt out)
- Intro overlay plays once per session (`sessionStorage`), locks Lenis, and dispatches an intro-complete event that the hero waits for; a CSS fallback hides it after 3s
- Use `useScrollLock` for any dialog or sheet (stops Lenis), and add `data-lenis-prevent` to scrollable overlay content
- Sections stay server components; only the thin motion wrappers are client components
- Reduced motion: no intro, no Lenis, no pins, content renders static

## Known Placeholders and Decisions

- Announcement bar copy is lorem ipsum from Figma (`ANNOUNCEMENT` in `src/config/site.ts`)
- Testimonial quotes mention "Nestora" (likely an old brand name), kept as in the design
- Match card shows two stars next to "4.9", matching Figma
- Services page search filters cards client side by title, description and offerings; the Figma search field has no spec beyond its look
- Figma typos not copied: House Sitters CTA reads "Explore House-keeping" and Pet Care reuses the Concierge description
- Service card "Explore" CTAs (services page and home preview) open the service CTA modals. Figma copy had em-dashes, rewritten with commas and colons. The statistics and social proof numbers come straight from Figma and are unverified marketing claims
- Modal "Find a ... Professional" buttons open the "Tell us what you need" care request form (node `13972:2015`) in the same dialog. The same form is used for every service, with the service preselected. "Continue to Sign Up" saves the answers to sessionStorage (`avelliq:care-request`) and goes to `/sign-up`; nothing reads them yet. "Learn more about our screening process" links to `/trust-safety#screening`
- Generic icons (chevrons, arrows, check, user) use lucide; brand icons are Figma SVGs. Trust & Safety Feather-style icons map to lucide equivalents; the hugeicons customer-support icon is a local SVG
- Trust & Safety CTAs (File Safety Report, Speak to Trust Agent) show the Coming soon alert until support flows exist
- Contact form validates on the client and again in the server action, then shows a success state, but nothing is delivered yet
- Contact page uses `siteConfig.contact` for email, phone and hours instead of the mismatched Figma values (Avelliq@gmail.com, support@avelliq.com, +1 (800) 555-CARE)
- Contact topics are placeholder copy written in code; Figma had none. The contact FAQ preview reuses the approved FAQ copy
- FAQs page answers use the approved client copy (updated 2026-11-18). Figma's "Nestora" mentions were changed to Avelliq
- FAQ hero illustration (`assets/images/faq/faq-illustration.svg`) was merged from the Figma layer SVGs because the file has no export access for this account
- Professional sign up (`useProfessionalSignUp`) keeps all values in one Formik instance and swaps the Yup schema per step. "Verify Email & Continue" is simulated: no email is sent. Values are held in memory only because they include SSN digits, so a refresh restarts the flow
- Figma has no designs for email verification, Forgot Password or Care Agency sign up. Forgot Password and Google show the Coming soon alert, and the Care Agency tab is disabled
- Hero category photos: Figma's Lifestyle assistant and Pet Care bitmaps are pre-stretched (2:3 and 3:2) and squeezed back by a fill-mode fill, so the local files are resampled to the 244:215 card ratio. Re-exporting the raw bitmaps brings the distortion back
- Dashboard: shell lives in `src/app/(dashboard)/layout.tsx` (shadcn Sidebar, drawer below 768px). Layouts use container queries because the sidebar changes the available width. Dates come from `useNow` (null on the server, so skeletons render first); bookings in `data/mock.ts` are relative to today
- Dashboard nav items without a page show the Coming soon alert. Logout links to `/sign-in` because there is no session yet. Client sign in redirects to `/dashboard`; professional sign in goes to the home page until a professional dashboard exists
- Figma's dashboard greets "Sarah" while the header shows "Keylla Rose", and the week card names "Emily" for the booking shown with Dr. Eneoma Adebayo. The code uses one user (Keylla Rose) and one bookings list
- Form inputs use the `stroke` border instead of Figma's near-invisible `sand` border for contrast
- The home gallery's service detail dialog (service-detail.tsx) has not been redesigned against Figma

## Next Steps

1. Decide whether the home gallery dialog (service-detail.tsx) should be replaced by the new service CTA modal or redesigned separately
2. Build the remaining page (Resources)
3. Wire `sendContactMessage` (src/features/contact/actions.ts) to a real delivery channel (email service or API); it only validates today
4. Replace "Coming soon" alerts with real routes or flows as they become available

## Working Agreements

- Follow `.claude/rules/rules.md` (no em-dashes, DRY, shadcn first, mobile first, minimal comments)
- Verify UI changes in the browser at phone, tablet and desktop widths before finishing
- End every change with a short one-line conventional commit message; the user commits and pushes
