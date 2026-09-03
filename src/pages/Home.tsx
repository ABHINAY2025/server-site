import Hero from '../components/Hero'
import OperationalEfficiency from '../components/OperationalEfficiency'
import Product from '../components/Product'
import Bento from '../components/Bento'
import Numbers from '../components/Numbers'
import LegacyComparison from '../components/LegacyComparison'
import Integrations from '../components/Integrations'
import Blog from '../components/Blog'
import Faq from '../components/Faq'
import Footer from '../components/Footer'
import { useSeo } from '../lib/seo'

/**
 * The order is the argument.
 *
 * Establish the problem and the research behind it, introduce the product as
 * the answer, then show it working. Proof and comparison come after the reader
 * already understands what they are looking at, which is where figures land
 * hardest.
 */
export default function Home() {
  useSeo({
    title: 'Quantum Data Leap | Payment Data Intelligence for US Regional Banks',
    description:
      'Repair payment data before it becomes an exception. QDL lifts straight-through processing for US regional banks across ACH, Fedwire and RTP, with no replatforming.',
    path: '/',
  })

  return (
    <main>
      <Hero />
      <OperationalEfficiency />
      <Product />
      <Bento />
      <Numbers />
      <LegacyComparison />
      <Integrations />
      <Blog />
      <Faq />
      <Footer />
    </main>
  )
}
