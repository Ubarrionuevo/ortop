import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Find the category by slug
  const category = categories.find((cat) => cat.slug === slug) || {
    id: 0,
    name: "Categoría no encontrada",
    image: "",
  }

  // Get products for this category
  const categoryProducts = products.filter((product) => product.category === slug)

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="container flex h-14 items-center">
          <Link href="/" className="flex items-center space-x-2 ml-7">
            <ArrowLeft className="h-5 w-5 text-zinc-600" />
          </Link>
          <h1 className="flex-1 text-center font-bold text-xl text-zinc-900 mx-auto max-w-lg mr-4">{category.name}</h1>
          <div className="w-10"></div> {/* Spacer for balance */}
        </div>
      </header>

      <main className="container px-4 py-4">
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {categoryProducts.map((product) => (
              <Link href={`/form/${product.id}`} className="overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300">
                <div className="aspect-[4/3] relative">
                  <img src={product.image || "/placeholder.svg"} alt={product.name} className="h-full w-full object-cover" />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm text-zinc-900">{product.name}</h3>
                  <p className="mt-1 text-xs text-zinc-600 line-clamp-2">{product.description}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-medium text-sm text-[#00a0e3]">${product.price.toFixed(2)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-zinc-600">No hay productos disponibles en esta categoría.</p>
          </div>
        )}
      </main>
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300">
      <div className="aspect-[4/3] relative">
        <img src={product.image || "/placeholder.svg"} alt={product.name} className="h-full w-full object-cover" />
      </div>
      <div className="p-3">
        <h3 className="font-medium text-sm text-zinc-900">{product.name}</h3>
        <p className="mt-1 text-xs text-zinc-600 line-clamp-2">{product.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-medium text-sm text-[#00a0e3]">${product.price.toFixed(2)}</span>
          <Link
            href={`/form/${product.id}`}
            className="rounded-full bg-[#00a0e3] px-3 py-1 text-xs font-medium text-white hover:bg-[#0088c2] transition-colors"
          >
            Alquilar
          </Link>
        </div>
      </div>
    </div>
  )
}

// Sample data
interface Category {
  id: number
  name: string
  image: string
  slug: string
}

interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
}

const categories: Category[] = [
  {
    id: 1,
    name: "Sillas de Ruedas",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/silla%20plegable%20de%20ruedas%202-lnzKWIDuIiFeXfv11Ulmi4l5B7lX6N.webp",
    slug: "sillas-de-ruedas",
  },
  {
    id: 2,
    name: "Andadores",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/andador2-z9Ve66NV2ieVOfiaBGnvjcQBTHZCuy.webp",
    slug: "andadores",
  },
  {
    id: 3,
    name: "Férulas",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ferula%202-EQJBuk2RvbwwkQr5vFpAfTURzlS730.webp",
    slug: "ferulas",
  },
  {
    id: 4,
    name: "Inodoros Portátiles",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-5-aa8896f0afa2ce38ad17369552578133-480-0-WfQYqc03KsjDfsAIrH80nyVbToPXGg.webp",
    slug: "inodoros-portatiles",
  },
  {
    id: 5,
    name: "Grúas",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/web-web-market-f12d3bfdd4a250a80117370692608748-480-0-ilnZAJDraPBEcfraMvgMj9p9nAingz.webp",
    slug: "gruas",
  },
  {
    id: 6,
    name: "Muletas",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/web-web-market-0e860da99f331263a317370662945940-480-0-arVwwSqJQk5PEqGqk4wC7N3byM99jV.webp",
    slug: "muletas",
  },
  {
    id: 7,
    name: "Camas",
    image: "https://www.marketortopedia.com.ar/productos/alquiler-de-cama-ortopedica-en-mendoza/",
    slug: "camas",
  },
]

const products: Product[] = [
  {
    id: 1,
    name: "Silla de Ruedas Estándar",
    description: "Silla de ruedas plegable con estructura de aluminio y tapizado resistente",
    price: 5000,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/silla%20plegable%20de%20ruedas%202-lnzKWIDuIiFeXfv11Ulmi4l5B7lX6N.webp",
    category: "sillas-de-ruedas",
  },
  {
    id: 2,
    name: "Silla de Ruedas de Transporte",
    description: "Silla de ruedas ligera ideal para transporte ocasional",
    price: 4500,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/silla%20de%20ruedas%20plegable%201-7bU1afGNGstQxv6Ake6B203I8dWIX1.webp",
    category: "sillas-de-ruedas",
  },
  {
    id: 3,
    name: "Andador Plegable",
    description: "Andador de aluminio ajustable y plegable",
    price: 3000,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/andador2-z9Ve66NV2ieVOfiaBGnvjcQBTHZCuy.webp",
    category: "andadores",
  },
  {
    id: 4,
    name: "Andador con Ruedas",
    description: "Andador con ruedas delanteras y tacos antideslizantes",
    price: 3500,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sin-titulo-1080-x-1400-px-1-6868d4e081dfc1112917324276741159-480-0-3YE866ReOTSXwhQJZCHVoALCCAAKYD.webp",
    category: "andadores",
  },
  {
    id: 5,
    name: "Férula Walker",
    description: "Bota ortopédica para inmovilización y rehabilitación",
    price: 2500,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ferula%202-EQJBuk2RvbwwkQr5vFpAfTURzlS730.webp",
    category: "ferulas",
  },
  {
    id: 6,
    name: "Inodoro Portátil",
    description: "Silla sanitaria ajustable con recipiente extraíble",
    price: 4000,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-5-aa8896f0afa2ce38ad17369552578133-480-0-WfQYqc03KsjDfsAIrH80nyVbToPXGg.webp",
    category: "inodoros-portatiles",
  },
  {
    id: 7,
    name: "Grúa de Traslado",
    description: "Grúa para traslado de pacientes con arnés incluido",
    price: 15000,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/web-web-market-f12d3bfdd4a250a80117370692608748-480-0-ilnZAJDraPBEcfraMvgMj9p9nAingz.webp",
    category: "gruas",
  },
  {
    id: 8,
    name: "Muletas Regulables",
    description: "Par de muletas de aluminio con altura ajustable",
    price: 2000,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/web-web-market-0e860da99f331263a317370662945940-480-0-arVwwSqJQk5PEqGqk4wC7N3byM99jV.webp",
    category: "muletas",
  },
  {
    id: 9,
    name: "Cama Ortopédica Manual",
    description: "Cama ortopédica con ajuste manual de altura y posición, incluye colchón",
    price: 25000,
    image: "/cama.webp",
    category: "camas",
  },
  
]

