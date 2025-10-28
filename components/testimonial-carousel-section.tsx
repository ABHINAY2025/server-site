"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"

const testimonials = [
  {
    quote:
      "The real-time code suggestions from Pointer feel like having a senior engineer reviewing every line of code as you write. The accuracy of its recommendations has improved our overall code quality, reduced review time.",
    name: "Annette Black",
    company: "Sony",
    avatar: "/images/avatars/annette-black.png",
  },
  {
    quote:
      "Integrating Pointer into our stack was smooth, and the MCP server connections saved us days of configuration work",
    name: "Dianne Russell",
    company: "McDonald's",
    avatar: "/images/avatars/dianne-russell.png",
  },
  {
    quote:
      "Pointer's multi-agent coding feature has been a game changer. We're fixing complex bugs in hours instead of spending entire sprints on them.",
    name: "Cameron Williamson",
    company: "IBM",
    avatar: "/images/avatars/cameron-williamson.png",
  },
  {
    quote:
      "We no longer juggle multiple tools. Pointer brought all our integrations together in one place, which simplified our entire workflow.",
    name: "Robert Fox",
    company: "MasterCard",
    avatar: "/images/avatars/robert-fox.png",
  },
  {
    quote:
      "We started with the free plan just to test it out, but within a week we upgraded to Pro. Now, we can't imagine coding without it",
    name: "Darlene Robertson",
    company: "Ferrari",
    avatar: "/images/avatars/darlene-robertson.png",
  },
  {
    quote:
      "Collaborative coding feels effortless now. With Pointer's real-time previews, pair programming has become faster and more productive.",
    name: "Cody Fisher",
    company: "Apple",
    avatar: "/images/avatars/cody-fisher.png",
  },
  {
    quote:
      "Deploying on Vercel with Pointer was not just simple, it felt seamless. We went from coding to seeing our changes live in minutes without worrying about build pipelines or configuration issues.",
    name: "Albert Flores",
    company: "Louis Vuitton",
    avatar: "/images/avatars/albert-flores.png",
  },
]

const TestimonialCard = ({ quote, name, company, avatar, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="flex flex-col justify-between items-start overflow-hidden rounded-[10px] shadow-[0px_2px_4px_rgba(0,0,0,0.08)] bg-card outline outline-1 outline-border outline-offset-[-1px] p-6 w-full h-[280px] hover:shadow-[0px_8px_16px_rgba(0,0,0,0.12)] transition-shadow duration-300"
    >
      <div className="text-foreground/80 text-[17px] font-normal leading-6 break-words line-clamp-4">{quote}</div>
      <div className="flex justify-start items-center gap-3 w-full">
        <Image
          src={avatar || "/placeholder.svg"}
          alt={`${name} avatar`}
          width={40}
          height={40}
          className="w-10 h-10 rounded-[30px]"
          style={{ border: "1px solid rgba(0, 0, 0, 0.08)" }}
        />
        <div className="flex flex-col justify-start items-start gap-0.5">
          <div className="text-foreground text-sm font-normal leading-[22px]">{name}</div>
          <div className="text-muted-foreground text-sm font-normal leading-[22px]">{company}</div>
        </div>
      </div>
    </motion.div>
  )
}

export function TestimonialCarouselSection() {
  const [api, setApi] = useState(null)
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

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
    if (!api) return

    const interval = setInterval(() => {
      api.scrollNext()
    }, 5000) // Auto-advance every 5 seconds

    return () => clearInterval(interval)
  }, [api])

  return (
    <section
      id="testimonials-section"
      className="w-full px-5 overflow-hidden flex flex-col justify-start py-6 md:py-8 lg:py-14"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
        className="self-stretch py-6 md:py-8 lg:py-14 flex flex-col justify-center items-center gap-2"
      >
        <div className="flex flex-col justify-start items-center gap-4">
          <h2 className="text-center text-foreground text-3xl md:text-4xl lg:text-[40px] font-semibold leading-tight md:leading-tight lg:leading-[40px]">
            Coding made effortless
          </h2>
          <p className="self-stretch text-center text-muted-foreground text-sm md:text-sm lg:text-base font-medium leading-[18.20px] md:leading-relaxed lg:leading-relaxed">
            {"Hear how developers ship products faster, collaborate seamlessly,"} <br />{" "}
            {"and build with confidence using Pointer's powerful AI tools"}
          </p>
        </div>
      </motion.div>

      <div className="w-full pt-0.5 pb-4 md:pb-6 lg:pb-10 flex flex-col justify-center items-center max-w-[1100px] mx-auto">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          setApi={setApi}
          className="w-full"
        >
          <CarouselContent className="gap-4 md:gap-6">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/3">
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
    </section>
  )
}
