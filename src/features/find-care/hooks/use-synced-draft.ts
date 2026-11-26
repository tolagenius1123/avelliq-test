"use client"

import { useState } from "react"

/** Local edits to an applied value that restart whenever the applied value changes, without remounting. */
export function useSyncedDraft<T extends object>(applied: T) {
  const [draft, setDraft] = useState(applied)
  const [syncedWith, setSyncedWith] = useState(applied)

  if (applied !== syncedWith) {
    setSyncedWith(applied)
    setDraft(applied)
  }

  const updateDraft = (changes: Partial<T>) => setDraft((current) => ({ ...current, ...changes }))

  return { draft, setDraft, updateDraft }
}
