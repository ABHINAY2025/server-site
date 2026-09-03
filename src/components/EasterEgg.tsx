import { useEffect, useState } from 'react'

/**
 * A key sequence that signs the work.
 *
 * Nothing announces it: no markup, no attribute and no affordance is rendered
 * until it fires, so the page gives no indication the listener exists.
 *
 * Note it is not a secret in the cryptographic sense. This is client code, and
 * anyone reading the bundle can find the sequence. It is a signature, not a
 * lock.
 */

const SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'm',
  'a',
] as const

/** How long the signature stays up before retiring on its own. */
const LINGER = 4200

/**
 * Longest run of recent keys that is still a valid opening of the sequence.
 *
 * Counting forward and resetting to zero on a wrong key is not enough, because
 * the sequence repeats itself. Type up, up, up and the first two presses are
 * spent, yet the last two are a perfectly good opening: a counter that only
 * knows how to restart at one would strand the rest of the attempt. Reading
 * back from the newest key finds the real position every time.
 */
function matchedLength(recent: string[]): number {
  const max = Math.min(recent.length, SEQUENCE.length)
  for (let len = max; len > 0; len--) {
    let ok = true
    for (let i = 0; i < len; i++) {
      if (recent[recent.length - len + i] !== SEQUENCE[i]) {
        ok = false
        break
      }
    }
    if (ok) return len
  }
  return 0
}

export default function EasterEgg() {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    let recent: string[] = []

    const onKey = (event: KeyboardEvent) => {
      /* Never while someone is typing. The form has fields where "m" and "a"
         are ordinary characters, and swallowing them would be a real bug in
         exchange for a joke. */
      const el = document.activeElement as HTMLElement | null
      if (
        el &&
        (el.tagName === 'INPUT' ||
          el.tagName === 'TEXTAREA' ||
          el.tagName === 'SELECT' ||
          el.isContentEditable)
      ) {
        return
      }

      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key

      recent.push(key)
      if (recent.length > SEQUENCE.length) recent.shift()

      const matched = matchedLength(recent)

      /* Only suppress the arrow's normal scrolling once an attempt is genuinely
         under way, so ordinary arrow-key scrolling still works. */
      if (matched > 0 && key.startsWith('Arrow')) event.preventDefault()

      if (matched === SEQUENCE.length) {
        recent = []
        setShown(true)
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /* Dismiss on any input, or let it retire by itself. */
  useEffect(() => {
    if (!shown) return

    const close = () => setShown(false)
    const timer = window.setTimeout(close, LINGER)

    window.addEventListener('keydown', close)
    window.addEventListener('pointerdown', close)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('keydown', close)
      window.removeEventListener('pointerdown', close)
    }
  }, [shown])

  if (!shown) return null

  return (
    <div
      className="egg-veil fixed inset-0 z-[100] flex items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <p className="egg-mark qdl-gradient-text px-6 text-center text-[clamp(2rem,9vw,7rem)] font-semibold leading-none tracking-[-0.04em]">
        made by Abhinay_ma
      </p>
    </div>
  )
}
