import { useRef } from "react"
import type { MouseEventHandler, ReactNode } from "react"
import { ArrowUp } from "lucide-react"

const MARQUEE_ITEMS = [
  "Строительство по договору",
  "Гарантия 3 года",
  "Технический надзор на каждом этапе",
  "Поэтапная оплата",
  "Сдача по акту приёма-передачи",
]

function Marquee() {
  return (
    <div className="footer-marquee-track" aria-hidden="true">
      <div className="footer-marquee-set">
        {MARQUEE_ITEMS.map((item) => (
          <span key={item}>
            {item} <span className="footer-marquee-dot">·</span>
          </span>
        ))}
      </div>
      <div className="footer-marquee-set">
        {MARQUEE_ITEMS.map((item) => (
          <span key={`dup-${item}`}>
            {item} <span className="footer-marquee-dot">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function MagneticLink({
  href,
  className,
  children,
}: {
  href: string
  className: string
  children: ReactNode
}) {
  const ref = useRef<HTMLAnchorElement>(null)

  const handleMouseMove: MouseEventHandler<HTMLAnchorElement> = (e) => {
    const el = ref.current
    if (!el || window.matchMedia("(hover: none), (prefers-reduced-motion: reduce)").matches) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`
  }
  const handleMouseLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = "translate(0, 0)"
  }

  return (
    <a
      ref={ref}
      href={href}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </a>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-bg-word" aria-hidden="true">
        ЭТАЛОН
      </div>

      <Marquee />

      <div className="container footer-cta reveal">
        <h2>Готовы начать?</h2>
        <p>Оставьте заявку — перезвоним и рассчитаем смету по вашему участку и техническому заданию.</p>
        <div className="footer-cta-actions">
          <MagneticLink href="#contact" className="btn btn-primary footer-magnetic">
            Оставить заявку
          </MagneticLink>
          <MagneticLink href="tel:88003020103" className="btn btn-ghost footer-magnetic mono">
            8 800 302-01-03
          </MagneticLink>
        </div>
      </div>

      <div className="container footer-bottom">
        <span className="footer-copyright">© {new Date().getFullYear()} ЭТАЛОН, строительство домов</span>

        <nav className="footer-nav" aria-label="Разделы сайта">
          <a href="#projects">Проекты</a>
          <a href="#process">Процесс</a>
          <a href="#contact">Контакты</a>
        </nav>

        <button
          type="button"
          className="footer-to-top"
          aria-label="Наверх"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUp size={16} />
        </button>
      </div>
    </footer>
  )
}
