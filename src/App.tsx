import type { ComponentType } from 'react'
import Home from './pages/Home'
import Demo from './pages/Demo'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import DataHandling from './pages/DataHandling'
import BlogPage from './pages/BlogPage'
import ScrollReveal from './components/ScrollReveal'
import { usePath } from './router'

const ROUTES: Record<string, ComponentType> = {
  '/demo': Demo,
  '/blog': BlogPage,
  '/data-handling': DataHandling,
  '/privacy-policy': Privacy,
  '/terms-of-service': Terms,
}

export default function App() {
  const path = usePath()
  const Page = ROUTES[path] ?? Home

  return (
    <>
      <ScrollReveal />
      <Page />
    </>
  )
}
