'use client'

import { motion } from 'framer-motion'

export default function MultiBankIntegrationPage() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-full mx-0 px-4 sm:px-6 lg:px-8 py-8 space-y-12"
    >
      <header className="w-full pt-2">
        <h1 className="text-4xl font-bold lg:text-5xl">Multi-Bank Integration</h1>
        <p className="mt-2 text-lg text-slate-600">One Intelligence Layer. Many Banks. Zero Silos.</p>

        <p className="mt-6 text-slate-700">
          Multi-Bank Integration is QDL's unified connectivity and orchestration layer that enables financial institutions to seamlessly integrate, normalize, and govern data and workflows across multiple banks, entities, payment rails, and financial systems—through a single intelligent platform.
        </p>

        <p className="mt-4 text-slate-700">
          Whether operating across correspondent banks, subsidiaries, clearing partners, or external financial institutions, QDL eliminates fragmentation and provides real-time, consolidated visibility and control without disrupting existing infrastructure.
        </p>

        <p className="mt-4 text-slate-700">
          Modern financial institutions operate in highly distributed ecosystems. QDL transforms multi-bank complexity into cohesive, actionable intelligence.
        </p>
      </header>

      <section className="w-full px-4 lg:px-12">
        <h2 className="text-2xl font-semibold">Why Multi-Bank Integration Matters</h2>
        <p className="mt-4 text-slate-700">
          Financial institutions increasingly operate across multiple systems, banks, and payment networks. Without intelligent integration, this complexity results in:
        </p>

        <ul className="mt-4 text-slate-700 list-disc list-inside space-y-2">
          <li>Delayed visibility across institutions</li>
          <li>Inconsistent and fragmented data</li>
          <li>Manual reconciliation and operational burden</li>
          <li>Elevated operational and liquidity risk</li>
          <li>Duplicative compliance controls</li>
        </ul>

        <p className="mt-4 text-slate-700">
          QDL's Multi-Bank Integration layer solves this through unified connectivity, data normalization, and centralized governance.
        </p>

        <h3 className="mt-8 text-xl font-semibold">Core Capabilities</h3>
        <ol className="list-decimal list-inside space-y-6 mt-4 text-slate-700">
          <li>
            <strong>Unified Connectivity Framework</strong>
            <div className="mt-3 ml-4">
              QDL connects to diverse banking environments through secure, flexible interfaces:
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Core banking systems and processors</li>
                <li>SWIFT, ACH, RTP, wires, SEPA, cards, and local rails</li>
                <li>Treasury management systems (TMS) and ERPs</li>
                <li>External banks, custodians, and clearing partners</li>
              </ul>
              <p className="mt-2">Integration is non-intrusive and designed to coexist with existing systems.</p>
            </div>
          </li>

          <li>
            <strong>Data Normalization & Harmonization</strong>
            <div className="mt-3 ml-4">
              Multi-Bank Integration standardizes disparate data into a single canonical banking model:
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Normalizes transaction formats, balances, and account structures</li>
                <li>Resolves naming, currency, and timing inconsistencies</li>
                <li>Harmonizes data across geographies and institutions</li>
                <li>Ensures consistent interpretation across downstream analytics</li>
              </ul>
              <p className="mt-2">This creates a single, trusted view across banks.</p>
            </div>
          </li>

          <li>
            <strong>Cross-Bank Liquidity & Cash Visibility</strong>
            <div className="mt-3 ml-4">
              QDL enables real-time liquidity insight across multiple banks:
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Consolidated cash positions across institutions</li>
                <li>Intraday inflow and outflow monitoring</li>
                <li>Inter-bank fund movement visibility</li>
                <li>Forecasting across fragmented accounts</li>
              </ul>
              <p className="mt-2">Treasury teams can manage liquidity holistically instead of bank-by-bank.</p>
            </div>
          </li>

          <li>
            <strong>Cross-Institution Risk & Fraud Intelligence</strong>
            <div className="mt-3 ml-4">
              Threats rarely stay within one bank. QDL correlates intelligence across institutions to:
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Detect cross-bank fraud patterns and mule networks</li>
                <li>Identify coordinated transaction behavior</li>
                <li>Correlate risk signals across accounts and entities</li>
                <li>Strengthen defenses without sharing raw sensitive data</li>
              </ul>
              <p className="mt-2">This enables ecosystem-level protection.</p>
            </div>
          </li>

          <li>
            <strong>Centralized Governance & Controls</strong>
            <div className="mt-3 ml-4">
              QDL provides centralized oversight across all integrated banks:
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Unified rule enforcement across institutions</li>
                <li>Consistent AML/KYC and compliance controls</li>
                <li>Central audit logging and traceability</li>
                <li>Institution-specific policies with global governance</li>
              </ul>
              <p className="mt-2">Control remains centralized—even as operations remain distributed.</p>
            </div>
          </li>
        </ol>
      </section>

      <section className="w-full px-4 lg:px-12">
        <h3 className="text-xl font-semibold">Key Use Cases Across Banking</h3>

        <div className="grid gap-6 sm:grid-cols-2 mt-6">
          <div className="rounded-lg border bg-white/60 p-4">
            <h4 className="font-semibold">Multi-Bank Treasury & Liquidity Management</h4>
            <ul className="mt-3 text-slate-700 list-disc list-inside space-y-2">
              <li>Consolidated cash and liquidity dashboards</li>
              <li>Optimized fund allocation across banking partners</li>
              <li>Reduced idle balances and funding costs</li>
              <li>Real-time response to liquidity stress</li>
            </ul>
          </div>

          <div className="rounded-lg border bg-white/60 p-4">
            <h4 className="font-semibold">Multi-Bank Payment Operations</h4>
            <ul className="mt-3 text-slate-700 list-disc list-inside space-y-2">
              <li>End-to-end visibility across payment rails</li>
              <li>Unified exception handling and reconciliation</li>
              <li>Faster settlement issue resolution</li>
              <li>Improved operational efficiency</li>
            </ul>
          </div>

          <div className="rounded-lg border bg-white/60 p-4">
            <h4 className="font-semibold">Cross-Bank Fraud & Financial Crime Defense</h4>
            <ul className="mt-3 text-slate-700 list-disc list-inside space-y-2">
              <li>Detect coordinated fraud across banks</li>
              <li>Identify mule accounts and laundering chains</li>
              <li>Improve fraud accuracy without duplicative alerts</li>
              <li>Strengthen ecosystem-wide resilience</li>
            </ul>
          </div>

          <div className="rounded-lg border bg-white/60 p-4">
            <h4 className="font-semibold">Regulatory & Compliance Oversight</h4>
            <ul className="mt-3 text-slate-700 list-disc list-inside space-y-2">
              <li>Consistent compliance controls across institutions</li>
              <li>Simplified regulatory reporting</li>
              <li>Easier audits with centralized evidence</li>
              <li>Faster response to regulatory inquiries</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="w-full px-4 lg:px-12">
        <h3 className="text-xl font-semibold">How It Works (High-Level Flow)</h3>
        <ol className="list-decimal list-inside space-y-4 mt-4 text-slate-700">
          <li><strong>Secure Integration:</strong> Connects to banks and systems via APIs, messaging, or files</li>
          <li><strong>Normalization Layer:</strong> Converts all data into a unified banking schema</li>
          <li><strong>Real-Time Processing:</strong> Streams data into QDL intelligence engines</li>
          <li><strong>Cross-Bank Intelligence:</strong> Correlates signals across institutions</li>
          <li><strong>Centralized Action & Governance:</strong> Drives decisions, controls, and workflows</li>
        </ol>

        <h3 className="mt-8 text-xl font-semibold">Built for Complex Banking Ecosystems</h3>
        <ul className="mt-4 text-slate-700 list-disc list-inside space-y-2">
          <li>Supports multi-entity, multi-currency, multi-jurisdiction operations</li>
          <li>Designed for high-volume, high-availability environments</li>
          <li>Scales from regional banks to global institutions</li>
          <li>Integrates with legacy, modern, and hybrid architectures</li>
        </ul>

        <h3 className="mt-8 text-xl font-semibold">Security & Compliance by Design</h3>
        <ul className="mt-4 text-slate-700 list-disc list-inside space-y-2">
          <li>Bank-grade encryption and secure connectivity</li>
          <li>Data segregation and tenant-level controls</li>
          <li>Full audit trails and regulatory transparency</li>
          <li>Alignment with global security and compliance standards</li>
        </ul>
      </section>

      <section className="w-full px-4 lg:px-12">
        <h3 className="text-xl font-semibold">Business Impact</h3>

        <div className="mt-6 space-y-6">
          <div>
            <h4 className="font-semibold">Operational Benefits</h4>
            <ul className="mt-3 text-slate-700 list-disc list-inside space-y-2">
              <li>Reduced reconciliation effort and manual processing</li>
              <li>Faster visibility across institutions</li>
              <li>Lower operational and liquidity risk</li>
              <li>Simplified integration maintenance</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Strategic Value</h4>
            <ul className="mt-3 text-slate-700 list-disc list-inside space-y-2">
              <li>Holistic view of enterprise-wide financial position</li>
              <li>Better partner and correspondent bank management</li>
              <li>Improved regulatory confidence</li>
              <li>Strong foundation for expansion and scalability</li>
            </ul>
          </div>
        </div>

        <h3 className="mt-8 text-xl font-semibold">Why Multi-Bank Integration with QDL</h3>
        <p className="mt-4 text-slate-700">
          <strong>Traditional integrations connect systems. QDL connects intelligence across institutions.</strong>
        </p>
        <p className="mt-4 text-slate-700">
          By unifying data, workflows, and governance across multiple banks, QDL enables financial institutions to operate as one cohesive ecosystem—without sacrificing autonomy, security, or compliance.
        </p>
      </section>
    </motion.article>
  )
}
