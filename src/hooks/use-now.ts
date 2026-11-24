"use client"

import { useMemo, useSyncExternalStore } from "react"

const MINUTE_MS = 60_000
const POLL_INTERVAL_MS = 15_000

function subscribe(onChange: () => void) {
  const interval = window.setInterval(onChange, POLL_INTERVAL_MS)
  return () => window.clearInterval(interval)
}

const getCurrentMinute = () => Math.floor(Date.now() / MINUTE_MS) * MINUTE_MS

const getServerSnapshot = () => null

/** Returns null during server rendering and hydration because the visitor's time zone is unknown. */
export function useNow() {
  const timestamp = useSyncExternalStore<number | null>(
    subscribe,
    getCurrentMinute,
    getServerSnapshot
  )

  return useMemo(() => (timestamp === null ? null : new Date(timestamp)), [timestamp])
}
