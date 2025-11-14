'use client'

import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function BenefitsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/#benefits-section"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Benefits
          </Link>
        </div>
      </div>
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  )
}
