import { Shield } from "lucide-react"

import { ComingSoonButton } from "@/components/shared/coming-soon-button"

import { ProfileSectionTitle } from "./profile-section-title"

const CREDENTIALS = ["CPR & first aid", "Background check"]

export function ProfileQualifications({ isVerified }: { isVerified: boolean }) {
  return (
    <section className="flex flex-col gap-2">
      <ProfileSectionTitle>Qualifications & trust</ProfileSectionTitle>
      {isVerified && (
        <div className="flex gap-3 rounded-[12px] bg-mint px-4 py-2.5 text-sm leading-[1.3]">
          <Shield aria-hidden="true" strokeWidth={1.5} className="size-6 shrink-0 text-ink-strong" />
          <div className="flex flex-col gap-1">
            <p className="text-primary">Verified professional</p>
            <p className="text-muted-foreground">Look for supporting documents before booking.</p>
          </div>
        </div>
      )}
      <ul className="grid grid-cols-2 gap-4 text-sm leading-[1.3]">
        {CREDENTIALS.map((credential) => (
          <li key={credential} className="flex flex-col items-start gap-1.5">
            <p className="text-ink-strong">{credential}</p>
            <ComingSoonButton
              variant="link"
              aria-label={`Request ${credential} details`}
              className="relative h-auto p-0 font-normal text-support after:absolute after:-inset-x-2 after:-inset-y-3"
            >
              Request details
            </ComingSoonButton>
          </li>
        ))}
      </ul>
    </section>
  )
}
