import { projects } from "@/data/projects"

export function ProjectsSection() {
  return (
    <section className="section-pad" id="projects">
      <div className="container">
        <div className="section-head reveal">
          <div className="section-head-text">
            <h2>Избранные проекты домов</h2>
            <p>
              Шесть проектов из портфеля компании. Площадь, планировка и цена — у каждого проекта. Точная стоимость
              определяется технологом при замере участка.
            </p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="carousel-track">
          {projects.map((project) => (
            <article className="project-card reveal" key={project.id}>
              <img src={project.imageUrl} alt={project.alt} loading="lazy" />
              <div className="project-card-body">
                <span className="project-card-code">Проект {project.code}</span>
                <p className="project-card-desc">{project.description}</p>
                <div className="project-card-meta">
                  {project.meta.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
                <p className="project-card-price mono">{project.price}</p>
                <a href="#contact" className="btn btn-ghost btn-sm project-card-cta">
                  Оставить заявку
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
