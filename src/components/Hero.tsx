import { useEffect, useRef, useState } from "react"
import { Pause, Play } from "lucide-react"
import { useReducedMotion } from "@/hooks/useRevealAll"
import { WordReveal } from "@/components/WordReveal"

const PHOTOS = [
  { src: "/img/walkthrough/01.jpg", alt: "Дом, вид с улицы" },
  { src: "/img/walkthrough/02.jpg", alt: "Дом, вход и крыльцо" },
  { src: "/img/walkthrough/03.jpg", alt: "Дом, боковой угол" },
  { src: "/img/walkthrough/04.jpg", alt: "Дом, кирпичный фасад крупным планом" },
  { src: "/img/walkthrough/05.jpg", alt: "Дом, угол фасада на закате" },
  { src: "/img/walkthrough/06.jpg", alt: "Дом, вид со двора" },
]

const DWELL_MS = 4500

export function Hero() {
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const [userPaused, setUserPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (reduceMotion || PHOTOS.length <= 1) return

    const stop = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
    const start = () => {
      if (!timerRef.current && !userPaused) {
        timerRef.current = setInterval(() => {
          setActive((i) => (i + 1) % PHOTOS.length)
        }, DWELL_MS)
      }
    }

    start()
    const onVisibility = () => (document.hidden ? stop() : start())
    document.addEventListener("visibilitychange", onVisibility)
    return () => {
      stop()
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [reduceMotion, userPaused])

  return (
    <section className="hero" id="top">
      <div className="hero-bg-cycle" id="hero-bg-cycle" aria-hidden="true">
        {PHOTOS.map((photo, i) => (
          <img
            key={photo.src}
            className={`hero-bg-photo${i === active ? " is-active" : ""}`}
            src={photo.src}
            alt={photo.alt}
          />
        ))}
      </div>
      <div className="hero-scrim" />
      <div className="hero-bg-word" aria-hidden="true">
        ЭТАЛОН
      </div>

      <div className="container hero-inner">
        <span className="hero-eyebrow">Строительство домов · Краснодарский край</span>
        <h1 className="hero-title">
          Дома, построенные по проекту.
          <br />
          Каждый этап — по договору.
        </h1>
        <p className="hero-sub">
          <WordReveal
            triggerOnMount
            text="Полный цикл строительства в Краснодарском крае: проект, смета, технический надзор на каждом этапе, сдача объекта по акту. Оплата поэтапно по договору, гарантия три года."
          />
        </p>
        <div className="hero-actions">
          <a href="#contact" className="btn btn-primary">
            Оставить заявку
          </a>
          <a href="#projects" className="btn btn-ghost">
            Смотреть проекты
          </a>
        </div>
      </div>

      <div className="hero-carousel-nav">
        <div className="hero-pips" id="hero-pips">
          {PHOTOS.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              className={`hero-pip${i === active ? " is-active" : ""}`}
              aria-label={`Вид ${i + 1}`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
        {!reduceMotion && PHOTOS.length > 1 && (
          <button
            type="button"
            className="hero-pause"
            aria-label={userPaused ? "Возобновить смену фото" : "Поставить смену фото на паузу"}
            aria-pressed={userPaused}
            onClick={() => setUserPaused((v) => !v)}
          >
            {userPaused ? <Play size={14} /> : <Pause size={14} />}
          </button>
        )}
      </div>
    </section>
  )
}
