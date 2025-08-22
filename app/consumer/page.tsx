import { Button } from "@/components/ui/button";
import { ChefHat } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { href: "#menu", label: "Menu" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#pricing", label: "Pricing" },
];

// ConsumerLandingPage
export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="mx-auto border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="px-4 py-4 flex items-center justify-between w-[96%] mx-auto">
          <div className="flex items-center space-x-2">
            <ChefHat className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">PrepWise</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm">
              Login
            </Button>
            <Button size="sm">Sign Up</Button>
          </div>
        </div>
      </header>
    </div>
  );
}
