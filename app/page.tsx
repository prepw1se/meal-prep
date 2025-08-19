import { NavBar } from "./(components)/NavBar";
import { Hero } from "./(components)/Hero";
import { Features } from "./(components)/Features";
import { Pricing } from "./(components)/Pricing";
import { Testimonials } from "./(components)/Testimonial";
import { FAQ } from "./(components)/Faq";
import { Cta } from "./(components)/Cta";

export default function Home() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="flex-1">
        <Hero />
        <Features />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Cta />
      </main>
    </div>
  );
}