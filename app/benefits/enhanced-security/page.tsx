'use client'

import { motion } from 'framer-motion'

export default function EnhancedSecurityPage() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-full mx-0 px-4 sm:px-6 lg:px-8 py-8 space-y-12"
    >
      <header className="w-full pt-2">
        <h1 className="text-4xl font-bold lg:text-5xl">Enhanced Security</h1>
        <p className="mt-2 text-lg text-slate-600">Intelligence-Driven Defense for Modern Banking Threats</p>

        <p className="mt-6 text-slate-700">
          Enhanced Security is QDL's unified, AI-powered security layer designed to protect financial institutions against evolving digital threats, financial crime, data compromise, and systemic risk.
        </p>

        <p className="mt-4 text-slate-700">
          Unlike perimeter-based or rules-only security models, QDL embeds continuous intelligence, behavioral analysis, and predictive controls directly into banking workflows—ensuring threats are identified, assessed, and neutralized before material damage occurs.
        </p>

        <p className="mt-4 text-slate-700">
          Enhanced Security safeguards transactions, identities, data, and infrastructure across channels, systems, and geographies.
        </p>
      </header>

      <section className="w-full px-4 lg:px-12">
        <h2 className="text-2xl font-semibold">Security Philosophy</h2>
        <p className="mt-4 text-slate-700">
          QDL is built on the principle that security must be adaptive, contextual, and invisible to legitimate users.
        </p>

        <p className="mt-4 text-slate-700">Our approach combines:</p>
        <ul className="mt-4 text-slate-700 list-disc list-inside space-y-2">
          <li>Preemptive detection instead of post-incident response</li>
          <li>Behavioral intelligence instead of static thresholds</li>
          <li>Zero-trust enforcement embedded into workflows</li>
          <li>Explainable AI aligned with regulatory expectations</li>
        </ul>

        <p className="mt-4 text-slate-700">
          Security becomes a continuous process—not a reactive control.
        </p>

        <h3 className="mt-8 text-xl font-semibold">Core Capabilities</h3>
        <ol className="list-decimal list-inside space-y-6 mt-4 text-slate-700">
          <li>
            <strong>Behavioral Intelligence & Continuous Authentication</strong>
            <div className="mt-3 ml-4">
              QDL continuously evaluates how users behave, not just who they claim to be.
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Behavioral biometrics (typing patterns, navigation flow, session rhythm)</li>
                <li>Device fingerprinting and environment consistency</li>
                <li>Session-level trust scoring updated in real time</li>
                <li>Continuous authentication without customer friction</li>
              </ul>
              <p className="mt-2">Suspicious deviations trigger adaptive controls before compromise occurs.</p>
            </div>
          </li>

          <li>
            <strong>Transaction-Level Threat Detection</strong>
            <div className="mt-3 ml-4">
              Enhanced Security analyzes transactions in motion, not after settlement.
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Real-time anomaly detection across payments, transfers, and trades</li>
                <li>Velocity analysis, pattern deviation, and contextual risk scoring</li>
                <li>Cross-channel correlation (web, mobile, branch, API)</li>
                <li>Detection of account takeover, authorized push payment fraud, and mule activity</li>
              </ul>
              <p className="mt-2">This enables millisecond-level intervention at the point of risk.</p>
            </div>
          </li>

          <li>
            <strong>AI-Driven Threat Intelligence</strong>
            <div className="mt-3 ml-4">
              QDL uses AI to identify known, unknown, and emerging threats.
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Unsupervised learning to detect previously unseen attack patterns</li>
                <li>Correlation of internal activity with external threat indicators</li>
                <li>Detection of coordinated attacks and fraud rings</li>
                <li>Continuous evolution as adversaries adapt</li>
              </ul>
              <p className="mt-2">Security controls improve automatically as threat landscapes change.</p>
            </div>
          </li>

          <li>
            <strong>Zero-Trust & Adaptive Access Controls</strong>
            <div className="mt-3 ml-4">
              Every request is evaluated dynamically based on context and risk.
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>No implicit trust for users, devices, or systems</li>
                <li>Risk-based step-up authentication</li>
                <li>Contextual access enforcement across APIs and services</li>
                <li>Automated revocation of privileges on risk escalation</li>
              </ul>
              <p className="mt-2">This minimizes blast radius and lateral movement within systems.</p>
            </div>
          </li>

          <li>
            <strong>Data Security & Integrity Protection</strong>
            <div className="mt-3 ml-4">
              QDL protects banking data at every stage of its lifecycle.
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Continuous validation of transaction and master data integrity</li>
                <li>Detection of unauthorized data manipulation or drift</li>
                <li>Protection against insider threats and privileged misuse</li>
                <li>Audit-ready data lineage and change tracking</li>
              </ul>
              <p className="mt-2">This ensures data remains accurate, complete, and trustworthy.</p>
            </div>
          </li>
        </ol>
      </section>

      <section className="w-full px-4 lg:px-12">
        <h3 className="text-xl font-semibold">Key Security Use Cases</h3>

        <div className="grid gap-6 sm:grid-cols-2 mt-6">
          <div className="rounded-lg border bg-white/60 p-4">
            <h4 className="font-semibold">Payment & Transaction Security</h4>
            <ul className="mt-3 text-slate-700 list-disc list-inside space-y-2">
              <li>Prevent real-time payment fraud across ACH, wires, RTP, cards, and wallets</li>
              <li>Detect abnormal transaction chains and velocity abuse</li>
              <li>Reduce false declines while stopping genuine threats</li>
              <li>Protect customers without disrupting experience</li>
            </ul>
          </div>

          <div className="rounded-lg border bg-white/60 p-4">
            <h4 className="font-semibold">Identity & Account Protection</h4>
            <ul className="mt-3 text-slate-700 list-disc list-inside space-y-2">
              <li>Prevent account takeovers and credential abuse</li>
              <li>Detect synthetic identities and identity cycling</li>
              <li>Continuous monitoring of session behavior</li>
              <li>Adaptive authentication aligned with risk level</li>
            </ul>
          </div>

          <div className="rounded-lg border bg-white/60 p-4">
            <h4 className="font-semibold">Fraud & Financial Crime Defense</h4>
            <ul className="mt-3 text-slate-700 list-disc list-inside space-y-2">
              <li>Detect fraud rings and coordinated attacks</li>
              <li>Correlate fraud signals with AML typologies</li>
              <li>Reduce investigator workload with smarter prioritization</li>
              <li>Prevent fraud escalation before financial loss</li>
            </ul>
          </div>

          <div className="rounded-lg border bg-white/60 p-4">
            <h4 className="font-semibold">Insider Threat & Privileged Access Risk</h4>
            <ul className="mt-3 text-slate-700 list-disc list-inside space-y-2">
              <li>Monitor abnormal employee or system behavior</li>
              <li>Detect misuse of privileged credentials</li>
              <li>Identify data exfiltration attempts</li>
              <li>Strengthen internal controls and accountability</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="w-full px-4 lg:px-12">
        <h3 className="text-xl font-semibold">Security Embedded Across QDL Modules</h3>
        <p className="mt-4 text-slate-700">
          Enhanced Security is not a standalone layer—it is woven into every QDL capability:
        </p>

        <ul className="mt-4 text-slate-700 list-disc list-inside space-y-2">
          <li><strong>Data Control:</strong> Protects data pipelines and reconciliation integrity</li>
          <li><strong>Liquidity Management:</strong> Secures treasury actions and fund movements</li>
          <li><strong>Fraud Detection:</strong> Enhances pattern recognition and preventive controls</li>
          <li><strong>Rules Management Bot:</strong> Ensures secure, compliant rule enforcement</li>
        </ul>

        <p className="mt-4 text-slate-700">
          Security intelligence flows across the entire platform.
        </p>

        <h3 className="mt-8 text-xl font-semibold">Regulatory & Compliance Alignment</h3>
        <p className="mt-4 text-slate-700">
          QDL's Enhanced Security is designed to meet global regulatory expectations:
        </p>

        <ul className="mt-4 text-slate-700 list-disc list-inside space-y-2">
          <li>Supports AML, KYC, and transaction monitoring frameworks</li>
          <li>Aligns with ISO 27001, SOC 2, and zero-trust principles</li>
          <li>Provides explainable AI outputs for audits and exams</li>
          <li>Maintains detailed security logs and forensic trails</li>
        </ul>

        <p className="mt-4 text-slate-700">
          This ensures security is both effective and defensible.
        </p>
      </section>

      <section className="w-full px-4 lg:px-12">
        <h3 className="text-xl font-semibold">Business Impact</h3>

        <div className="mt-6 space-y-6">
          <div>
            <h4 className="font-semibold">Operational Benefits</h4>
            <ul className="mt-3 text-slate-700 list-disc list-inside space-y-2">
              <li>Reduced fraud losses and security incidents</li>
              <li>Fewer false positives and customer disruptions</li>
              <li>Faster incident response and containment</li>
              <li>Lower operational and investigation costs</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Strategic Value</h4>
            <ul className="mt-3 text-slate-700 list-disc list-inside space-y-2">
              <li>Stronger customer trust and brand protection</li>
              <li>Improved regulatory confidence</li>
              <li>Resilient digital banking operations</li>
              <li>Future-proof defense against AI-driven threats</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Built for Enterprise-Scale Banking</h4>
            <ul className="mt-3 text-slate-700 list-disc list-inside space-y-2">
              <li>Handles millions of events per second with low latency</li>
              <li>Works across multi-bank, multi-entity, multi-region environments</li>
              <li>Integrates with SIEM, SOAR, IAM, and core banking systems</li>
              <li>Designed for high availability and fault tolerance</li>
            </ul>
          </div>
        </div>

        <h3 className="mt-8 text-xl font-semibold">Why Enhanced Security with QDL</h3>
        <p className="mt-4 text-slate-700">
          <strong>Traditional security tools react after damage is done. QDL's Enhanced Security prevents risk from becoming reality.</strong>
        </p>
        <p className="mt-4 text-slate-700">
          By unifying behavioral intelligence, predictive analytics, and adaptive controls, QDL enables banks to secure every interaction, every transaction, and every decision—without slowing innovation.
        </p>
      </section>
    </motion.article>
  )
}
