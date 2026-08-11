import Hero from '../components/Hero'
import OperationalEfficiency from '../components/OperationalEfficiency'
import Product from '../components/Product'
import Bento from '../components/Bento'
import Numbers from '../components/Numbers'
import LegacyComparison from '../components/LegacyComparison'
import Blog from '../components/Blog'
import Faq from '../components/Faq'
import Footer from '../components/Footer'

/**
 * The order is the argument.
 *
 * Establish the problem and the research behind it, introduce the product as
 * the answer, then show it working. Proof and comparison come after the reader
 * already understands what they are looking at, which is where figures land
 * hardest.
 */
export default function Home() {
  return (
    <main>
      <Hero />
      <OperationalEfficiency />
      <Product />
      <Bento />
      <Numbers />
      <LegacyComparison />
      <Blog />
      <Faq />
      <Footer />
    </main>
  )
}
