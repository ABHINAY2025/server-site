/* eslint-disable @next/next/no-img-element */
"use client"

import { Header } from "@/components/header"
import { motion } from "framer-motion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { blogPosts, carouselBlogs } from "./blogs"
import type { BlogPost } from "./blogs"

/* ------------------------------------------------------------------ */
/* STYLES                                                              */
/* ------------------------------------------------------------------ */

const categoryToneClasses: Record<BlogPost["categoryTone"], string> = {
  teal: "bg-gradient-to-br from-teal-500 via-cyan-500 to-teal-700",
  blue: "bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-700",
  pink: "bg-gradient-to-br from-rose-500 via-pink-500 to-rose-700",
  purple: "bg-gradient-to-br from-violet-600 via-purple-600 to-purple-800",
}

const colorThemes = [
  { tagBg: "bg-teal-600", accent: "text-teal-300" },
  { tagBg: "bg-indigo-600", accent: "text-indigo-300" },
  { tagBg: "bg-rose-600", accent: "text-rose-300" },
  { tagBg: "bg-amber-600", accent: "text-amber-300" },
]

/* ------------------------------------------------------------------ */
/* PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function BlogsPage() {
  return (
    <div className="mesh-gradient-bg relative min-h-screen w-full">
      <Header />

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-32 lg:pt-40">
        {/* HERO */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl"
        >
          <span className="inline-flex items-center rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1 text-sm font-semibold text-violet-200">
            Insights & Stories
          </span>

          <h1 className="mt-6 text-4xl font-bold text-white sm:text-5xl">
            Perspectives on intelligent banking, data, and design.
          </h1>

          <p className="mt-4 text-white/60">
            Practical insights, strategy, and engineering ideas shaping the future of finance.
          </p>
        </motion.section>

        {/* BLOG GRID */}
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <a
              key={post.id}
              href={post.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.article
                whileHover={{ y: -8 }}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-colors duration-300 hover:border-violet-400/30"
              >
                <div className="relative h-48">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="h-full w-full object-cover"
                  />
                  <span
                    className={`absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-semibold text-white ${categoryToneClasses[post.categoryTone]}`}
                  >
                    {post.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-3 text-lg font-bold text-white">{post.title}</h3>
                  <p className="mb-4 text-sm text-white/50 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto flex justify-between border-t border-white/10 pt-4 text-xs text-white/40">
                    <span>{post.author}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </motion.article>
            </a>
          ))}
        </div>

        {/* CAROUSEL */}
        <section className="mt-24">
          <div className="mb-8 flex justify-between">
            <h2 className="text-3xl font-semibold text-white">
              More insights on <br /> payments & intelligence
            </h2>
          </div>

          <Carousel opts={{ align: "start" }}>
            <CarouselContent className="-ml-4">
              {carouselBlogs.map((post, i) => {
                const theme = colorThemes[i % colorThemes.length]
                return (
                  <CarouselItem key={i} className="basis-[340px] pl-4">
                    <a href={post.url} target="_blank" rel="noopener noreferrer">
                      <motion.div
                        whileHover={{ y: -8 }}
                        className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-colors duration-300 hover:border-teal-400/30"
                      >
                        <div className="mb-4 flex items-center gap-2">
                          <span className={`rounded-full px-3 py-1 text-xs text-white ${theme.tagBg}`}>
                            {post.tag}
                          </span>
                          <span className="text-xs text-white/40">{post.source}</span>
                        </div>

                        <h3 className="mb-4 text-lg font-bold text-white">{post.title}</h3>
                        <p className="mb-6 text-sm text-white/50 line-clamp-4">
                          {post.description}
                        </p>

                        <span className={`mt-auto font-semibold ${theme.accent}`}>
                          Read article →
                        </span>
                      </motion.div>
                    </a>
                  </CarouselItem>
                )
              })}
            </CarouselContent>

            <CarouselPrevious className="border-white/10 bg-white/5 text-white hover:bg-white/10" />
            <CarouselNext className="border-white/10 bg-white/5 text-white hover:bg-white/10" />
          </Carousel>
        </section>
      </main>
    </div>
  )
}
