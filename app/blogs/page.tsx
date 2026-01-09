/* eslint-disable @next/next/no-img-element */
"use client"

import { Header } from "@/components/header"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

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
  teal: "bg-gradient-to-br from-teal-500 via-cyan-500 to-teal-700",
  blue: "bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-700",
  pink: "bg-gradient-to-br from-rose-500 via-pink-500 to-rose-700",
  purple: "bg-gradient-to-br from-violet-600 via-purple-600 to-purple-800",
}

const colorCycle = [
  "bg-gradient-to-r from-pink-500 to-purple-600",
  "bg-gradient-to-r from-cyan-500 to-teal-600",
  "bg-gradient-to-r from-blue-500 to-indigo-600",
  "bg-gradient-to-r from-rose-500 to-pink-600",
]

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Mastering Data Control: Real-Time Banking Operations",
    excerpt:
      "Discover how intelligent data control systems provide real-time synchronization across all banking platforms with complete audit trails and comprehensive governance.",
    category: "Technology",
    categoryTone: "teal",
    author: "Alex Kumar",
    authorRole: "Data Solutions Lead",
    publishedAgo: "December 15, 2025",
    readTime: "8 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: "Advanced Fraud Detection: AI-Powered Protection",
    excerpt:
      "Learn how AI-driven fraud detection systems monitor transactions in real-time, identify patterns, and prevent unauthorized access before it happens.",
    category: "Security",
    categoryTone: "blue",
    author: "Sarah Mitchell",
    authorRole: "Security Officer",
    publishedAgo: "December 12, 2025",
    readTime: "9 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "Liquidity Management: Optimize Your Cash Flow",
    excerpt:
      "Explore AI-powered forecasting techniques to optimize liquidity, automate cash positioning, and maximize returns on your banking assets.",
    category: "Finance",
    categoryTone: "pink",
    author: "Michael Torres",
    authorRole: "Treasury Specialist",
    publishedAgo: "December 10, 2025",
    readTime: "7 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    title: "Compliance Automation: Reduce Risk & Complexity",
    excerpt:
      "Automate compliance workflows, streamline regulatory reporting, and ensure consistent adherence to banking regulations across all operations.",
    category: "Compliance",
    categoryTone: "purple",
    author: "Jennifer Lee",
    authorRole: "Compliance Director",
    publishedAgo: "December 8, 2025",
    readTime: "8 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    title: "Real-Time Insights: Transform Your Banking Dashboard",
    excerpt:
      "Build intelligent dashboards that consolidate data from multiple sources, providing executives with actionable insights and predictive analytics.",
    category: "Analytics",
    categoryTone: "teal",
    author: "David Chen",
    authorRole: "Analytics Manager",
    publishedAgo: "December 6, 2025",
    readTime: "9 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1526374965328-7f5ae4e8b69e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 6,
    title: "Intelligent Banking: The Future is Now",
    excerpt:
      "Understand how intelligent banking platforms integrate data control, fraud detection, liquidity management, and compliance into a unified solution.",
    category: "Strategy",
    categoryTone: "blue",
    author: "Rebecca Harris",
    authorRole: "VP Product",
    publishedAgo: "December 4, 2025",
    readTime: "10 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  },
]

export default function BlogsPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden text-slate-900">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-sky-50">
        <div className="absolute inset-0 bg-white/0" />
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
            <span className="inline-flex items-center rounded-full bg-slate-100 px-4 py-1 text-sm font-medium text-slate-700">
              Insights & Stories
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl ">
              Perspectives on intelligent banking, data, and design.
            </h1>
            <p className="mt-4 text-base text-slate-600 sm:text-lg">
              Explore best practices, technical deep dives, and strategic viewpoints from the teams
              building the next generation of financial intelligence.
            </p>
          </motion.section>

          {/* Featured Blog Cards Section */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.33, 1, 0.68, 1] as const }}
            className="mt-14"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(0, 3).map((post) => (
                <Link
                  key={post.id}
                  href={`/blogs/${post.id}`}
                  className="block h-full"
                >
                  <motion.article
                    whileHover={{ y: -8 }}
                    className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow hover:shadow-xl h-full"
                  >
                    {/* Image Section */}
                    <div className="relative h-48 overflow-hidden bg-slate-200">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white ${categoryToneClasses[post.categoryTone]}`}
                        >
                          {post.category.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col justify-between flex-1 p-6">
                      <div>
                        <h3 className="text-lg font-bold leading-snug text-slate-900 mb-3">
                          {post.title}
                        </h3>
                        <p className="text-sm text-slate-600 line-clamp-2 mb-4">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="flex flex-col gap-4 border-t border-slate-200 pt-4">
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span className="font-medium">{post.author}</span>
                          <span>{post.publishedAgo}</span>
                        </div>

                        <span className="inline-flex items-center text-sm font-semibold text-teal-600 transition-colors group-hover:text-teal-700 w-fit">
                          Read →
                        </span>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Carousel Section */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.33, 1, 0.68, 1] as const }}
            className="mt-16"
          >
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {blogPosts.slice(3).map((post, index) => (
                  <CarouselItem
                    key={post.id}
                    className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                  >
                    <Link
                      href={`/blogs/${post.id}`}
                      className="block h-full"
                    >
                      <motion.article
                        whileHover={{ y: -10 }}
                        className={`group flex flex-col overflow-hidden rounded-2xl p-8 transition-transform cursor-pointer h-full ${colorCycle[index % colorCycle.length]}`}
                      >
                        <div className="flex flex-col justify-between h-full">
                          <div>
                            <h3 className="text-xl font-bold leading-snug text-white mb-4">{post.title}</h3>
                            <p className="text-sm text-white/90 mb-6">{post.excerpt}</p>
                          </div>

                          <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between text-xs text-white/80">
                              <span className="font-semibold">{post.publishedAgo}</span>
                            </div>

                            <span className="inline-flex items-center text-sm font-semibold text-white transition-colors hover:text-white/80 w-fit">
                              Learn more →
                            </span>
                          </div>
                        </div>
                      </motion.article>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 hidden lg:flex" />
              <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 hidden lg:flex" />
            </Carousel>
          </motion.div>
        </main>
      </div>
    </div>
  )
}


