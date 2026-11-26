# Product Status

Last updated: 2026-11-25. Branch: `dev`.

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
| User Dashboard | In progress (mock data, no auth guard): overview (`/dashboard`), Find Care with profile panel (`/dashboard/find-care`) and booking flow (`/dashboard/find-care/[professionalId]/book`), My bookings (`/dashboard/bookings`), Booking details (`/dashboard/bookings/[bookingId]`) and Messages (`/dashboard/messages/[conversationId]`) done; Payment and Settings not started (no Figma frames seen yet) |
| Auth screens | Done (`/sign-in`, `/sign-up`; professional sign up is an account step plus three stages; Formik + Yup, simulated requests, no backend) |
| Real CTAs, backend | Partial (Sign In and Join as a Professional link to auth; other buttons still show "Coming soon") |

## Stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS v4
- shadcn/ui on Base UI (`components.json` style `base-vega`). Installed: accordion, alert-dialog, avatar, badge, button, calendar (react-day-picker), card, carousel, checkbox, dialog, dropdown-menu, field, input, input-group, label, pagination, popover, radio-group, scroll-area, select, separator, sheet, sidebar, skeleton, slider, tabs, textarea, tooltip
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
    form/                    TextInput, SelectInput, PillSearchInput, PillSelect (styled, usable without a form) and react-hook-form bound InputField, SelectField, TextareaField, CheckboxField built on a shared FormField (label, optional marker, description, error, aria wiring)
    layout/                  announcement-bar, site-header, header-actions, main-nav, mobile-nav (Sheet), logo, site-footer, newsletter-form, cta-banner
    shared/                  Section, SectionHeading (eyebrow or label, title, description, align), HeroTexture, SectionTitle, SectionDescription, EyebrowBadge, UnderlineTabs, PageNavigation, ListFooter, EmptyResults, PhotoCard, CarouselDots, CheckListItem, IconTile, StarRating, CirclePattern, ComingSoonButton
    motion/                  HeroMotion (intro-synced hero entrance), SmoothScroll, IntroOverlay, Reveal, RevealText, ImageReveal, Magnetic, CountUp
  features/
    home/                    components (one file per section plus hero-motion, how-it-works-motion, match-profile-card), data/content.ts
    services/                service-card, service-grid, services-heading, services-catalog, service-search, services-empty-state, service-gallery, service-detail (gallery dialog), service-insight + service-insight-dialog (card CTA modals, data/service-insights.ts), lib/filter-services, data, types
    trust-safety/            hero, framework, screening, safety-features (families and professionals), stats, guidelines, support, feature-card, data, types
    contact/                 hero, highlights, form section, contact-form (client), methods, faq preview, schema (zod), actions (server action), data, types
    faq/                     FaqAccordion (preview and list variants), hero, category nav and section, FAQ_CATEGORIES data (FAQS is the contact preview subset)
    dashboard/               shell (sidebar, header), DashboardPage and DashboardPageHeader (use on every dashboard screen), overview cards
    professionals/           shared professional model, PROFESSIONALS mock list, getProfessional, ProfessionalCard, ProfessionalPortrait, ProfileSheet
    find-care/               FindCare page (tabs, search form, filters form and mobile sheet, sort, pagination), search lib, useCareSearch
    bookings/                Booking model, mock bookings, in-memory booking store, pricing, useBookings (mock plus created, resolves statuses), My bookings page and list, Booking details, BookingSummary, WeekCardShell, saved cards
    booking-flow/            four-step wizard (schedule, care, payment, review) plus confirmation, useBookingFlow, schedule and summary helpers
    messages/                Conversation model (one per professional), mock conversations, in-memory message store, useConversations, inbox, conversation, care context, new message dialog
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
  - User Dashboard section: node `14483:1068` (overview `14501:5783`, Find Care `14550:5921`, profile panel `14579:4016`, booking steps `14624:7233`, `14625:7750`, `14625:8144`, `14625:8705`, `14625:9085`, Booking details `14625:9595`, My bookings `14682:4545`, Messages `14689:4665`, `14689:4880`, `14689:5086`)
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
- Find Care: Figma's first card says "Sarah Mitchell" but the panel it opens is Dr. Eneoma Adebayo (same photo and stats), so the code uses Eneoma for both. The panel's second location ("Boston, NA") and "France" were dropped. The mock user is now in New York to match Find Care
- Find Care results are mock data: six childcare professionals from Figma plus placeholders without photos (initials shown). Counts and pages are real, so they differ from Figma's 72. Care type filters come from each service's offerings. Only Eneoma has a full profile; the other panels skip sections without data. Saved professionals are kept in memory only
- Filters and search apply on submit (Figma has Apply and Search buttons). The date filter matches a professional's available weekdays. Request details and Post a Care Request show the Coming soon alert
- Booking flow: one Formik instance with a Yup schema per step (BOOKING_SCHEMAS). Nothing is stored in the browser, so a refresh restarts the flow, and created bookings live in memory until reload. Confirm is simulated (`simulateRequest`): no payment is taken
- Booking payment uses the saved card only (read-only fields). The security code is checked for format, held in memory and cleared on confirm. Use a payment provider's hosted fields before taking real cards. Figma has no add-card design
- Booking Figma copy that was sample data (Alex Morgan, Jamie, 123 Example Street) is shown as placeholders or replaced with the signed-in user. After confirmation the summary note reads "Paid with ..." instead of "You'll review everything before paying"
- Booking times run 6:00 AM to 10:00 PM in 30 minute slots, one hour minimum, from tomorrow, on the professional's available weekdays. The $10 service fee is from Figma. Times are wall-clock and labelled Eastern Time
- `/dashboard/find-care?professional=<id>` opens that profile panel
- My bookings: 17 mock bookings as in Figma, with dates relative to today, so counts shift as today's booking ends. Confirmed bookings become Completed once over; unanswered requests become Cancelled. References are AV-YYMMDD, with a suffix for a second booking on the same day
- My bookings Figma fixes: sidebar highlights My bookings (not Message), "19:00 AM" is 9:00 AM, duplicate rows are unique, upcoming rows really come first, and Reschedule is white because maroon on green is unreadable. Reschedule shows Coming soon
- Messages: sent messages, read and archived state live in memory until reload, and nobody replies. `/dashboard/messages` previews the latest conversation on wide screens without marking it read; phones show the inbox first. The linked booking is the next one with that professional, or the latest past one. Attach, voice and shared files show Coming soon. The info button opens a menu (profile, booking, archive) because Figma does not define it
- Payment wording comes from `describePayment`: pending bookings read "estimated, no charge yet" everywhere (Figma Messages), replacing "paid" on My bookings. Figma Messages also labels Grace's pending booking "Confirmed"; the code shows Awaiting
- Cancelled bookings still read "Paid", as in Figma; refund wording needs a product decision
- "Booking Details" was removed from the sidebar (missing in the newer Figma frames); it opens from My bookings, the dashboard and the confirmation
- shadcn tabs, slider, popover, calendar and pagination were added from the official GitHub source because ui.shadcn.com was unreachable; Slider has an extra `getThumbLabel` prop and SheetContent an `overlayClassName` prop
- Form inputs use the `stroke` border instead of Figma's near-invisible `sand` border for contrast
- The home gallery's service detail dialog (service-detail.tsx) has not been redesigned against Figma

## Next Steps

1. Dashboard: Payment and Settings need designs; Reschedule, Post a Care Request and Request details need flows
2. Decide whether the home gallery dialog (service-detail.tsx) should be replaced by the new service CTA modal or redesigned separately
3. Build the remaining page (Resources)
4. Wire `sendContactMessage` (src/features/contact/actions.ts) to a real delivery channel (email service or API); it only validates today
5. Replace "Coming soon" alerts with real routes or flows as they become available

## Working Agreements

- Follow `.claude/rules/rules.md` (no em-dashes, DRY, shadcn first, mobile first, minimal comments)
- Verify UI changes in the browser at phone, tablet and desktop widths before finishing
- End every change with a short one-line conventional commit message; the user commits and pushes
