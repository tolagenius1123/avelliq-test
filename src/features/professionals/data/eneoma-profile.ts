import gallery1 from "@/assets/images/professionals/eneoma/gallery-1.jpg"
import gallery2 from "@/assets/images/professionals/eneoma/gallery-2.jpg"
import gallery3 from "@/assets/images/professionals/eneoma/gallery-3.jpg"
import artImage from "@/assets/images/professionals/eneoma/interest-art.png"
import homeImage from "@/assets/images/professionals/eneoma/interest-home.png"
import readingImage from "@/assets/images/professionals/eneoma/interest-reading.png"
import researchImage from "@/assets/images/professionals/eneoma/interest-research.png"
import teachingImage from "@/assets/images/professionals/eneoma/interest-teaching.png"
import richFedlin from "@/assets/images/professionals/eneoma/reviewer-rich-fedlin.png"

import type { ProfessionalProfile } from "../types"

export const ENEOMA_PROFILE: ProfessionalProfile = {
  headline: "Professor | Researcher | Educator",
  tagline: "Ideas. People. A better tomorrow",
  about: "38 years old, corporate professional. Works long hours and travels often.",
  likes: "Fitness, good food, travel, productivity tools, technology, luxury hotels, fine dining.",
  dislikes: "Inefficiency, poor communication, last-minute cancellation, average service.",
  pitch:
    "I'm a dependable, vetted professional who helps with home management, allowing you to focus on what's most important to you.",
  interests: [
    { label: "Research", image: researchImage },
    { label: "Teaching", image: teachingImage },
    { label: "Reading", image: readingImage },
    { label: "Home", image: homeImage },
    { label: "Art", image: artImage },
  ],
  gallery: [
    { image: gallery1, alt: "Reading a magazine over coffee and a croissant" },
    { image: gallery2, alt: "Sitting beside a fireplace in a lounge" },
    { image: gallery3, alt: "Speaking with a colleague in a full lecture hall" },
  ],
  reviews: [
    {
      id: "review-1",
      author: "Rich Fedlin",
      avatar: richFedlin,
      date: new Date(2026, 9, 12),
      rating: 5,
      quote: "The process was simple with Avelliq. Eneoma did a great job with the kids.",
    },
    {
      id: "review-2",
      author: "Dana Whitfield",
      date: new Date(2026, 8, 28),
      rating: 5,
      quote: "Punctual, warm and well prepared. Homework was done before we got home.",
    },
    {
      id: "review-3",
      author: "Marcus Lee",
      date: new Date(2026, 8, 3),
      rating: 5,
      quote: "Clear communication from the first message. We would happily book again.",
    },
  ],
}
