import { useEffect, useState, type AnchorHTMLAttributes, type ReactNode } from 'react'

/**
 * A minimal history router. The site has two routes, so pulling in a routing
 * library would cost more than it returns. Real anchors are rendered, so
 * middle-click, modifier-click and "open in new tab" keep native behaviour and
 * the links remain crawlable.
 */

export function navigate(to: string) {
  if (window.location.pathname === to) return
  window.history.pushState({}, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export function usePath() {
  const [path, setPath] = useState(() => window.location.pathname)

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  return path
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string
  children: ReactNode
}

export function Link({ to, children, onClick, ...rest }: LinkProps) {
  return (
    <a
      href={to}
      onClick={(event) => {
        onClick?.(event)
        /* Let the browser handle anything that is not a plain left click */
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return
        }
        event.preventDefault()
        navigate(to)
        window.scrollTo(0, 0)
      }}
      {...rest}
    >
      {children}
    </a>
  )
}
