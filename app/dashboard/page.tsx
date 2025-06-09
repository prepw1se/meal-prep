"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"


export default function PipelinePage() {
  

  return (
    <div className="flex min-h-screen flex-col">
     <h1>Dashboard Page</h1>
     <Button>
      <Link href="/dashboard/meals-pipeline">Meals Pipeline</Link>
     </Button>
    </div>
  )
}
