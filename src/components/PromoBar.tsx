export function PromoBar() {
  return (
    <section className="promo-bar">
      <div className="container promo-inner">
        <p>
          <strong>При подписании договора</strong> проект дома и септик включены в стоимость
          строительства.
        </p>
        {/* TODO(владелец сайта): подтвердите, что акция ещё действует, и укажите актуальный срок перед публикацией */}
        <a href="#contact" className="btn btn-primary btn-sm">
          Оставить заявку
        </a>
      </div>
    </section>
  )
}
