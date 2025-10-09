export function MapSection() {
  return (
    <section aria-labelledby="map-title" className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 id="map-title" className="text-pretty text-3xl font-semibold">
          Map & Locations
        </h2>
        <p className="mt-2 text-foreground/80">Explore our project locations across Hyderabad.</p>
        <div className="mt-6 overflow-hidden rounded-lg border border-border">
          <iframe
            title="ASBL Hyderabad Projects Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15223.571245998497!2d78.343!3d17.440!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93ef!2sGachibowli!5e0!3m2!1sen!2sin!4v1700000000000"
            width="100%"
            height="420"
            loading="lazy"
            className="block"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}
