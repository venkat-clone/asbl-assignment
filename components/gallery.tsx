export function Gallery() {
  const images = [
    { alt: "Clubhouse interior", url: "/clubhouse-interior.jpg" },
    { alt: "Skyline view", url: "/skyline-view.jpg" },
    { alt: "Amenity deck", url: "/amenity-deck.jpg" },
    { alt: "Apartment living room", url: "/cozy-apartment-living-room.png" },
    { alt: "Construction progress", url: "/construction-progress.png" },
    { alt: "Lobby detail", url: "/lobby-detail.jpg" },
  ]
  return (
    <section aria-labelledby="gallery-title" className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 id="gallery-title" className="text-pretty text-3xl font-semibold">
          Media & Gallery
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
          {images.map((img) => (
            <img
              key={img.alt}
              src={img.url || "/placeholder.svg"}
              alt={img.alt}
              className="h-40 w-full rounded-lg border border-border object-cover"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
