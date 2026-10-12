import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { TrustStrip } from "@/components/TrustStrip"
import { PromoBar } from "@/components/PromoBar"
import { Featured } from "@/components/Featured"
import { InteriorWalk } from "@/components/InteriorWalk"
import { ProjectsSection } from "@/components/ProjectsSection"
import { CustomProject } from "@/components/CustomProject"
import { Financing } from "@/components/Financing"
import { Process } from "@/components/Process"
import { Stats } from "@/components/Stats"
import { Reviews } from "@/components/Reviews"
import { Contact } from "@/components/Contact"
import { Footer } from "@/components/Footer"
import { useRevealAll } from "@/hooks/useRevealAll"

export default function App() {
  useRevealAll()

  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <Stats />
        <ProjectsSection />
        <Featured />
        <InteriorWalk />
        <CustomProject />
        <Process />
        <Financing />
        <PromoBar />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
