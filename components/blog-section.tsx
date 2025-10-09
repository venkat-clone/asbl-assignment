import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const posts = [
  {
    title: "How to Evaluate Construction Quality",
    excerpt: "A quick checklist to assess materials, methods, and QA practices.",
  },
  { title: "Why RERA Matters for Homebuyers", excerpt: "Understanding compliance and your rights as a buyer." },
  { title: "Designing for Light & Ventilation", excerpt: "Layout principles that elevate daily living." },
]

export function BlogSection() {
  return (
    <section aria-labelledby="blog-title" className="bg-secondary">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-center justify-between">
          <h2 id="blog-title" className="text-pretty text-3xl font-semibold">
            From Our Blog
          </h2>
          <a href="#" className="text-sm text-primary underline">
            View all
          </a>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {posts.map((p) => (
            <Card key={p.title} className="border border-border">
              <CardHeader>
                <CardTitle className="text-xl">{p.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">{p.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
