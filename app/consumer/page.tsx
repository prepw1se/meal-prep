import "./consumer.css";
import {
  Badge,
  ChefHat,
  Clock,
  Heart,
  Shield,
  Star,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

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
        <div className="px-4 py-4 flex items-center justify-between container mx-auto">
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

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="w-fit">🍽️ Fresh • Local • Delivered</Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Weekly Meal
                  <span className="text-primary block">Subscriptions</span>
                  Delivered Fresh
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Subscribe to your favorite local restaurant and get fresh,
                  chef-prepared meals delivered to your door every week. Skip
                  the cooking, enjoy the eating.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8">
                  Start Your Subscription
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 bg-transparent"
                >
                  Browse Restaurants
                </Button>
              </div>
              <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span>4.9/5 rating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span>10k+ happy customers</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/gourmet-meal.png"
                alt="Fresh gourmet meal"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-lg border">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Truck className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-card-foreground">
                      Free Delivery
                    </p>
                    <p className="text-sm text-muted-foreground">
                      On orders over $30
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Menu Section */}
      <section id="menu" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              This Week's Featured Menu
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Carefully crafted dishes from our partner restaurants, delivered
              fresh to your door
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Grilled Salmon Bowl",
                description:
                  "Atlantic salmon with quinoa, roasted vegetables, and lemon herb sauce",
                price: "$18.99",
                image: "grilled salmon bowl with quinoa and vegetables",
                restaurant: "Ocean's Table",
                rating: 4.8,
              },
              {
                name: "Truffle Mushroom Risotto",
                description:
                  "Creamy arborio rice with wild mushrooms and truffle oil",
                price: "$16.99",
                image: "creamy truffle mushroom risotto in elegant bowl",
                restaurant: "Bella Vista",
                rating: 4.9,
              },
              {
                name: "Korean BBQ Tacos",
                description:
                  "Marinated beef bulgogi with kimchi slaw and gochujang aioli",
                price: "$14.99",
                image: "korean bbq tacos with kimchi and sauce",
                restaurant: "Seoul Kitchen",
                rating: 4.7,
              },
            ].map((dish, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={`/abstract-geometric-shapes.png?height=250&width=400&query=${dish.image}`}
                    alt={dish.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 right-3 bg-background/90 text-foreground">
                    {dish.restaurant}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{dish.name}</CardTitle>
                    <span className="text-lg font-bold text-primary">
                      {dish.price}
                    </span>
                  </div>
                  <CardDescription className="text-sm leading-relaxed">
                    {dish.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{dish.rating}</span>
                    </div>
                    <Button size="sm" variant="outline">
                      Add to Plan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Getting fresh, restaurant-quality meals has never been easier
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Choose Your Plan",
                description:
                  "Select from weekly meal plans tailored to your preferences and dietary needs",
                icon: <ChefHat className="h-8 w-8" />,
              },
              {
                step: "2",
                title: "We Prepare & Pack",
                description:
                  "Our partner restaurants prepare your meals fresh and pack them with care",
                icon: <Clock className="h-8 w-8" />,
              },
              {
                step: "3",
                title: "Delivered Fresh",
                description:
                  "Receive your meals at your doorstep, ready to heat and enjoy",
                icon: <Truck className="h-8 w-8" />,
              },
            ].map((step, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                  {step.icon}
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-primary">
                    Step {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Benefits */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Why Choose PrepWise?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Restaurant Quality",
                description: "Chef-prepared meals from local restaurants",
                icon: <ChefHat className="h-6 w-6" />,
              },
              {
                title: "Fresh Ingredients",
                description: "Locally sourced, seasonal ingredients",
                icon: <Heart className="h-6 w-6" />,
              },
              {
                title: "Flexible Plans",
                description: "Skip weeks, pause, or cancel anytime",
                icon: <Clock className="h-6 w-6" />,
              },
              {
                title: "Safe Delivery",
                description: "Temperature-controlled, contactless delivery",
                icon: <Shield className="h-6 w-6" />,
              },
            ].map((benefit, index) => (
              <Card key={index} className="text-center p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                  {benefit.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Start Your Food Journey?
            </h2>
            <p className="text-xl opacity-90">
              Join thousands of food lovers who trust FreshBites for their
              weekly meal subscriptions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Start Free Trial
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                View All Plans
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <ChefHat className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold text-card-foreground">
                  FreshBites
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Connecting food lovers with their favorite local restaurants
                through convenient meal subscriptions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-card-foreground mb-4">
                Company
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-card-foreground transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-card-foreground transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-card-foreground transition-colors"
                  >
                    Press
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-card-foreground mb-4">
                Support
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-card-foreground transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-card-foreground transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-card-foreground transition-colors"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-card-foreground mb-4">
                Newsletter
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                Get updates on new restaurants and special offers
              </p>
              <div className="flex gap-2">
                <Input placeholder="Enter your email" className="text-sm" />
                <Button size="sm">Subscribe</Button>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 FreshBites. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
