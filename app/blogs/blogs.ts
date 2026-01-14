/* ------------------------------------------------------------------ */
/* TYPES                                                              */
/* ------------------------------------------------------------------ */

export type BlogPost = {
  id: number
  title: string
  excerpt: string
  category: string
  categoryTone: "teal" | "blue" | "pink" | "purple"
  author: string
  authorRole: string
  publishedAgo: string
  readTime: string
  imageUrl: string
  externalUrl: string
}

export type ExternalBlog = {
  title: string
  description: string
  url: string
  tag: string
  source: string
}

/* ------------------------------------------------------------------ */
/* FEATURED BLOG GRID (External Redirects)                             */
/* ------------------------------------------------------------------ */

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Rise of AI in Finance Automation",
    excerpt:
      "An in-depth exploration of how artificial intelligence is transforming financial automation through predictive analytics, fraud detection, and real-time decision systems.",
    category: "AI & Finance",
    categoryTone: "teal",
    author: "AIX Circle (Medium)",
    authorRole: "AI & Finance Publisher",
    publishedAgo: "2025",
    readTime: "11 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    externalUrl:
      "https://medium.com/@aixcircleblogs/the-rise-of-ai-in-finance-automation-1509766e2b69",
  },
  {
    id: 2,
    title: "AI in Finance: Automation, Use Cases, and Business Impact",
    excerpt:
      "A strategic overview of how AI is being implemented in finance to automate processes, personalize services, and drive sustainable business growth.",
    category: "Strategy",
    categoryTone: "blue",
    author: "Growth Jockey",
    authorRole: "AI & Digital Strategy Experts",
    publishedAgo: "2024",
    readTime: "9 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    externalUrl:
      "https://www.growthjockey.com/blogs/ai-in-finance",
  },
  {
    id: 3,
    title: "Financial Statement Analysis: Key Indicators and Evaluation Techniques",
    excerpt:
      "This article explains crucial financial indicators and how AI-powered analytics improve financial evaluation and decision-making accuracy.",
    category: "Analytics",
    categoryTone: "pink",
    author: "Simplifa AI",
    authorRole: "Financial Intelligence Platform",
    publishedAgo: "2024",
    readTime: "7 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80",
    externalUrl:
      "https://simplifa.ai/en/blog/analisis-laporan-keuangan-indikator-penting-dan-teknik-evaluasi",
  },
  {
    id: 4,
    title: "AI in FinTech: Enhancing Fraud Detection and Risk Management",
    excerpt:
      "An in-depth analysis of how AI-driven models strengthen fraud detection, minimize false positives, and optimize real-time risk management in fintech platforms.",
    category: "Security",
    categoryTone: "purple",
    author: "MetaMatrix Tech",
    authorRole: "FinTech Technology Provider",
    publishedAgo: "2025",
    readTime: "8 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80",
    externalUrl:
      "https://metamatrixtech.com/blogs/2025/05/01/ai-in-fintech-enhancing-fraud-detection-and-risk-management/",
  },
  {
    id: 5,
    title: "AI Development for Financial Services: FinTech AI Guide 2025",
    excerpt:
      "A comprehensive guide to AI development in financial services covering fraud detection, credit scoring, AML compliance, implementation costs, and ROI.",
    category: "Development",
    categoryTone: "teal",
    author: "TensorBlue",
    authorRole: "AI Development Company",
    publishedAgo: "2025",
    readTime: "10 min read",
    imageUrl:
      "https://codewave.com/insights/wp-content/uploads/2025/08/AI-in-Fintech-Top-Companies-and-Use-Cases-2025.png",
    externalUrl:
      "https://tensorblue.com/blog/ai-development-financial-services-fintech-guide-2025",
  },
  {
    id: 6,
    title: "How AI and Machine Learning Are Strengthening Fraud Detection in FinTech",
    excerpt:
      "This article details how machine learning models detect fraudulent behavior, enhance transaction security, and protect fintech ecosystems at scale.",
    category: "Machine Learning",
    categoryTone: "blue",
    author: "GeekyAnts",
    authorRole: "Technology Consulting Team",
    publishedAgo: "2024",
    readTime: "9 min read",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    externalUrl:
      "https://geekyants.com/blog/how-ai-and-machine-learning-are-strengthening-fraud-detection-in-fintech",
  },
]

