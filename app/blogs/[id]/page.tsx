"use client"

import { Header } from "@/components/header"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const blogContent = {
  1: {
    title: "Unlock Treasury Alpha: Why QDL Liquidity Management Dominates Cash Concentration in 2025",
    category: "Technology",
    author: "Carrie Brewer",
    authorRole: "Director of Treasury Innovation",
    publishedDate: "January 15, 2025",
    readTime: "12 min read",
    imageUrl: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
    executiveSummary: "**QDL Liquidity Management** redefines corporate cash optimization with **real-time, multi-bank sweeping and notional pooling** that outperforms legacy systems like Oracle OBLM. By automating zero-balance, threshold, and investment sweeps across third-party banks, QDL delivers superior interest aggregation, FX efficiency, and predictive dashboards. For treasurers managing $100M+ pools, **QDL is the only platform proven to reduce idle cash by 37% and boost yield by 180 basis points** (QDL Internal Benchmark, Q3 2025).",
    content: [
      {
        type: "heading",
        level: 2,
        text: "Introduction",
      },
      {
        type: "paragraph",
        text: "In an era of volatile rates and fragmented banking relationships, **liquidity is alpha**. Corporate treasurers no longer accept end-of-day reconciliations or siloed account views. **QDL Liquidity Management**—built for the ISO 20022 age—centralizes funds across **200+ global banks with intra-day precision**, turning idle balances into investable assets while eliminating overdraft risk.",
      },
      {
        type: "divider",
      },
      {
        type: "heading",
        level: 2,
        text: "Section 1: Current Landscape & Market Pressure",
      },
      {
        type: "paragraph",
        text: "Global corporate cash pools hit **$12.4 trillion in 2025** (JPMorgan), with **68% of CFOs citing liquidity optimization as their #1 priority** (AFP 2025 Survey). Yet, **84% still rely on manual sweeps or outdated batch systems**—costing millions in lost yield.",
      },
      {
        type: "paragraph",
        text: "**QDL solves this with:**",
      },
      {
        type: "list",
        items: [
          "**Intra-day MBCC**: Move funds across 47 currencies in **<3 seconds**.",
          "**Basel III-compliant HQLA sweeps**: Auto-invest surpluses into money markets.",
          "**200+ bank integrations**: Including JPM, Citi, HSBC, and regional players.",
        ],
      },
      {
        type: "image",
        url: "https://via.placeholder.com/600x350?text=QDL+Outperforms+OBLM+by+37%25+on+Idle+Cash+Reduction",
        alt: "QDL vs Legacy Performance",
        caption: "Source: QDL Labs, 2025; QDL reduces idle cash 37% faster than Oracle OBLM.",
      },
      {
        type: "divider",
      },
      {
        type: "heading",
        level: 2,
        text: "Section 2: ISO 20022 & The Data Opportunity",
      },
      {
        type: "paragraph",
        text: "ISO 20022 isn't just compliance—it's **liquidity intelligence**. **QDL ingests CAMT.053 real-time flows** and enriches them with predictive analytics, enabling:",
      },
      {
        type: "list",
        items: [
          "**FX-alpha sweeps**: Auto-convert at **12bps below mid-rate**.",
          "**Threshold forecasting**: AI predicts overdrafts **4 hours in advance**.",
          "**Zero-touch interest optimization**: Notional pooling with **Fair Share + Reverse Fair Share** models.",
        ],
      },
      {
        type: "blockquote",
        text: "**Legacy systems choke on data volume.**\n\n**QDL processes 1.2M messages/hour** with **99.999% uptime**.",
      },
      {
        type: "divider",
      },
      {
        type: "heading",
        level: 2,
        text: "Section 3: Why Traditional Monitoring Isn't Enough",
      },
      {
        type: "paragraph",
        text: "Oracle OBLM's **offline batch mode** = decisions on yesterday's data.\n\n**QDL's Real-Time Balance Fabric™** pulls **T-1 + intra-day turns via webhooks**, ensuring:",
      },
      {
        type: "list",
        items: [
          "**No stale sweeps**: Zero-balance accuracy to the cent.",
          "**Predictive overdraft cover**: Auto-fund **before** debit hits.",
          "**Collar sweeps with AI guardrails**: Leave optimal buffers, not fixed ones.",
        ],
      },
      {
        type: "blockquote",
        text: "_\"We cut overdraft fees by $2.1M in Q1 alone.\"_ – Treasury Head, Fortune 500 Manufacturer",
      },
      {
        type: "divider",
      },
      {
        type: "heading",
        level: 2,
        text: "Section 4: Customer Expectations & Service Outcomes",
      },
      {
        type: "paragraph",
        text: "CFOs demand **predictability at scale**. **QDL delivers:**",
      },
      {
        type: "table",
        headers: ["Outcome", "QDL Advantage"],
        rows: [
          ["**Yield**", "**+180 bps** via auto-investment sweeps"],
          ["**Visibility**", "Color-coded RM dashboards (Green = Surplus, Red = Risk)"],
          ["**Control**", "Granular third-party bank controls (No Debit/Frozen)"],
          ["**Reporting**", "Instant PDF advices—Interest Reallocation in **3 clicks**"],
        ],
      },
      {
        type: "image",
        url: "https://via.placeholder.com/600x300?text=QDL+Real-Time+Currency+Heatmap",
        alt: "QDL RM Dashboard",
        caption: "Live view: 30-day rolling balances across 18 entities.",
      },
      {
        type: "divider",
      },
      {
        type: "heading",
        level: 2,
        text: "Section 5: The Path Forward for Modern Banks",
      },
      {
        type: "paragraph",
        text: "**QDL isn't just software—it's Treasury OS.** Deploy in **6 weeks** with:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "**Plug-and-play MBCC**: Onboard third-party banks via **BIC upload**.",
          "**AI Sweep Engine**: Self-optimizing thresholds based on **cash flow DNA**.",
          "**Banker + RM Dashboards**: Role-based, mobile-first, exportable.",
        ],
      },
      {
        type: "blockquote",
        text: "Unlike rigid Oracle setups, **QDL offers no-code structure builder**—drag, drop, sweep.",
      },
      {
        type: "divider",
      },
      {
        type: "heading",
        level: 2,
        text: "Conclusion",
      },
      {
        type: "paragraph",
        text: "In 2025, liquidity management separates **winners from survivors**.\n\n**QDL Liquidity Management** is the **only platform** combining **real-time MBCC**, **AI-driven sweeps**, and **ISO 20022-native intelligence** to deliver **alpha-grade cash efficiency**.",
      },
      {
        type: "blockquote",
        text: "**Legacy systems optimize yesterday. QDL predicts tomorrow.**",
      },
      {
        type: "divider",
      },
      {
        type: "heading",
        level: 2,
        text: "Request a Demo",
      },
      {
        type: "paragraph",
        text: "**Claim your edge.**\n\nSchedule a **15-minute QDL Liquidity Assessment** and see how much idle cash you're leaving on the table.",
      },
      {
        type: "paragraph",
        text: "[https://qdl.com/demo](https://qdl.com/demo) | **Download:** *\"The $12T Liquidity Opportunity\"* whitepaper",
      },
    ],
  },
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const postId = parseInt(params.id)
  const post = blogContent[postId as keyof typeof blogContent]

  if (!post) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500 via-cyan-400 to-blue-500">
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10">
          <Header />
          <main className="mx-auto max-w-4xl px-4 py-24 text-center">
            <h1 className="text-4xl font-semibold">Post not found</h1>
            <Link href="/blogs" className="mt-4 inline-block text-teal-200 hover:text-white">
              ← Back to blogs
            </Link>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white">
      {/* Background matching hero section */}
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
        <main className="mx-auto max-w-4xl px-4 pb-24 pt-16 sm:px-6 lg:px-8 lg:pt-24">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/blogs"
              className="mb-8 inline-flex items-center gap-2 text-white/80 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to blogs</span>
            </Link>
          </motion.div>

          {/* Article content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
            className="rounded-3xl bg-white p-8 shadow-2xl sm:p-12"
          >
            {/* Category badge */}
            <div className="mb-6">
              <span className="inline-flex items-center rounded-full bg-gradient-to-r from-teal-400/90 to-emerald-400/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-teal-950">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="mb-6 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            {/* Meta information */}
            <div className="mb-8 flex flex-wrap items-center gap-4 border-b border-slate-200 pb-6 text-sm text-slate-600">
              <div>
                <span className="font-semibold text-slate-900">{post.author}</span>
                <span className="ml-2">{post.authorRole}</span>
              </div>
              <span>•</span>
              <span>{post.publishedDate}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>

            {/* Executive Summary */}
            {post.executiveSummary && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-10 rounded-xl border-l-4 border-teal-500 bg-slate-50 p-6"
              >
                <h3 className="mb-3 text-lg font-semibold text-slate-900">Executive Summary</h3>
                <p
                  className="leading-relaxed text-slate-700"
                  dangerouslySetInnerHTML={{
                    __html: post.executiveSummary.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                  }}
                />
              </motion.div>
            )}

            {/* Featured image */}
            <div className="mb-10 overflow-hidden rounded-2xl">
              <div
                className="h-64 w-full bg-cover bg-center sm:h-80 lg:h-96"
                style={{
                  backgroundImage: `url("${post.imageUrl}")`,
                }}
                role="img"
                aria-label={post.title}
              />
            </div>

            {/* Article body */}
            <div className="prose prose-lg max-w-none">
              {post.content.map((section, index) => {
                if (section.type === "heading") {
                  const HeadingComponent = section.level === 3 ? motion.h3 : motion.h2
                  return (
                    <HeadingComponent
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.5 }}
                      className={`mt-10 mb-4 font-semibold text-slate-900 first:mt-0 ${
                        section.level === 3 ? "text-xl" : "text-2xl"
                      }`}
                    >
                      {section.text}
                    </HeadingComponent>
                  )
                }
                if (section.type === "paragraph") {
                  if (!section.text) return null
                  const hasBold = section.text.includes("**")
                  const hasLinks = section.text.includes("http")
                  let html = hasBold
                    ? section.text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                    : section.text
                  if (hasLinks) {
                    html = html.replace(
                      /\[([^\]]+)\]\(([^)]+)\)/g,
                      '<a href="$2" class="text-teal-600 hover:text-teal-700 underline" target="_blank" rel="noopener noreferrer">$1</a>'
                    )
                  }
                  html = html.replace(/\n/g, "<br />")
                  return (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.5 }}
                      className="mb-6 leading-relaxed text-slate-700"
                      dangerouslySetInnerHTML={{ __html: html }}
                    />
                  )
                }
                if (section.type === "list") {
                  if (!section.items) return null
                  const ListComponent = section.ordered ? motion.ol : motion.ul
                  return (
                    <ListComponent
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.5 }}
                      className={`mb-6 ml-6 space-y-2 text-slate-700 ${
                        section.ordered ? "list-decimal" : "list-disc"
                      }`}
                    >
                      {section.items.map((item: string, itemIndex: number) => (
                        <li
                          key={itemIndex}
                          className="leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: item.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                          }}
                        />
                      ))}
                    </ListComponent>
                  )
                }
                if (section.type === "blockquote") {
                  if (!section.text) return null
                  return (
                    <motion.blockquote
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.5 }}
                      className="my-6 border-l-4 border-teal-500 bg-slate-50 pl-6 italic text-slate-700"
                    >
                      <p
                        className="leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: section.text
                            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                            .replace(/\n/g, "<br />")
                            .replace(/_(.*?)_/g, "<em>$1</em>"),
                        }}
                      />
                    </motion.blockquote>
                  )
                }
                if (section.type === "table") {
                  if (!section.headers || !section.rows) return null
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.5 }}
                      className="my-6 overflow-x-auto"
                    >
                      <table className="w-full border-collapse border border-slate-300">
                        <thead>
                          <tr className="bg-slate-100">
                            {section.headers.map((header: string, headerIndex: number) => (
                              <th
                                key={headerIndex}
                                className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-900"
                                dangerouslySetInnerHTML={{
                                  __html: header.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                                }}
                              />
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {section.rows.map((row: string[], rowIndex: number) => (
                            <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                              {row.map((cell: string, cellIndex: number) => (
                                <td
                                  key={cellIndex}
                                  className="border border-slate-300 px-4 py-3 text-slate-700"
                                  dangerouslySetInnerHTML={{
                                    __html: cell.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                                  }}
                                />
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </motion.div>
                  )
                }
                if (section.type === "image") {
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.5 }}
                      className="my-8"
                    >
                      <img
                        src={section.url}
                        alt={section.alt}
                        className="w-full rounded-xl"
                      />
                      {section.caption && (
                        <p className="mt-2 text-center text-sm italic text-slate-500">
                          {section.caption}
                        </p>
                      )}
                    </motion.div>
                  )
                }
                if (section.type === "divider") {
                  return (
                    <motion.hr
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05, duration: 0.5 }}
                      className="my-8 border-slate-200"
                    />
                  )
                }
                return null
              })}
            </div>

            {/* Footer */}
            <div className="mt-12 border-t border-slate-200 pt-8">
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-sm font-semibold text-teal-600 transition-colors hover:text-teal-700"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to all blogs</span>
              </Link>
            </div>
          </motion.article>
        </main>
      </div>
    </div>
  )
}



