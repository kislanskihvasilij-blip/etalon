import { useEffect, useState } from "react"
import { Logo } from "./Logo"

const NAV_LINKS = [
  { href: "#projects", label: "Проекты" },
  { href: "#interior-walk", label: "Внутри дома" },
  { href: "#financing", label: "Оплата" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#contact", label: "Контакты" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <header className={`site-header${isScrolled ? " is-scrolled" : ""}`} id="site-header">
        <div className="container header-inner">
          <Logo />

          <nav className="main-nav">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <a href="tel:88003020103" className="header-phone desktop-only">
              8 800 302-01-03
            </a>
            <a href="#contact" className="btn btn-primary btn-sm">
              Оставить заявку
            </a>
          </div>

          <button
            className="nav-toggle"
            aria-label="Открыть меню"
            aria-expanded={isMobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsMobileOpen((v) => !v)}
          >
            <span />
          </button>
        </div>
      </header>

      <nav className={`mobile-nav${isMobileOpen ? " is-open" : ""}`} id="mobile-nav">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setIsMobileOpen(false)}>
            {link.label}
          </a>
        ))}
        <a href="tel:88003020103" className="header-phone" onClick={() => setIsMobileOpen(false)}>
          8 800 302-01-03
        </a>
      </nav>
    </>
  )
}
