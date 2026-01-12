/* eslint-disable @next/next/no-img-element */
"use client"
import Link from "next/link"
import { Header } from "@/components/header"
import { motion } from "framer-motion"
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
  externalUrl: string
}
type ExternalBlog = {
  title: string
  description: string
  url: string
  tag: string
  source: string
}

const categoryToneClasses: Record<BlogPost["categoryTone"], string> = {
  teal: "bg-gradient-to-br from-teal-500 via-cyan-500 to-teal-700",
  blue: "bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-700",
  pink: "bg-gradient-to-br from-rose-500 via-pink-500 to-rose-700",
  purple: "bg-gradient-to-br from-violet-600 via-purple-600 to-purple-800",
}

/* ------------------------------------------------------------------ */
/* BLOG DATA (External Redirects Only)                                 */
/* ------------------------------------------------------------------ */

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Rise of AI in Finance Automation",
    excerpt:
      "An in-depth exploration of how artificial intelligence is transforming financial automation through predictive analytics, fraud detection, and real-time decision systems.",
    category: "AI & Finance",
    categoryTone: "teal",
    author: "AIX Circle (Medium)",
    authorRole: "AI & Finance Publisher",
    publishedAgo: "2025",
    readTime: "11 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    externalUrl:
      "https://medium.com/@aixcircleblogs/the-rise-of-ai-in-finance-automation-1509766e2b69",
  },
  {
    id: 2,
    title: "AI in Finance: Automation, Use Cases, and Business Impact",
    excerpt:
      "A strategic overview of how AI is being implemented in finance to automate processes, personalize services, and drive sustainable business growth.",
    category: "Strategy",
    categoryTone: "blue",
    author: "Growth Jockey",
    authorRole: "AI & Digital Strategy Experts",
    publishedAgo: "2024",
    readTime: "9 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    externalUrl:
      "https://www.growthjockey.com/blogs/ai-in-finance",
  },
  {
    id: 3,
    title: "Financial Statement Analysis: Key Indicators and Evaluation Techniques",
    excerpt:
      "This article explains crucial financial indicators and how AI-powered analytics improve financial evaluation and decision-making accuracy.",
    category: "Analytics",
    categoryTone: "pink",
    author: "Simplifa AI",
    authorRole: "Financial Intelligence Platform",
    publishedAgo: "2024",
    readTime: "7 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80",
    externalUrl:
      "https://simplifa.ai/en/blog/analisis-laporan-keuangan-indikator-penting-dan-teknik-evaluasi",
  },
  {
    id: 4,
    title: "AI in FinTech: Enhancing Fraud Detection and Risk Management",
    excerpt:
      "An in-depth analysis of how AI-driven models strengthen fraud detection, minimize false positives, and optimize real-time risk management in fintech platforms.",
    category: "Security",
    categoryTone: "purple",
    author: "MetaMatrix Tech",
    authorRole: "FinTech Technology Provider",
    publishedAgo: "2025",
    readTime: "8 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80",
    externalUrl:
      "https://metamatrixtech.com/blogs/2025/05/01/ai-in-fintech-enhancing-fraud-detection-and-risk-management/",
  },
  {
    id: 5,
    title: "AI Development for Financial Services: FinTech AI Guide 2025",
    excerpt:
      "A comprehensive guide to AI development in financial services covering fraud detection, credit scoring, AML compliance, implementation costs, and ROI.",
    category: "Development",
    categoryTone: "teal",
    author: "TensorBlue",
    authorRole: "AI Development Company",
    publishedAgo: "2025",
    readTime: "10 min read",
    imageUrl:
      "https://codewave.com/insights/wp-content/uploads/2025/08/AI-in-Fintech-Top-Companies-and-Use-Cases-2025.png",
    externalUrl:
      "https://tensorblue.com/blog/ai-development-financial-services-fintech-guide-2025",
  },
  {
    id: 6,
    title: "How AI and Machine Learning Are Strengthening Fraud Detection in FinTech",
    excerpt:
      "This article details how machine learning models detect fraudulent behavior, enhance transaction security, and protect fintech ecosystems at scale.",
    category: "Machine Learning",
    categoryTone: "blue",
    author: "GeekyAnts",
    authorRole: "Technology Consulting Team",
    publishedAgo: "2024",
    readTime: "9 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    externalUrl:
      "https://geekyants.com/blog/how-ai-and-machine-learning-are-strengthening-fraud-detection-in-fintech",
  },
]


/* ------------------------------------------------------------------ */
/* BLOG DATA (Internal Redirects Only)                                 */
/* ------------------------------------------------------------------ */

