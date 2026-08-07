import Hero from '../components/Hero'
import Numbers from '../components/Numbers'
import OperationalEfficiency from '../components/OperationalEfficiency'
import Product from '../components/Product'
import Bento from '../components/Bento'
import LegacyComparison from '../components/LegacyComparison'
import Integrations from '../components/Integrations'
import Blog from '../components/Blog'
import People from '../components/People'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <Numbers />
      <OperationalEfficiency />
      <Product />
      <Bento />
      <LegacyComparison />
      <Integrations />
      <Blog />
      <People />
      <Footer />
    </main>
  )
}
