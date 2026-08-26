"use client"

import React, {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  createContext,
  useContext,
} from "react"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Html, Plane, Sphere } from "@react-three/drei"
import { X } from "lucide-react"
import type { Project } from "@/data/projects"

/**
 * Stellar Project Gallery — adapted from a generic 3D card-gallery
 * component to show real house projects (photo, description, specs,
 * price) instead of placeholder template art. Drag to orbit, scroll
 * to zoom, click a card for details.
 */

/* =========================
   Card Context
   ========================= */

type CardContextType = {
  selectedCard: Project | null
  setSelectedCard: (card: Project | null) => void
  cards: Project[]
}

const CardContext = createContext<CardContextType | undefined>(undefined)

function useCard() {
  const ctx = useContext(CardContext)
  if (!ctx) throw new Error("useCard must be used within CardProvider")
  return ctx
}

function CardProvider({
  projects,
  children,
}: {
  projects: Project[]
  children: React.ReactNode
}) {
  const [selectedCard, setSelectedCard] = useState<Project | null>(null)

  return (
    <CardContext.Provider value={{ selectedCard, setSelectedCard, cards: projects }}>
      {children}
    </CardContext.Provider>
  )
}

/* =========================
   Starfield Background
   ========================= */

function StarfieldBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return
    const mount = mountRef.current

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      2000
    )
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const starsGeometry = new THREE.BufferGeometry()
    const starsCount = 6000
    const positions = new Float32Array(starsCount * 3)
    for (let i = 0; i < starsCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000
    }
    starsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xededf3,
      size: 0.6,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.7,
    })
    const stars = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(stars)

    camera.position.z = 10

    let animationId = 0
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      stars.rotation.y += 0.0001
      stars.rotation.x += 0.00005
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      if (!mount) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
      if (mount && renderer.domElement.parentElement === mount) {
        mount.removeChild(renderer.domElement)
      }
      renderer.dispose()
      starsGeometry.dispose()
      starsMaterial.dispose()
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0 z-0" />
}

/* =========================
   Floating Card
   ========================= */

