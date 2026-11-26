import Image from "next/image"

import type { ProfessionalInterest } from "../types"

export function ProfileInterests({ interests }: { interests: ProfessionalInterest[] }) {
  return (
    <ul aria-label="Interests" className="flex justify-between gap-2">
      {interests.map(({ label, image }) => (
        <li key={label} className="flex min-w-0 max-w-20.5 flex-1 flex-col items-center gap-2 @md:gap-3">
          <Image src={image} alt="" width={82} height={82} className="aspect-square w-full" />
          <span className="font-inter text-xs leading-[1.3] text-ink @md:text-sm">{label}</span>
        </li>
      ))}
    </ul>
  )
}
