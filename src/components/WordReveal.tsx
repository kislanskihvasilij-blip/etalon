import { useEffect, useRef, useState } from "react"
import type { CSSProperties } from "react"

/**
 * Words resolve out of blur as the text becomes readable — on mount for
 * above-the-fold copy, or on scroll-into-view for everything else.
 */
export function WordReveal({
  text,
  triggerOnMount = false,
  className = "",
}: {
  text: string
  triggerOnMount?: boolean
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (triggerOnMount) {
      const raf = requestAnimationFrame(() => setVisible(true))
      return () => cancelAnimationFrame(raf)
    }
    const el = ref.current
    if (!el || !("IntersectionObserver" in window)) {
      setVisible(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [triggerOnMount])

  const words = text.split(" ")

  return (
    <span ref={ref} className={`word-reveal${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}>
      {words.map((word, i) => (
        <span className="word" style={{ "--i": i } as CSSProperties} key={i}>
          {word}
        </span>
      ))}
    </span>
  )
}
