import { ArrowRight } from 'lucide-react'
import TextRoll from './TextRoll'
import { Link } from '../router'
import { EASE } from '../brand'

/**
 * The primary call to action, shared by every section that offers it, so the
 * roll and the rotating arrow stay identical wherever it appears.
 */
export default function DemoLink({
  label = 'Request a demo',
  className = '',
}: {
  label?: string
  className?: string
}) {
  return (
    <Link
      to="/demo"
      className={`group inline-flex shrink-0 items-center gap-3 rounded-full bg-[#062698] py-2 pl-5 pr-2 text-[13px] text-white transition-colors duration-300 hover:bg-[#0867e6] sm:pl-6 sm:text-[14px] ${className}`}
    >
      <TextRoll>{label}</TextRoll>
      <span
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white transition-transform duration-500 ${EASE} group-hover:-rotate-45 sm:h-8 sm:w-8`}
      >
        <ArrowRight size={15} className="text-[#062698]" />
      </span>
    </Link>
  )
}
