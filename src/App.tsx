import type { ComponentType } from 'react'
import Home from './pages/Home'
import Demo from './pages/Demo'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import DataHandling from './pages/DataHandling'
import BlogPage from './pages/BlogPage'
import ArticlePage from './pages/ArticlePage'
import ScrollReveal from './components/ScrollReveal'
import CookieConsent from './components/CookieConsent'
import { usePath } from './router'

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
  const Page = ROUTES[path] ?? Home

  return (
    <>
      <ScrollReveal />
      <CookieConsent />
      {article ? <ArticlePage slug={article[1]} /> : <Page />}
    </>
  )
}
