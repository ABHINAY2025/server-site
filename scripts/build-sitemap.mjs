/**
 * Generates sitemap.xml from the routes the app actually serves.
 *
 * Written from the same source the router uses, so a page cannot be added to
 * the site and quietly left out of the sitemap.
 */
import fs from 'node:fs'
import path from 'node:path'

const ORIGIN = 'https://quantumdataleap.ai'

/* Read the slugs straight out of the content file rather than repeating them */
const content = fs.readFileSync('src/pages/solutions-content.ts', 'utf8')
const slugs = [...content.matchAll(/slug:\s*'([\w-]+)'/g)].map((m) => m[1])

const STATIC = [
  { path: '/', priority: '1.0', freq: 'weekly' },
  { path: '/demo', priority: '0.9', freq: 'monthly' },
  { path: '/blog', priority: '0.7', freq: 'weekly' },
  { path: '/data-handling', priority: '0.6', freq: 'monthly' },
  { path: '/privacy-policy', priority: '0.3', freq: 'yearly' },
  { path: '/terms-of-service', priority: '0.3', freq: 'yearly' },
]

const routes = [
  ...STATIC,
  ...slugs.map((s) => ({ path: `/${s}`, priority: '0.9', freq: 'monthly' })),
]

const today = new Date().toISOString().slice(0, 10)

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${ORIGIN}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.freq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

fs.mkdirSync('public', { recursive: true })
fs.writeFileSync(path.join('public', 'sitemap.xml'), xml)
console.log(`sitemap.xml written with ${routes.length} routes`)
