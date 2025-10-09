"use client"

import { useEffect } from "react"

export function AnalyticsTracker() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("main section[id]")) as HTMLElement[]
    const seen = new Set<string>()
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.target.id && !seen.has(e.target.id)) {
            seen.add(e.target.id)
            ;(window as any).dataLayer?.push({ event: "section_view", section_id: e.target.id })
          }
        })
      },
      { rootMargin: "0px 0px -30% 0px", threshold: 0.25 },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  return null
}
