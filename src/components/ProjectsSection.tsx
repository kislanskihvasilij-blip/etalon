import StellarProjectGallery from "@/components/ui/3d-image-gallery"
import { projects } from "@/data/projects"

export function ProjectsSection() {
  return (
    <section className="section-pad" id="projects">
      <div className="container">
        <div className="section-head reveal">
          <div className="section-head-text">
            <h2>Избранные проекты домов</h2>
            <p>
              Шесть проектов из портфеля компании в интерактивной 3D-витрине: поворот, приближение и переход к
              подробностям одним движением. Точная стоимость определяется технологом при замере участка.
            </p>
          </div>
        </div>

        <div className="reveal">
          <StellarProjectGallery projects={projects} />
        </div>
      </div>
    </section>
  )
}