const carouselBlogs: ExternalBlog[] = [
  {
    title: "Agentic AI",
    description:
      "An introduction to agentic AI systems and how autonomous decisioning is reshaping enterprise workflows.",
    url: "https://medium.com/@abhinayabhi226/b1d3969ab1b5",
    tag: "AGENTIC AI",
    source: "Medium",
  },
  {
    title: "Payment Intelligence: Beyond Processing",
    description:
      "Why modern payment systems must move beyond transaction processing to intelligence-driven decisioning.",
    url: "https://abhinay2025.blogspot.com/2026/01/payment-intelligence-beyond-processing.html",
    tag: "PAYMENTS",
    source: "Blogspot",
  },
  {
    title: "AI-Powered Payment Fraud Detection for Real-Time Security",
    description:
      "How AI detects fraud patterns in milliseconds while reducing false positives.",
    url: "https://medium.com/@abhinayabhi226/ai-powered-payment-fraud-detection-for-real-time-security-fd68d886eec0",
    tag: "FRAUD",
    source: "Medium",
  },
  {
    title: "FedNow vs RTP: What Banks Need to Know Before Adoption",
    description:
      "A comparison of FedNow and RTP across settlement, risk, and readiness.",
    url: "https://medium.com/@aishwaryad274/fednow-vs-rtp-what-banks-need-to-know-before-adoption-1fece72bc476",
    tag: "REAL-TIME PAYMENTS",
    source: "Medium",
  },
  {
    title: "Top Payment Compliance Risks Banks Will Face in 2026",
    description:
      "Key compliance threats emerging from faster, high-volume payment rails.",
    url: "https://medium.com/@aishwaryad274/top-payment-compliance-risks-banks-will-face-in-2026-79aeb1a16726",
    tag: "COMPLIANCE",
    source: "Medium",
  },
  {
    title: "Replacing Manual Payment Controls with Intelligent Rules Engines",
    description:
      "How automated rules reduce human effort while improving STP rates.",
    url: "https://medium.com/@abhinayabhi226/replacing-manual-payment-controls-with-intelligent-rules-engines-c9e666a9397f",
    tag: "AUTOMATION",
    source: "Medium",
  },
  {
    title: "AI-Powered Exception Management for Real-Time Payments",
    description:
      "Using AI to triage, resolve, and prevent payment exceptions in real time.",
    url: "https://medium.com/@abhinayabhi226/ai-powered-exception-management-for-real-time-payments-64b567f92215",
    tag: "EXCEPTIONS",
    source: "Medium",
  },
  {
    title: "How Agentic AI Reduces Operational Risk in Payment Processing",
    description:
      "How autonomous agents lower operational risk by acting before failures escalate.",
    url: "https://abhinay2025.blogspot.com/2026/01/how-agentic-ai-reduces-operational-risk.html",
    tag: "AGENTIC AI",
    source: "Blogspot",
  },
  {
    title: "Treasury Visibility in Real Time: How AI Changes Cash Decisioning",
    description:
      "AI-driven visibility enables faster, more confident intraday liquidity decisions.",
    url: "https://abhinay2025.blogspot.com/2026/01/treasury-visibility-in-real-time-how-ai.html",
    tag: "TREASURY",
    source: "Blogspot",
  },
  {
    title: "From Alerts to Actions: AI-Driven Payment Operations Explained",
    description:
      "Turning alert fatigue into prioritized, action-ready workflows.",
    url: "https://abhinay2025.blogspot.com/2026/01/from-alerts-to-actions-ai-driven.html",
    tag: "OPERATIONS",
    source: "Blogspot",
  },
  {
    title: "Why Traditional Fraud Tools Fail in Modern Payment Environments",
    description:
      "Why rule-based fraud models break down in real-time payment systems.",
    url: "https://abhinay2025.blogspot.com/2026/01/why-traditional-fraud-tools-fail-in.html",
    tag: "FRAUD",
    source: "Blogspot",
  },
  {
    title: "Using AI to Automate Payment Compliance Checks at Scale",
    description:
      "Automating sanctions, AML, and compliance checks using AI.",
    url: "https://abhinay2025.blogspot.com/2026/01/using-ai-to-automate-payment-compliance.html",
    tag: "COMPLIANCE",
    source: "Blogspot",
  },
  {
    title: "How Banks Achieve Higher STP Rates Using Intelligent Automation",
    description:
      "Reducing manual intervention to maximize straight-through processing.",
    url: "https://abhinay2025.blogspot.com/2026/01/how-banks-achieve-higher-stp-rates.html",
    tag: "STP",
    source: "Blogspot",
  },
  {
    title: "Designing AI-First Payment Operations Without Replacing Your Core",
    description:
      "How banks layer intelligence without re-platforming core systems.",
    url: "https://abhinay2025.blogspot.com/2026/01/designing-ai-first-payment-operations.html",
    tag: "ARCHITECTURE",
    source: "Blogspot",
  },
  {
    title: "Operationalizing AI in Payments: A Practical Roadmap for Banks",
    description:
      "A step-by-step guide to moving AI from pilots to production.",
    url: "https://abhinay2025.blogspot.com/2026/01/operationalizing-ai-in-payments.html",
    tag: "STRATEGY",
    source: "Blogspot",
  },
  {
    title: "How AI Improves Payment Data Accuracy Before Settlement",
    description:
      "Using AI to clean, enrich, and validate payment data pre-settlement.",
    url: "https://abhinay2025.blogspot.com/2026/01/how-ai-improves-payment-data-accuracy.html",
    tag: "DATA QUALITY",
    source: "Blogspot",
  },
  {
    title: "Liquidity Stress Testing Using Predictive AI Models",
    description:
      "Forecasting liquidity stress with predictive AI instead of static rules.",
    url: "https://abhinay2025.blogspot.com/2026/01/liquidity-stress-testing-using.html",
    tag: "LIQUIDITY",
    source: "Blogspot",
  },
  {
    title: "Real-Time Payments Fraud: Emerging Patterns Banks Can’t Ignore",
    description:
      "Fraud trends exploiting instant settlement and irreversibility.",
    url: "https://dev.to/aishwarya_d_efe12263f68ac/real-time-payments-fraud-emerging-patterns-banks-cant-ignore-2cd6",
    tag: "FRAUD",
    source: "Dev.to",
  },
  {
    title: "How ISO 20022 Changes Fraud Detection and Exception Handling",
    description:
      "Richer data enables smarter fraud and exception management.",
    url: "https://dev.to/aishwarya_d_efe12263f68ac/how-iso-20022-changes-fraud-detection-and-exception-handling-4g2a",
    tag: "ISO 20022",
    source: "Dev.to",
  },
  {
    title: "Exception-First vs Intelligence-First Payment Architectures",
    description:
      "Why proactive intelligence beats reactive exception handling.",
    url: "https://abhinay2025.blogspot.com/2026/01/exception-first-vs-intelligence-first.html",
    tag: "ARCHITECTURE",
    source: "Blogspot",
  },
  {
    title: "Why CIOs Are Moving from Dashboards to Decision Engines",
    description:
      "The shift from visibility tools to action-driven platforms.",
    url: "https://abhinay2025.blogspot.com/2026/01/why-cios-are-moving-from-dashboards-to.html",
    tag: "LEADERSHIP",
    source: "Blogspot",
  },
  {
    title: "The Role of Agentic AI in Next-Generation Treasury Platforms",
    description:
      "How agentic AI enables autonomous treasury decisioning.",
    url: "https://abhinay2025.blogspot.com/2026/01/the-role-of-agentic-ai-in-next.html",
    tag: "TREASURY AI",
    source: "Blogspot",
  },
  {
    title: "Why Manual Payment Exceptions Are Costing Banks Millions",
    description:
      "The hidden operational cost of manual exception handling.",
    url: "https://aishwaryadutpala.blogspot.com/2026/01/why-manual-payment-exceptions-are.html",
    tag: "COST",
    source: "Blogspot",
  },
  {
    title: "AI in Payment Compliance: What Regulators Actually Allow",
    description:
      "Understanding regulatory boundaries for AI adoption.",
    url: "https://aishwaryadutpala.blogspot.com/2026/01/ai-in-payment-compliance-what.html",
    tag: "REGULATION",
    source: "Blogspot",
  },
  {
    title: "Why Reconciliation Fails in High-Volume Payment Environments",
    description:
      "Why scale and speed break traditional reconciliation processes.",
    url: "https://aishwaryadutpala.blogspot.com/2026/01/why-reconciliation-fails-in-high-volume.html",
    tag: "RECONCILIATION",
    source: "Blogspot",
  },
  {
    title: "From Batch to Real-Time: Operational Gaps Banks Underestimate",
    description:
      "Hidden operational challenges when moving to real-time rails.",
    url: "https://aishwaryadutpala.blogspot.com/2026/01/from-batch-to-real-time-operational.html",
    tag: "MODERNIZATION",
    source: "Blogspot",
  },
  {
    title: "ACH Returns Explained: Root Causes, Risk, and Prevention",
    description:
      "Understanding ACH return drivers and how to mitigate risk.",
    url: "https://aishwaryadutpala.blogspot.com/2026/01/ach-returns-explained-root-causes-risk.html",
    tag: "ACH",
    source: "Blogspot",
  },
  {
    title: "How Poor Liquidity Forecasting Impacts Intraday Risk",
    description:
      "The downstream risk of inaccurate liquidity forecasting.",
    url: "https://aishwaryadutpala.blogspot.com/2026/01/how-poor-liquidity-forecasting-impacts.html",
    tag: "LIQUIDITY",
    source: "Blogspot",
  },
  {
    title: "Payment Modernization Without Replacing Your Core System",
    description:
      "Modernizing payments by layering intelligence, not ripping cores.",
    url: "https://aishwaryadutpala.blogspot.com/2026/01/payment-modernization-without-replacing.html",
    tag: "MODERNIZATION",
    source: "Blogspot",
  },
  {
    title: "The Hidden Cost of Fragmented Payment Gateways",
    description:
      "Operational and risk costs caused by disconnected gateways.",
    url: "https://aishwaryadutpala.blogspot.com/2026/01/the-hidden-cost-of-fragmented-payment.html",
    tag: "INFRASTRUCTURE",
    source: "Blogspot",
  },
  {
    title: "Why Rules-Based Automation Fails in Complex Payment Flows",
    description:
      "Why static rules can’t handle modern, high-variance flows.",
    url: "https://aishwaryadutpala.blogspot.com/2026/01/why-rules-based-automation-fails-in.html",
    tag: "AUTOMATION",
    source: "Blogspot",
  },
  {
    title: "The Future of Payment Operations: From Reactive to Predictive",
    description:
      "How predictive AI is redefining payment operations.",
    url: "https://aishwaryadutpala.blogspot.com/2026/01/the-future-of-payment-operations-from.html",
    tag: "FUTURE",
    source: "Blogspot",
  },
];

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
];

