import { useEffect, useRef } from "react"
import { useReducedMotion } from "@/hooks/useRevealAll"

const HOVER_TARGETS =
  "a, button, .btn, .hotspot-dot, .project-card, .review-card, .stellar-card-hit, input[type='checkbox']"
const TEXT_TARGETS = "input, textarea"

/** A trowel that snaps to the pointer. No trailing ring, desktop-only. */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const canHoverFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    if (!canHoverFine || reduceMotion) return

    const dot = dotRef.current
    if (!dot) return

    document.documentElement.classList.add("has-custom-cursor")
    let visible = false

    const onMouseMove = (e: MouseEvent) => {
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      if (!visible) {
        visible = true
        dot.style.opacity = "1"
      }
    }
    const onMouseLeave = () => { dot.style.opacity = "0" }
    const onMouseEnter = () => { dot.style.opacity = "1" }
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest(HOVER_TARGETS)) dot.classList.add("is-active")
      if (target.closest(TEXT_TARGETS)) dot.style.opacity = "0"
    }
    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest(HOVER_TARGETS)) dot.classList.remove("is-active")
      if (target.closest(TEXT_TARGETS)) dot.style.opacity = "1"
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true })
    document.addEventListener("mouseleave", onMouseLeave)
    document.addEventListener("mouseenter", onMouseEnter)
    document.addEventListener("mouseover", onMouseOver)
    document.addEventListener("mouseout", onMouseOut)

    return () => {
      document.documentElement.classList.remove("has-custom-cursor")
      window.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mouseenter", onMouseEnter)
      document.removeEventListener("mouseover", onMouseOver)
      document.removeEventListener("mouseout", onMouseOut)
    }
  }, [reduceMotion])

  return (
    <div className="cursor-dot" ref={dotRef}>
      <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2.5 2.5 L22 10.5 C23.6 11.15 23.7 12.5 22.3 13.5 L11.3 21.8 C9.9 22.85 8.2 22.1 7.8 20.4 L3.4 5.3 C3.1 4 2.8 3 2.5 2.5 Z"
          fill="currentColor"
          stroke="#141210"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <rect x="17" y="15.5" width="9" height="3.2" rx="1.4" transform="rotate(38 17 15.5)" fill="#141210" />
      </svg>
    </div>
  )
}
