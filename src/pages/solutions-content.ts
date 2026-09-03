/**
 * Landing pages built around what an ICP actually searches for.
 *
 * Each one answers a single query rather than restating the home page, because
 * a page that repeats the site verbatim competes with it instead of ranking
 * alongside it. The slugs come from FT-57.
 *
 * Figures used here are the ones QDL already publishes for its own platform.
 * Nothing is presented as an industry benchmark.
 */

export type Solution = {
  slug: string
  /** Under 60 characters, so it is not truncated in results. */
  title: string
  /** 150 to 160 characters, the usable width of a result snippet. */
  description: string
  eyebrow: string
  heading: string
  lead: string
  /** The problem, in the reader's own words. */
  problem: { title: string; body: string }
  answer: { title: string; body: string }
  points: { title: string; body: string }[]
  stats: { value: string; label: string }[]
  faqs: { q: string; a: string }[]
}

export const SOLUTIONS: Solution[] = [
  {
    slug: 'banking-payment-infrastructure',
    title: 'Banking Payment Infrastructure | Quantum Data Leap',
    description:
      'Payment infrastructure for US regional banks. Repair payment data in flight across ACH, Fedwire and RTP, and lift straight-through rates on the core you already run.',
    eyebrow: 'Payment infrastructure',
    heading: 'Banking payment infrastructure that sits beside your core.',
    lead: 'Regional banks do not need another ledger. They need the data moving through the one they have to arrive complete, on every rail, before it reaches an operations queue.',
    problem: {
      title: 'The infrastructure is not the bottleneck. The data is.',
      body: 'Cores process transactions well. What they do not do is understand them. Payment messages arrive with missing beneficiary detail, malformed references and mismatched account keys, and each one becomes a person opening a case. Adding rails multiplies the problem rather than distributing it.',
    },
    answer: {
      title: 'An intelligence layer, not a replacement',
      body: 'QDL reads every message in context, completes what is missing from records you already hold, scores the transaction for risk, and releases it. It runs alongside the core through change capture and streaming, so nothing is migrated and no format has to change first.',
    },
    points: [
      {
        title: 'Every domestic rail, one position',
        body: 'ACH, Fedwire, RTP and FedNow ingested as messages arrive, reconciled continuously rather than at end of day.',
      },
      {
        title: 'ISO 20022 native',
        body: 'Richer messaging mapped on ingest, so reconciliation, screening and reporting all read the same structured record.',
      },
      {
        title: 'No replatforming programme',
        body: 'Deployed beside FIS, Fiserv, Jack Henry and in-house cores. The core keeps doing what it does.',
      },
    ],
    stats: [
      { value: '80.5%', label: 'released first-pass, no operator involved' },
      { value: '0.8s', label: 'ledger sync beside the core' },
      { value: '0', label: 'data migration required' },
    ],
    faqs: [
      {
        q: 'Do we have to replace our core banking system?',
        a: 'No. QDL runs alongside it, reading through change capture, streaming or batch. The core is untouched.',
      },
      {
        q: 'Which payment rails are supported?',
        a: 'ACH, Fedwire, RTP and FedNow, plus card authorisation and settlement, and correspondent flows over SWIFT.',
      },
      {
        q: 'How long does deployment take?',
        a: 'Connectors read the formats you already produce, so the work is configuration rather than migration. A deployment shape is part of the demo.',
      },
    ],
  },
  {
    slug: 'modernize-bank-payments',
    title: 'Modernize Bank Payments Without Replatforming | QDL',
    description:
      'Modernize bank payments without a multi-year replatforming programme. QDL adds payment intelligence beside your existing core and lifts straight-through processing.',
    eyebrow: 'Payment modernization',
    heading: 'Modernize payments without replacing anything.',
    lead: 'Modernization usually arrives as a multi-year programme with a migration at the end of it. There is a shorter route: leave the core in place and fix the intelligence around it.',
    problem: {
      title: 'Replatforming is where modernization goes to die',
      body: 'A core migration takes years, consumes the change budget, and delivers nothing until it lands. Meanwhile the exception queue grows with volume, and the team that was going to be freed up is still repairing payment data by hand.',
    },
    answer: {
      title: 'Change the outcome, not the stack',
      body: 'The measurable outcomes of modernization, higher first-pass settlement, faster case resolution, continuous reconciliation, come from payment data arriving complete. That can be fixed without moving the ledger.',
    },
    points: [
      {
        title: 'Value in the first quarter',
        body: 'Repair runs against live flows immediately, rather than after a migration cutover.',
      },
      {
        title: 'Rules your business users own',
        body: 'Written in plain language with maker and checker approval, live the same day, instead of waiting on an engineering release.',
      },
      {
        title: 'Reversible by design',
        body: 'An adjacent layer can be switched off. A migration cannot.',
      },
    ],
    stats: [
      { value: '90%', label: 'less time to resolve each case' },
      { value: 'Same day', label: 'rule changes go live' },
      { value: '1,284', label: 'live rules, every change with an audit record' },
    ],
    faqs: [
      {
        q: 'Is this a rip and replace?',
        a: 'The opposite. QDL is additive: it reads what your systems already produce and writes decisions back, leaving the core in place.',
      },
      {
        q: 'What happens to our existing rules?',
        a: 'They are carried over and become the starting point. The engine then learns from outcomes rather than needing every threshold retuned by hand.',
      },
      {
        q: 'How is this governed?',
        a: 'Every rule change passes maker and checker approval and carries a complete audit record. See the data handling page for controls.',
      },
    ],
  },
  {
    slug: 'bank-fraud-prevention',
    title: 'Bank Fraud Prevention in Real Time | Quantum Data Leap',
    description:
      'Real-time bank fraud prevention with a 99.4% detection rate and a 1.8% false positive rate. Score every payment as it moves, not in an overnight batch.',
    eyebrow: 'Fraud prevention',
    heading: 'Fraud caught as the payment moves.',
    lead: 'A detection rate on its own means nothing. A model that flags everything scores one hundred percent and buries the team that has to work the queue.',
    problem: {
      title: 'Overnight batches catch it after the money has gone',
      body: 'Static thresholds only recognise what has already been seen, and a batch that runs after the cycle closes finds fraud once it is a recovery problem. Tightening the rules to compensate floods the review queue with false positives.',
    },
    answer: {
      title: 'Scored in flight, with the false positive rate published',
      body: 'QDL combines supervised and unsupervised learning with contextual payment data, scoring each transaction at the moment it moves. Both numbers are stated together, because one without the other is not a claim an operations lead can use.',
    },
    points: [
      {
        title: 'Adaptive, not threshold-bound',
        body: 'Models learn from outcomes and adjust to new patterns without a manual rule rewrite.',
      },
      {
        title: 'Context arrives with the case',
        body: 'An investigator starts from assembled evidence rather than gathering it from four systems.',
      },
      {
        title: 'Approve, modify or reject',
        body: 'Nothing releases itself. Every decision carries a confidence score and a full audit record.',
      },
    ],
    stats: [
      { value: '99.4%', label: 'detection rate, scored in flight' },
      { value: '1.8%', label: 'false positive rate' },
      { value: '90%', label: 'less time to resolve each case' },
    ],
    faqs: [
      {
        q: 'How is this different from our current rules engine?',
        a: 'A static engine only recognises patterns someone has already written down. QDL evaluates in context and learns from outcomes, so new patterns do not need a rewrite.',
      },
      {
        q: 'Will this increase our review queue?',
        a: 'The point of publishing the false positive rate alongside detection is that it should not. Both figures are visible for exactly that reason.',
      },
      {
        q: 'Can compliance still control decisions?',
        a: 'Yes. Maker and checker approval applies to every rule change, and each payment can be approved, modified or rejected by a person.',
      },
    ],
  },
  {
    slug: 'core-banking-integration',
    title: 'Core Banking Integration, No Migration | Quantum Data Leap',
    description:
      'Core banking integration for FIS, Fiserv, Jack Henry and in-house systems. Connect databases, streaming and files in minutes, with no data migration required.',
    eyebrow: 'Core banking integration',
    heading: 'Integrates with the core you already run.',
    lead: 'The first question a bank asks is not what the platform does. It is whether it can read what the bank already produces, without a project to make that true.',
    problem: {
      title: 'Integration usually means migration',
      body: 'Most platforms need data moved into their own model before they do anything useful. That turns an evaluation into a programme, puts the security review on the critical path, and delays any evidence that the thing works.',
    },
    answer: {
      title: 'Read in place, write decisions back',
      body: 'QDL connects to the systems as they are: change capture beside the ledger, streaming topics, scheduled files, warehouse tables and REST endpoints. Schema is resolved on ingest, so no format has to change first.',
    },
    points: [
      {
        title: 'Cores and rails',
        body: 'FIS, Fiserv, Jack Henry and in-house cores, alongside ACH, Fedwire, RTP and FedNow message flows.',
      },
      {
        title: 'Streaming, batch and warehouse',
        body: 'Kafka and Kinesis, NACHA and BAI2 files over SFTP, and Snowflake, Databricks, BigQuery or Redshift.',
      },
      {
        title: 'Results where the team works',
        body: 'Decisions and alerts land back in Slack and Teams, and in the case management system already in use.',
      },
    ],
    stats: [
      { value: '9', label: 'native source types' },
      { value: '0', label: 'data migration required' },
      { value: '0.8s', label: 'ledger sync beside the core' },
    ],
    faqs: [
      {
        q: 'Do you support our core?',
        a: 'QDL reads standard interfaces rather than integrating per vendor, so FIS, Fiserv, Jack Henry and in-house cores are all covered through change capture, files or streaming.',
      },
      {
        q: 'Where does our data live?',
        a: 'In your own tenancy, or in a single-tenant environment operated for you in United States regions. It does not leave the region it was ingested in.',
      },
      {
        q: 'Is our data used to train models?',
        a: 'No. Learning happens inside your own deployment and stays there. Nothing is pooled across institutions.',
      },
    ],
  },
]

export const solutionBySlug = (slug: string) =>
  SOLUTIONS.find((s) => s.slug === slug)
