const HOTSPOTS = [
  { left: "38%", top: "30%" },
  { left: "45%", top: "60%" },
  { left: "58%", top: "24%" },
  { left: "54%", top: "66%" },
]

const CARDS = [
  { style: { left: "2%", top: "9%" }, label: "Спальня, 2 этаж", value: "13 м²", alignRight: false },
  { style: { left: "2%", top: "66%" }, label: "Спальня, 1 этаж", value: "17 м²", alignRight: false },
  { style: { right: "2%", top: "11%" }, label: "Общая площадь", value: "120 м²", alignRight: true },
  { style: { right: "2%", top: "62%" }, label: "Кухня-гостиная", value: "25 м²", alignRight: true },
]

export function Featured() {
  return (
    <section className="section-pad" id="featured">
      <div className="container">
        <div className="feature-showcase reveal">
          <div className="feature-showcase-frame">
            <img
              className="feature-showcase-img"
              src="/img/featured-house.jpg"
              alt="Двухэтажный дом в Краснодаре, построенный компанией Эталон"
              loading="lazy"
            />
            <div className="feature-scrim" />

            <div className="feature-overlay-copy">
              <span className="kicker">Реализованный объект</span>
              <h2>
                Двухэтажный дом
                <br />в Краснодаре
              </h2>
              <p className="feature-price mono">4 800 000 ₽</p>
            </div>

            <svg className="feature-connectors" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <line x1="38" y1="30" x2="9" y2="16" />
              <line x1="45" y1="60" x2="9" y2="74" />
              <line x1="58" y1="24" x2="91" y2="18" />
              <line x1="54" y1="66" x2="91" y2="70" />
            </svg>

            {HOTSPOTS.map((pos, i) => (
              <div className="hotspot" style={pos} key={i}>
                <span className="hotspot-dot" />
              </div>
            ))}

            {CARDS.map((card) => (
              <div
                className={`hotspot-card${card.alignRight ? " align-right" : ""}`}
                style={card.style}
                key={card.label}
              >
                <span className="hotspot-card-label">{card.label}</span>
                <span className="hotspot-card-value mono">{card.value}</span>
              </div>
            ))}

            <a href="#projects" className="btn btn-primary feature-showcase-cta">
              Все проекты
            </a>
          </div>

          <dl className="feature-specs-mobile">
            <div>
              <dt>Площадь</dt>
              <dd>120 м²</dd>
            </div>
            <div>
              <dt>Кухня-гостиная</dt>
              <dd>25 м²</dd>
            </div>
            <div>
              <dt>Спальня, 1 этаж</dt>
              <dd>17 м²</dd>
            </div>
            <div>
              <dt>Спальня, 2 этаж</dt>
              <dd>13 м²</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
