const STEPS = [
  { num: "01", title: "Заявка", text: "Приём заявки на сайте или по телефону 8 800 302-01-03." },
  { num: "02", title: "Встреча", text: "Выезд на участок, обсуждение потребностей и ограничений площадки." },
  { num: "03", title: "Проект", text: "Разработка проекта с учётом требований и бюджета." },
  { num: "04", title: "Договор", text: "Фиксация стоимости, сроков и графика платежей в договоре." },
  { num: "05", title: "Строительство", text: "Строительство дома, подключение коммуникаций, еженедельная отчётность." },
  { num: "06", title: "Сдача", text: "Передача объекта в эксплуатацию по акту приёма-передачи." },
]

export function Process() {
  return (
    <section className="section-pad-sm" id="process">
      <div className="container">
        <div className="section-head reveal">
          <div className="section-head-text">
            <h2>Как мы работаем</h2>
            <p>От заявки до передачи объекта по акту: шесть этапов, каждый закреплён в договоре.</p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="process-stepper reveal">
          {STEPS.map((step) => (
            <div className="process-step" key={step.num}>
              <span className="process-step-num mono">{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
