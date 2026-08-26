import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "@/hooks/useRevealAll"

const SHOTS = [
  { src: "/img/interior/01.jpg", alt: "Прихожая дома", caption: "Прихожая" },
  { src: "/img/interior/02.jpg", alt: "Лестница на второй этаж", caption: "Лестница на второй этаж" },
  { src: "/img/interior/03.jpg", alt: "Комната с окном", caption: "Комната, естественный свет" },
  { src: "/img/interior/04.jpg", alt: "Комната мансардного этажа", caption: "Комната под кровлей" },
  { src: "/img/interior/05.jpg", alt: "Дверной проём между комнатами", caption: "Дверной проём" },
  { src: "/img/interior/06.jpg", alt: "Дальняя комната второго этажа", caption: "Финальная комната" },
]

const DWELL_MS = 3200

export function InteriorWalk() {
  const reduceMotion = useReducedMotion()
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const fillRefs = useRef<Array<HTMLSpanElement | null>>([])

  useEffect(() => {
    fillRefs.current.forEach((span, i) => {
      if (!span) return
      const fill = span.firstElementChild as HTMLElement | null
      if (!fill) return
      if (i < current) {
        fill.style.transitionDuration = "0ms"
        fill.style.width = "100%"
      } else if (i === current) {
        fill.style.transitionDuration = "0ms"
        fill.style.width = "0%"
        void fill.offsetWidth
        fill.style.transitionDuration = reduceMotion ? "0ms" : `${DWELL_MS}ms`
        fill.style.width = "100%"
      } else {
        fill.style.transitionDuration = "0ms"
        fill.style.width = "0%"
      }
    })
  }, [current, reduceMotion])

  useEffect(() => {
    if (reduceMotion || SHOTS.length <= 1) return
    const timer = setInterval(() => {
      setCurrent((c) => {
        setPrev(c)
        return (c + 1) % SHOTS.length
      })
    }, DWELL_MS)
    return () => clearInterval(timer)
  }, [reduceMotion])

  return (
    <section className="section-pad-sm" id="interior-walk">
      <div className="container">
        <div className="block-head reveal">
          <h2>Интерьер дома</h2>
          <p>Реальные фотографии сданного объекта — от прихожей до комнат второго этажа.</p>
        </div>

        <div className="interior-walk-frame reveal" id="interior-walk-frame">
          {SHOTS.map((shot, i) => (
            <img
              key={shot.src}
              className={`interior-walk-img${i === current ? " is-active" : i === prev ? " is-prev" : ""}`}
              src={shot.src}
              alt={shot.alt}
            />
          ))}

          <div className="interior-walk-progress" id="interior-walk-progress">
            {SHOTS.map((shot, i) => (
              <span key={shot.src} ref={(el) => { fillRefs.current[i] = el }}>
                <i />
              </span>
            ))}
          </div>
          <div className="interior-walk-scrim" />
          <div className="interior-walk-caption">
            <span className="interior-walk-index mono">
              {String(current + 1).padStart(2, "0")} / {String(SHOTS.length).padStart(2, "0")}
            </span>
            <span className="interior-walk-text">{SHOTS[current].caption}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
