import { ARTICLES, type Article } from './articles'

/**
 * The index, across both places we publish.
 *
 * Articles we host ourselves come from articles.ts and open a route on this
 * site. The Medium pieces open Medium. Everything else about them is the same
 * shape, so the rail and the archive never have to know which is which.
 *
 * Every entry has to point at something live. A card that goes nowhere costs
 * more than the empty space it fills.
 */

export type Post = {
  title: string
  tag: string
  /** Where it was published, shown on the card. */
  source: string
  description: string
  /** Required: a card with no image reads as a broken card. */
  image: string
  href: string
  external: boolean
  /** ISO date of publication, used for ordering and for the visible date. */
  date: string
  /** Carried in the home page rail as well as the index. */
  featured?: boolean
}

/* Written elsewhere, linked here. Descriptions are ours, titles are theirs. */
const MEDIUM: Post[] = [
  {
    title: 'The rise of AI in finance automation',
    tag: 'Finance',
    source: 'Medium',
    description:
      'Where AI has already taken hold across financial services, from fraud detection and credit scoring to analytics, and the governance that has to come with it.',
    image: '/images/stock/payments.jpg',
    href: 'https://medium.com/@aixcircleblogs/the-rise-of-ai-in-finance-automation-1509766e2b69',
    external: true,
    date: '2025-10-23',
    featured: true,
  },
  {
    title: 'AI in cybersecurity: the smart shield for a digital world',
    tag: 'Security',
    source: 'Medium',
    description:
      'How behavioural analytics and automated response shorten the gap between a threat appearing and somebody acting on it.',
    image: '/images/stock/fraud.jpg',
    href: 'https://medium.com/@aixcircleblogs/ai-in-cybersecurity-the-smart-shield-for-a-digital-world-c32ecf6b6111',
    external: true,
    date: '2025-11-01',
  },
  {
    title: 'Marketing 3.0: how predictive AI is transforming brand strategy',
    tag: 'Strategy',
    source: 'Medium',
    description:
      'The shift from campaigns that react to campaigns that anticipate, and what personalising in real time asks of the data underneath.',
    image: '/images/stock/real-time-payments.jpg',
    href: 'https://medium.com/@aixcircleblogs/marketing-3-0-how-predictive-ai-is-transforming-brand-strategy-99f2bb7e4f36',
    external: true,
    date: '2025-11-01',
  },
  {
    title: 'The rise of no-code AI',
    tag: 'Automation',
    source: 'Medium',
    description:
      'No-code platforms are putting model building in the hands of the people who own the process, without an engineering queue in between.',
    image: '/images/stock/automation.jpg',
    href: 'https://medium.com/@aixcircleblogs/the-rise-of-no-code-ai-empowering-non-tech-entrepreneurs-9c738f285329',
    external: true,
    date: '2025-11-03',
  },
  {
    title: 'Embracing the human-AI synergy',
    tag: 'Operations',
    source: 'Medium',
    description:
      'The co-pilot model in practice: where automation augments an experienced team rather than replacing it, with examples from banking and services.',
    image: '/images/stock/compliance.jpg',
    href: 'https://medium.com/@aixcircleblogs/embracing-the-human-ai-synergy-2f862f537982',
    external: true,
    date: '2025-11-04',
  },
  {
    title: 'What is agentic AI automation?',
    tag: 'Agentic AI',
    source: 'Medium',
    description:
      'The step from rule-based automation to systems that decide for themselves, and what changes once software adapts instead of following a script.',
    image: '/images/stock/agentic-ai.jpg',
    href: 'https://medium.com/@aixcircleblogs/what-is-agentic-ai-automation-923301bf3284',
    external: true,
    date: '2025-11-05',
    featured: true,
  },
  {
    title: 'Generative AI in content creation: the 2025 revolution',
    tag: 'Generative AI',
    source: 'Medium',
    description:
      'What generative tooling changed about producing text, images and video at volume, and where accuracy and brand consistency still have to be held.',
    image: '/images/stock/agentic-ai.jpg',
    href: 'https://medium.com/@aixcircleblogs/generative-ai-in-content-creation-the-2025-revolution-5138f3e27487',
    external: true,
    date: '2025-11-06',
  },
  {
    title: 'The generative AI revolution in business',
    tag: 'Generative AI',
    source: 'Medium',
    description:
      'What generative models are changing across design, marketing and planning, and where the returns have actually shown up.',
    image: '/images/stock/automation.jpg',
    href: 'https://medium.com/@aixcircleblogs/the-generative-ai-revolution-in-business-b34d1a21e0fb',
    external: true,
    date: '2025-11-06',
  },
]

function toPost(article: Article): Post {
  return {
    title: article.title,
    tag: article.tag,
    source: 'Quantum Data Leap',
    description: article.description,
    image: article.image,
    href: `/blog/${article.slug}`,
    external: false,
    date: article.date,
    featured: article.featured,
  }
}

export const POSTS: Post[] = [...ARTICLES.map(toPost), ...MEDIUM]

/** The index on the blog page: everything, newest first. */
export const ARCHIVE = [...POSTS].sort((a, b) => b.date.localeCompare(a.date))

/** The home page rail. Six panels, our own writing leading. */
export const FEATURED = ARCHIVE.filter((post) => post.featured)

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

/** Related reading, by tag first and then by recency, never the article itself. */
export function relatedTo(href: string, tag: string, count = 3) {
  const others = ARCHIVE.filter((post) => post.href !== href)
  const sameTag = others.filter((post) => post.tag === tag)
  return [...sameTag, ...others.filter((post) => post.tag !== tag)].slice(
    0,
    count,
  )
}
