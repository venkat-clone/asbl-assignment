import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { FeaturedProjects } from "@/components/featured-projects"
import { USPs } from "@/components/usps"
import { ConstructionTech } from "@/components/construction-tech"
import { Testimonials } from "@/components/testimonials"
import { Gallery } from "@/components/gallery"
import { BlogSection } from "@/components/blog-section"
import { MapSection } from "@/components/map-section"
import { ContactForm } from "@/components/contact-form"
import { AnalyticsTracker } from "@/components/analytics-tracker"

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <AnalyticsTracker />
      <Hero />
      <section id="about">
        <About />
      </section>
      <FeaturedProjects />
      <section id="usp">
        <USPs />
      </section>
      <section id="tech">
        <ConstructionTech />
      </section>
      <section id="reviews">
        <Testimonials />
      </section>
      <section id="gallery">
        <Gallery />
      </section>
      <BlogSection />
      <section id="map">
        <MapSection />
      </section>
      <ContactForm />
    </main>
  )
}
