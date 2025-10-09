"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [captchaVerified, setCaptchaVerified] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSuccess(null)
    setError(null)

    const form = e.currentTarget
    const formData = new FormData(form)
    const payload = Object.fromEntries(formData.entries())

    // Basic validation
    if (!payload.fullName || !payload.email || !payload.phone || !payload.project) {
      setError("Please fill in all required fields.")
      return
    }
    if (!captchaVerified) {
      setError("Please complete the verification.")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error("Failed to submit")
      setSuccess("Your enquiry has been submitted. Our team will contact you shortly.")
      if (typeof window !== "undefined") {
        ;(window as any).dataLayer?.push({
          event: "enquiry_submitted",
          project: payload.project,
        })
      }
      form.reset()
      setCaptchaVerified(false)
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="enquire" aria-labelledby="enquire-title" className="bg-secondary">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h2 id="enquire-title" className="text-pretty text-3xl font-semibold">
          Contact / Enquiry
        </h2>
        <p className="mt-2 text-foreground/80">Share your details and we’ll get back to you.</p>

        <form onSubmit={onSubmit} className="mt-8 grid gap-4 rounded-lg border border-border bg-card p-6">
          {/* Honeypot anti-bot field */}
          <input type="text" name="company" className="sr-only" tabIndex={-1} autoComplete="off" aria-hidden="true" />

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <label htmlFor="fullName" className="text-sm">
                Full Name
              </label>
              <Input id="fullName" name="fullName" placeholder="Your full name" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <Input id="email" type="email" name="email" placeholder="you@example.com" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <label htmlFor="phone" className="text-sm">
                Phone Number
              </label>
              <Input id="phone" name="phone" placeholder="+91 98xxxxxxx" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm">Project Interested In</label>
              <Select name="project">
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select a project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ASBL Broadway">ASBL Broadway</SelectItem>
                  <SelectItem value="ASBL Spectra">ASBL Spectra</SelectItem>
                  <SelectItem value="ASBL Icon">ASBL Icon</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <label htmlFor="message" className="text-sm">
              Message
            </label>
            <Textarea id="message" name="message" placeholder="Tell us more..." rows={4} />
          </div>

          {/* reCAPTCHA placeholder (demo) */}
          <div className="flex items-center justify-between rounded-md border border-border bg-muted p-3">
            <div>
              <div className="text-sm font-medium">Verification</div>
              <p className="text-sm text-foreground/70">Click verify to simulate reCAPTCHA in preview.</p>
            </div>
            <Button
              type="button"
              variant={captchaVerified ? "default" : "outline"}
              className={
                captchaVerified
                  ? "bg-primary text-primary-foreground"
                  : "border-accent text-accent hover:bg-accent hover:text-accent-foreground"
              }
              onClick={() => setCaptchaVerified(true)}
            >
              {captchaVerified ? "Verified" : "Verify"}
            </Button>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}
          {success && <p className="text-sm text-primary">{success}</p>}

          <Button disabled={loading} className="bg-primary text-primary-foreground hover:bg-primary/90">
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>
    </section>
  )
}
