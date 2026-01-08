import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { PremiumHeroSection } from "@/components/premium-hero-section"
import { FeatureModulesSection } from "@/components/feature-modules-section"
import { FlowingArrows } from "@/components/flowing-arrows"

// Lazy load non-critical sections
const ProcessFlowSection = dynamic(() => import('@/components/process-flow-section').then(mod => ({ default: mod.ProcessFlowSection })))
const BenefitsSection = dynamic(() => import('@/components/benefits-section').then(mod => ({ default: mod.BenefitsSection })))
const TestimonialCarouselSection = dynamic(() => import('@/components/testimonial-carousel-section').then(mod => ({ default: mod.TestimonialCarouselSection })))
const FAQSection = dynamic(() => import('@/components/faq-section').then(mod => ({ default: mod.FAQSection })))
const PremiumFooterSection = dynamic(() => import('@/components/premium-footer-section').then(mod => ({ default: mod.PremiumFooterSection })))

// Loading skeleton component
function SectionSkeleton() {
  return <div className="min-h-[400px] bg-gradient-to-b from-background to-transparent animate-pulse" />
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <FlowingArrows />

      <div className="relative z-10">
        {/* Hero Section - Full Width with Gradient */}
        <PremiumHeroSection />

        {/* Feature Modules Section */}
        <FeatureModulesSection />

        {/* Process Flow Section - Lazy loaded */}
        <Suspense fallback={<SectionSkeleton />}>
          <ProcessFlowSection />
        </Suspense>

        {/* Benefits Section - Lazy loaded */}
        <Suspense fallback={<SectionSkeleton />}>
          <BenefitsSection />
        </Suspense>

        {/* Testimonials Section - Lazy loaded */}
        <Suspense fallback={<SectionSkeleton />}>
          <TestimonialCarouselSection />
        </Suspense>

        {/* FAQ Section - Lazy loaded */}
        <Suspense fallback={<SectionSkeleton />}>
          <FAQSection />
        </Suspense>

        {/* Footer Section - Lazy loaded */}
        <Suspense fallback={<SectionSkeleton />}>
          <PremiumFooterSection />
        </Suspense>
      </div>
    </main>
  )
}
