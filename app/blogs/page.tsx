/* eslint-disable @next/next/no-img-element */
"use client"

import { Header } from "@/components/header"
import { motion } from "framer-motion"
import Link from "next/link"

type BlogPost = {
  id: number
  title: string
  excerpt: string
  category: string
  categoryTone: "teal" | "blue" | "pink" | "purple"
  author: string
  authorRole: string
  publishedAgo: string
  readTime: string
  imageUrl: string
}

const categoryToneClasses: Record<BlogPost["categoryTone"], string> = {
  teal: "from-teal-400/90 to-emerald-400/90 text-teal-950",
  blue: "from-sky-400/90 to-cyan-400/90 text-sky-950",
  pink: "from-pink-400/90 to-rose-400/90 text-pink-950",
  purple: "from-violet-400/90 to-indigo-400/90 text-indigo-950",
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Unlock Treasury Alpha: Why QDL Liquidity Management Dominates Cash Concentration in 2025",
    excerpt:
      "QDL redefines corporate cash optimization with real-time, multi-bank sweeping and notional pooling that outperforms legacy systems like Oracle OBLM.",
    category: "Technology",
    categoryTone: "teal",
    author: "Carrie Brewer",
    authorRole: "Director of Treasury Innovation",
    publishedAgo: "January 15, 2025",
    readTime: "12 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: "Designing Resilient Payment Flows for Global Banks",
    excerpt:
      "From legacy cores to AI-first orchestration: lessons learned implementing adaptive payment rails.",
    category: "Popular",
    categoryTone: "blue",
    author: "Jerome Walton",
    authorRole: "Lead Solutions Architect",
    publishedAgo: "Yesterday",
    readTime: "6 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "Dashboard Playbook: From Noise to Narrative",
    excerpt:
      "Explore how federated data models transform executive dashboards into predictive control rooms.",
    category: "Design",
    categoryTone: "pink",
    author: "Lewis Daniels",
    authorRole: "Head of Product Design",
    publishedAgo: "Dec 23, 2024",
    readTime: "11 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    title: "The Compliance Graph: Automating Regulatory Assurance",
    excerpt:
      "How graph-native rules engines reduce manual reviews and surface anomalies before they surface risk.",
    category: "Compliance",
    categoryTone: "purple",
    author: "Nina Patel",
    authorRole: "Chief Risk Officer",
    publishedAgo: "Dec 15, 2024",
    readTime: "9 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    title: "AI Signal Hubs: Turning Anomalies into Actionable Insight",
    excerpt:
      "Architecting cross-channel fraud intelligence that learns, adapts, and defends across the enterprise.",
    category: "AI & Data",
    categoryTone: "teal",
    author: "Maria Gomez",
    authorRole: "VP Fraud Intelligence",
    publishedAgo: "Nov 30, 2024",
    readTime: "7 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 6,
    title: "Building Trust with Transparent Liquidity Analytics",
    excerpt:
      "A blueprint for aligning treasury, risk, and regulators with shared analytics and explainable AI.",
    category: "Strategy",
    categoryTone: "blue",
    author: "David Lin",
    authorRole: "Chief Strategy Officer",
    publishedAgo: "Nov 12, 2024",
    readTime: "10 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: index * 0.08,
      ease: [0.33, 1, 0.68, 1] as const,
    },
  }),
}

export default function BlogsPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500 via-cyan-400 to-blue-500">
        <div className="absolute inset-0 bg-black/40" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10">
        <Header />
        <main className="mx-auto max-w-6xl px-4 pb-24 pt-16 sm:px-6 lg:px-8 lg:pt-24">
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] as const }}
            className="mx-auto max-w-3xl text-center sm:text-left"
          >
            <span className="inline-flex items-center rounded-full bg-white/15 px-4 py-1 text-sm font-medium text-white/80 backdrop-blur">
              Insights & Stories
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Perspectives on intelligent banking, data, and design.
            </h1>
            <p className="mt-4 text-base text-white/80 sm:text-lg">
              Explore best practices, technical deep dives, and strategic viewpoints from the teams
              building the next generation of financial intelligence.
            </p>
          </motion.section>

          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.2,
                },
              },
            }}
            className="mt-14 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {blogPosts.map((post, index) => (
              <Link
                key={post.id}
                href={post.id === 1 ? `/blogs/${post.id}` : "#"}
                className="block"
              >
                <motion.article
                  custom={index}
                  variants={cardVariants}
                  whileHover={{ y: -10 }}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-white/40 bg-white shadow-lg shadow-black/5 transition-transform cursor-pointer"
                >
                <div className="relative h-40 w-full overflow-hidden">
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(17,24,39,0.15), rgba(17,24,39,0.55)), url("${post.imageUrl}")`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                    role="img"
                    aria-label={post.title}
                  />
                  <div className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-900 shadow-lg">
                    <span
                      className={`rounded-full bg-gradient-to-r px-2 py-0.5 text-xs font-semibold uppercase tracking-wide ${categoryToneClasses[post.categoryTone]}`}
                    >
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col px-6 pb-6 pt-5 text-slate-800">
                  <h3 className="text-lg font-semibold sm:text-xl">{post.title}</h3>
                  <p className="mt-3 text-sm text-slate-500">{post.excerpt}</p>

                  <div className="mt-6 flex flex-1 flex-col justify-end gap-3">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-medium text-slate-700">{post.author}</span>
                      <span>{post.publishedAgo}</span>
                    </div>

                    <span className="inline-flex items-center text-sm font-semibold text-teal-500 transition-colors hover:text-teal-600">
                      Read →
                    </span>
                  </div>
                </div>
              </motion.article>
              </Link>
            ))}
          </motion.div>
        </main>
      </div>
    </div>
  )
}

