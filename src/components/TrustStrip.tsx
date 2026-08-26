import { Ruler, CalendarCheck, ShieldCheck, MapPin } from "lucide-react"

const ITEMS = [
  { icon: Ruler, text: "Технический надзор на каждом этапе строительства" },
  { icon: CalendarCheck, text: "Поэтапная оплата по договору" },
  { icon: ShieldCheck, text: "Гарантия три года по акту приёма-передачи" },
  { icon: MapPin, text: "Подбор и оформление участка" },
]

export function TrustStrip() {
  return (
    <section className="trust-strip">
      <div className="container trust-strip-inner">
        {ITEMS.map(({ icon: Icon, text }) => (
          <div className="trust-item" key={text}>
            <Icon size={20} strokeWidth={1.6} />
            {text}
          </div>
        ))}
      </div>
    </section>
  )
}
