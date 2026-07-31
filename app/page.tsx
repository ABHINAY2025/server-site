import { PremiumHeroSection } from "@/components/premium-hero-section"
import { FeatureModulesSection } from "@/components/feature-modules-section"
import { GlobalReachSection } from "@/components/global-reach-section"
import { ProcessFlowSection } from "@/components/process-flow-section"
import { BenefitsSection } from "@/components/benefits-section"
import { ReactiveCtaSection } from "@/components/reactive-cta-section"
import { TestimonialCarouselSection } from "@/components/testimonial-carousel-section"
import { FAQSection } from "@/components/faq-section"
import { PremiumFooterSection } from "@/components/premium-footer-section"

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="relative z-10">
        {/* Hero Section - Full Width with Mesh Gradient */}
        <PremiumHeroSection />

        {/* Feature Modules Section */}
        <FeatureModulesSection />

        {/* Global Reach Section */}
        <GlobalReachSection />

        {/* Process Flow Section */}
        <ProcessFlowSection />

        {/* Benefits Section */}
        <BenefitsSection />

        {/* Reactive CTA Section */}
        <ReactiveCtaSection />

        {/* Testimonials Section */}
        <TestimonialCarouselSection />

        {/* FAQ Section */}
        <FAQSection />

        {/* Footer Section */}
        <PremiumFooterSection />
      </div>
    </div>
  )
}
