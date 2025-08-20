"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PipelinePage() {
  return (
    <div>
      <h1>Dashboard Page</h1>
      <Button>
        <Link href="/restaurant/dashboard/meals-pipeline">Meals Pipeline</Link>
      </Button>
    </div>
  );
}
