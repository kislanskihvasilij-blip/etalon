import { WordReveal } from "@/components/WordReveal"

export function CustomProject() {
  return (
    <section className="section-pad" id="custom">
      <div className="container custom-project">
        <div className="reveal">
          <div className="block-head">
            <h2>Проектируем дом по вашему техническому заданию</h2>
            <p>
              <WordReveal text="Учитываем планировку, ориентацию по сторонам света и зонирование участка: шумные зоны отдельно от детской и скважины." />
            </p>
          </div>

          <div className="pricing-tiles">
            <div className="pricing-tile">
              <span className="pricing-tile-label">Проект одноэтажного дома</span>
              <span className="pricing-tile-price mono">15 000 ₽</span>
            </div>
            <div className="pricing-tile">
              <span className="pricing-tile-label">Проект двухэтажного дома</span>
              <span className="pricing-tile-price mono">25 000 ₽</span>
            </div>
          </div>
          <p className="section-foot-note">
            Стоимость проекта включается в смету при заказе строительства. При наличии готового проекта смета
            рассчитывается по нему. <a href="#contact">Оставить заявку</a>
          </p>
        </div>

        <div className="custom-project-media reveal">
          <img
            className="custom-project-photo"
            src="/img/custom-project-photo.jpg"
            alt="Ход строительства: черновая отделка помещения с окнами по проекту"
            loading="lazy"
          />
          <div className="custom-project-blueprints">
            <img src="/img/blueprint-1.png" alt="Чертёж проекта одноэтажного дома" loading="lazy" />
            <img src="/img/blueprint-2.png" alt="Чертёж проекта двухэтажного дома" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  )
}
