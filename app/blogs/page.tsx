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
  {
    gradient: "from-teal-50 to-white",
    border: "border-teal-200",
    tagBg: "bg-teal-600",
    accent: "text-teal-700",
    glow: "hover:shadow-teal-200/60",
  },
  {
    gradient: "from-indigo-50 to-white",
    border: "border-indigo-200",
    tagBg: "bg-indigo-600",
    accent: "text-indigo-700",
    glow: "hover:shadow-indigo-200/60",
  },
  {
    gradient: "from-rose-50 to-white",
    border: "border-rose-200",
    tagBg: "bg-rose-600",
    accent: "text-rose-700",
    glow: "hover:shadow-rose-200/60",
  },
  {
    gradient: "from-amber-50 to-white",
    border: "border-amber-200",
    tagBg: "bg-amber-600",
    accent: "text-amber-700",
    glow: "hover:shadow-amber-200/60",
  },
]

/* ------------------------------------------------------------------ */
/* PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function BlogsPage() {
  return (
    <div className="relative min-h-screen w-full text-slate-900">
      <Header />

      <main className="mx-auto max-w-6xl px-4 pb-24 pt-16 lg:pt-24">
        {/* HERO */}
        <motion.section className="mx-auto max-w-3xl">
          <span className="inline-flex rounded-full bg-slate-900/5 px-4 py-1 text-sm font-semibold">
            Insights & Stories
          </span>

          <h1 className="mt-6 text-4xl font-bold sm:text-5xl">
            Perspectives on intelligent banking, data, and design.
          </h1>

          <p className="mt-4 text-slate-700">
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
                className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg"
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
                  <h3 className="mb-3 text-lg font-bold">{post.title}</h3>
                  <p className="mb-4 text-sm text-slate-600 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto flex justify-between border-t pt-4 text-xs text-slate-500">
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
            <h2 className="text-3xl font-semibold">
              More insights on <br /> intelligent banking, data and design.
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
                        className={`flex h-full flex-col rounded-2xl border bg-gradient-to-br ${theme.gradient} p-6 shadow-md`}
                      >
                        <div className="mb-4 flex gap-2">
                          <span className={`rounded-full px-3 py-1 text-xs text-white ${theme.tagBg}`}>
                            {post.tag}
                          </span>
                          <span className="text-xs text-slate-400">{post.source}</span>
                        </div>

                        <h3 className="mb-4 text-lg font-bold">{post.title}</h3>
                        <p className="mb-6 text-sm text-slate-600 line-clamp-4">
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

            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>
      </main>
    </div>
  )
}
