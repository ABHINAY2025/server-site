import Hero from '../components/Hero'
import Numbers from '../components/Numbers'
import Product from '../components/Product'
import Bento from '../components/Bento'
import LegacyComparison from '../components/LegacyComparison'
import People from '../components/People'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <Numbers />
      <Product />
      <Bento />
      <LegacyComparison />
      <People />
      <Footer />
    </main>
  )
}