/* ------------------------------------------------------------------ */
/* PAGE COMPONENT                                                     */
/* ------------------------------------------------------------------ */

export default function BlogsPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden text-slate-900">
      <div className="relative z-10">

        <Header />

        <main className="mx-auto max-w-6xl px-4 pb-24 pt-16 sm:px-6 lg:px-8 lg:pt-24">
<motion.section className="mx-auto max-w-3xl">
  <span className="inline-flex rounded-full bg-slate-900/5 px-4 py-1 text-sm font-semibold text-slate-900">
    Insights & Stories
  </span>

  <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
    Perspectives on intelligent banking, data, and design.
  </h1>

  <p className="mt-4 text-base text-slate-700 sm:text-lg">
    Practical insights, strategy, and engineering ideas shaping the future of finance.
  </p>
</motion.section>

          {/* BLOG GRID */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <a
                key={post.id}
                href={post.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <motion.article
                  whileHover={{ y: -8 }}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl"
                >
                  <div className="relative h-48">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                    <span
                      className={`absolute top-4 left-4 rounded-full px-3 py-1 text-xs text-white font-semibold ${categoryToneClasses[post.categoryTone]}`}
                    >
                      {post.category.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="mb-3 text-lg font-bold">{post.title}</h3>
                    <p className="mb-4 text-sm text-slate-600 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto border-t pt-4 text-xs text-slate-500 flex justify-between">
                      <span>{post.author}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </motion.article>
              </a>
            ))}
          </div>
{/* BLOG GRID */}
<div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {blogPosts.map((post) => (
    <a
      key={post.id}
      href={post.externalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full"
    >
      {/* card */}
    </a>
  ))}
</div>


{/* HORIZONTAL INSIGHTS CAROUSEL */}
<section className="relative">
  <div className="mb-8 flex items-start justify-between">
    <h2 className="max-w-md text-3xl font-semibold text-slate-900">
      More insights on <br /> payments & intelligence
    </h2>
    <span className="mt-2 text-sm text-slate-500">
      Curated long-form reads
    </span>
  </div>

  <Carousel opts={{ align: "start" }} className="w-full">
    <CarouselContent className="-ml-4">
{carouselBlogs.map((post, index) => {
  const theme = colorThemes[index % colorThemes.length];

  return (
    <CarouselItem
      key={index}
      className="pl-4 basis-[300px] sm:basis-[340px] lg:basis-[380px]"
    >
      <a href={post.url} target="_blank" rel="noopener noreferrer">
        <motion.div
          whileHover={{ y: -8 }}
          className={`
            flex h-full min-h-[320px] flex-col rounded-2xl
            bg-gradient-to-br ${theme.gradient}
            border ${theme.border}
            p-6 shadow-md transition-all
            hover:shadow-xl ${theme.glow}
          `}
        >
          <div className="mb-4 flex items-center gap-2">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${theme.tagBg}`}
            >
              {post.tag}
            </span>
            <span className="text-xs text-slate-400">
              {post.source}
            </span>
          </div>

          <h3 className="mb-4 text-lg font-bold leading-snug text-slate-900">
            {post.title}
          </h3>
          <p className="mb-6 line-clamp-4 text-sm leading-relaxed text-slate-600">
            {post.description}
          </p>

          <span className={`mt-auto text-sm font-semibold ${theme.accent}`}>
            Read article →
          </span>
        </motion.div>
      </a>
    </CarouselItem>
  );
})}
    </CarouselContent>

    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</section>
        </main>
      </div>
    </div>
  )
}