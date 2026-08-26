import { WordReveal } from "@/components/WordReveal"

const ITEMS = [
  { title: "Ипотека", text: "Оформляем ипотечную заявку в офисе компании." },
  { title: "Поэтапная оплата", text: "Отдельный договор и платёж на каждый этап строительства согласно графику платежей." },
  { title: "Рассрочка", text: "Платежи распределяются на весь срок строительства дома." },
]

export function Financing() {
  return (
    <section className="section-pad-sm" id="financing">
      <div className="container">
        <div className="section-head reveal">
          <div className="section-head-text">
            <h2>Формы оплаты</h2>
          </div>
        </div>
        <p className="financing-note reveal">
          <WordReveal text="Стоимость строительства фиксируется в договоре и не меняется в процессе работ." />
        </p>

        <div className="financing-list reveal">
          {ITEMS.map((item) => (
            <div className="financing-item" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>

        <div className="financing-cta reveal">
          <a href="#contact" className="btn btn-ghost">
            Обсудить условия оплаты
          </a>
        </div>
      </div>
    </section>
  )
}
