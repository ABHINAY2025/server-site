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
  2: {
    title: "Stop Fraud Before It Starts: Why Quantum Data Fraud (QDF) Outsmarts 2025 Payment Threats",
    category: "AI & Fraud",
    author: "Elena Varga",
    authorRole: "Chief AI Officer, QDF Labs",
    publishedDate: "Today",
    readTime: "16 min read",
    imageUrl:
      "https://via.placeholder.com/600x350?text=QDF+Detects+78%25+More+Emerging+Threats+Than+Rules-Based+Systems",
    executiveSummary: `**Quantum Data Fraud (QDF)** delivers **agentic AI-powered fraud detection** that obliterates legacy rule-based systems with **real-time anomaly detection, zero false positives, and adaptive learning**. Unlike traditional platforms that miss 78% of emerging fraud vectors (FraudTech 2025 Report), QDF combines **supervised + unsupervised AI, generative modeling, and network analysis** to predict and prevent fraud **4.2 seconds before execution**. For banks processing **$1B+ daily**, QDF cuts fraud losses by **63%** and operational overhead by **41%** (QDF Internal Benchmark, Q4 2025).`,
    content: [
      { type: "heading", level: 2, text: "Introduction" },
      { type: "paragraph", text: `In 2025, **payment fraud isn’t just evolving—it’s mutating**. Synthetic identities, AI-generated deepfake invoices, and cross-border micro-laundering bypass static rules in milliseconds. **Quantum Data Fraud**, powered by **Agentic AI and Quantum Data Leap**, autonomously detects, learns, and neutralizes threats **without human touchpoints**, turning fraud prevention from reactive firefighting into **predictive dominance**.` },
      { type: "divider" },
      { type: "heading", level: 2, text: "Section 1: Current Landscape & Market Pressure" },
      { type: "paragraph", text: `Global payment fraud losses hit **$48.7 billion in 2025** (Nilson Report), with **71% of attacks originating from AI-driven automation** (Cybersecurity Ventures). Yet, **89% of banks still rely on 1990s-era rule engines**—triggering **1.2M false positives daily** and costing **$117 per alert** in manual review (Aite-Novarica).` },
      { type: "paragraph", text: `**QDF ends this chaos with:**` },
      { type: "list", items: [
        "**Real-time data signal orchestration**: Ingests CAMT.053, SWIFT MT, and ISO 20022 streams **instantly**.",
        "**Agentic AI autonomy**: No predefined rules. Learns from **your** transaction DNA.",
        "**200+ fraud pattern libraries**: Updated hourly via secure RAG pipelines."
      ]},
      { type: "image", url: "https://via.placeholder.com/600x350?text=QDF+Detects+78%25+More+Emerging+Threats+Than+Rules-Based+Systems", alt: "QDF vs Legacy Detection", caption: "(Source: QDF Labs, 2025; QDF outperforms legacy systems by 78% on zero-day fraud vectors.)" },
      { type: "divider" },
      { type: "heading", level: 2, text: "Section 2: ISO 20022 & The Data Opportunity" },
      { type: "paragraph", text: `ISO 20022 isn’t just rich data—it’s **fraud intelligence fuel**. **QDF ingests structured payloads** to:` },
      { type: "list", items: [
        "**Map beneficiary networks**: Uncover shell company webs in **<2 seconds**.",
        "**Score behavioral drift**: Detect 0.3% velocity anomalies missed by thresholds.",
        "**Enrich with QGPT**: Generate plain-language fraud narratives for auditors."
      ]},
      { type: "blockquote", text: `**Legacy systems parse. QDF predicts.**  
**99.97% STP rate** with **zero compliance rework**.` },
      { type: "divider" },
      { type: "heading", level: 2, text: "Section 3: Why Traditional Monitoring Isn’t Enough" },
      { type: "paragraph", text: `Rule-based systems are **blind to context**. A $50K transfer to a new vendor? Legit—or mule drop?  
**QDF’s multi-layered AI stack** sees what rules can’t:` },
      { type: "table", headers: ["Layer", "QDF Advantage"], rows: [
        ["**Unsupervised Agent AI**", "Finds **unknown-unknowns** (e.g., AI-generated invoices)"],
        ["**Supervised Learning**", "97.4% accuracy on known fraud (ACH push, card-not-present)"],
        ["**Generative AI**", "Simulates attack variants to **stress-test defenses**"],
        ["**Network Analysis**", "Flags **mule rings** via graph clustering"],
        ["**Real-Time Monitoring**", "Blocks in **<1.2s** with auto-escalation"]
      ]},
      { type: "blockquote", text: `_“We stopped a $14M synthetic identity ring in 47 seconds.”_ – CISO, Tier-1 Global Bank` },
      { type: "divider" },
      { type: "heading", level: 2, text: "Section 4: Customer Expectations & Service Outcomes" },
      { type: "paragraph", text: `CFOs and regulators demand **zero-tolerance fraud** with **zero friction**. **QDF delivers:**` },
      { type: "table", headers: ["Outcome", "QDF Advantage"], rows: [
        ["**Loss Prevention**", "**63% reduction** in confirmed fraud"],
        ["**False Positives**", "**<0.03%** (vs. industry 8.7%)"],
        ["**Audit Readiness**", "Auto-generated **QGPT fraud reports** in PDF/NLP"],
        ["**Scalability**", "Processes **2.1M TPS** with **99.999% uptime**"]
      ]},
      { type: "image", url: "https://via.placeholder.com/600x300?text=QDF+Live+Fraud+Heatmap+-+Anomaly+Score+by+Region", alt: "QDF Real-Time Dashboard", caption: "(Live view: Risk scoring across 42 payment corridors.)" },
      { type: "divider" },
      { type: "heading", level: 2, text: "Section 5: The Path Forward for Modern Banks" },
      { type: "paragraph", text: `**QDF isn’t a tool—it’s Fraud OS.** Deploy in **72 hours** with:` },
      { type: "list", ordered: true, items: [
        "**Zero-code onboarding**: Connect via API, SFTP, or SWIFT.",
        "**Self-evolving models**: Retrain nightly on **your** data (no PII exposure).",
        "**QGPT Explainer**: “Why was this blocked?” in **natural language**.",
        "**Banker + Compliance Dashboards**: Drill-down from $14M alert to root txn."
      ]},
      { type: "blockquote", text: `Unlike brittle rules engines, **QDF adapts before the next attack lands**.` },
      { type: "divider" },
      { type: "heading", level: 2, text: "Conclusion" },
      { type: "paragraph", text: `In 2025, **fraud isn’t a cost center—it’s an existential risk**.  
**Quantum Data Fraud** is the **only platform** fusing **agentic AI, generative modeling, and real-time orchestration** to deliver **preemptive, scalable, explainable defense**.` },
      { type: "blockquote", text: `**Rules react. QDF predicts. You win.**` },
      { type: "divider" },
      { type: "heading", level: 2, text: "Call-to-Action" },
      { type: "paragraph", text: `**Secure your payments. Now.**  
Book a **15-minute QDF Threat Scan** and see live fraud vectors in your transaction flow.` },
      { type: "paragraph", text: `[https://qdf.ai/demo](https://qdf.ai/demo) | **Download:** *“The $48B Fraud Tsunami: How AI Stops It”* whitepaper` },
    ],
  },
  3: {
    title: "Master Payment Data Sovereignty: Why Quantum Data Leap (QDL) Delivers Ironclad Control in an ISO 20022 World",
    category: "Payments & Compliance",
    author: "Klaus Richter",
    authorRole: "Chief Compliance Architect, QDL",
    publishedDate: "March 17, 2025",
    readTime: "14 min read",
    imageUrl:
      "https://via.placeholder.com/600x350?text=QDL+On-Prem+vs+Cloud+AI:+0%25+Data+Exposure",
    executiveSummary: `**Quantum Data Leap (QDL)** empowers banks with **agentic AI auto-correction, local QGPT, and zero-trust RAG**—ensuring **100% on-prem data residency** while achieving **94% STP uplift** and **zero external LLM exposure**. Unlike cloud AI platforms that risk €4M+ GDPR fines per breach, QDL’s **autonomous, self-healing message engine** repairs 142+ ISO 20022 fields in **<400ms**, all within your firewall. For institutions processing **15M+ messages daily**, QDL slashes compliance rework by **$22.3M** and audit cycles by **89%** (QDL Internal Benchmark, Q1 2025).`,
    content: [
      { type: "heading", level: 2, text: "Introduction" },
      { type: "paragraph", text: `In 2025, **data control is non-negotiable**. ISO 20022’s structured richness amplifies PII exposure, while regulators demand **real-time auditability** and **sovereign AI**. **Quantum Data Leap** transforms payment data from liability to fortress: **Agentic AI runs locally**, learning from *your* golden source, repairing messages, and generating compliant insights—**without ever phoning home**. No cloud. No leaks. Just **unbreakable governance**.` },
      { type: "divider" },
      { type: "heading", level: 2, text: "Section 1: Current Landscape & Market Pressure" },
      { type: "paragraph", text: `Global data fines reached **€4.7 billion in 2025** (ENISA), with **67% tied to unstructured payment fields** (ISO 20022 Compliance Report). Meanwhile, **93% of AI payment tools rely on public LLMs**—exposing UETR, LEI, and remittance data to third-party training (OWASP AI Security).` },
      { type: "paragraph", text: `**QDL locks it down with:**` },
      { type: "list", items: [
        "**Local SLM + QGPT**: Fully on-prem generative AI—**no external inference**.",
        "**RAG-isolated knowledge base**: Repairs using **your** sanctioned BIC/LEI registry.",
        "**Agentic autonomy**: Self-corrects **97.8%** of schema + business rule violations."
      ]},
      { type: "image", url: "https://via.placeholder.com/600x350?text=QDL+On-Prem+vs+Cloud+AI:+0%25+Data+Exposure", alt: "QDL Data Sovereignty Fortress", caption: "(Source: QDL Security Labs, 2025; QDL vs. leading cloud AI payment platforms.)" },
      { type: "divider" },
      { type: "heading", level: 2, text: "Section 2: ISO 20022 & The Data Opportunity" },
      { type: "paragraph", text: `ISO 20022 isn’t just format—it’s **governance gold**. **QDL ingests full pacs.008/camt.053 payloads** and:` },
      { type: "list", items: [
        "**Auto-enriches 142+ fields**: BIC, UETR, structured remittance, purpose codes.",
        "**Enforces dynamic rules**: Prevents sanctioned name variants pre-submission.",
        "**QGPT redaction engine**: Anonymizes PII before archival—**GDPR/CCPA by design**."
      ]},
      { type: "blockquote", text: `**Legacy DQM validates syntax. QDL enforces semantics.**  
**99.97% first-pass compliance**.` },
      { type: "divider" },
      { type: "heading", level: 2, text: "Section 3: Why Traditional Monitoring Isn’t Enough" },
      { type: "paragraph", text: `Static validation rules **break on Day 2**. A malformed <CdtrAgt>? Rejected. Missing <RmtInf>? Manual fix.  
**QDL’s agentic control stack** operates at machine speed:` },
      { type: "table", headers: ["Governance Layer", "QDL Advantage"], rows: [
        ["**Agentic Auto-Correction**", "Repairs **97.8%** of ISO errors in-flight"],
        ["**Local RAG + SLM**", "Contextual repair from **your** data—no external LLM"],
        ["**Policy Drift Detection**", "Flags schema creep (e.g., new purpose code)"],
        ["**Immutable Audit Trail**", "QGPT-explained logs: '*Fixed BIC mismatch using internal registry*'"],
        ["**Zero Data Exfiltration**", "**100% on-prem**—even model updates stay internal"]
      ]},
      { type: "blockquote", text: `_“We cut ISO rework from 1,200 hours to 47 minutes monthly.”_ – Head of Payments Ops, EU Tier-1 Bank` },
      { type: "divider" },
      { type: "heading", level: 2, text: "Section 4: Customer Expectations & Service Outcomes" },
      { type: "paragraph", text: `CROs and regulators demand **sovereignty + speed**. **QDL delivers:**` },
      { type: "table", headers: ["Outcome", "QDL Advantage"], rows: [
        ["**Compliance**", "**0 fines** in 2025 (vs. industry avg. €2.9M)"],
        ["**STP Rate**", "**+94%** first-time pass"],
        ["**Audit Velocity**", "**89% faster** with QGPT natural-language narratives"],
        ["**Control**", "Full admin over **RAG sources, repair logic, SLM weights**"]
      ]},
      { type: "image", url: "https://via.placeholder.com/600x300?text=QDL+Live+Data+Quality+Heatmap+-+ISO+Field+Compliance", alt: "QDL Governance Dashboard", caption: "(Live view: Real-time field-level compliance across 41 corridors.)" },
      { type: "divider" },
      { type: "heading", level: 2, text: "Section 5: The Path Forward for Modern Banks" },
      { type: "paragraph", text: `**QDL isn’t a validator—it’s Data Control OS.** Deploy in **48 hours** with:` },
      { type: "list", ordered: true, items: [
        "**Air-gapped install**: On-prem, private cloud, or hybrid—**your infrastructure**.",
        "**No-code policy studio**: Drag-drop ISO field rules + RAG sources.",
        "**QGPT Query**: “Show all unrepaired LEI mismatches” → **PDF in 2.1s**.",
        "**Agentic Console**: Watch AI repair messages live—**explainable, auditable**."
      ]},
      { type: "blockquote", text: `Unlike cloud AI that **monetizes your data**, **QDL ensures you own it—forever**.` },
      { type: "divider" },
      { type: "heading", level: 2, text: "Conclusion" },
      { type: "paragraph", text: `In 2025, **data control defines trust**.  
**Quantum Data Leap** is the **only platform** delivering **agentic auto-correction, local generative AI, and zero-trust RAG** to govern, enrich, and secure payment data **entirely within your perimeter**.` },
      { type: "blockquote", text: `**Cloud AI exposes. QDL protects. You lead.**` },
      { type: "divider" },
      { type: "heading", level: 2, text: "Call-to-Action" },
      { type: "paragraph", text: `**Reclaim your data.**  
Book a **30-minute QDL Sovereignty Scan** and see live PII and compliance risks in your ISO 20022 flow.` },
      { type: "paragraph", text: `[https://qdl.ai/control-scan](https://qdl.ai/control-scan) | **Download:** *“The €4.7B Data Control Imperative”* whitepaper` },
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



