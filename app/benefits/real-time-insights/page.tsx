'use client'

import { motion } from 'framer-motion'

export default function RealTimeInsightsPage() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-full mx-0 px-4 sm:px-6 lg:px-8 py-8 space-y-12"
    >
      <header className="w-full pt-2">
        <h1 className="text-4xl font-bold lg:text-5xl">Real-Time Insights</h1>
        <p className="mt-2 text-lg text-slate-600">See What's Happening Now. Act Before It's Too Late.</p>

        <p className="mt-6 text-slate-700">
          Real-Time Insights is QDL's always-on intelligence layer that delivers instant visibility across transactions, liquidity, risk, and compliance—as events unfold.
        </p>

        <p className="mt-4 text-slate-700">
          Instead of relying on delayed reports or batch-driven dashboards, QDL streams live data from core banking systems, payment rails, market feeds, and behavioral signals to generate continuous, actionable insight in milliseconds.
        </p>

        <p className="mt-4 text-slate-700">
          This enables banks to respond to emerging risks, opportunities, and anomalies at the speed of modern finance.
        </p>
      </header>

      <section className="w-full px-4 lg:px-12">
        <h2 className="text-2xl font-semibold">Why Real-Time Matters in Banking</h2>
        <p className="mt-4 text-slate-700">
          Banking risks and opportunities no longer develop over days—they emerge in seconds.
        </p>

        <ul className="mt-4 text-slate-700 list-disc list-inside space-y-2">
          <li>Liquidity gaps can form intraday</li>
          <li>Fraud attacks escalate in minutes</li>
          <li>Data inconsistencies propagate instantly</li>
          <li>Regulatory thresholds can be breached mid-cycle</li>
        </ul>

        <p className="mt-4 text-slate-700">
          Real-Time Insights ensures decision-makers are never blind between reporting intervals.
        </p>

        <h3 className="mt-8 text-xl font-semibold">Core Capabilities</h3>
        <ol className="list-decimal list-inside space-y-6 mt-4 text-slate-700">
          <li>
            <strong>Live Data Streaming & Event Processing</strong>
            <div className="mt-3 ml-4">
              QDL ingests and processes high-velocity data in real time:
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Core banking transactions and balances</li>
                <li>Payment rails (ACH, wires, RTP, cards)</li>
                <li>Treasury positions and cash movements</li>
                <li>Customer behavior and session activity</li>
                <li>Market indicators and external signals</li>
              </ul>
              <p className="mt-2">Events are processed continuously, not in batches.</p>
            </div>
          </li>

          <li>
            <strong>Instant Anomaly & Risk Detection</strong>
            <div className="mt-3 ml-4">
              Real-Time Insights continuously evaluates live data to detect:
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Sudden liquidity drains or concentration risk</li>
                <li>Abnormal transaction velocity or value spikes</li>
                <li>Behavioral deviations signaling fraud or account takeover</li>
                <li>Data integrity issues and reconciliation mismatches</li>
              </ul>
              <p className="mt-2">Alerts are generated as risk emerges, not after settlement.</p>
            </div>
          </li>

          <li>
            <strong>Intraday Liquidity Visibility</strong>
            <div className="mt-3 ml-4">
              Treasury teams gain minute-by-minute awareness of:
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Intraday cash positions across entities and currencies</li>
                <li>Payment inflow and outflow patterns</li>
                <li>Funding utilization and buffer consumption</li>
                <li>Early warnings on LCR / NSFR pressure</li>
              </ul>
              <p className="mt-2">This supports proactive cash and funding decisions throughout the day.</p>
            </div>
          </li>

          <li>
            <strong>Real-Time Decision Triggers</strong>
            <div className="mt-3 ml-4">
              Insights are automatically connected to action:
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Trigger transaction holds or step-up authentication</li>
                <li>Initiate liquidity transfers or funding actions</li>
                <li>Route cases to investigators or operations teams</li>
                <li>Activate rules or policy enforcement dynamically</li>
              </ul>
              <p className="mt-2">Insights do not stop at observation—they drive immediate response.</p>
            </div>
          </li>

          <li>
            <strong>Unified Live Dashboards</strong>
            <div className="mt-3 ml-4">
              QDL presents real-time intelligence through:
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Live dashboards with streaming metrics</li>
                <li>Dynamic heatmaps and trend indicators</li>
                <li>Drill-down views into transactions and entities</li>
                <li>Role-based views for executives, treasury, risk, and compliance</li>
              </ul>
              <p className="mt-2">Users see a single source of truth, updated continuously.</p>
            </div>
          </li>
        </ol>
      </section>

      <section className="w-full px-4 lg:px-12">
        <h3 className="text-xl font-semibold">Key Use Cases Across Banking</h3>

        <div className="grid gap-6 sm:grid-cols-2 mt-6">
          <div className="rounded-lg border bg-white/60 p-4">
            <h4 className="font-semibold">Real-Time Fraud Prevention</h4>
            <ul className="mt-3 text-slate-700 list-disc list-inside space-y-2">
              <li>Stop fraudulent payments before completion</li>
              <li>Detect coordinated attacks as they form</li>
              <li>Reduce false declines with contextual insight</li>
              <li>Protect customers without friction</li>
            </ul>
          </div>

          <div className="rounded-lg border bg-white/60 p-4">
            <h4 className="font-semibold">Real-Time Liquidity & Treasury Management</h4>
            <ul className="mt-3 text-slate-700 list-disc list-inside space-y-2">
              <li>Monitor intraday funding needs</li>
              <li>Respond to unexpected cash outflows</li>
              <li>Optimize liquidity buffers dynamically</li>
              <li>Maintain regulatory compliance in real time</li>
            </ul>
          </div>

          <div className="rounded-lg border bg-white/60 p-4">
            <h4 className="font-semibold">Real-Time Data Quality & Operations</h4>
            <ul className="mt-3 text-slate-700 list-disc list-inside space-y-2">
              <li>Detect data pipeline failures immediately</li>
              <li>Prevent reconciliation breaks from cascading</li>
              <li>Resolve operational exceptions faster</li>
              <li>Maintain trusted data across systems</li>
            </ul>
          </div>

          <div className="rounded-lg border bg-white/60 p-4">
            <h4 className="font-semibold">Real-Time Compliance Oversight</h4>
            <ul className="mt-3 text-slate-700 list-disc list-inside space-y-2">
              <li>Monitor regulatory thresholds continuously</li>
              <li>Identify breaches before reporting deadlines</li>
              <li>Track rule effectiveness live</li>
              <li>Support immediate remediation and documentation</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="w-full px-4 lg:px-12">
        <h3 className="text-xl font-semibold">How It Works (High-Level Flow)</h3>
        <ol className="list-decimal list-inside space-y-4 mt-4 text-slate-700">
          <li><strong>Live Event Ingestion:</strong> Streaming data from internal and external sources</li>
          <li><strong>Real-Time Analysis:</strong> AI models and rules evaluate events instantly</li>
          <li><strong>Contextual Correlation:</strong> Cross-domain signal enrichment</li>
          <li><strong>Immediate Insight & Alerts:</strong> Actionable intelligence delivered in milliseconds</li>
          <li><strong>Automated or Human Response:</strong> Integrated workflow execution</li>
        </ol>

        <h3 className="mt-8 text-xl font-semibold">Built for High-Scale Banking</h3>
        <ul className="mt-4 text-slate-700 list-disc list-inside space-y-2">
          <li>Handles millions of events per second</li>
          <li>Designed for low-latency, high-availability environments</li>
          <li>Supports multi-bank, multi-region architectures</li>
          <li>Integrates with core systems, payment rails, and data platforms</li>
        </ul>
      </section>

      <section className="w-full px-4 lg:px-12">
        <h3 className="text-xl font-semibold">Business Impact</h3>

        <div className="mt-6 space-y-6">
          <div>
            <h4 className="font-semibold">Operational Benefits</h4>
            <ul className="mt-3 text-slate-700 list-disc list-inside space-y-2">
              <li>Faster detection and response</li>
              <li>Reduced financial loss and operational disruption</li>
              <li>Improved system resilience</li>
              <li>Lower investigation and remediation costs</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Strategic Advantage</h4>
            <ul className="mt-3 text-slate-700 list-disc list-inside space-y-2">
              <li>Continuous situational awareness</li>
              <li>Confident, real-time decision-making</li>
              <li>Stronger regulatory posture</li>
              <li>Enhanced customer trust</li>
            </ul>
          </div>
        </div>

        <h3 className="mt-8 text-xl font-semibold">Why Real-Time Insights with QDL</h3>
        <p className="mt-4 text-slate-700">
          <strong>Reports tell you what happened. Dashboards show you what is happening. QDL's Real-Time Insights enables you to act while it's happening.</strong>
        </p>
        <p className="mt-4 text-slate-700">
          By embedding live intelligence into every banking workflow, QDL helps institutions stay ahead of risk, optimize performance, and operate with confidence in a real-time financial world.
        </p>
      </section>
    </motion.article>
  )
}
