"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Database, TrendingUp, ShieldCheck, FileCode, Plug, Sparkles, ArrowUpRight } from "lucide-react"
import { AnimatedSection } from "./animated-section"
import { ElectricBorder } from "./effects/electric-border"
import { ScrambleText } from "./effects/scramble-text"

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
      {children}
    </span>
  )
}

function DataStreamMock() {
  return (
    <div className="relative h-28 overflow-hidden rounded-xl border border-white/10 bg-black/30 p-4">
      <div className="mb-3 flex items-center justify-between text-[11px] text-white/40">
        <span>Data syncing across systems</span>
        <span className="text-teal-300">Live</span>
      </div>
      {[0, 1, 2].map((row) => (
        <div key={row} className="relative mb-2 h-1.5 overflow-hidden rounded-full bg-white/5">
          <motion.div
            className="absolute inset-y-0 w-1/4 rounded-full bg-gradient-to-r from-violet-500 to-teal-400"
            animate={{ left: ["-25%", "100%"] }}
            transition={{ duration: 2.4 + row * 0.4, repeat: Infinity, ease: "linear", delay: row * 0.3 }}
          />
        </div>
      ))}
    </div>
  )
}

function LiquidityChartMock() {
  const bars = [40, 65, 50, 80, 60, 95, 70]
  return (
    <div className="flex h-24 items-end gap-2 rounded-xl border border-white/10 bg-black/30 p-4">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
          className="flex-1 rounded-t-sm bg-gradient-to-t from-violet-500/80 to-teal-400/80"
        />
      ))}
    </div>
  )
}

function AnomalyShieldMock() {
  return (
    <div className="flex h-24 items-center justify-center rounded-xl border border-white/10 bg-black/30">
      <div className="relative flex h-14 w-14 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400/30" />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-green-500/15 ring-1 ring-green-400/40">
          <ShieldCheck className="h-7 w-7 text-green-400" />
        </span>
      </div>
      <span className="ml-4 rounded-full border border-green-400/30 bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-300">
        Protected
      </span>
    </div>
  )
}

function RulesEngineMock() {
  const nodes = ["Trigger", "Condition", "Action", "Notify"]
  return (
    <div className="flex items-center gap-2 overflow-x-auto rounded-xl border border-white/10 bg-black/30 p-4">
      {nodes.map((node, i) => (
        <React.Fragment key={node}>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -3 }}
            className="shrink-0 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/80"
          >
            {node}
          </motion.div>
          {i < nodes.length - 1 && (
            <svg width="24" height="8" className="shrink-0 text-white/20">
              <line x1="0" y1="4" x2="24" y2="4" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
            </svg>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

function ConnectionStudioMock() {
  const sources = ["File Transfer", "Partner API", "Core Banking"]
  return (
    <div className="flex h-24 items-center gap-3 overflow-x-auto rounded-xl border border-white/10 bg-black/30 p-4">
      <div className="flex shrink-0 flex-col gap-1.5">
        {sources.map((source, i) => (
          <motion.div
            key={source}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-medium text-white/60"
          >
            {source}
          </motion.div>
        ))}
      </div>

      <svg width="28" height="60" className="shrink-0 text-white/20">
        <line x1="0" y1="8" x2="28" y2="30" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="0" y1="30" x2="28" y2="30" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="0" y1="52" x2="28" y2="30" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
      </svg>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        className="relative flex shrink-0 items-center gap-1.5 rounded-lg border border-amber-400/30 bg-amber-500/10 px-3 py-2"
      >
        <Sparkles className="h-3.5 w-3.5 text-amber-300" />
        <span className="text-[10px] font-semibold text-amber-200">AI Checks the Match</span>
      </motion.div>

      <ArrowUpRight className="h-4 w-4 shrink-0 rotate-45 text-white/20" />

      <span className="shrink-0 rounded-full border border-teal-400/30 bg-teal-500/10 px-3 py-1 text-[10px] font-semibold text-teal-300">
        Connected
      </span>
    </div>
  )
}

const modules = [
  {
    icon: Database,
    title: "Data Control",
    description:
      "Every system — your core banking platform, payment providers, and internal tools — sees the same numbers at the same time. No more spreadsheets that disagree, and a full history of who changed what, when.",
    tags: ["Real-time Sync", "Full Audit History"],
    href: "http://10.30.0.104:3000/",
    mock: <DataStreamMock />,
    span: "md:col-span-4 lg:col-span-2",
  },
  {
    icon: TrendingUp,
    title: "Liquidity Management",
    description:
      "See how much cash you'll have on hand next week, not just today — and get an early warning if a shortfall is coming, so treasury teams can act before it's urgent.",
    tags: ["Cash Flow Forecasting", "Early-Warning Alerts"],
    href: "http://10.30.0.104:3000/liquidity-dashboard",
    mock: <LiquidityChartMock />,
    span: "md:col-span-2 lg:col-span-1",
  },
  {
    icon: ShieldCheck,
    title: "Anomaly Detection",
    description:
      "QDL watches every transaction as it happens and flags the ones that don't look right — before money leaves the building, not after.",
    tags: ["Real-Time Fraud Alerts"],
    href: "http://10.30.0.104:3000/fraud-control",
    mock: <AnomalyShieldMock />,
    span: "md:col-span-2 lg:col-span-1",
  },
  {
    icon: FileCode,
    title: "Rules Engine",
    description:
      "Change an approval limit or a compliance policy yourself, in plain language, without filing an IT ticket or waiting on a developer. Every change is logged and can be rolled back.",
    tags: ["No Code Required", "Full Change History"],
    href: "http://10.30.0.104:3000/configuration",
    mock: <RulesEngineMock />,
    span: "md:col-span-4 lg:col-span-2",
  },
  {
    icon: Plug,
    title: "Connection Control",
    description:
      "Plug in a new payment provider or banking partner yourself in a few clicks — no engineering ticket, no weeks-long wait. QDL checks the connection for you before it goes live.",
    tags: ["Connect It Yourself", "Automatic Safety Check"],
    href: "http://10.30.0.104:3008/",
    mock: <ConnectionStudioMock />,
    span: "md:col-span-4 lg:col-span-2",
  },
]

export function FeatureModulesSection() {
  return (
    <AnimatedSection id="features-section" className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <ScrambleText
          text="Five things every bank"
          className="mb-1 text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
        />
        <span className="gradient-text-violet-teal block text-3xl font-bold sm:text-4xl lg:text-5xl">
          struggles with — solved
        </span>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-lg text-white/50"
        >
          Five modules, one login — built for the people who run banking operations day to day
        </motion.p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-4">
        {modules.map((module, index) => {
          const Icon = module.icon
          return (
            <motion.a
              key={module.title}
              href={module.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={module.span}
            >
              <ElectricBorder className="flex h-full flex-col p-7">
                <div className="flex items-start justify-between">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-teal-400 text-white shadow-lg">
                    <Icon className="h-6 w-6" />
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-white/20 transition-colors group-hover:text-white/50" />
                </div>

                <h3 className="mb-2 mt-5 text-xl font-semibold text-white">{module.title}</h3>
                <p className="text-sm leading-relaxed text-white/50">{module.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {module.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>

                <div className="mt-auto pt-6">{module.mock}</div>
              </ElectricBorder>
            </motion.a>
          )
        })}
      </div>
    </AnimatedSection>
  )
}
