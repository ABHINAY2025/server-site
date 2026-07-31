"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { StarRating } from "./star-rating"
import { AnimatedSection } from "./animated-section"
import { SpotlightReveal } from "./effects/spotlight-reveal"
import { CurvedMarquee } from "./effects/curved-marquee"
import { CoverflowGallery } from "./effects/coverflow-gallery"

const testimonials = [
  {
    quote:
      "The AI-powered insights from QDL have been a game-changer. We're making data-driven decisions faster and with more confidence than ever before.",
    name: "Cameron Williamson",
    role: "IT Director",
    avatar: "/images/avatars/cameron-williamson.webp",
    rating: 5,
  },
  {
    quote:
      "We started with a trial and were impressed from day one. The real-time monitoring and automated workflows have streamlined our entire operation.",
    name: "Darlene Robertson",
    role: "Operations Manager",
    avatar: "/images/avatars/darlene-robertson.webp",
    rating: 5,
  },
  {
    quote:
      "QDL's multi-bank integration made it easy to connect all our systems. The deployment was smooth, and we saw value within the first week.",
    name: "Albert Flores",
    role: "Technology Lead",
    avatar: "/images/avatars/albert-flores.webp",
    rating: 5,
  },
  {
    quote:
      "The rules engine let our compliance team ship policy changes without waiting on a dev sprint. That alone paid for the platform.",
    name: "Annette Black",
    role: "Compliance Lead",
    avatar: "/images/avatars/annette-black.webp",
    rating: 5,
  },
  {
    quote:
      "Anomaly detection caught patterns our old rule-based system never would have flagged, with far fewer false positives.",
    name: "Cody Fisher",
    role: "Head of Risk",
    avatar: "/images/avatars/cody-fisher.webp",
    rating: 5,
  },
  {
    quote:
      "Onboarding was fast, support was responsive, and the dashboards gave our execs visibility they'd been asking for for years.",
    name: "Dianne Russell",
    role: "VP of Banking Operations",
    avatar: "/images/avatars/dianne-russell.webp",
    rating: 5,
  },
]

type Testimonial = {
  quote: string
  name: string
  role: string
  avatar?: string
  rating: number
}

function TestimonialSlide({ quote, name, role, avatar, rating }: Testimonial) {
  return (
    <div className="flex h-full w-full flex-col justify-between border border-white/10 bg-[#0b1220] p-7">
      <div className="space-y-4">
        <StarRating rating={rating} />
        <p className="text-base font-normal leading-relaxed text-white/80">{quote}</p>
      </div>

      <div className="mt-6 flex w-full items-center gap-3 border-t border-white/10 pt-6">
        <Image
          src={avatar || "/placeholder.svg"}
          alt={`${name} avatar`}
          width={48}
          height={48}
          className="h-12 w-12 rounded-full ring-2 ring-white/10"
        />
        <div className="flex flex-col items-start justify-start gap-0.5">
          <div className="text-sm font-semibold leading-[22px] text-white">{name}</div>
          <div className="text-sm font-normal leading-[22px] text-white/50">{role}</div>
        </div>
      </div>
    </div>
  )
}

export function TestimonialCarouselSection() {
  return (
    <AnimatedSection id="testimonials-section" className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <SpotlightReveal
          text="What our customers say"
          className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-white/50"
        >
          Banks, fintechs, and treasury teams on what changed after they switched to QDL
        </motion.p>
      </div>

      <div className="mt-12">
        <CurvedMarquee />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mt-16"
      >
        <CoverflowGallery
          items={testimonials}
          renderItem={(t) => <TestimonialSlide {...t} />}
          cardWidth={380}
          cardHeight={360}
        />
        <p className="mt-4 text-center text-xs text-white/30">
          Click a card, or use ← → to browse
        </p>
      </motion.div>
    </AnimatedSection>
  )
}