function FloatingCard({
  card,
  position,
}: {
  card: Project
  position: { x: number; y: number; z: number }
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const { setSelectedCard } = useCard()

  useFrame(({ camera }) => {
    if (groupRef.current) groupRef.current.lookAt(camera.position)
  })

  return (
    <group ref={groupRef} position={[position.x, position.y, position.z]}>
      <Plane
        ref={meshRef}
        args={[4.5, 6]}
        onClick={(e) => {
          e.stopPropagation()
          setSelectedCard(card)
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          setHovered(false)
        }}
      >
        <meshBasicMaterial transparent opacity={0} />
      </Plane>

      <Html
        transform
        distanceFactor={10}
        position={[0, 0, 0.01]}
        style={{
          transition: "transform 0.3s ease",
          transform: hovered ? "scale(1.12)" : "scale(1)",
          pointerEvents: "none",
        }}
      >
        <div
          className="stellar-card-hit w-44 rounded-xl overflow-hidden bg-[var(--graphite)] p-2.5 select-none"
          style={{
            backgroundColor: hovered ? "var(--obsidian)" : "var(--graphite)",
            border: hovered ? "1px solid var(--accent)" : "1px solid var(--line)",
            transition: "background-color 0.3s ease, border-color 0.3s ease",
          }}
        >
          <img
            src={card.imageUrl}
            alt={card.alt}
            className="w-full h-28 object-cover rounded-lg"
            loading="lazy"
            draggable={false}
          />
          <div className="mt-2 px-0.5">
            <p className="text-[var(--ivory)] text-xs font-medium">Проект {card.code}</p>
            <p className="text-[var(--ash)] text-[11px] mt-0.5">{card.meta[1]}</p>
          </div>
        </div>
      </Html>
    </group>
  )
}

/* =========================
   Card Modal
   ========================= */

function CardModal() {
  const { selectedCard, setSelectedCard } = useCard()
  const cardRef = useRef<HTMLDivElement>(null)

  if (!selectedCard) return null

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rotateX = (y - rect.height / 2) / 18
    const rotateY = (rect.width / 2 - x) / 18
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }
  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 0.5s ease-out"
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)"
    }
  }

  const handleClose = () => setSelectedCard(null)
  const handleBackdropClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) handleClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4"
      onClick={handleBackdropClick}
    >
      <div className="relative max-w-md w-full">
        <button
          onClick={handleClose}
          aria-label="Закрыть"
          className="absolute -top-12 right-0 text-[var(--ivory)] hover:text-white transition-colors z-10"
        >
          <X className="w-7 h-7" />
        </button>

        <div style={{ perspective: "1000px" }} className="w-full">
          <div
            ref={cardRef}
            className="relative rounded-2xl bg-[var(--graphite)] p-5 transition-transform duration-500 ease-out w-full"
            style={{ transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative w-full mb-4 rounded-xl overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
              <img
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
                alt={selectedCard.alt}
                src={selectedCard.imageUrl}
              />
            </div>

            <p className="text-[var(--ash)] text-xs mb-1">Проект {selectedCard.code}</p>
            <h3 className="text-[var(--ivory)] text-xl font-medium mb-2" style={{ fontWeight: 480 }}>
              {selectedCard.description}
            </h3>

            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[var(--ash)] text-sm mb-4 border-t border-[var(--line)] pt-3">
              {selectedCard.meta.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-[var(--ivory)] text-lg" style={{ fontWeight: 480 }}>
                {selectedCard.price}
              </span>
              <a
                href="#contact"
                onClick={handleClose}
                className="inline-flex h-10 items-center justify-center rounded-full px-5 text-sm text-white transition duration-300 ease-out hover:opacity-90 active:scale-[0.97]"
                style={{ backgroundColor: "var(--cobalt)" }}
              >
                Оставить заявку
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* =========================
   Card Galaxy
   ========================= */

function CardGalaxy() {
  const { cards } = useCard()

  const cardPositions = useMemo(() => {
    const positions: { x: number; y: number; z: number }[] = []
    const numCards = cards.length
    const goldenRatio = (1 + Math.sqrt(5)) / 2

    for (let i = 0; i < numCards; i++) {
      const y = numCards > 1 ? 1 - (i / (numCards - 1)) * 2 : 0
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y))
      const theta = (2 * Math.PI * i) / goldenRatio
      const x = Math.cos(theta) * radiusAtY
      const z = Math.sin(theta) * radiusAtY
      const layerRadius = 11 + (i % 3) * 3.5

      positions.push({ x: x * layerRadius, y: y * layerRadius * 0.7, z: z * layerRadius })
    }
    return positions
  }, [cards.length])

  return (
    <>
      <Sphere args={[10, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#5266eb" transparent opacity={0.04} wireframe />
      </Sphere>
      <Sphere args={[14, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#5266eb" transparent opacity={0.025} wireframe />
      </Sphere>

      {cards.map((card, i) => (
        <FloatingCard key={card.id} card={card} position={cardPositions[i]} />
      ))}
    </>
  )
}

/* =========================
   Exported Gallery
   ========================= */

export default function StellarProjectGallery({ projects }: { projects: Project[] }) {
  return (
    <CardProvider projects={projects}>
      <div className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-xl overflow-hidden bg-[var(--onyx-deep)]">
        <StarfieldBackground />

        <Canvas camera={{ position: [0, 0, 17], fov: 55 }} className="absolute inset-0 z-10">
          <Suspense fallback={null}>
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={0.5} />
            <pointLight position={[-10, -10, -10]} intensity={0.25} />
            <CardGalaxy />
            <OrbitControls
              enablePan={false}
              enableZoom
              enableRotate
              minDistance={8}
              maxDistance={32}
              autoRotate
              autoRotateSpeed={0.4}
              rotateSpeed={0.5}
              zoomSpeed={1}
              target={[0, 0, 0]}
            />
          </Suspense>
        </Canvas>

        <CardModal />

        <div className="absolute bottom-4 left-4 z-20 text-[var(--ash)] text-xs pointer-events-none">
          Перетащите, чтобы осмотреть · Колесо мыши — зум · Клик по проекту — подробности
        </div>
      </div>
    </CardProvider>
  )
}
