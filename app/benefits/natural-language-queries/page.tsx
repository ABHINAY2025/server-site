'use client'

import { motion } from 'framer-motion'

export default function NaturalLanguageQueriesPage() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-full mx-0 px-4 sm:px-6 lg:px-8 py-8 space-y-12"
    >
      <header className="w-full pt-2">
        <h1 className="text-4xl font-bold lg:text-5xl">Natural Language Queries</h1>
        <p className="mt-2 text-lg text-slate-600">Ask in Plain Language. Get Banking-Grade Intelligence.</p>

        <p className="mt-6 text-slate-700">
          Natural Language Queries (NLQ) enables users to interact with QDL (Quantum Data Leap) using simple, conversational language—without writing SQL, building dashboards, or navigating complex systems.
        </p>

        <p className="mt-4 text-slate-700">
          Powered by domain-trained AI and large language models tuned specifically for banking and regulatory contexts, NLQ converts everyday questions into secure, governed, and auditable data queries across core banking, liquidity, fraud, and compliance domains.
        </p>

        <p className="mt-4 text-slate-700">
          It democratizes access to intelligence while preserving enterprise-grade control.
        </p>
      </header>

      <section className="w-full px-4 lg:px-12">
        <h2 className="text-2xl font-semibold">Why Natural Language Matters in Banking</h2>
        <p className="mt-4 text-slate-700">
          Modern banks operate on vast, siloed datasets—accessible only to technical teams. This slows decisions, increases dependency on analysts, and limits insight visibility.
        </p>

        <p className="mt-4 text-slate-700">Natural Language Queries eliminates this friction by allowing:</p>
        <ul className="mt-4 text-slate-700 list-disc list-inside space-y-2">
          <li>Executives to ask strategic questions instantly</li>
          <li>Risk and compliance teams to investigate issues without technical mediation</li>
          <li>Operations teams to resolve exceptions faster</li>
          <li>Auditors and regulators to obtain transparent answers</li>
        </ul>

        <p className="mt-4 text-slate-700">
          Insight becomes immediate, explainable, and actionable.
        </p>

        <h3 className="mt-8 text-xl font-semibold">Core Capabilities</h3>
        <ol className="list-decimal list-inside space-y-6 mt-4 text-slate-700">
          <li>
            <strong>Plain-Language Questioning</strong>
            <div className="mt-3 ml-4">
              Users can ask questions naturally, such as:
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>"Which accounts show unusual liquidity stress today?"</li>
                <li>"Show transactions likely to escalate into fraud in the next 24 hours."</li>
                <li>"Which AML rules generated the most false positives last week?"</li>
                <li>"Why did our LCR dip below threshold yesterday?"</li>
              </ul>
              <p className="mt-2">QDL understands intent, context, and banking terminology—returning precise, trusted answers.</p>
            </div>
          </li>

          <li>
            <strong>Context-Aware Intelligence</strong>
            <div className="mt-3 ml-4">
              NLQ is not a generic chatbot. It understands banking semantics and relationships:
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Links customers, accounts, transactions, rules, and entities</li>
                <li>Interprets time horizons, thresholds, and regulatory language</li>
                <li>Understands roles (treasury vs compliance vs fraud)</li>
                <li>Applies domain-specific logic automatically</li>
              </ul>
              <p className="mt-2">Responses are relevant, accurate, and role-aware.</p>
            </div>
          </li>

          <li>
            <strong>Secure & Governed Query Execution</strong>
            <div className="mt-3 ml-4">
              Every natural language query is executed within strict enterprise controls:
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Role-based access and data entitlements</li>
                <li>Masking of sensitive customer information</li>
                <li>Full query traceability and audit logs</li>
                <li>Policy-aligned response generation</li>
              </ul>
              <p className="mt-2">This ensures insight access without compromising security or compliance.</p>
            </div>
          </li>

          <li>
            <strong>Explainable Results & Drill-Downs</strong>
            <div className="mt-3 ml-4">
              NLQ doesn't just return answers—it explains them.
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Clear reasoning behind insights and alerts</li>
                <li>Contributing data points and trends</li>
                <li>Ability to drill down into transactions or entities</li>
                <li>Transparent model explanations where AI is involved</li>
              </ul>
              <p className="mt-2">This builds trust across users and regulators alike.</p>
            </div>
          </li>

          <li>
            <strong>Conversational Exploration</strong>
            <div className="mt-3 ml-4">
              Users can refine insights through follow-up questions:
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>"Break this down by region."</li>
                <li>"Compare this with last month."</li>
                <li>"What changed after the rule update?"</li>
                <li>"Simulate impact if volume increases by 15%."</li>
              </ul>
              <p className="mt-2">Complex analysis becomes an intuitive dialogue, not a technical exercise.</p>
            </div>
          </li>
        </ol>
      </section>

      <section className="w-full px-4 lg:px-12">
        <h3 className="text-xl font-semibold">Key Use Cases Across Banking</h3>

        <div className="grid gap-6 sm:grid-cols-2 mt-6">
          <div className="rounded-lg border bg-white/60 p-4">
            <h4 className="font-semibold">Executive & Leadership Intelligence</h4>
            <ul className="mt-3 text-slate-700 list-disc list-inside space-y-2">
              <li>Instant visibility into risk, liquidity, and operational health</li>
              <li>Faster, data-backed strategic decisions</li>
              <li>Reduced dependency on dashboards and reports</li>
            </ul>
          </div>

          <div className="rounded-lg border bg-white/60 p-4">
            <h4 className="font-semibold">Risk, Fraud & AML Investigations</h4>
            <ul className="mt-3 text-slate-700 list-disc list-inside space-y-2">
              <li>Rapid case investigation without SQL or BI tools</li>
              <li>Faster root-cause analysis of alerts and anomalies</li>
              <li>Improved investigator productivity and confidence</li>
            </ul>
          </div>

          <div className="rounded-lg border bg-white/60 p-4">
            <h4 className="font-semibold">Treasury & Liquidity Analysis</h4>
            <ul className="mt-3 text-slate-700 list-disc list-inside space-y-2">
              <li>On-demand cash position insights</li>
              <li>Forecast explanations and scenario questions</li>
              <li>Real-time understanding of funding movements</li>
            </ul>
          </div>

          <div className="rounded-lg border bg-white/60 p-4">
            <h4 className="font-semibold">Compliance & Audit Support</h4>
            <ul className="mt-3 text-slate-700 list-disc list-inside space-y-2">
              <li>Transparent answers for internal and external audits</li>
              <li>Easy exploration of rule performance and regulatory exposure</li>
              <li>Audit-ready explanations with traceable logic</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="w-full px-4 lg:px-12">
        <h3 className="text-xl font-semibold">How It Works (High-Level Flow)</h3>
        <ol className="list-decimal list-inside space-y-4 mt-4 text-slate-700">
          <li><strong>User Question:</strong> Asked in plain English</li>
          <li><strong>Intent & Context Parsing:</strong> AI interprets banking meaning and scope</li>
          <li><strong>Secure Query Generation:</strong> Translates into governed data access</li>
          <li><strong>Intelligent Response:</strong> Returns insights, explanations, and visuals</li>
          <li><strong>Continuous Learning:</strong> Improves understanding based on feedback</li>
        </ol>

        <h3 className="mt-8 text-xl font-semibold">Built for Enterprise Banking</h3>
        <ul className="mt-4 text-slate-700 list-disc list-inside space-y-2">
          <li>Trained on banking, payments, risk, and regulatory language</li>
          <li>Supports multi-entity, multi-currency environments</li>
          <li>Integrates with core banking, data lakes, and analytics engines</li>
          <li>Scales securely across thousands of users</li>
        </ul>
      </section>

      <section className="w-full px-4 lg:px-12">
        <h3 className="text-xl font-semibold">Business Impact</h3>

        <div className="mt-6 space-y-6">
          <div>
            <h4 className="font-semibold">Operational Efficiency</h4>
            <ul className="mt-3 text-slate-700 list-disc list-inside space-y-2">
              <li>Faster insight discovery</li>
              <li>Reduced reliance on technical teams</li>
              <li>Shorter investigation and decision cycles</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Strategic Advantage</h4>
            <ul className="mt-3 text-slate-700 list-disc list-inside space-y-2">
              <li>Democratized intelligence across the organization</li>
              <li>Better alignment between business and data</li>
              <li>Increased confidence in AI-driven insights</li>
            </ul>
          </div>
        </div>

        <h3 className="mt-8 text-xl font-semibold">Why Natural Language Queries with QDL</h3>
        <p className="mt-4 text-slate-700">
          <strong>Traditional dashboards show what you thought to ask. Natural Language Queries lets you ask what actually matters—when it matters.</strong>
        </p>
        <p className="mt-4 text-slate-700">
          By turning conversational questions into compliant, auditable intelligence, QDL empowers banks to think faster, act smarter, and govern better in an increasingly complex financial environment.
        </p>
      </section>
    </motion.article>
  )
}
