import DataRain from "@/components/ui/data-rain"

const RAIN_PALETTE = { calm: "#ffc466", mid: "#ff8c2e", hot: "#ff4d1a" }

const REVIEWS = [
  {
    shot: "/img/reviews/review-1.jpg",
    avatar: "/img/reviews/reviewer-1.png",
    name: "Виктор Мелантьев",
    href: "https://www.instagram.com/victor_melantyev",
  },
  {
    shot: "/img/reviews/review-2.jpg",
    avatar: "/img/reviews/reviewer-2.png",
    name: "Владислав Божок",
    href: "http://vk.com/vladislav_bozhok",
  },
  {
    shot: "/img/reviews/review-3.jpg",
    avatar: "/img/reviews/reviewer-3.png",
    name: "Михаил Барибан",
    href: "https://vk.com/wr.weed",
  },
  {
    shot: "/img/reviews/review-4.jpg",
    avatar: "/img/reviews/reviewer-4.png",
    name: "Вера Мешайкина",
    href: "https://www.instagram.com/meshaikinavera/",
  },
  {
    shot: "/img/reviews/review-5.jpg",
    avatar: "/img/reviews/reviewer-5.png",
    name: "Сергей Наумов",
    href: "https://vk.com/id456016928",
  },
]

export function Reviews() {
  return (
    <section className="section-pad" id="reviews">
      <DataRain fullscreen={false} className="reviews-rain" palette={RAIN_PALETTE} flowSpeed={0.7} />

      <div className="container">
        <div className="section-head reveal">
          <div className="section-head-text">
            <h2>Отзывы клиентов</h2>
            <p>Реальные отзывы с открытыми профилями авторов.</p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="carousel-track">
          {REVIEWS.map((review) => (
            <article className="review-card reveal" key={review.name}>
              <div className="review-shot">
                <img src={review.shot} alt={`Отзыв о строительстве дома от ${review.name}`} loading="lazy" />
              </div>
              <div className="review-person">
                <img src={review.avatar} alt="" loading="lazy" />
                <div>
                  <p className="review-person-name">{review.name}</p>
                  <a className="review-person-link" href={review.href} target="_blank" rel="noopener noreferrer">
                    Профиль автора
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
