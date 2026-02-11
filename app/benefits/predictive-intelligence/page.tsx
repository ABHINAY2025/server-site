'use client'

import { motion } from 'framer-motion'

export default function PredictiveIntelligencePage() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-full mx-0 px-4 sm:px-6 lg:px-8 py-8 space-y-12"
    >
      <header className="w-full pt-2">
        <h1 className="text-4xl font-bold lg:text-5xl">Predictive Intelligence</h1>
        <p className="mt-2 text-lg text-slate-600">Anticipate Risk. Forecast Outcomes. Act Before Impact.</p>

        <p className="mt-6 text-slate-700">
          Predictive Intelligence is the cognitive core of QDL (Quantum Data Leap). It transforms historical data, real-time signals, and behavioral patterns into forward-looking intelligence that enables banks to move from reactive decision-making to anticipatory, outcome-driven operations.
        </p>

        <p className="mt-4 text-slate-700">
          By combining machine learning, time-series forecasting, behavioral modeling, and agentic AI, QDL empowers financial institutions to predict liquidity stress, fraud escalation, compliance breaches, and operational bottlenecks—before they materialize.
        </p>

        <p className="mt-4 text-slate-700">
          Predictive Intelligence ensures that decisions are not just informed by what has happened, but optimized for what will happen next.
        </p>
      </header>

      <section className="w-full px-4 lg:px-12">
        <h2 className="text-2xl font-semibold">What Predictive Intelligence Does</h2>
        <p className="mt-4 text-slate-700">
          QDL continuously ingests and correlates data across core banking systems, transaction streams, customer behavior, market indicators, and regulatory inputs to generate actionable foresight.
        </p>

        <p className="mt-4 text-slate-700">It enables banks to:</p>
        <ul className="mt-4 text-slate-700 list-disc list-inside space-y-2">
          <li>Anticipate liquidity gaps and funding risks</li>
          <li>Forecast fraud attempts and emerging attack patterns</li>
          <li>Predict data quality failures and reconciliation breaks</li>
          <li>Identify compliance exposure before regulatory deadlines</li>
          <li>Optimize capital, cash, and operational resources proactively</li>
        </ul>

        <h3 className="mt-8 text-xl font-semibold">Core Capabilities</h3>
        <ol className="list-decimal list-inside space-y-6 mt-4 text-slate-700">
          <li>
            <strong>Advanced Forecasting Models</strong>
            <div className="mt-3 ml-4">
              QDL uses multi-layer forecasting techniques tailored for financial systems:
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Time-series forecasting for cash flows, balances, and transaction volumes</li>
                <li>Scenario-based projections for stress testing and volatility modeling</li>
                <li>Seasonal, cyclical, and event-driven pattern recognition</li>
                <li>Confidence intervals and probability-weighted outcomes</li>
              </ul>
              <p className="mt-2">These models continuously self-adjust using new data, ensuring accuracy even under volatile market conditions.</p>
            </div>
          </li>

          <li>
            <strong>Behavioral & Pattern Prediction</strong>
            <div className="mt-3 ml-4">
              Predictive Intelligence goes beyond numbers by modeling behavioral signals across customers, accounts, and transactions:
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Anticipates anomalous customer or account behavior</li>
                <li>Predicts fraud escalation paths and attack sequencing</li>
                <li>Identifies early indicators of account takeover or mule activity</li>
                <li>Detects drift in customer usage patterns impacting risk scores</li>
              </ul>
              <p className="mt-2">This enables preemptive controls without disrupting legitimate activity.</p>
            </div>
          </li>

          <li>
            <strong>Liquidity & Treasury Forecasting</strong>
            <div className="mt-3 ml-4">
              QDL predicts liquidity dynamics at both macro and micro levels:
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Intraday and multi-day cash position forecasts</li>
                <li>Anticipated funding shortfalls or surplus accumulation</li>
                <li>Early warnings on LCR / NSFR pressure points</li>
                <li>Forecast-driven reserve and buffer optimization</li>
              </ul>
              <p className="mt-2">Treasury teams gain decision lead time, not just reports.</p>
            </div>
          </li>

          <li>
            <strong>Predictive Risk Scoring</strong>
            <div className="mt-3 ml-4">
              Instead of static risk thresholds, QDL assigns dynamic, forward-looking risk scores based on projected behavior:
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Accounts likely to breach risk tolerances</li>
                <li>Transactions likely to escalate into fraud or AML cases</li>
                <li>Vendors or counterparties likely to become non-compliant</li>
                <li>Operational processes likely to fail SLAs or controls</li>
              </ul>
              <p className="mt-2">Risk teams can intervene before escalation, reducing losses and false positives.</p>
            </div>
          </li>

          <li>
            <strong>Explainable & Auditable Predictions</strong>
            <div className="mt-3 ml-4">
              All predictions generated by QDL are:
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Explainable with clear contributing factors</li>
                <li>Traceable back to data sources and model logic</li>
                <li>Logged for audit and regulatory transparency</li>
                <li>Configurable based on institution-specific risk appetite</li>
              </ul>
              <p className="mt-2">This ensures predictive models remain compliant with model risk management (MRM) and regulatory expectations.</p>
            </div>
          </li>
        </ol>
      </section>

      <section className="w-full px-4 lg:px-12">
        <h3 className="text-xl font-semibold">Key Banking Use Cases</h3>

        <div className="grid gap-6 sm:grid-cols-2 mt-6">
          <div className="rounded-lg border bg-white/60 p-4">
            <h4 className="font-semibold">Predictive Liquidity Risk Management</h4>
            <ul className="mt-3 text-slate-700 list-disc list-inside space-y-2">
              <li>Forecast intraday and end-of-day liquidity positions</li>
              <li>Identify future funding stress scenarios</li>
              <li>Optimize inter-entity fund transfers in advance</li>
              <li>Reduce idle cash while maintaining regulatory buffers</li>
            </ul>
          </div>

          <div className="rounded-lg border bg-white/60 p-4">
            <h4 className="font-semibold">Predictive Fraud Prevention</h4>
            <ul className="mt-3 text-slate-700 list-disc list-inside space-y-2">
              <li>Detect transactions likely to become fraudulent before execution</li>
              <li>Anticipate coordinated fraud attacks or campaign patterns</li>
              <li>Predict false-positive spikes and adjust controls dynamically</li>
              <li>Enable preventive holds instead of post-event recovery</li>
            </ul>
          </div>

          <div className="rounded-lg border bg-white/60 p-4">
            <h4 className="font-semibold">Predictive Compliance & AML</h4>
            <ul className="mt-3 text-slate-700 list-disc list-inside space-y-2">
              <li>Forecast AML alert surges and investigator workload</li>
              <li>Identify customers likely to breach KYC or sanctions thresholds</li>
              <li>Predict regulatory reporting inconsistencies before submission</li>
              <li>Reduce compliance surprises during audits and examinations</li>
            </ul>
          </div>

          <div className="rounded-lg border bg-white/60 p-4">
            <h4 className="font-semibold">Predictive Data Quality & Operations</h4>
            <ul className="mt-3 text-slate-700 list-disc list-inside space-y-2">
              <li>Identify data pipelines likely to break or drift</li>
              <li>Forecast reconciliation mismatches across systems</li>
              <li>Predict operational bottlenecks and SLA failures</li>
              <li>Improve system resilience through early remediation</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="w-full px-4 lg:px-12">
        <h3 className="text-xl font-semibold">How It Works (High-Level Flow)</h3>
        <ol className="list-decimal list-inside space-y-4 mt-4 text-slate-700">
          <li><strong>Data Ingestion:</strong> Core banking, payments, customer data, market feeds, regulatory inputs</li>
          <li><strong>Signal Correlation:</strong> Cross-domain pattern analysis and feature extraction</li>
          <li><strong>Predictive Modeling:</strong> AI models generate probability-based future outcomes</li>
          <li><strong>Intelligent Recommendations:</strong> Agentic AI suggests actions aligned to risk and business goals</li>
          <li><strong>Continuous Learning:</strong> Models self-improve using outcomes and feedback loops</li>
        </ol>

        <h3 className="mt-8 text-xl font-semibold">Business Impact</h3>
        <div className="mt-4 space-y-6">
          <div>
            <h4 className="font-semibold">Strategic Advantages</h4>
            <ul className="mt-3 text-slate-700 list-disc list-inside space-y-2">
              <li>Move from reactive firefighting to proactive governance</li>
              <li>Gain early-warning systems across risk, liquidity, and compliance</li>
              <li>Improve capital efficiency and operational resilience</li>
              <li>Reduce losses, false positives, and regulatory exposure</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Measurable Outcomes</h4>
            <ul className="mt-3 text-slate-700 list-disc list-inside space-y-2">
              <li>Fewer surprise liquidity events</li>
              <li>Lower fraud losses and customer friction</li>
              <li>Reduced compliance remediation costs</li>
              <li>Faster, more confident executive decision-making</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Designed for Enterprise Banking</h4>
            <ul className="mt-3 text-slate-700 list-disc list-inside space-y-2">
              <li>Works across multi-entity, multi-currency environments</li>
              <li>Integrates seamlessly with core banking, ERP, TMS, and payment rails</li>
              <li>Supports high-volume, low-latency prediction at scale</li>
              <li>Built with banking-grade security, governance, and controls</li>
            </ul>
          </div>
        </div>

        <h3 className="mt-8 text-xl font-semibold">Why Predictive Intelligence with QDL</h3>
        <p className="mt-4 text-slate-700">
          <strong>Traditional analytics explain the past. QDL's Predictive Intelligence shapes the future.</strong>
        </p>
        <p className="mt-4 text-slate-700">
          By embedding foresight directly into operational workflows, QDL enables banks to anticipate risk, optimize resources, and act with confidence in an uncertain financial landscape.
        </p>
      </section>
    </motion.article>
  )
}
