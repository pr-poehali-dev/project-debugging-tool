import { useState } from "react"
import { useReveal } from "@/hooks/use-reveal"
import Icon from "@/components/ui/icon"

const CATEGORIES = ["Все", "Аватарки", "Обои"]

const ITEMS = [
  { id: 1, category: "Аватарки", url: "https://cdn.poehali.dev/files/304e9b02-cec3-4f8b-8b62-470a10dd3773.png", label: "IN" },
  { id: 2, category: "Аватарки", url: "https://cdn.poehali.dev/files/bd76dd39-6c6a-4bc1-a015-878d6c9c9d76.png", label: "Jisung" },
  { id: 3, category: "Аватарки", url: "https://cdn.poehali.dev/files/03112d0c-7788-45f1-902d-f6489d87e04a.png", label: "Hua Cheng" },
  { id: 4, category: "Аватарки", url: "https://cdn.poehali.dev/files/2e18e799-d082-46b9-a263-6702dcfe4270.png", label: "Han" },
  { id: 5, category: "Обои", url: "https://cdn.poehali.dev/files/79f4c34f-d1ad-4891-87ae-b279f345cfbc.png", label: "Bao Miei" },
  { id: 6, category: "Обои", url: "https://cdn.poehali.dev/files/8b4ef32a-6324-42c6-865a-ef6dde06ec03.png", label: "Kafka" },
  { id: 7, category: "Обои", url: "https://cdn.poehali.dev/files/ad3c59ff-ce9c-4390-af1e-631fe74bbf93.png", label: "Alden-Veron Al" },
]

export function GallerySection() {
  const { ref, isVisible } = useReveal(0.2)
  const [activeCategory, setActiveCategory] = useState("Все")
  const [lightbox, setLightbox] = useState<string | null>(null)

  const filtered = activeCategory === "Все" ? ITEMS : ITEMS.filter((i) => i.category === activeCategory)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start flex-col justify-center px-4 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-6 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-4xl font-light leading-tight tracking-tight text-foreground md:text-6xl">
            Галерея
          </h2>
          <p className="font-mono text-xs text-foreground/60 md:text-sm">/ Примеры работ</p>
        </div>

        <div
          className={`mb-6 flex gap-3 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`border-b pb-0.5 font-mono text-xs transition-all duration-200 ${
                activeCategory === cat
                  ? "border-foreground text-foreground"
                  : "border-transparent text-foreground/50 hover:text-foreground/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div
          className={`grid grid-cols-3 gap-2 transition-all duration-700 sm:grid-cols-4 md:grid-cols-5 md:gap-3 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          {filtered.map((item) => (
            <button
              key={item.id}
              onClick={() => setLightbox(item.url)}
              className="group relative aspect-square overflow-hidden rounded-lg bg-foreground/10"
            >
              <img
                src={item.url}
                alt={item.label}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="font-mono text-xs text-white">{item.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute right-4 top-4 text-white/70 transition-colors hover:text-white"
            onClick={() => setLightbox(null)}
          >
            <Icon name="X" size={28} />
          </button>
          <img
            src={lightbox}
            alt=""
            className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
