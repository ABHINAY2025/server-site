import { PremiumHeroSection } from "@/components/premium-hero-section"
import { FeatureModulesSection } from "@/components/feature-modules-section"
import { ProcessFlowSection } from "@/components/process-flow-section"
import { BenefitsSection } from "@/components/benefits-section"
import { TestimonialCarouselSection } from "@/components/testimonial-carousel-section"
import { PremiumGettingStartedSection } from "@/components/premium-getting-started-section"
import { FAQSection } from "@/components/faq-section"
import { PremiumFooterSection } from "@/components/premium-footer-section"
import { FlowingArrows } from "@/components/flowing-arrows"
import { PageBackdrop } from "@/components/page-backdrop"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden">
      <PageBackdrop />
      <FlowingArrows />

      <div className="relative z-10 bg-transparent">
        {/* Hero Section - Full Width with Gradient */}
        <PremiumHeroSection />

        {/* Feature Modules Section */}
        <FeatureModulesSection />

        {/* Process Flow Section */}
        <ProcessFlowSection />

        {/* Benefits Section */}
        <BenefitsSection />

        {/* Testimonials Section */}
        <TestimonialCarouselSection />

        {/* FAQ Section */}
        <FAQSection />

        {/* Getting Started Section */}
        {/* <PremiumGettingStartedSection /> */}

        {/* Footer Section */}
        <PremiumFooterSection />
      </div>
    </div>
  )
}
