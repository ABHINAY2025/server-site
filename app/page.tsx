import { HeroSection } from "@/components/hero-section"
import { WhatIsQDLSection } from "@/components/what-is-qdl-section"
import { PillarSection } from "@/components/pillar-section"
import { SystemFlowSection } from "@/components/system-flow-section"
import { BenefitsSection } from "@/components/benefits-section"
import { GettingStartedSection } from "@/components/getting-started-section"
import { FooterSection } from "@/components/footer-section"
import { AnimatedSection } from "@/components/animated-section"
import { TestimonialCarouselSection } from "@/components/testimonial-carousel-section"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-0">
      <div className="relative z-10">
        <main className="max-w-[1320px] mx-auto relative">
          <HeroSection />
        </main>
        <AnimatedSection className="relative z-10 max-w-[1320px] mx-auto px-6 mt-16" delay={0.1}>
          <WhatIsQDLSection />
        </AnimatedSection>
        <AnimatedSection className="relative z-10 max-w-[1320px] mx-auto mt-16" delay={0.2}>
          <PillarSection pillar={1} />
        </AnimatedSection>
        <AnimatedSection className="relative z-10 max-w-[1320px] mx-auto mt-16" delay={0.2}>
          <PillarSection pillar={2} />
        </AnimatedSection>
        <AnimatedSection className="relative z-10 max-w-[1320px] mx-auto mt-16" delay={0.2}>
          <PillarSection pillar={3} />
        </AnimatedSection>
        <AnimatedSection className="relative z-10 max-w-[1320px] mx-auto mt-16" delay={0.2}>
          <PillarSection pillar={4} />
        </AnimatedSection>
        <AnimatedSection className="relative z-10 max-w-[1320px] mx-auto mt-16" delay={0.2}>
          <SystemFlowSection />
        </AnimatedSection>
        <AnimatedSection className="relative z-10 max-w-[1320px] mx-auto mt-16" delay={0.2}>
          <BenefitsSection />
        </AnimatedSection>
        <AnimatedSection className="relative z-10 max-w-[1320px] mx-auto mt-16" delay={0.2}>
          <TestimonialCarouselSection />
        </AnimatedSection>
        <AnimatedSection className="relative z-10 max-w-[1320px] mx-auto mt-16" delay={0.2}>
          <GettingStartedSection />
        </AnimatedSection>
        <AnimatedSection className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16" delay={0.2}>
          <FooterSection />
        </AnimatedSection>
      </div>
    </div>
  )
}
