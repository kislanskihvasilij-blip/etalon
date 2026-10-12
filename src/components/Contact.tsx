import { useState, type FormEvent } from "react"
import { SocialLinks } from "./SocialLinks"

export function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
    const form = e.currentTarget
    setTimeout(() => {
      setSubmitted(false)
      form.reset()
    }, 2200)
  }

  return (
    <section className="section-pad" id="contact">
      <div className="container contact-grid">
        <div className="contact-info reveal">
          <h2>Обсудим ваш дом</h2>
          <p>Оставьте заявку, и технолог свяжется с вами, чтобы уточнить участок, бюджет и сроки.</p>

          <dl className="contact-detail">
            <dt>Адрес</dt>
            <dd>г. Краснодар, ул. Российская, 346, оф. 5</dd>
          </dl>
          <dl className="contact-detail">
            <dt>Телефон</dt>
            <dd>
              <a href="tel:88003020103" className="mono">
                8 800 302-01-03
              </a>{" "}
              (звонок бесплатный)
            </dd>
          </dl>
          <dl className="contact-detail">
            <dt>Мы в соцсетях</dt>
            <dd>
              <SocialLinks className="contact-social" />
            </dd>
          </dl>
        </div>

        <form className="contact-form reveal" id="contact-form" onSubmit={handleSubmit}>
          {/* Демо-форма: для приёма реальных заявок подключите обработку на сервере */}
          <div className="form-row">
            <label htmlFor="f-name">Имя</label>
            <input type="text" id="f-name" name="name" placeholder="Как к вам обращаться" required />
          </div>
          <div className="form-row">
            <label htmlFor="f-phone">Телефон</label>
            <input type="tel" id="f-phone" name="phone" placeholder="+7 (___) ___-__-__" required />
          </div>
          <label className="form-consent">
            <input type="checkbox" required />
            <span>Даю согласие на обработку персональных данных</span>
          </label>
          <button type="submit" className="btn btn-primary" disabled={submitted}>
            {submitted ? "Заявка принята" : "Оставить заявку"}
          </button>
        </form>
      </div>
    </section>
  )
}
