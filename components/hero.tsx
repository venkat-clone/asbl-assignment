"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function Hero() {
  const router = useRouter()
  return (
    <section className="relative flex min-h-[70vh] items-center" aria-label="Hero" id="hero">
      <div
        className="absolute inset-0 bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('/luxury-real-estate-tower-at-sunset.jpg')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-background/60" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-16 md:py-24">
        <span className="inline-block rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground w-max">
          RERA Approved • Timely Delivery
        </span>
        <h1 className="text-balance text-4xl font-semibold leading-tight text-foreground md:text-5xl">
          We Build What You Imagine
        </h1>
        <p className="max-w-2xl text-lg text-foreground/80">
          Luxury residences crafted with precision, technology, and trust.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => {
              typeof window !== "undefined" &&
                (window as any).dataLayer?.push({ event: "cta_click", cta: "explore_projects" })
              router.push("#projects")
            }}
          >
            Explore Projects
          </Button>
          <Button
            variant="outline"
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
            onClick={() => {
              typeof window !== "undefined" &&
                (window as any).dataLayer?.push({ event: "cta_click", cta: "enquire_now" })
              router.push("#enquire")
            }}
          >
            Enquire Now
          </Button>
        </div>
      </div>
    </section>
  )
}
