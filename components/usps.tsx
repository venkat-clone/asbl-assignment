const usps = [
  {
    title: "Trust & Transparency",
    desc: "Clear commitments, on-time handovers, and honest communication.",
  },
  {
    title: "Timely Delivery",
    desc: "Project timelines planned and tracked with rigor.",
  },
  {
    title: "RERA Approved",
    desc: "Compliance-first approach for every project.",
  },
  {
    title: "Construction Tech",
    desc: "Modern methods, QA checks, and robust materials.",
  },
]

export function USPs() {
  return (
    <section aria-labelledby="usp-title" className="bg-secondary">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 id="usp-title" className="text-pretty text-3xl font-semibold">
          Why Choose ASBL
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {usps.map((u) => (
            <div key={u.title} className="rounded-lg border border-border bg-card p-5">
              <div className="mb-3 inline-block rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
                {u.title}
              </div>
              <p className="text-foreground/80">{u.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
