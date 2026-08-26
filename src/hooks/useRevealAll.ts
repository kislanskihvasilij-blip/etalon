import { useEffect } from "react"

/** Fades in every .reveal element once it enters the viewport. */
export function useRevealAll() {
  useEffect(() => {
    const revealEls = document.querySelectorAll<HTMLElement>(".reveal")
    if (!revealEls.length) return

    if (!("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("is-visible"))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    )
    revealEls.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export function useReducedMotion() {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}