/* ------------------------------------------------------------------ */
/* HORIZONTAL INSIGHTS CAROUSEL                                        */
/* ------------------------------------------------------------------ */

export const carouselBlogs: ExternalBlog[] = [
  {
    title: "Agentic AI",
    description:
      "An introduction to agentic AI systems and how autonomous decisioning is reshaping enterprise workflows.",
    url: "https://medium.com/@abhinayabhi226/b1d3969ab1b5",
    tag: "AGENTIC AI",
    source: "Medium",
  },
  {
    title: "Payment Intelligence: Beyond Processing",
    description:
      "Why modern payment systems must move beyond transaction processing to intelligence-driven decisioning.",
    url: "https://abhinay2025.blogspot.com/2026/01/payment-intelligence-beyond-processing.html",
    tag: "PAYMENTS",
    source: "Blogspot",
  },
  {
    title: "AI-Powered Payment Fraud Detection for Real-Time Security",
    description:
      "How AI detects fraud patterns in milliseconds while reducing false positives.",
    url: "https://medium.com/@abhinayabhi226/ai-powered-payment-fraud-detection-for-real-time-security-fd68d886eec0",
    tag: "FRAUD",
    source: "Medium",
  },
  {
    title: "FedNow vs RTP: What Banks Need to Know Before Adoption",
    description:
      "A comparison of FedNow and RTP across settlement, risk, and readiness.",
    url: "https://medium.com/@aishwaryad274/fednow-vs-rtp-what-banks-need-to-know-before-adoption-1fece72bc476",
    tag: "REAL-TIME PAYMENTS",
    source: "Medium",
  },
  {
    title: "Top Payment Compliance Risks Banks Will Face in 2026",
    description:
      "Key compliance threats emerging from faster, high-volume payment rails.",
    url: "https://medium.com/@aishwaryad274/top-payment-compliance-risks-banks-will-face-in-2026-79aeb1a16726",
    tag: "COMPLIANCE",
    source: "Medium",
  },
  {
    title: "Replacing Manual Payment Controls with Intelligent Rules Engines",
    description:
      "How automated rules reduce human effort while improving STP rates.",
    url: "https://medium.com/@abhinayabhi226/replacing-manual-payment-controls-with-intelligent-rules-engines-c9e666a9397f",
    tag: "AUTOMATION",
    source: "Medium",
  },
  {
    title: "AI-Powered Exception Management for Real-Time Payments",
    description:
      "Using AI to triage, resolve, and prevent payment exceptions in real time.",
    url: "https://medium.com/@abhinayabhi226/ai-powered-exception-management-for-real-time-payments-64b567f92215",
    tag: "EXCEPTIONS",
    source: "Medium",
  },
  {
    title: "How Agentic AI Reduces Operational Risk in Payment Processing",
    description:
      "How autonomous agents lower operational risk by acting before failures escalate.",
    url: "https://abhinay2025.blogspot.com/2026/01/how-agentic-ai-reduces-operational-risk.html",
    tag: "AGENTIC AI",
    source: "Blogspot",
  },
  {
    title: "Treasury Visibility in Real Time: How AI Changes Cash Decisioning",
    description:
      "AI-driven visibility enables faster, more confident intraday liquidity decisions.",
    url: "https://abhinay2025.blogspot.com/2026/01/treasury-visibility-in-real-time-how-ai.html",
    tag: "TREASURY",
    source: "Blogspot",
  },
  {
    title: "From Alerts to Actions: AI-Driven Payment Operations Explained",
    description:
      "Turning alert fatigue into prioritized, action-ready workflows.",
    url: "https://abhinay2025.blogspot.com/2026/01/from-alerts-to-actions-ai-driven.html",
    tag: "OPERATIONS",
    source: "Blogspot",
  },
  {
    title: "Why Traditional Fraud Tools Fail in Modern Payment Environments",
    description:
      "Why rule-based fraud models break down in real-time payment systems.",
    url: "https://abhinay2025.blogspot.com/2026/01/why-traditional-fraud-tools-fail-in.html",
    tag: "FRAUD",
    source: "Blogspot",
  },
  {
    title: "Using AI to Automate Payment Compliance Checks at Scale",
    description:
      "Automating sanctions, AML, and compliance checks using AI.",
    url: "https://abhinay2025.blogspot.com/2026/01/using-ai-to-automate-payment-compliance.html",
    tag: "COMPLIANCE",
    source: "Blogspot",
  },
  {
    title: "How Banks Achieve Higher STP Rates Using Intelligent Automation",
    description:
      "Reducing manual intervention to maximize straight-through processing.",
    url: "https://abhinay2025.blogspot.com/2026/01/how-banks-achieve-higher-stp-rates.html",
    tag: "STP",
    source: "Blogspot",
  },
  {
    title: "Designing AI-First Payment Operations Without Replacing Your Core",
    description:
      "How banks layer intelligence without re-platforming core systems.",
    url: "https://abhinay2025.blogspot.com/2026/01/designing-ai-first-payment-operations.html",
    tag: "ARCHITECTURE",
    source: "Blogspot",
  },
  {
    title: "Operationalizing AI in Payments: A Practical Roadmap for Banks",
    description:
      "A step-by-step guide to moving AI from pilots to production.",
    url: "https://abhinay2025.blogspot.com/2026/01/operationalizing-ai-in-payments.html",
    tag: "STRATEGY",
    source: "Blogspot",
  },
  {
    title: "How AI Improves Payment Data Accuracy Before Settlement",
    description:
      "Using AI to clean, enrich, and validate payment data pre-settlement.",
    url: "https://abhinay2025.blogspot.com/2026/01/how-ai-improves-payment-data-accuracy.html",
    tag: "DATA QUALITY",
    source: "Blogspot",
  },
  {
    title: "Liquidity Stress Testing Using Predictive AI Models",
    description:
      "Forecasting liquidity stress with predictive AI instead of static rules.",
    url: "https://abhinay2025.blogspot.com/2026/01/liquidity-stress-testing-using.html",
    tag: "LIQUIDITY",
    source: "Blogspot",
  },
  {
    title: "Real-Time Payments Fraud: Emerging Patterns Banks Can’t Ignore",
    description:
      "Fraud trends exploiting instant settlement and irreversibility.",
    url: "https://dev.to/aishwarya_d_efe12263f68ac/real-time-payments-fraud-emerging-patterns-banks-cant-ignore-2cd6",
    tag: "FRAUD",
    source: "Dev.to",
  },
  {
    title: "How ISO 20022 Changes Fraud Detection and Exception Handling",
    description:
      "Richer data enables smarter fraud and exception management.",
    url: "https://dev.to/aishwarya_d_efe12263f68ac/how-iso-20022-changes-fraud-detection-and-exception-handling-4g2a",
    tag: "ISO 20022",
    source: "Dev.to",
  },
  {
    title: "Exception-First vs Intelligence-First Payment Architectures",
    description:
      "Why proactive intelligence beats reactive exception handling.",
    url: "https://abhinay2025.blogspot.com/2026/01/exception-first-vs-intelligence-first.html",
    tag: "ARCHITECTURE",
    source: "Blogspot",
  },
  {
    title: "Why CIOs Are Moving from Dashboards to Decision Engines",
    description:
      "The shift from visibility tools to action-driven platforms.",
    url: "https://abhinay2025.blogspot.com/2026/01/why-cios-are-moving-from-dashboards-to.html",
    tag: "LEADERSHIP",
    source: "Blogspot",
  },
  {
    title: "The Role of Agentic AI in Next-Generation Treasury Platforms",
    description:
      "How agentic AI enables autonomous treasury decisioning.",
    url: "https://abhinay2025.blogspot.com/2026/01/the-role-of-agentic-ai-in-next.html",
    tag: "TREASURY AI",
    source: "Blogspot",
  },
  {
    title: "Why Manual Payment Exceptions Are Costing Banks Millions",
    description:
      "The hidden operational cost of manual exception handling.",
    url: "https://aishwaryadutpala.blogspot.com/2026/01/why-manual-payment-exceptions-are.html",
    tag: "COST",
    source: "Blogspot",
  },
  {
    title: "AI in Payment Compliance: What Regulators Actually Allow",
    description:
      "Understanding regulatory boundaries for AI adoption.",
    url: "https://aishwaryadutpala.blogspot.com/2026/01/ai-in-payment-compliance-what.html",
    tag: "REGULATION",
    source: "Blogspot",
  },
  {
    title: "Why Reconciliation Fails in High-Volume Payment Environments",
    description:
      "Why scale and speed break traditional reconciliation processes.",
    url: "https://aishwaryadutpala.blogspot.com/2026/01/why-reconciliation-fails-in-high-volume.html",
    tag: "RECONCILIATION",
    source: "Blogspot",
  },
  {
    title: "From Batch to Real-Time: Operational Gaps Banks Underestimate",
    description:
      "Hidden operational challenges when moving to real-time rails.",
    url: "https://aishwaryadutpala.blogspot.com/2026/01/from-batch-to-real-time-operational.html",
    tag: "MODERNIZATION",
    source: "Blogspot",
  },
  {
    title: "ACH Returns Explained: Root Causes, Risk, and Prevention",
    description:
      "Understanding ACH return drivers and how to mitigate risk.",
    url: "https://aishwaryadutpala.blogspot.com/2026/01/ach-returns-explained-root-causes-risk.html",
    tag: "ACH",
    source: "Blogspot",
  },
  {
    title: "How Poor Liquidity Forecasting Impacts Intraday Risk",
    description:
      "The downstream risk of inaccurate liquidity forecasting.",
    url: "https://aishwaryadutpala.blogspot.com/2026/01/how-poor-liquidity-forecasting-impacts.html",
    tag: "LIQUIDITY",
    source: "Blogspot",
  },
  {
    title: "Payment Modernization Without Replacing Your Core System",
    description:
      "Modernizing payments by layering intelligence, not ripping cores.",
    url: "https://aishwaryadutpala.blogspot.com/2026/01/payment-modernization-without-replacing.html",
    tag: "MODERNIZATION",
    source: "Blogspot",
  },
  {
    title: "The Hidden Cost of Fragmented Payment Gateways",
    description:
      "Operational and risk costs caused by disconnected gateways.",
    url: "https://aishwaryadutpala.blogspot.com/2026/01/the-hidden-cost-of-fragmented-payment.html",
    tag: "INFRASTRUCTURE",
    source: "Blogspot",
  },
  {
    title: "Why Rules-Based Automation Fails in Complex Payment Flows",
    description:
      "Why static rules can’t handle modern, high-variance flows.",
    url: "https://aishwaryadutpala.blogspot.com/2026/01/why-rules-based-automation-fails-in.html",
    tag: "AUTOMATION",
    source: "Blogspot",
  },
  {
    title: "The Future of Payment Operations: From Reactive to Predictive",
    description:
      "How predictive AI is redefining payment operations.",
    url: "https://aishwaryadutpala.blogspot.com/2026/01/the-future-of-payment-operations-from.html",
    tag: "FUTURE",
    source: "Blogspot",
  },
  {
  title: "Agentic AI in Real-Time Payments: From Monitoring to Autonomous Resolution",
  description:
    "How agentic AI enables autonomous detection and resolution in real-time payment systems.",
  url: "https://medium.com/@abhinayabhi226/agentic-ai-in-real-time-payments-from-monitoring-to-autonomous-resolution-b56acab8bfa2",
  tag: "AGENTIC AI",
  source: "Medium",
},
{
  title: "AI-Powered Payment Orchestration Across RTP, FedNow, and UPI Rails",
  description:
    "How AI orchestrates payments across multiple real-time payment networks.",
  url: "https://medium.com/@abhinayabhi226/ai-powered-payment-orchestration-across-rtp-fednow-and-upi-rails-ac5018702010",
  tag: "ORCHESTRATION",
  source: "Medium",
},
{
  title: "Reducing Payment Failure Rates Using Predictive AI Models",
  description:
    "Using predictive AI to proactively reduce real-time payment failures.",
  url: "https://abhinay2025.blogspot.com/2026/01/reducing-payment-failure-rates-using.html",
  tag: "PREDICTIVE AI",
  source: "Blogspot",
},
{
  title: "How AI-Driven Reconciliation Eliminates End-of-Day Payment Breaks",
  description:
    "AI-led reconciliation for continuous, break-free payment operations.",
  url: "https://abhinay2025.blogspot.com/2026/01/how-ai-driven-reconciliation-eliminates.html",
  tag: "RECONCILIATION",
  source: "Blogspot",
},
{
  title: "ISO 20022 Meets AI: Unlocking Intelligence from Rich Payment Data",
  description:
    "How AI extracts operational intelligence from ISO 20022 payment messages.",
  url: "https://abhinay2025.blogspot.com/2026/01/iso-20022-meets-ai-unlocking.html",
  tag: "ISO 20022",
  source: "Blogspot",
},
{
  title: "Real-Time Liquidity Forecasting with AI for Payment Operations",
  description:
    "AI-driven liquidity forecasting for always-on payment environments.",
  url: "https://abhinay2025.blogspot.com/2026/01/real-time-liquidity-forecasting-with-ai.html",
  tag: "LIQUIDITY",
  source: "Blogspot",
},
{
  title: "Why Rule-Based Payment Systems Collapse at Real-Time Scale",
  description:
    "The limitations of rule-based controls in instant payment ecosystems.",
  url: "https://abhinay2025.blogspot.com/2026/01/why-rule-based-payment-systems-collapse.html",
  tag: "ARCHITECTURE",
  source: "Blogspot",
},
{
  title: "AI Decision Engines vs Dashboards: The Future of Payment Ops",
  description:
    "Why payment operations are shifting from dashboards to decision engines.",
  url: "https://abhinay2025.blogspot.com/2026/01/ai-decision-engines-vs-dashboards.html",
  tag: "DECISION ENGINES",
  source: "Blogspot",
},
{
  title: "Using AI to Prevent Payment Exceptions Before They Occur",
  description:
    "Preventing payment exceptions proactively using intelligent automation.",
  url: "https://abhinay2025.blogspot.com/2026/01/using-ai-to-prevent-payment-exceptions.html",
  tag: "EXCEPTION MANAGEMENT",
  source: "Blogspot",
},
{
  title: "How Intelligent Payment Routing Reduces Costs and Settlement Delays",
  description:
    "AI-powered routing strategies for faster and cheaper settlements.",
  url: "https://abhinay2025.blogspot.com/2026/01/how-intelligent-payment-routing-reduces.html",
  tag: "PAYMENT ROUTING",
  source: "Blogspot",
},
{
  title: "Autonomous Treasury Operations: How AI Manages Cash in Real Time",
  description:
    "The evolution of treasury operations with autonomous AI systems.",
  url: "https://abhinay2025.blogspot.com/2026/01/autonomous-treasury-operations-how-ai.html",
  tag: "TREASURY",
  source: "Blogspot",
},
{
  title: "Operational Risk in Instant Payments—and How AI Mitigates It",
  description:
    "Managing and mitigating operational risk in real-time payments using AI.",
  url: "https://abhinay2025.blogspot.com/2026/01/operational-risk-in-instant-paymentsand.html",
  tag: "RISK",
  source: "Blogspot",
},
{
  title: "Scaling Payment Operations Without Scaling Headcount Using AI",
  description:
    "How AI enables payment operations to scale efficiently without added staff.",
  url: "https://abhinay2025.blogspot.com/2026/01/scaling-payment-operations-without.html",
  tag: "SCALABILITY",
  source: "Blogspot",
},
{
  title: "AI-Driven Payment Monitoring: Why Alerts Alone Are No Longer Enough",
  description:
    "Moving beyond alerts to AI-led decisioning in payment monitoring.",
  url: "https://abhinay2025.blogspot.com/2026/01/ai-driven-payment-monitoring-why-alerts.html",
  tag: "MONITORING",
  source: "Blogspot",
},
{
  title: "Building Real-Time Payment Intelligence Layers on Legacy Cores",
  description:
    "How banks add intelligent payment layers without replacing core systems.",
  url: "https://abhinay2025.blogspot.com/2026/01/building-real-time-payment-intelligence.html",
  tag: "LEGACY MODERNIZATION",
  source: "Blogspot",
},
];
