import { useEffect } from 'react'

/**
 * Per-page metadata.
 *
 * A single-page app serves one index.html for every route, so without this
 * every URL shares the home page's title and description. Search results and
 * link previews would all read the same, which is the opposite of what a set of
 * pages targeting different searches needs.
 *
 * Note the limitation: these tags are written after the bundle runs. Google
 * executes JavaScript and will see them, but crawlers that do not, and most
 * link preview scrapers, read the raw HTML and will see the defaults. Getting
 * that right needs the routes prerendered at build time.
 */

export const SITE = {
  name: 'Quantum Data Leap',
  origin: 'https://quantumdataleap.ai',
  /* Falls back to the mark until a proper social card image exists. */
  image: '/qdl-mark.png',
} as const

type Seo = {
  title: string
  description: string
  /** Path only. The canonical origin is added here. */
  path: string
  /** Left off pages that should not be indexed. */
  noindex?: boolean
}

function upsertMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function useSeo({ title, description, path, noindex }: Seo) {
  useEffect(() => {
    const url = `${SITE.origin}${path}`

    document.title = title
    upsertMeta('meta[name="description"]', 'name', 'description', description)

    /* Canonical matters most here: a marketing site collects tracking
       parameters, and without this every UTM variant looks like a separate
       page to a crawler. */
    upsertLink('canonical', url)

    upsertMeta('meta[name="robots"]', 'name', 'robots',
      noindex ? 'noindex, nofollow' : 'index, follow')

    upsertMeta('meta[property="og:title"]', 'property', 'og:title', title)
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', description)
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', url)
    upsertMeta('meta[property="og:type"]', 'property', 'og:type', 'website')
    upsertMeta('meta[property="og:site_name"]', 'property', 'og:site_name', SITE.name)
    upsertMeta('meta[property="og:image"]', 'property', 'og:image', `${SITE.origin}${SITE.image}`)

    upsertMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title)
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)
  }, [title, description, path, noindex])
}
