import { create } from 'zustand'
import { baseProducts } from '@/lib/data'

interface Category {
  name: string
  image: string
  slug: string
}

interface AppState {
  categories: Category[]
  isLoading: boolean
  initializeCategories: () => void
}

const defaultCategories: Category[] = [
  {
    name: "Sillas de Ruedas",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/silla%20plegable%20de%20ruedas%202-lnzKWIDuIiFeXfv11Ulmi4l5B7lX6N.webp",
    slug: "sillas-de-ruedas",
  },
  {
    name: "Andadores",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/andador2-z9Ve66NV2ieVOfiaBGnvjcQBTHZCuy.webp",
    slug: "andadores",
  },
  {
    name: "Férulas",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ferula%202-EQJBuk2RvbwwkQr5vFpAfTURzlS730.webp",
    slug: "ferulas",
  },
  {
    name: "Inodoros Portátiles",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-5-aa8896f0afa2ce38ad17369552578133-480-0-WfQYqc03KsjDfsAIrH80nyVbToPXGg.webp",
    slug: "inodoros-portatiles",
  },
  {
    name: "Grúas",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/web-web-market-f12d3bfdd4a250a80117370692608748-480-0-ilnZAJDraPBEcfraMvgMj9p9nAingz.webp",
    slug: "gruas",
  },
  {
    name: "Muletas",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/web-web-market-0e860da99f331263a317370662945940-480-0-arVwwSqJQk5PEqGqk4wC7N3byM99jV.webp",
    slug: "muletas",
  },
]

export const useStore = create<AppState>((set) => ({
  categories: defaultCategories,
  isLoading: false,
  initializeCategories: () => {
    set({ isLoading: true })
    // Simular carga
    setTimeout(() => {
      set({ categories: defaultCategories, isLoading: false })
    }, 500)
  },
})) 