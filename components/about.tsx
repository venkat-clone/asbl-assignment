export function About() {
  return (
    <section className="bg-background" aria-labelledby="about-title">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <div className="space-y-4">
            <h2 id="about-title" className="text-pretty text-3xl font-semibold">
              About ASBL
            </h2>
            <p className="leading-relaxed text-foreground/80">
              We are a luxury real estate developer focused on building premium residences with meticulous attention to
              detail, robust construction technology, and transparent delivery.
            </p>
            <p className="leading-relaxed text-foreground/80">
              Our mission is to deliver homes that blend elegance, comfort, and long-term reliability.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <BadgeStat label="Years in Business" value="12+" />
              <BadgeStat label="Projects Delivered" value="18" />
              <BadgeStat label="Clients Served" value="5,000+" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/premium-lobby-interior.jpg"
              alt="Premium lobby interior"
              className="h-full w-full rounded-lg border border-border object-cover"
            />
            <img
              src="/construction-quality-closeup.jpg"
              alt="Construction quality close-up"
              className="h-full w-full rounded-lg border border-border object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function BadgeStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-card px-4 py-3">
      <div className="text-sm text-foreground/70">{label}</div>
      <div className="text-xl font-semibold text-foreground">{value}</div>
    </div>
  )
}
