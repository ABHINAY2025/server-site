#!/usr/bin/env node
/**
 * Checks the deployed site for the things a search engine reads before it will
 * describe you correctly.
 *
 * Written after a search for the company returned a title the site does not
 * ship and an overview crediting a company it never mentions. Most of what went
 * wrong was invisible from the source tree: the canonical host and the host
 * that actually answers had drifted apart, and a verification tag was shipping
 * an unsubstituted placeholder. Both are obvious the moment something asks the
 * live origin rather than the repository.
 *
 * Run it against production after a deploy, or against a preview URL:
 *   npm run check:seo -- https://example.vercel.app
 */

import { resolveTxt } from 'node:dns/promises'

import site from '../src/content/site.json' with { type: 'json' }

const origin = process.argv[2] ?? site.origin
const host = new URL(origin).host
const apex = host.replace(/^www\./, '')

let failures = 0
let warnings = 0

const pass = (msg) => console.log(`  ok    ${msg}`)
const fail = (msg) => {
  failures++
  console.log(`  FAIL  ${msg}`)
}
const warn = (msg) => {
  warnings++
  console.log(`  warn  ${msg}`)
}

const get = async (url, redirect = 'manual') => {
  try {
    const res = await fetch(url, { redirect, headers: { 'user-agent': 'qdl-seo-check' } })
    return { res, body: redirect === 'follow' ? await res.text() : '' }
  } catch (err) {
    return { error: err.message }
  }
}

/* Which host answers, and which merely points at the other. A permanent
   redirect is the one that transfers ranking; a 302 or 307 asks a crawler to
   keep both, which is how one site comes to compete with itself. */
console.log(`\nHosts\n`)

const seen = {}
for (const h of [apex, `www.${apex}`]) {
  const { res, error } = await get(`https://${h}/`)
  if (error) {
    fail(`https://${h}/ unreachable: ${error}`)
    continue
  }
  const location = res.headers.get('location')
  seen[h] = { status: res.status, location }
  const detail = location ? `${res.status} -> ${location}` : String(res.status)
  if (res.status === 200) pass(`https://${h}/ serves the site (${detail})`)
  else if (res.status === 301 || res.status === 308) pass(`https://${h}/ redirects permanently (${detail})`)
  else if (location) fail(`https://${h}/ redirects with a temporary ${res.status}, which does not consolidate ranking signals (${detail})`)
  else fail(`https://${h}/ returned ${detail}`)
}

const answering = Object.entries(seen).filter(([, v]) => v.status === 200)
if (answering.length > 1) {
  warn(
    `${answering.map(([h]) => h).join(' and ')} both return 200; one should redirect to the other, ` +
      'or the same pages compete as two sites and the canonical tag is the only thing arbitrating',
  )
}

/* Prefer the host the canonical names, so the rest of the run reports on the
   version meant to rank rather than whichever answered first. */
const preferred = answering.find(([h]) => h === host)?.[0]
const serving = preferred ?? answering[0]?.[0]
if (!serving) {
  console.log('\nNo host returned 200. Stopping.\n')
  process.exit(1)
}

/* The canonical tag names the version that should rank. If it names a host that
   only redirects, every page is disclaiming itself. */
console.log(`\nCanonical\n`)

const { res, body, error } = await get(`https://${serving}/`, 'follow')
if (error || !res.ok) {
  fail(`could not read https://${serving}/: ${error ?? res.status}`)
  process.exit(1)
}

const attr = (re) => body.match(re)?.[1]
const canonical = attr(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/)
const title = attr(/<title>([^<]*)<\/title>/)
const description = attr(/<meta[^>]+name="description"[^>]+content="([^"]*)"/)

if (!canonical) fail('no canonical link in the served HTML')
else if (new URL(canonical).host === serving) pass(`canonical points at ${serving}, the host that answers`)
else fail(`canonical says ${new URL(canonical).host} but ${serving} is what serves; pick one and make both agree`)

if (title) pass(`title: ${title}`)
else fail('no title')

if (description) pass(`description: ${description.length} chars`)
else fail('no meta description')

/* Everything below is read without running the bundle, which is all some
   crawlers ever do. */
console.log(`\nStructured data (no JavaScript)\n`)

