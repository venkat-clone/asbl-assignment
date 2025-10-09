const steps = [
  { title: "Design & Planning", desc: "Optimized layouts with structural diligence." },
  { title: "Materials & QA", desc: "Curated vendors, batch testing, and audits." },
  { title: "Execution", desc: "Modern techniques, safety protocols, and supervision." },
  { title: "Handover", desc: "Transparent documentation and walkthroughs." },
]

export function ConstructionTech() {
  return (
    <section aria-labelledby="tech-title" className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 id="tech-title" className="text-pretty text-3xl font-semibold">
          Construction Technology
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, idx) => (
            <article key={s.title} className="rounded-lg border border-border bg-card p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                {idx + 1}
              </div>
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-foreground/80">{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
