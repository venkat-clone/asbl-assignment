import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const projects = [
  {
    name: "ASBL Broadway",
    location: "Gachibowli, Hyderabad",
    image: "/asbl-broadway-fa-ade.jpg",
    features: ["3 BHK", "Smart Layouts", "Amenity-rich"],
  },
  {
    name: "ASBL Spectra",
    location: "Financial District",
    image: "/asbl-spectra-tower.jpg",
    features: ["2.5 & 3 BHK", "Sky Views", "Green Spaces"],
  },
  {
    name: "ASBL Icon",
    location: "Kokapet",
    image: "/asbl-icon-elevation.jpg",
    features: ["3 BHK", "Premium Finishes", "Clubhouse"],
  },
]

export function FeaturedProjects() {
  return (
    <section id="projects" className="bg-background" aria-labelledby="projects-title">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 id="projects-title" className="text-pretty text-3xl font-semibold">
          Featured Projects
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {projects.map((p) => (
            <Card key={p.name} className="overflow-hidden">
              <CardHeader className="p-0">
                <img
                  src={p.image || "/placeholder.svg"}
                  alt={`${p.name} in ${p.location}`}
                  className="h-48 w-full object-cover"
                />
              </CardHeader>
              <CardContent className="space-y-3 p-4">
                <CardTitle className="text-xl">{p.name}</CardTitle>
                <div className="text-sm text-foreground/70">{p.location}</div>
                <ul className="mt-2 list-disc pl-5 text-sm text-foreground/80">
                  {p.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="p-4">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Know More</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
