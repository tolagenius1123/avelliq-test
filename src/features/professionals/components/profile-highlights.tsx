import { CircleStar, Heart, HeartOff, User, type LucideIcon } from "lucide-react"

import type { ProfessionalProfile } from "../types"

type HighlightKey = "about" | "likes" | "dislikes" | "pitch"

const HIGHLIGHTS: { key: HighlightKey; title: string; icon: LucideIcon }[] = [
  { key: "about", title: "About", icon: User },
  { key: "likes", title: "Likes", icon: Heart },
  { key: "dislikes", title: "Dislikes", icon: HeartOff },
  { key: "pitch", title: "Why you should book me", icon: CircleStar },
]

export function ProfileHighlights({ profile }: { profile: ProfessionalProfile }) {
  return (
    <ul className="flex flex-col gap-6">
      {HIGHLIGHTS.map(({ key, title, icon: Icon }) => (
        <li key={key} className="flex gap-4">
          <span className="flex size-13 shrink-0 items-center justify-center rounded-full bg-background text-support">
            <Icon aria-hidden="true" strokeWidth={1.25} className="size-6" />
          </span>
          <div className="flex flex-col leading-[1.3]">
            <h3 className="text-base font-medium text-ink">{title}</h3>
            <p className="text-sm text-ink-body">{profile[key]}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
