"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 border-b border-border transition-colors ${
        scrolled ? "bg-card/80 backdrop-blur" : "bg-transparent"
      }`}
      role="banner"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="#" className="inline-flex items-center gap-2">
          <img src="/placeholder-logo.svg" alt="ASBL logo" className="h-6 w-6" />
          <span className="font-semibold tracking-wide">ASBL</span>
        </Link>
        <nav className="hidden items-center gap-4 md:flex" aria-label="Primary">
          {[
            { href: "#about", label: "About" },
            { href: "#projects", label: "Projects" },
            { href: "#usp", label: "Why ASBL" },
            { href: "#tech", label: "Technology" },
            { href: "#reviews", label: "Testimonials" },
            { href: "#gallery", label: "Gallery" },
            { href: "#map", label: "Locations" },
          ].map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-foreground/80 hover:text-foreground">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() =>
              typeof window !== "undefined" &&
              (window as any).dataLayer?.push({ event: "cta_click", cta: "enquire_header" })
            }
          >
            <a href="#enquire">Enquire Now</a>
          </Button>
        </div>
      </div>
    </header>
  )
}
