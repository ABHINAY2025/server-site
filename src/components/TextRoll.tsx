import type { ReactNode } from 'react'

/**
 * Hover text-roll: the label is duplicated inside a flex-col track that shifts
 * -50% vertically when the parent `group` is hovered, swapping copy one for copy two.
 */
export default function TextRoll({ children }: { children: ReactNode }) {
  return (
    <span className="block h-[20px] overflow-hidden">
      <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
        <span className="flex h-[20px] shrink-0 items-center whitespace-nowrap">
          {children}
        </span>
        <span className="flex h-[20px] shrink-0 items-center whitespace-nowrap" aria-hidden="true">
          {children}
        </span>
      </span>
    </span>
  )
}
