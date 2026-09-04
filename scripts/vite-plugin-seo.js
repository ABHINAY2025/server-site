import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const read = (name) =>
  JSON.parse(
    readFileSync(fileURLToPath(new URL(`../src/content/${name}`, import.meta.url)), 'utf8'),
  )

/* JSON-LD is written inside a <script> element, so a literal "</script>" in
   any string would close it early and put the rest of the payload into the
   document. Escaping "<" is the standard defence and leaves the JSON valid. */
const safe = (value) => JSON.stringify(value).replace(/</g, '\u003c')

/**
 * Site metadata that a crawler can read without running the bundle.
 *
 * The app writes its own tags once React mounts, which is enough for a crawler
 * that renders JavaScript and useless for every one that does not. Anything
 * describing who we are belongs in the HTML as served, because that is the only
 * version some readers ever see.
 */
export default function seo() {
  let env = {}

  return {
    name: 'qdl-seo',

    configResolved(config) {
      env = config.env
    },

    transformIndexHtml() {
      const site = read('site.json')
      const faq = read('faq.json')
      const url = `${site.origin}/`
      const logo = `${site.origin}${site.logo}`

      /* Named nodes so the site, the product and the publisher reference each
         other rather than arriving as three unrelated claims. */
      const graph = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': `${site.origin}/#organization`,
            name: site.name,
            alternateName: site.shortName,
            url,
            logo: { '@type': 'ImageObject', url: logo },
            description: site.description,
            sameAs: site.sameAs,
          },
          {
            '@type': 'WebSite',
            '@id': `${site.origin}/#website`,
            name: site.name,
            url,
            publisher: { '@id': `${site.origin}/#organization` },
            inLanguage: 'en',
          },
          {
            '@type': 'SoftwareApplication',
            '@id': `${site.origin}/#product`,
            name: site.name,
            applicationCategory: 'BusinessApplication',
            description: site.description,
            url,
            publisher: { '@id': `${site.origin}/#organization` },
          },
          {
            '@type': 'FAQPage',
            '@id': `${site.origin}/#faq`,
            mainEntity: faq.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: { '@type': 'Answer', text: item.answer },
            })),
          },
        ],
      }

      const tags = [
        {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          children: safe(graph),
          injectTo: 'head',
        },
      ]

      /* Only when a real token exists. Left in the template unconditionally,
         an unset variable ships the literal "%VITE_GSC_VERIFICATION%" to
         production, which verifies nothing and is one more thing that looks
         broken to anyone reading the source. */
      const token = env.VITE_GSC_VERIFICATION
      if (token && !token.startsWith('%')) {
        tags.push({
          tag: 'meta',
          attrs: { name: 'google-site-verification', content: token },
          injectTo: 'head',
        })
      }

      return tags
    },
  }
}
