'use client'

import { motion } from 'framer-motion'

export default function AutomatedWorkflowsPage() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-full mx-0 px-4 sm:px-6 lg:px-8 py-8 space-y-12"
    >
      <header className="w-full pt-2">

        <h1 className="text-4xl font-bold lg:text-5xl">Automated Workflows</h1>
        <p className="mt-2 text-lg text-slate-600">Intelligent Orchestration Across Banking Operations</p>

        <p className="mt-6 text-slate-700">
          Banks operate in an environment of high transaction volumes, regulatory scrutiny, and fragmented legacy systems. Manual workflows,
          rule-based automation, and disconnected tools introduce delays, operational risk, and compliance exposure.
        </p>

        <p className="mt-4 text-slate-700">
          QDL’s Automated Workflows introduce an AI-orchestrated operating layer that automates, coordinates, and governs complex banking
          processes across data, liquidity, fraud, and compliance—without compromising control, explainability, or audit readiness.
        </p>
      </header>

      <section className="w-full px-4 lg:px-12">
        <h2 className="text-2xl font-semibold mt-8">End-to-End Intelligence Without Manual Friction</h2>
        <p className="text-slate-700">
          Modern banks operate across fragmented systems, manual handoffs, and exception-heavy processes. QDL’s Automated Workflows
          eliminate operational drag by orchestrating AI-driven actions across data, treasury, fraud, and compliance functions.
        </p>

        <h3 className="mt-6 text-xl font-semibold">What It Delivers</h3>
        <p className="text-slate-700">
          QDL automates complex banking workflows that traditionally require human intervention—while retaining explainability and control.
        </p>

        <h3 className="mt-6 text-xl font-semibold">Core Capabilities</h3>
        <ol className="list-decimal list-inside space-y-4 text-slate-700">
          <li>
            <strong>Event-Driven Workflow Triggers</strong>
            <div className="mt-2">QDL workflows activate automatically based on real-time signals such as data anomalies, liquidity threshold breaches, fraud score escalations, or regulatory events. No polling. No manual initiation.</div>
          </li>

          <li>
            <strong>Cross-Domain Orchestration</strong>
            <div className="mt-2">Connects core banking systems, payment rails, treasury platforms, ERP, fraud systems, and compliance tools so a single event can trigger coordinated actions across risk, treasury, and compliance.</div>
          </li>

          <li>
            <strong>AI-Driven Decision Nodes</strong>
            <div className="mt-2">Workflows include intelligent decision points that evaluate contextual risk, weigh historical outcomes, and select optimal resolution paths while keeping every decision explainable.</div>
          </li>

          <li>
            <strong>Intelligent Exception Management</strong>
            <div className="mt-2">QDL classifies, enriches, and resolves exceptions according to severity—auto-resolving low-risk cases and routing high-risk cases to the right teams with AI-generated context.</div>
          </li>

          <li>
            <strong>Human-in-the-Loop Governance</strong>
            <div className="mt-2">Embedded approvals, escalation thresholds, role-based permissions, and manual overrides with full audit logging ensure control and regulatory alignment.</div>
          </li>
        </ol>
      </section>

      <section className="w-full px-4 lg:px-12">
        <h3 className="text-xl font-semibold">Banking-Specific Workflow Use Cases</h3>

        <div className="grid gap-6 sm:grid-cols-2 mt-4">
          <div className="rounded-lg border bg-white/60 p-4">
            <h4 className="font-semibold">Data & Operations</h4>
            <ul className="mt-3 text-slate-700 list-disc list-inside">
              <li>Automated transaction reconciliation</li>
              <li>Vendor onboarding and master data validation</li>
              <li>Data quality remediation before regulatory reporting</li>
              <li>Break detection across ledgers and payment systems</li>
            </ul>
          </div>

          <div className="rounded-lg border bg-white/60 p-4">
            <h4 className="font-semibold">Treasury & Liquidity</h4>
            <ul className="mt-3 text-slate-700 list-disc list-inside">
              <li>Intraday cash positioning automation</li>
              <li>Liquidity buffer monitoring and rebalancing</li>
              <li>Automated inter-entity fund transfers</li>
              <li>Exception-driven treasury alerts and actions</li>
            </ul>
          </div>

          <div className="rounded-lg border bg-white/60 p-4">
            <h4 className="font-semibold">Fraud & Financial Crime</h4>
            <ul className="mt-3 text-slate-700 list-disc list-inside">
              <li>Automated fraud case creation and enrichment</li>
              <li>Transaction holds and real-time intervention workflows</li>
              <li>Correlation of fraud signals with AML typologies</li>
              <li>Investigator routing based on risk and expertise</li>
            </ul>
          </div>

          <div className="rounded-lg border bg-white/60 p-4">
            <h4 className="font-semibold">Compliance & Governance</h4>
            <ul className="mt-3 text-slate-700 list-disc list-inside">
              <li>AML alert lifecycle automation</li>
              <li>Rule breach detection and escalation</li>
              <li>Regulatory reporting readiness workflows</li>
              <li>Audit evidence generation and documentation tracking</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="w-full px-4 lg:px-12">
        <h3 className="text-xl font-semibold">Built for Scale, Speed, and Resilience</h3>
        <ul className="mt-4 text-slate-700 list-disc list-inside">
          <li>Real-Time Execution: Millisecond-level response times</li>
          <li>High Throughput: Designed for enterprise transaction volumes</li>
          <li>Cloud & On-Prem Ready: Flexible deployment models</li>
          <li>Resilient Architecture: Fault-tolerant, event-driven design</li>
        </ul>

        <h3 className="mt-6 text-xl font-semibold">Explainability & Audit Readiness</h3>
        <p className="text-slate-700">Every workflow action is logged, time-stamped, context-aware, and fully traceable—providing regulators and internal auditors with clear visibility into what happened, why it happened, and who approved it.</p>

        <h3 className="mt-6 text-xl font-semibold">Business Impact</h3>
        <ul className="mt-4 text-slate-700 list-disc list-inside">
          <li>Reduce manual operations and processing costs</li>
          <li>Shorten resolution times from hours to seconds</li>
          <li>Lower operational and compliance risk</li>
          <li>Improve consistency across global operations</li>
          <li>Enable teams to focus on high-value decision-making</li>
        </ul>

        <h3 className="mt-6 text-xl font-semibold">The QDL Advantage</h3>
        <p className="text-slate-700">Automated Workflows in QDL are not scripts—they are intelligent, adaptive operating processes that continuously learn, adapt, and optimize, forming the backbone of a modern, AI-powered banking operations platform.</p>
      </section>
    </motion.article>
  )
}
