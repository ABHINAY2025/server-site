import { ArrowRight } from 'lucide-react'
import Footer from '../components/Footer'
import Blog from '../components/Blog'
import { Link } from '../router'

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-5 pt-8 sm:px-8 sm:pt-10 lg:px-12">
        <div className="flex items-center justify-between gap-6">
          <Link to="/" className="flex shrink-0 items-center gap-2.5">
            <img
              src="/qdl-mark.png"
              alt="Quantum Data Leap"
              className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10"
            />
            <span className="wordmark text-[24px] sm:text-[28px]">QDL</span>
          </Link>

          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-[14px] font-medium text-gray-600 transition-colors duration-300 hover:text-gray-900"
          >
            <ArrowRight
              size={15}
              className="rotate-180 transition-transform duration-300 group-hover:-translate-x-0.5"
            />
            Back to site
          </Link>
        </div>
      </div>

      <Blog />
      <Footer />
    </main>
  )
}
