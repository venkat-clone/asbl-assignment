function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-1" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-accent"
          aria-hidden="true"
        >
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  )
}

const reviews = [
  {
    name: "Sanjana R.",
    location: "Gachibowli",
    text: "Smooth experience from booking to handover. Quality is excellent.",
  },
  {
    name: "Arun K.",
    location: "Financial District",
    text: "Layouts are practical and premium. Amenities are thoughtfully planned.",
  },
  { name: "Meera D.", location: "Kokapet", text: "Timely communication and transparent process. Highly recommend." },
]

export function Testimonials() {
  return (
    <section aria-labelledby="reviews-title" className="bg-secondary">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 id="reviews-title" className="text-pretty text-3xl font-semibold">
          Testimonials
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.name} className="rounded-lg border border-border bg-card p-5">
              <Stars />
              <blockquote className="mt-3 text-foreground/80">“{r.text}”</blockquote>
              <figcaption className="mt-3 text-sm text-foreground/70">
                {r.name} • {r.location}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
