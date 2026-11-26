import { ROUTES } from "@/config/site"

export const profileHref = (id: string) => `${ROUTES.findCare}?professional=${id}`

export const bookingHref = (id: string) => `${ROUTES.findCare}/${id}/book`
