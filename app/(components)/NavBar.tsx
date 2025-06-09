'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export function NavBar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setIsAuthenticated(!!session)
    }

    checkAuth()

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-8 lg:px-12">
        <div className="flex items-center gap-2 py-2">
          <span className="font-bold text-xl p-2">PrepMaster</span>
        </div>
        <nav className="hidden md:flex gap-8 mx-4">
          <Link
            href="#features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground p-2"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground p-2"
          >
            Pricing
          </Link>
          <Link
            href="#testimonials"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground p-2"
          >
            Testimonials
          </Link>
          <Link
            href="#faq"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground p-2"
          >
            FAQ
          </Link>
        </nav>
        <div className="flex items-center gap-6 ml-4">
          {isAuthenticated ? (
            <Link href="/dashboard">
              <Button className="bg-green-600 hover:bg-green-700 px-6">
                Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline" className="px-6">
                  Log in
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-green-600 hover:bg-green-700 px-6">
                  Sign up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