const blocks = [...body.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
if (!blocks.length) {
  fail('no JSON-LD in the served HTML, so a crawler that does not render has only the meta tags to go on')
} else {
  const types = []
  for (const [, raw] of blocks) {
    try {
      const parsed = JSON.parse(raw)
      for (const node of parsed['@graph'] ?? [parsed]) types.push(node['@type'])
    } catch (err) {
      fail(`a JSON-LD block does not parse: ${err.message}`)
    }
  }
  for (const want of ['Organization', 'WebSite']) {
    if (types.includes(want)) pass(`${want} declared`)
    else warn(`no ${want}, so the entity behind the site is left to inference`)
  }
  if (types.length) pass(`types found: ${[...new Set(types)].join(', ')}`)
}

console.log(`\nServed HTML hygiene\n`)

const placeholder = body.match(/%VITE_[A-Z0-9_]+%/)
if (placeholder) fail(`${placeholder[0]} shipped unsubstituted; the variable is unset in the build environment`)
else pass('no unsubstituted build variables')

/* Verification is checked at the domain rather than in the markup. A Domain
   property proves the apex and www at once, which is the point of using one on
   a site that answers on both, and it leaves no tag in the HTML to find. */
const verification = body.match(/name="google-site-verification"[^>]+content="([^"]*)"/)?.[1]
const tagged = Boolean(verification) && !verification.startsWith('%')

let txt = []
try {
  txt = (await resolveTxt(apex)).flat()
} catch (err) {
  if (err.code !== 'ENODATA' && err.code !== 'ENOTFOUND') warn(`could not read TXT records for ${apex}: ${err.code}`)
}
const dnsVerified = txt.some((r) => r.startsWith('google-site-verification='))

if (dnsVerified) pass(`Search Console verified by DNS on ${apex}, covering both hosts`)
else if (tagged) pass('Search Console verification tag carries a real token, covering this host only')
else fail('Search Console can verify neither by DNS nor by tag, so there is no way to ask Google to recrawl')

/* GA is injected after consent, so it is never in the served HTML and its
   absence there proves nothing. What can be checked is whether the build still
   contains a loader to inject: an unset VITE_GA4_ID inlines as undefined, the
   guard in lib/ga.ts goes statically false, and the minifier removes the tag
   entirely. Nothing fails, the site just stops measuring. */
console.log(`
Analytics
`)

const bundle = body.match(/src="(\/assets\/index-[^"]+\.js)"/)?.[1]
if (!bundle) {
  warn('could not find the main bundle in the served HTML')
} else {
  const { res: b, body: code, error: be } = await get(`https://${serving}${bundle}`, 'follow')
  if (be || !b.ok) {
    warn(`could not read ${bundle}`)
  } else {
    const id = code.match(/G-[A-Z0-9]{8,}/)?.[0]
    const loader = code.includes('googletagmanager')
    if (id && loader) pass(`GA4 ${id} built in, injected on consent`)
    else if (id) fail(`measurement ID ${id} is in the build but the gtag loader was tree-shaken out`)
    else fail('no GA4 measurement ID in the build, so nothing is being measured')
  }
}

/* robots.txt and the sitemap are fetched directly, so a redirect between them
   and the serving host is an extra hop on every crawl. */
console.log(`\nCrawl files\n`)

for (const path of ['/robots.txt', '/sitemap.xml']) {
  const { res: r, error: e } = await get(`https://${serving}${path}`)
  if (e) fail(`${path} unreachable: ${e}`)
  else if (r.status === 200) pass(`${path} served directly`)
  else fail(`${path} returned ${r.status}${r.headers.get('location') ? ` -> ${r.headers.get('location')}` : ''}`)
}

const robots = await get(`https://${serving}/robots.txt`, 'follow')
const declared = robots.body?.match(/Sitemap:\s*(\S+)/i)?.[1]
if (declared) {
  const h = new URL(declared).host
  if (h === serving) pass(`robots.txt points the sitemap at ${h}`)
  else fail(`robots.txt points the sitemap at ${h}, which is not the serving host`)
}

console.log(
  `\n${failures} failing, ${warnings} to look at\n`,
)
process.exit(failures ? 1 : 0)
