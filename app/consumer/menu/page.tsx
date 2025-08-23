"use client";

import { Clock, Heart, Leaf, Search, Star } from "lucide-react";
import "@/app/consumer/consumer.css";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const menuItems = [
  // Main Dishes
  {
    id: 1,
    name: "Grilled Salmon with Quinoa",
    description:
      "Fresh Atlantic salmon grilled to perfection, served with herb-infused quinoa and seasonal vegetables",
    price: 24.99,
    category: "main",
    dietary: ["gluten-free"],
    image: "/grilled-salmon-quinoa.png",
    rating: 4.8,
    prepTime: "25 min",
    calories: 420,
  },
  {
    id: 2,
    name: "Truffle Mushroom Risotto",
    description:
      "Creamy arborio rice with wild mushrooms, truffle oil, and aged parmesan cheese",
    price: 22.99,
    category: "main",
    dietary: ["vegetarian", "gluten-free"],
    image: "/placeholder-ukno1.png",
    rating: 4.7,
    prepTime: "30 min",
    calories: 380,
  },
  {
    id: 3,
    name: "Herb-Crusted Chicken Breast",
    description:
      "Tender chicken breast with Mediterranean herbs, roasted vegetables, and lemon jus",
    price: 21.99,
    category: "main",
    dietary: ["gluten-free"],
    image: "/herb-crusted-chicken.png",
    rating: 4.6,
    prepTime: "35 min",
    calories: 450,
  },
  {
    id: 4,
    name: "Vegan Buddha Bowl",
    description:
      "Colorful bowl with quinoa, roasted chickpeas, avocado, kale, and tahini dressing",
    price: 18.99,
    category: "main",
    dietary: ["vegan", "gluten-free"],
    image: "/vegan-buddha-bowl.png",
    rating: 4.9,
    prepTime: "20 min",
    calories: 350,
  },
  {
    id: 5,
    name: "Pan-Seared Duck Breast",
    description:
      "Succulent duck breast with cherry gastrique, wild rice, and sautéed spinach",
    price: 28.99,
    category: "main",
    dietary: ["gluten-free"],
    image: "/pan-seared-duck-breast.png",
    rating: 4.8,
    prepTime: "40 min",
    calories: 520,
  },
  {
    id: 6,
    name: "Mediterranean Pasta",
    description:
      "Fresh pasta with sun-dried tomatoes, olives, feta cheese, and basil pesto",
    price: 19.99,
    category: "main",
    dietary: ["vegetarian"],
    image: "/mediterranean-pasta.png",
    rating: 4.5,
    prepTime: "25 min",
    calories: 480,
  },

  // Side Dishes
  {
    id: 7,
    name: "Garlic Parmesan Asparagus",
    description:
      "Fresh asparagus spears roasted with garlic, parmesan, and lemon zest",
    price: 8.99,
    category: "side",
    dietary: ["vegetarian", "gluten-free"],
    image: "/garlic-parmesan-asparagus.png",
    rating: 4.7,
    prepTime: "15 min",
    calories: 120,
  },
  {
    id: 8,
    name: "Coconut Rice Pilaf",
    description:
      "Fragrant basmati rice cooked in coconut milk with toasted almonds and herbs",
    price: 7.99,
    category: "side",
    dietary: ["vegan", "gluten-free"],
    image: "/coconut-rice-pilaf.png",
    rating: 4.6,
    prepTime: "20 min",
    calories: 180,
  },
  {
    id: 9,
    name: "Honey Glazed Carrots",
    description: "Baby carrots glazed with honey, thyme, and a touch of butter",
    price: 6.99,
    category: "side",
    dietary: ["vegetarian", "gluten-free"],
    image: "/honey-glazed-carrots.png",
    rating: 4.4,
    prepTime: "18 min",
    calories: 90,
  },
  {
    id: 10,
    name: "Quinoa Tabbouleh",
    description:
      "Fresh quinoa salad with cucumber, tomatoes, parsley, and lemon dressing",
    price: 9.99,
    category: "side",
    dietary: ["vegan", "gluten-free"],
    image: "/quinoa-tabbouleh.png",
    rating: 4.8,
    prepTime: "10 min",
    calories: 140,
  },
  {
    id: 11,
    name: "Roasted Brussels Sprouts",
    description:
      "Crispy Brussels sprouts with bacon bits, balsamic glaze, and pine nuts",
    price: 8.99,
    category: "side",
    dietary: ["gluten-free"],
    image: "/roasted-brussels-sprouts.png",
    rating: 4.3,
    prepTime: "25 min",
    calories: 160,
  },
  {
    id: 12,
    name: "Sweet Potato Fries",
    description:
      "Crispy sweet potato fries with rosemary salt and garlic aioli",
    price: 7.99,
    category: "side",
    dietary: ["vegetarian", "gluten-free"],
    image: "/sweet-potato-fries.png",
    rating: 4.5,
    prepTime: "20 min",
    calories: 200,
  },
];

const categories = [
  { id: "all", name: "All Items", count: menuItems.length },
  {
    id: "main",
    name: "Main Dishes",
    count: menuItems.filter((item) => item.category === "main").length,
  },
  {
    id: "side",
    name: "Side Dishes",
    count: menuItems.filter((item) => item.category === "side").length,
  },
  {
    id: "vegan",
    name: "Vegan",
    count: menuItems.filter((item) => item.dietary.includes("vegan")).length,
  },
  {
    id: "vegetarian",
    name: "Vegetarian",
    count: menuItems.filter((item) => item.dietary.includes("vegetarian"))
      .length,
  },
];

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        item.category === selectedCategory ||
        item.dietary.includes(selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const getDietaryIcon = (dietary: string[]) => {
    if (dietary.includes("vegan"))
      return <Leaf className="h-4 w-4 text-green-600" />;
    if (dietary.includes("vegetarian"))
      return <Heart className="h-4 w-4 text-green-500" />;
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary">
              PrepWise
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/consumer"
                className="text-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link href="/menu" className="text-primary font-medium">
                Menu
              </Link>
              <Link
                href="/subscription"
                className="text-foreground hover:text-primary transition-colors"
              >
                Subscription
              </Link>
              <div className="flex items-center space-x-4">
                <Link href="login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="signup">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Menu
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover our carefully crafted dishes made with fresh,
            locally-sourced ingredients. From hearty mains to delicious sides,
            we have something for every taste.
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="text-sm"
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No dishes found matching your criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      {getDietaryIcon(item.dietary)}
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <span className="text-lg font-bold text-primary">
                        ${item.price}
                      </span>
                    </div>
                    <CardDescription className="text-sm">
                      {item.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{item.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{item.prepTime}</span>
                      </div>
                      <span>{item.calories} cal</span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {item.dietary.map((diet) => (
                        <Badge
                          key={diet}
                          variant="secondary"
                          className="text-xs"
                        >
                          {diet}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Button className="w-full">Add to Subscription</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Meal Subscription?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Choose your favorite dishes and get them delivered fresh every week
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/subscription">
              <Button size="lg" variant="secondary">
                View Subscription Plans
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
