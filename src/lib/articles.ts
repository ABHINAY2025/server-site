/**
 * Articles we host ourselves.
 *
 * These live on qdl rather than on Medium, which is the point: a reader who
 * arrives from search stays on the site, and the page they land on can carry
 * the argument through to the demo form. Bodies are structured blocks rather
 * than HTML strings so nothing user-facing is rendered from raw markup.
 */

export type Block =
  | { kind: 'p'; text: string }
  | { kind: 'h2'; text: string }
  | { kind: 'ul'; items: string[] }
  | { kind: 'quote'; text: string }

export type Article = {
  slug: string
  /** Card and article header image, served from public/images/stock. */
  image: string
  title: string
  tag: string
  date: string
  /** Card and meta description. One sentence. */
  description: string
  body: Block[]
  /** Carried in the home page rail. */
  featured?: boolean
}

export const ARTICLES: Article[] = [
  {
    slug: 'operations-metrics-that-survive-audit',
    image: '/images/stock/operations-metrics.jpg',
    title: 'Operations metrics that survive an audit',
    tag: 'Governance',
    date: '2026-07-13',
    description:
      'Most payment operations dashboards cannot answer the one question an examiner asks: show me how this number was produced.',
    body: [
      {
        kind: 'p',
        text: 'Every payments function reports a straight-through rate. Very few can reconstruct one. The figure is assembled from a warehouse extract, adjusted for repairs that happened outside the system of record, and presented monthly with no way back to the individual payments underneath it. It survives a management meeting. It does not survive an examiner asking how it was produced.',
      },
      { kind: 'h2', text: 'A metric is a claim, and a claim needs evidence' },
      {
        kind: 'p',
        text: 'The difference between a dashboard and a control is provenance. A control can name the population it measured, the rule that classified each item, the version of that rule in force at the time, and the person who changed it last. A dashboard shows a number that was true when the query ran.',
      },
      {
        kind: 'p',
        text: 'That distinction decides how much of your reporting an examiner will accept at face value, and it is why operations metrics should be produced by the system that handles the payments rather than assembled downstream from it.',
      },
      { kind: 'h2', text: 'Four properties worth insisting on' },
      {
        kind: 'ul',
        items: [
          'Reproducible. Re-running the same period returns the same figure, including after a rule change, because the rule version is stored with the decision rather than looked up at query time.',
          'Attributable. Every automated decision names the model or rule that made it; every manual one names the operator, with the timestamp and the values before and after.',
          'Decomposable. A rate can be broken to the payment level without leaving the tool, so a question about the number becomes a list of items instead of a project.',
          'Stable under restatement. When a payment is repaired late, the period it belongs to does not silently change. Restatements are visible as restatements.',
        ],
      },
      { kind: 'h2', text: 'What to stop reporting' },
      {
        kind: 'p',
        text: 'Volume handled, on its own, tells you the size of the department rather than the health of the process. Average handling time rewards closing cases quickly, which is not the same as closing them correctly. Both are worth watching internally and neither belongs at the top of a pack.',
      },
      {
        kind: 'p',
        text: 'The measures that hold up are the ones tied to an outcome somebody outside operations can feel: how many payments settled first pass, how many stopped, how long the ones that stopped waited, and how many of those stops turned out to be unnecessary.',
      },
      { kind: 'h2', text: 'Where the audit record comes in' },
      {
        kind: 'p',
        text: 'If each repair carries its own evidence, the metric is a query over that evidence rather than a separate reporting exercise. That is the practical argument for keeping decisioning and record-keeping in the same place: the reporting stops being something you build, and becomes something you read.',
      },
    ],
  },
  {
    slug: 'deploying-beside-the-core',
    image: '/images/stock/core-deployment.jpg',
    title: 'Deploying beside the core',
    tag: 'Deployment',
    date: '2026-06-29',
    description:
      'Why payment intelligence should arrive as a layer next to the core banking system rather than as a programme to replace it.',
    featured: true,
    body: [
      {
        kind: 'p',
        text: 'Every regional bank has a list of improvements that are blocked behind the core. The list is long, the core replacement is years out, and the improvements that mattered most were the ones that could not wait. This is the single most common reason payment operations stay manual: not that nobody wanted to fix them, but that the fix was scoped as a migration.',
      },
      { kind: 'h2', text: 'The layer, not the replacement' },
      {
        kind: 'p',
        text: 'Payment repair does not need to own the ledger. It needs to see the message before the ledger does, complete what is missing, and hand it on in the format the core already expects. That is an integration problem with a well-understood shape: read from the channel, write back to the channel, change nothing about how the core posts.',
      },
      {
        kind: 'ul',
        items: [
          'Streaming ingestion for rails that arrive continuously, so a repair happens while the payment is still in flight.',
          'Batch ingestion for files that arrive on a cycle, processed before the cycle is presented to the core.',
          'Write-back in the original message format, so downstream systems see a complete payment rather than a new one.',
        ],
      },
      { kind: 'h2', text: 'What this buys you' },
      {
        kind: 'p',
        text: 'The obvious gain is time to value measured in weeks. The less obvious one is reversibility. A layer that sits beside the core can be switched to observe-only, run in parallel against live traffic, and compared against what your team would have done, before anything it decides is allowed to leave the building.',
      },
      {
        kind: 'quote',
        text: 'A change you can turn off is a change a risk committee can approve.',
      },
      { kind: 'h2', text: 'The questions to ask a vendor' },
      {
        kind: 'ul',
        items: [
          'What has to change in the core for this to run? If the answer is anything at all, ask why.',
          'Can it run in shadow against production traffic, and for how long?',
          'What happens to a payment when the layer is unavailable? Passing through untouched is the only acceptable answer.',
          'Who owns the repair decision when the model is not confident, and how does that person see what the model saw?',
        ],
      },
      {
        kind: 'p',
        text: 'A deployment that cannot answer those four is not a lighter alternative to a migration. It is a migration wearing a different name.',
      },
    ],
  },
  {
    slug: 'false-positives-in-sanctions-screening',
    image: '/images/stock/screening.jpg',
    title: 'The real cost of a wide screening net',
    tag: 'Compliance',
    date: '2026-06-15',
    description:
      'A screening model tuned only for detection buries the team that has to clear it, and the queue is where the risk actually accumulates.',
    body: [
      {
        kind: 'p',
        text: 'Detection rate is the number that gets reported and false positive rate is the number that gets lived with. A screening configuration tuned to catch everything will catch everything, and it will also stop several hundred payments a day that were never going to be a problem. The second effect is not a nuisance. It is where the risk goes.',
      },
      { kind: 'h2', text: 'Why the queue is a risk, not an inconvenience' },
      {
        kind: 'p',
        text: 'An analyst clearing a hundred alerts an hour is not reading a hundred alerts. They are pattern-matching against the ninety-eight that looked like this yesterday and were fine. That is a rational response to volume and it is exactly the behaviour a wide net produces. The alert that deserved attention arrives into a workflow trained to dismiss.',
      },
      {
        kind: 'p',
        text: 'Backlog compounds it. Once the queue is longer than the day, cut-off pressure decides the order of work rather than risk, and payments are released because a wire room closes rather than because somebody concluded they were clean.',
      },
      { kind: 'h2', text: 'Report the pair or report nothing' },
      {
        kind: 'p',
        text: 'A detection figure quoted without its false positive rate is not a measurement. A model that flags every payment detects every bad one and is useless. The pair describes the trade actually being made, and it is the only honest way to compare two configurations.',
      },
      { kind: 'h2', text: 'What reduces false positives without lowering the net' },
      {
        kind: 'ul',
        items: [
          'Complete data before screening. A large share of name-match noise comes from truncated, transliterated or misplaced party fields, not from the matching logic itself.',
          'Context at the point of decision. Prior clearances for the same counterparty, corridor and instructing party belong in the alert rather than three systems away.',
          'Feedback that survives. When an analyst clears an alert, the reasoning should narrow future matching rather than evaporate into a case note.',
        ],
      },
      {
        kind: 'p',
        text: 'None of that is a loosening of controls. It is the difference between a control that is exercised and one that is performed, and an examiner can usually tell which they are looking at within an hour of watching the queue.',
      },
    ],
  },
  {
    slug: 'continuous-reconciliation',
    image: '/images/stock/reconciliation.jpg',
    title: 'Reconciliation that keeps up with the payment',
    tag: 'Operations',
    date: '2026-06-01',
    description:
      'Overnight reconciliation was designed for a world where money moved overnight, and the breaks it surfaces are already hours old by the time anyone sees them.',
    body: [
      {
        kind: 'p',
        text: 'Reconciliation is still, in most institutions, a nightly job. Positions are compared after the cycle closes, breaks are listed in the morning, and somebody spends the first hours of the day working out what happened yesterday. That design made sense when settlement was a batch and nothing moved between them. It fits real-time rails badly.',
      },
      { kind: 'h2', text: 'What a break actually costs by the time you see it' },
      {
        kind: 'p',
        text: 'A mismatch found the next morning has already been built on. Balances were reported, funding decisions were taken, and further payments went out against a position that was wrong. The investigation is no longer about one payment; it is about everything downstream of it. The cost of a break scales with its age, and overnight is the maximum age you can choose.',
      },
      { kind: 'h2', text: 'Continuous does not mean instant' },
      {
        kind: 'p',
        text: 'The useful version of continuous reconciliation is not a real-time ticker. It is matching each movement against its expectation as the movement occurs, so that the exception is raised while the context is still live and the person who caused it is still at their desk.',
      },
      {
        kind: 'ul',
        items: [
          'Expected against actual, per movement, rather than per file.',
          'Breaks raised with the payment, the counterparty and the corridor attached, not as a line in a report.',
          'Positions that are answerable at any moment rather than at one moment a day.',
        ],
      },
      { kind: 'h2', text: 'The knock-on effect on funding' },
      {
        kind: 'p',
        text: 'Treasury funds against the position it can see. When that position is a day old and known to be approximate, the response is a buffer, and the buffer is real money held against uncertainty rather than against risk. Tightening reconciliation is one of the few operational changes that shows up directly on the balance sheet.',
      },
      {
        kind: 'p',
        text: 'The prerequisite is data quality. Continuous matching against incomplete references produces continuous noise, which is why repair belongs upstream of reconciliation rather than beside it.',
      },
    ],
  },
  {
    slug: 'where-exceptions-come-from-by-rail',
    image: '/images/stock/payment-rails.jpg',
    title: 'Where exceptions come from, rail by rail',
    tag: 'Payments',
    date: '2026-05-18',
    description:
      'ACH, Fedwire and RTP fail in different ways, and an operations team that treats them as one queue is solving four problems with one playbook.',
    body: [
      {
        kind: 'p',
        text: 'Exception queues are usually organised by team rather than by cause. That hides the fact that the rails produce structurally different failures, and that the fix for one is often irrelevant to another.',
      },
      { kind: 'h2', text: 'ACH' },
      {
        kind: 'p',
        text: 'Volume is the defining feature and the failures are formatting and returns. Addenda that do not carry what the receiver expected, account numbers that fail validation late, and a return flow that arrives days after the original file. The economics are unusual: any single item is cheap, so manual handling looks affordable per payment and is ruinous per year.',
      },
      { kind: 'h2', text: 'Fedwire' },
      {
        kind: 'p',
        text: 'High value, low tolerance, and a hard cut-off. The exceptions that matter are party data and screening stops, and both are expensive because the payment is large and the clock is real. A wire that misses cut-off is not a delay; it is a call from a relationship manager.',
      },
      { kind: 'h2', text: 'RTP and instant rails' },
      {
        kind: 'p',
        text: 'There is no queue. A payment that cannot be processed within seconds is rejected, so the exception becomes a customer-facing failure rather than an internal work item. Anything that relies on somebody looking at it is, by definition, too slow, which makes data completeness on arrival the only workable control.',
      },
      { kind: 'h2', text: 'Cross-border and correspondent traffic' },
      {
        kind: 'p',
        text: 'Truncation, transliteration and missing intermediary details dominate. The message has passed through systems with different field limits before it reached you, and the information that would resolve the exception frequently no longer exists in the message at all.',
      },
      { kind: 'h2', text: 'The practical consequence' },
      {
        kind: 'ul',
        items: [
          'Measure exception rate per rail. A blended figure hides the rail that is actually failing.',
          'Fix ACH with automation, because the cost is in the aggregate. Fix wires with completeness before cut-off, because the cost is in the individual item.',
          'For instant rails, accept that anything not resolved in flight is a rejection, and design for that instead of staffing against it.',
        ],
      },
    ],
  },
  {
    slug: 'reading-a-confidence-score',
    image: '/images/stock/confidence-score.jpg',
    title: 'How to read a confidence score',
    tag: 'Product',
    date: '2026-05-04',
    description:
      'A number between zero and one is only useful if you know what it was calibrated against and what happens on either side of the threshold.',
    featured: true,
    body: [
      {
        kind: 'p',
        text: 'Every system that proposes an automated repair attaches a confidence to it. Very few explain what the number means, which leaves operations teams with a choice between trusting it completely and ignoring it completely. Both are wrong, and both are common.',
      },
      { kind: 'h2', text: 'Calibration is the whole question' },
      {
        kind: 'p',
        text: 'A calibrated score of 0.9 means that, across the repairs scored at 0.9, about nine in ten were correct. An uncalibrated 0.9 means the model ranked this repair above another one. The first can be used to set a threshold. The second cannot be used for anything except sorting.',
      },
      {
        kind: 'p',
        text: 'Ask any vendor for a reliability curve against your own traffic: predicted confidence on one axis, observed accuracy on the other. If the line does not sit close to the diagonal, the number is a ranking dressed as a probability.',
      },
      { kind: 'h2', text: 'The threshold is a business decision' },
      {
        kind: 'p',
        text: 'Where to auto-release is not a modelling question. It is a question about the relative cost of a wrong repair and a stopped payment, and those costs differ by rail, by value and by customer. A single global threshold is almost always the wrong answer.',
      },
      {
        kind: 'ul',
        items: [
          'High-value wires: a high bar, because a wrong repair is expensive to unwind.',
          'Bulk ACH: a lower bar, because the cost of stopping everything exceeds the cost of an occasional correction.',
          'New counterparties and corridors: a high bar until there is history, regardless of score.',
        ],
      },
      { kind: 'h2', text: 'What the operator needs beside the number' },
      {
        kind: 'p',
        text: 'A score with no evidence behind it cannot be checked, only obeyed. The reviewing operator should see which fields were changed, what they were changed from and to, what the model matched against, and how similar cases were resolved before. Given that, a low-confidence item is a decision. Without it, a high-confidence item is a coin toss with better branding.',
      },
      {
        kind: 'p',
        text: 'The test is simple: can an operator disagree with the system and explain why in one sentence? If not, the confidence score is decoration.',
      },
    ],
  },
  {
    slug: 'maker-checker-and-the-audit-record',
    image: '/images/stock/audit-record.jpg',
    title: 'Maker, checker and the audit record',
    tag: 'Governance',
    date: '2026-04-20',
    description:
      'Segregation of duties survives automation only if the record shows what the machine proposed as well as what the human approved.',
    body: [
      {
        kind: 'p',
        text: 'Maker-checker is the oldest control in banking operations and the one most often quietly broken by automation. When a system proposes a change and a person clicks approve, the question a reviewer will eventually ask is whether that click was a decision or a formality.',
      },
      { kind: 'h2', text: 'What a complete record contains' },
      {
        kind: 'ul',
        items: [
          'The proposal: what the system suggested, on what evidence, with what confidence, under which model or rule version.',
          'The decision: approved, modified or rejected, by whom, at what time, from where.',
          'The delta: the field values before and after, not a description of them.',
          'The disagreement: where the operator changed the proposal, because that is the highest-value data the institution generates.',
        ],
      },
      {
        kind: 'p',
        text: 'The last one is routinely discarded. An operator who overrides a suggestion has told you something specific about where the system is wrong, and in most deployments that signal ends its life as a free-text case note.',
      },
      { kind: 'h2', text: 'Segregation when one side is a model' },
      {
        kind: 'p',
        text: 'A model can hold the maker role provided the checker is genuinely able to refuse. That requires three things: the checker sees the evidence rather than a summary, the interface makes rejection as cheap as approval, and rejection rates are monitored. A checker approval rate of one hundred percent is not a sign of a good model. It is a sign that nobody is checking.',
      },
      { kind: 'h2', text: 'Rule changes are payments too' },
      {
        kind: 'p',
        text: 'The same discipline belongs on configuration. When a business user edits a rule in plain language, that edit needs its own maker and checker, its own effective date, and its own place in the record, so that a payment decided last quarter can be explained against the rule that was live last quarter rather than the one live today.',
      },
      {
        kind: 'quote',
        text: 'If you cannot reconstruct which rule was in force when a payment was decided, you do not have an audit trail. You have a log.',
      },
    ],
  },
  {
    slug: 'why-rules-engines-calcify',
    image: '/images/stock/rules-engine.jpg',
    title: 'Why rules engines calcify',
    tag: 'Product',
    date: '2026-04-06',
    description:
      'Rule sets grow until nobody will touch them, and the reason is structural rather than a failure of discipline.',
    body: [
      {
        kind: 'p',
        text: 'Every rules engine begins as a good idea and ends as an archaeological site. The pattern is consistent enough across institutions to suggest the cause is structural rather than a local failure of housekeeping.',
      },
      { kind: 'h2', text: 'The mechanism' },
      {
        kind: 'p',
        text: 'Rules are added in response to incidents, and each addition is individually justified. They are almost never removed, because removal requires proving a negative: that the condition the rule guards against will not occur. Nobody is rewarded for that proof and everybody is exposed by getting it wrong. The set therefore only grows.',
      },
      {
        kind: 'p',
        text: 'Interaction is the second half. By a few hundred rules, the behaviour of the set is no longer the sum of its parts, and the person who wrote rule fourteen has left. Changing anything means testing everything, so the safest change is a new rule that narrows the case, which is how the set grows again.',
      },
      { kind: 'h2', text: 'What actually helps' },
      {
        kind: 'ul',
        items: [
          'Attribution per rule. If you cannot see how many payments each rule stopped in the last quarter and how many of those stops were upheld, you cannot retire anything.',
          'Expiry by default. A rule added for an incident should carry a review date, so that survival is a decision rather than an accident.',
          'Simulation against live traffic. A change tested against the last month of real payments is a fact; a change tested against a sample is an opinion.',
          'Plain language authoring, so the person who understands the risk writes the rule and the change does not queue behind a release.',
        ],
      },
      { kind: 'h2', text: 'Learning from outcomes' },
      {
        kind: 'p',
        text: 'The deeper fix is to stop expressing every judgement as a threshold. A rule set encodes what somebody believed about the traffic at the moment they wrote it. A model that scores against outcomes updates as the traffic changes, and the rules that remain can be the small number that encode policy rather than pattern.',
      },
      {
        kind: 'p',
        text: 'That split is worth being explicit about. Policy belongs in rules, where it can be read, approved and pointed at during an examination. Pattern belongs in a model, where it can be measured. Most calcified rule sets are calcified because pattern was written into them as policy.',
      },
    ],
  },
  {
    slug: 'repairing-payment-data-in-flight',
    image: '/images/stock/data-repair.jpg',
    title: 'Repairing payment data in flight',
    tag: 'Product',
    date: '2026-03-23',
    description:
      'The economics of payment operations change when the repair happens before the payment reaches a queue rather than after.',
    featured: true,
    body: [
      {
        kind: 'p',
        text: 'An exception queue is a decision to handle incomplete data later. That decision looks free, because the payment is already stopped and somebody is already employed to work the queue. It is not free, and the cost is easiest to see by comparing the same repair at two moments.',
      },
      { kind: 'h2', text: 'The same fix, two hours apart' },
      {
        kind: 'p',
        text: 'In flight, a missing intermediary BIC is a lookup against the corridor, the counterparty and every prior payment on the same route. It resolves in milliseconds, the payment continues, and no case is opened.',
      },
      {
        kind: 'p',
        text: 'In a queue, the same missing field is a case. It has a number, an owner, a service level and a place in a priority order. Somebody opens three systems to find what the first system already knew, writes a note, and closes it. The field is identical. The surrounding cost is not.',
      },
      { kind: 'h2', text: 'What makes in-flight repair possible' },
      {
        kind: 'ul',
        items: [
          'Position in the flow. The repair has to happen before the payment is committed to a queue, which means reading the message on arrival rather than on exception.',
          'History. Most missing fields have been supplied before, on a prior payment to the same beneficiary through the same corridor. The institution already holds the answer.',
          'A confidence threshold with a human on the other side of it, so that the uncertain cases still stop and the certain ones do not.',
          'A record of every automated change, because a repair nobody can audit is a repair nobody will authorise.',
        ],
      },
      { kind: 'h2', text: 'What it does to the queue' },
      {
        kind: 'p',
        text: 'The queue does not disappear, and a vendor claiming otherwise is selling something. It changes composition. What remains is the genuinely ambiguous work: novel counterparties, conflicting evidence, cases where the right answer depends on a relationship rather than a lookup. That is work worth paying an experienced person to do, and it is what most operations teams say they wanted to be doing in the first place.',
      },
    ],
  },
  {
    slug: 'iso-20022-for-us-regional-banks',
    image: '/images/stock/iso-20022.jpg',
    title: 'ISO 20022 for US regional banks',
    tag: 'Standards',
    date: '2026-03-09',
    description:
      'Richer payment messaging is only an advantage if the richness survives the systems on either side of you.',
    body: [
      {
        kind: 'p',
        text: 'ISO 20022 is usually discussed as a compliance date. The more useful framing is that it changes what a payment message can carry, and therefore what your operation can stop doing by hand, provided the extra content survives the journey.',
      },
      { kind: 'h2', text: 'What actually gets better' },
      {
        kind: 'ul',
        items: [
          'Structured parties. Names and addresses in defined fields rather than free text, which is the single largest source of screening noise.',
          'Structured remittance. Enough room to carry what the payment is for, which is what makes automated reconciliation possible on the receiving side.',
          'Purpose and category codes, which let routing and screening decisions be made on stated intent rather than inference.',
        ],
      },
      { kind: 'h2', text: 'Where it goes wrong' },
      {
        kind: 'p',
        text: 'Richness is lost at the narrowest point in the chain. A payment that arrives fully structured, passes through a system that stores parties as a single string, and is forwarded onward has been downgraded permanently. Nobody logs this. It surfaces months later as an exception rate that did not improve after migration.',
      },
      {
        kind: 'p',
        text: 'The second failure is treating translation as sufficient. Mapping a legacy message into an ISO envelope produces a compliant message with legacy content. It clears the deadline and delivers none of the operational benefit, and it is the most common outcome of a migration run as a project rather than as an operational change.',
      },
      { kind: 'h2', text: 'Language matters here' },
      {
        kind: 'p',
        text: 'There is no such thing as a bank being certified for ISO 20022 in the sense vendors often imply. Schemes certify message flows and participants; what an institution can honestly claim is that its systems are built for ISO 20022 messaging and preserve structured content end to end. That is a stronger claim anyway, because it is checkable.',
      },
      { kind: 'h2', text: 'A test worth running' },
      {
        kind: 'p',
        text: 'Take a fully populated inbound message, follow it through every internal hop, and compare the fields present at the end against the fields present at the start. The gap between those two lists is the size of your migration benefit, and it is usually a surprise.',
      },
    ],
  },
  {
    slug: 'the-cost-of-a-payment-exception',
    image: '/images/stock/exception-cost.jpg',
    title: 'The cost of a payment exception',
    tag: 'Operations',
    date: '2026-02-24',
    description:
      'A payment that stops for repair costs far more than the transaction that carries it, and most of that cost never reaches the operations budget.',
    featured: true,
    body: [
      {
        kind: 'p',
        text: 'Ask what an exception costs and you will usually be given a fully loaded hourly rate multiplied by an average handling time. That figure is real and it is the smallest part of the answer.',
      },
      { kind: 'h2', text: 'The parts that get counted' },
      {
        kind: 'p',
        text: 'Analyst time, the systems they open to do the work, and the supervisory time spent on the ones that escalate. This is the number that appears in an operations budget, and it is the number a vendor will help you reduce because it is the easiest to attribute.',
      },
      { kind: 'h2', text: 'The parts that do not' },
      {
        kind: 'ul',
        items: [
          'Delay. A payment held past cut-off funds a day late, which moves liquidity requirements and occasionally moves a customer.',
          'Capacity held in reserve. Teams are staffed for peak exception volume, so the cost of exceptions is paid on quiet days too.',
          'Attention. The queue competes for the same experienced people who would otherwise be working on the cases that genuinely need judgement.',
          'Relationship damage, which shows up in a corporate customer review long after the payment was fixed and never gets traced back to it.',
        ],
      },
      { kind: 'h2', text: 'Why the ratio is the useful measure' },
      {
        kind: 'p',
        text: 'A five percent exception rate does not mean five percent of the cost. Straight-through payments cost almost nothing per item, so nearly the entire operational cost of a payments function is concentrated in the small share that stopped. That is why a modest improvement in first-pass rate produces a disproportionate change in cost, and why exception rate is worth watching more closely than volume.',
      },
      { kind: 'h2', text: 'Where the time actually goes' },
      {
        kind: 'p',
        text: 'Watch an analyst work a queue and the handling time is dominated by retrieval rather than judgement. Finding the prior payment, checking the counterparty, confirming the corridor. The decision itself, once the evidence is assembled, usually takes seconds. Most of the addressable cost is the assembly, and assembly is exactly what a system should be doing before the case is ever opened.',
      },
    ],
  },
  {
    slug: 'what-straight-through-processing-measures',
    image: '/images/stock/stp-measurement.jpg',
    title: 'What straight-through processing actually measures',
    tag: 'Operations',
    date: '2026-02-10',
    description:
      'Two banks can report the same straight-through rate and run entirely different operations, because the denominator is doing most of the work.',
    body: [
      {
        kind: 'p',
        text: 'Straight-through processing is the share of payments that settle without anyone touching them. It is the headline measure of a payments operation and it is defined loosely enough that two institutions can report the same figure while running very different businesses.',
      },
      { kind: 'h2', text: 'The denominator problem' },
      {
        kind: 'p',
        text: 'Does the rate include payments repaired automatically before they stopped? Payments that stopped and were released without a change? Internal book transfers? Each of those choices moves the number by several points, and each is defensible in isolation. Compare two banks without comparing their definitions and you are comparing accounting policies.',
      },
      {
        kind: 'ul',
        items: [
          'Count every payment that entered the flow, including the ones rejected at the door.',
          'Treat an automated repair as a touch if a human reviewed it, and as straight-through only if nobody did.',
          'Report by rail as well as in total, because the blended figure is dominated by whichever rail carries the volume.',
        ],
      },
      { kind: 'h2', text: 'Why the tier gap exists' },
      {
        kind: 'p',
        text: 'The largest institutions clear more first pass, and the usual explanation is better technology. The real driver is more mundane: they have more history on the same counterparties, more standardised corporate customers, and enough volume to justify engineering against a specific corridor. Each of those is a data advantage rather than a systems advantage, which is why buying the same systems does not close the gap on its own.',
      },
      { kind: 'h2', text: 'What the number is good for' },
      {
        kind: 'p',
        text: 'Tracked against itself over time, on a stable definition, straight-through rate is the most honest single indicator of whether a payments operation is improving. Compared across institutions, it is close to meaningless. Use it as a trend line, not as a benchmark, and be suspicious of anyone who quotes an industry figure to two decimal places.',
      },
    ],
  },
]

export const ARTICLES_BY_SLUG = new Map(
  ARTICLES.map((article) => [article.slug, article]),
)

/** Roughly 200 words a minute, rounded up, floor of one minute. */
export function readingTime(article: Article) {
  const words = article.body.reduce((total, block) => {
    if (block.kind === 'ul') {
      return total + block.items.join(' ').split(/\s+/).length
    }
    return total + block.text.split(/\s+/).length
  }, 0)
  return Math.max(1, Math.round(words / 200))
}
