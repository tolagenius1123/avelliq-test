"use client"

import { useState } from "react"

const INITIALLY_SAVED = ["grace-okafor"]

export function useSavedProfessionals() {
  const [savedIds, setSavedIds] = useState(INITIALLY_SAVED)

  return {
    isSaved: (id: string) => savedIds.includes(id),
    toggleSaved: (id: string) =>
      setSavedIds((current) =>
        current.includes(id) ? current.filter((savedId) => savedId !== id) : [...current, id]
      ),
  }
}
