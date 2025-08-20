import Link from "next/link";
import { NavBar } from "../(components)/NavBar";
import { Hero } from "../(components)/Hero";
import { Features } from "../(components)/Features";
import { Pricing } from "../(components)/Pricing";
import { Testimonials } from "../(components)/Testimonial";
import { FAQ } from "../(components)/Faq";
import { Cta } from "../(components)/Cta";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <NavBar />
        <Hero />
        <Features />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Cta />
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 PrepMaster. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/terms"
              className="text-sm text-muted-foreground underline underline-offset-4"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground underline underline-offset-4"
            >
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
