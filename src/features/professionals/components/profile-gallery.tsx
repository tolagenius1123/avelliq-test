import Image from "next/image"

import type { ProfessionalGalleryImage } from "../types"

export function ProfileGallery({ images }: { images: ProfessionalGalleryImage[] }) {
  return (
    <ul aria-label="Photos" className="grid grid-cols-3 gap-2 @md:gap-3.5">
      {images.map(({ image, alt }) => (
        <li key={alt} className="relative aspect-[188/263] overflow-hidden rounded-[8px]">
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(min-width: 640px) 188px, 33vw"
            placeholder="blur"
            className="object-cover"
          />
        </li>
      ))}
    </ul>
  )
}
