import { Hero } from "@/components/home/hero"
import { Platform } from "@/components/home/platform"
import { HowItWorks } from "@/components/home/how-it-works"
import { Security } from "@/components/home/security"
import { FAQ } from "@/components/home/faq"
import { CtaBand } from "@/components/home/cta-band"

/**
 * Ordered by the sequence a bank actually moves through:
 * what is it -> what does it do -> how does it work -> can I trust you ->
 * what am I still unsure about -> start.
 *
 * Every section is a server component. The previous homepage shipped 46 of 58
 * components as `"use client"`, almost entirely to drive scroll reveals over
 * static content.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Platform />
      <HowItWorks />
      <Security />
      <FAQ />
      <CtaBand />
    </>
  )
}
