const STATS = [
  { num: "56", label: "домов построено за время работы компании. Более половины клиентов обратились по рекомендации." },
  { num: "10+", label: "лет на рынке строительства в Краснодарском крае" },
  { num: "0,1%", label: "от суммы договора — неустойка за каждый день просрочки" },
  { num: "100%", label: "официально: договор, ответственность, отдельные бригады на каждый вид работ" },
]

export function Stats() {
  return (
    <section className="section-pad-sm" id="about">
      <div className="container">
        <div className="section-head reveal">
          <div className="section-head-text">
            <h2>Показатели надёжности компании</h2>
          </div>
        </div>

        <div className="stats-grid reveal">
          {STATS.map((stat) => (
            <div className="stat-card" key={stat.num}>
              <span className="stat-num mono">{stat.num}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
