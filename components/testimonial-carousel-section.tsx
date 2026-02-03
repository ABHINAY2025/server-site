"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { StarRating } from "./star-rating"
import { AnimatedSection } from "./animated-section"

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
]

type TestimonialCardProps = {
  quote: string
  name: string
  role: string
  avatar?: string
  rating: number
  index: number
}

const TestimonialCard = ({ quote, name, role,  avatar, rating, index }: TestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -4 }}
      className="flex flex-col justify-between items-start overflow-hidden rounded-xl border border-border bg-card p-6 w-full min-h-[320px] hover:shadow-lg transition-all duration-300"
    >
      <div className="space-y-4">
        {/* Star Rating */}
        <StarRating rating={rating} />
        {/* Quote */}
        <p className="text-foreground text-base font-normal leading-relaxed">{quote}</p>
      </div>
      
      {/* Author Info */}
      <div className="flex justify-start items-center gap-3 w-full mt-6 pt-6 border-t border-border">
        <Image
          src={avatar || "/placeholder.svg"}
          alt={`${name} avatar`}
          width={48}
          height={48}
          className="w-12 h-12 rounded-full ring-2 ring-border"
        />
        <div className="flex flex-col justify-start items-start gap-0.5">
          <div className="text-foreground text-sm font-semibold leading-[22px]">{name}</div>
          <div className="text-muted-foreground text-sm font-normal leading-[22px]">
            {role}
            
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function TestimonialCarouselSection() {
  return (
    <div>
      <AnimatedSection
        id="testimonials-section"
        className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
      >
      <div className="mx-auto max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl"
        >
          Trusted by Industry Leaders
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-muted-foreground"
                    style={{color: "#4b535c"}}

        >
          See how QDL is transforming banking operations worldwide
        </motion.p>
      </div>

      <div className="mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} index={index} />
          ))}
        </div>
      </div>
      </AnimatedSection>
    </div>
  )
}
