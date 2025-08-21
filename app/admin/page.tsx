import Link from "next/link";
import { Cta } from "../(components)/Cta";
import { FAQ } from "../(components)/Faq";
import { Features } from "../(components)/Features";
import { Hero } from "../(components)/Hero";
import { NavBar } from "../(components)/NavBar";
import { Pricing } from "../(components)/Pricing";
import { Testimonials } from "../(components)/Testimonial";

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
      <footer className="flex items-center w-full border-t *:py-4 md:py-0 px-3">
        <p className="text-sm leading-loose text-muted-foreground md:text-left">
          © 2025 PrepMaster. All rights reserved.
        </p>
        <div className="flex gap-5 ml-auto">
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
      </footer>
    </div>
  );
}
