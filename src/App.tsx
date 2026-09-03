import type { ComponentType } from 'react'
import Home from './pages/Home'
import Demo from './pages/Demo'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import DataHandling from './pages/DataHandling'
import BlogPage from './pages/BlogPage'
import ArticlePage from './pages/ArticlePage'
import SolutionPage from './pages/SolutionPage'
import ScrollReveal from './components/ScrollReveal'
import CookieConsent from './components/CookieConsent'
import EasterEgg from './components/EasterEgg'
import { useEffect } from 'react'
import { usePath } from './router'
import { captureAttribution } from './lib/utm'
import { solutionBySlug } from './pages/solutions-content'

const ROUTES: Record<string, ComponentType> = {
  '/demo': Demo,
  '/blog': BlogPage,
  '/data-handling': DataHandling,
  '/privacy-policy': Privacy,
  '/terms-of-service': Terms,
}

/** The one route with a variable in it: /blog/<slug>. */
const ARTICLE = /^\/blog\/([\w-]+)\/?$/

export default function App() {
  const path = usePath()
  const article = ARTICLE.exec(path)

  /* Read once, on the landing URL, before any navigation clears the query */
  useEffect(() => {
    captureAttribution()
  }, [])

  /* Solution landing pages live at the site root, so they read as
     /banking-payment-infrastructure rather than being nested under a segment
     that adds nothing for a reader arriving from search. */
  const solution = solutionBySlug(path.replace(/^\/|\/$/g, ''))

  const Page = ROUTES[path] ?? Home

  return (
    <>
      <ScrollReveal />
      <CookieConsent />
      <EasterEgg />
      {solution ? (
        <SolutionPage solution={solution} />
      ) : article ? (
        <ArticlePage slug={article[1]} />
      ) : (
        <Page />
      )}
    </>
  )
}
