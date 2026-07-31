import type { LucideIcon } from "lucide-react"
import { Database, TrendingUp, ShieldCheck, FileCode2 } from "lucide-react"

/**
 * Single source of truth for navigation and module content.
 *
 * Module links previously pointed at `http://10.30.0.104:3000` — an RFC 1918
 * internal address over plain HTTP, repeated across two components. From the
 * public internet those never resolved, so the site's most engaged visitors
 * hit a timeout. They now route to the demo path.
 *
 * When an authenticated public app host exists, set NEXT_PUBLIC_APP_URL and
 * `appUrl` below becomes the real product link.
 */

export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? null

export type ModuleMetric = {
  value: string
  label: string
  /**
   * Marks a figure that has not yet been substantiated. Anything flagged is
   * withheld from render rather than published — an unsupportable claim on a
   * bank-facing site is a liability, not a headline.
   */
  unverified?: boolean
}

export type PlatformModule = {
  slug: string
  name: string
  icon: LucideIcon
  tagline: string
  description: string
  capabilities: { label: string; description: string }[]
  metrics: ModuleMetric[]
}

export const MODULES: PlatformModule[] = [
  {
    slug: "data-control",
    name: "Data Control",
    icon: Database,
    tagline: "Every transaction accounted for, end to end.",
    description:
      "Complete control of your banking data with intelligent management, real-time synchronisation and comprehensive audit trails across every system you run.",
    capabilities: [
      {
        label: "Real-time synchronisation",
        description:
          "Transaction state stays consistent across core banking, payment rails and downstream systems.",
      },
      {
        label: "Data governance",
        description:
          "Policy enforcement and validation applied at ingest, before bad data reaches settlement.",
      },
      {
        label: "Audit trails",
        description:
          "Every operation logged and attributable, with Maker/Checker segregation of duties.",
      },
    ],
    metrics: [
      { value: "—", label: "Straight-through processing rate", unverified: true },
      { value: "—", label: "Exceptions auto-corrected", unverified: true },
    ],
  },
  {
    slug: "liquidity-control",
    name: "Liquidity Control",
    icon: TrendingUp,
    tagline: "Know your position before you need it.",
    description:
      "Optimise cash flow and liquidity with AI-assisted forecasting, automated regulatory compliance and intelligent risk management for treasury teams.",
    capabilities: [
      {
        label: "Forecasting",
        description:
          "Predictive cash position across accounts, currencies and counterparties.",
      },
      {
        label: "Risk management",
        description:
          "Proactive identification of liquidity gaps with scenario and stress analysis.",
      },
      {
        label: "Regulatory ratios",
        description:
          "LCR and NSFR computed continuously, not reconstructed at period end.",
      },
    ],
    metrics: [
      { value: "—", label: "Forecast accuracy", unverified: true },
      { value: "—", label: "Position refresh interval", unverified: true },
    ],
  },
  {
    slug: "fraud-control",
    name: "Fraud Control",
    icon: ShieldCheck,
    tagline: "Stop fraud before settlement, not after.",
    description:
      "Machine learning models for anomaly detection and pattern recognition that flag suspicious transactions in real time, with secure workflows for compliance officers to act immediately.",
    capabilities: [
      {
        label: "Anomaly detection",
        description:
          "Models score every transaction against behavioural and network baselines.",
      },
      {
        label: "Real-time monitoring",
        description:
          "Continuous surveillance across transactions, entities and channels.",
      },
      {
        label: "Case management",
        description:
          "Analyst queue with entity relationships, timeline and explainable scoring.",
      },
    ],
    metrics: [
      { value: "—", label: "Detection rate", unverified: true },
      { value: "—", label: "p99 decision latency", unverified: true },
    ],
  },
  {
    slug: "rules-engine",
    name: "Rules Engine",
    icon: FileCode2,
    tagline: "Compliance logic your business team can actually own.",
    description:
      "Define, edit and query operational rules in plain language. Real-time validation and AI-guided prompts prevent duplicate or conflicting rules — no engineering ticket required.",
    capabilities: [
      {
        label: "Natural language authoring",
        description:
          "Business users describe the rule; the engine compiles and validates it.",
      },
      {
        label: "Simulation",
        description:
          "Test a rule against historical volume before it touches production.",
      },
      {
        label: "Versioning",
        description:
          "Full change history with rollback and attribution on every revision.",
      },
    ],
    metrics: [
      { value: "—", label: "Time to deploy a rule change", unverified: true },
      { value: "—", label: "Conflicts caught pre-production", unverified: true },
    ],
  },
]

export const PRIMARY_NAV = [
  { name: "Platform", href: "/#platform", hasMenu: true },
  { name: "Security", href: "/#security" },
  { name: "Resources", href: "/blogs" },
] as const

export const COMPLIANCE_MARKS = [
  "Role-based access control",
  "Encryption in transit & at rest",
  "Full audit trails",
  "Maker/Checker workflows",
] as const

export const ROLES = [
  "Treasury / Liquidity",
  "Payments & Operations",
  "Risk & Compliance",
  "Fraud & Financial Crime",
  "Technology / Architecture",
  "Executive",
  "Other",
] as const
