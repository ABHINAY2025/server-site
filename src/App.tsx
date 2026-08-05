import Home from './pages/Home'
import Demo from './pages/Demo'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import type { ComponentType } from 'react'
import ScrollReveal from './components/ScrollReveal'
import Cursor from './components/Cursor'
import { usePath } from './router'

const ROUTES: Record<string, ComponentType> = {
  '/demo': Demo,
  '/privacy-policy': Privacy,
  '/terms-of-service': Terms,
}

export default function App() {
  const path = usePath()
  const Page = ROUTES[path] ?? Home

  return (
    <>
      <ScrollReveal />
      <Cursor />
      <Page />
    </>
  )
}
