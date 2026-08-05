import { useLayoutEffect } from 'react'

/**
 * Rises anything marked `data-reveal` into place as it enters the viewport.
 *
 * The hidden state is scoped to a class this component puts on the document, so
 * the page is fully readable if the script never runs. Elements are revealed
 * once and then unobserved: content that has already been read should not
 * animate again on the way back up.
 *
 * A MutationObserver picks up nodes that arrive later, which covers a route
 * change and the lazily loaded globe.
 *
 * This has to be a layout effect. In an ordinary effect the class lands after
 * the first paint, so anything above the fold flashes in at full opacity,
 * snaps to hidden, and then transitions, which reads as no animation at all.
 */
export default function ScrollReveal() {
  useLayoutEffect(() => {
    const root = document.documentElement
    const reveal = (el: Element) => el.setAttribute('data-revealed', '')

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('[data-reveal]').forEach(reveal)
      return
    }

    root.classList.add('js-reveal')

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          reveal(entry.target)
          io.unobserve(entry.target)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
    )

    const scan = () => {
      document
        .querySelectorAll('[data-reveal]:not([data-revealed])')
        .forEach((el) => io.observe(el))
    }

    scan()

    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
      root.classList.remove('js-reveal')
    }
  }, [])

  return null
}
