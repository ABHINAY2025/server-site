"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import { StarRating } from "./star-rating"
import { AnimatedSection } from "./animated-section"

const testimonials = [
  {
    quote:
      "QDL transformed our banking operations. The intelligent data control and fraud detection modules caught suspicious activities we would have missed. Our compliance team loves the automated rules engine.",
    name: "Annette Black",
    role: "CTO",
    company: "Sony",
    avatar: "/images/avatars/annette-black.png",
    rating: 5,
  },
  {
    quote:
      "Integrating QDL into our existing infrastructure was seamless. The liquidity management module helped us optimize cash flow and reduce operational costs by 30%.",
    name: "Dianne Russell",
    role: "CFO",
    company: "McDonald's",
    avatar: "/images/avatars/dianne-russell.png",
    rating: 5,
  },
  {
    quote:
      "The AI-powered insights from QDL have been a game-changer. We're making data-driven decisions faster and with more confidence than ever before.",
    name: "Cameron Williamson",
    role: "IT Director",
    company: "IBM",
    avatar: "/images/avatars/cameron-williamson.png",
    rating: 5,
  },
  {
    quote:
      "QDL consolidated all our banking operations into one intuitive platform. Our team productivity has increased significantly, and we've eliminated the need for multiple tools.",
    name: "Robert Fox",
    role: "VP of Operations",
    company: "MasterCard",
    avatar: "/images/avatars/robert-fox.png",
    rating: 5,
  },
  {
    quote:
      "We started with a trial and were impressed from day one. The real-time monitoring and automated workflows have streamlined our entire operation.",
    name: "Darlene Robertson",
    role: "Operations Manager",
    company: "Ferrari",
    avatar: "/images/avatars/darlene-robertson.png",
    rating: 5,
  },
  {
    quote:
      "The natural language query feature is incredible. Our analysts can now get answers instantly without writing complex SQL queries.",
    name: "Cody Fisher",
    role: "Data Analyst",
    company: "Apple",
    avatar: "/images/avatars/cody-fisher.png",
    rating: 5,
  },
  {
    quote:
      "QDL's multi-bank integration made it easy to connect all our systems. The deployment was smooth, and we saw value within the first week.",
    name: "Albert Flores",
    role: "Technology Lead",
    company: "Louis Vuitton",
    avatar: "/images/avatars/albert-flores.png",
    rating: 5,
  },
]

type TestimonialCardProps = {
  quote: string
  name: string
  role: string
  company: string
  avatar?: string
  rating: number
  index: number
}

const TestimonialCard = ({ quote, name, role, company, avatar, rating, index }: TestimonialCardProps) => {
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
            {role}, {company}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function TestimonialCarouselSection() {
  const [api, setApi] = useState<any>(null)
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  useEffect(() => {
    if (!api || isHovered) return // Pause on hover

    const interval = setInterval(() => {
      api.scrollNext()
    }, 6000) // Auto-rotate every 6s

    return () => clearInterval(interval)
  }, [api, isHovered])

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
        >
          See how QDL is transforming banking operations worldwide
        </motion.p>
      </div>

      <div className="mt-16">
        <Carousel
          opts={{
            align: "start",
            loop: true,
            skipSnaps: false,
          }}
          setApi={setApi}
          className="w-full"
        >
          <CarouselContent className="gap-6 -ml-2 md:-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                <TestimonialCard {...testimonial} index={index} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center items-center gap-2 mt-6 md:mt-8"
        >
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => api?.scrollTo(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === index ? "bg-primary w-8" : "bg-muted-foreground/30 w-2 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
            ))}
        </motion.div>
      </div>
      </AnimatedSection>
    </div>
  )
}
