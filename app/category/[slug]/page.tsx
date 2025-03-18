import Link from "next/link"
import { ArrowLeft, Clock, MapPin, Phone } from "lucide-react"
import { Metadata } from "next"
import Script from 'next/script'
import Image from 'next/image'

// Generar metadatos dinámicos para cada categoría
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const category = categories.find((c) => c.slug === params.slug)
  
  if (!category) {
    return {
      title: "Categoría no encontrada | Ortopedia en Mendoza",
      description: "La categoría que buscas no está disponible. Explora nuestro catálogo de equipos ortopédicos en Mendoza."
    }
  }

  return {
    title: `${category.name} en Mendoza | Alquiler de ${category.name} - Ortopedia`,
    description: `Alquiler de ${category.name} en Mendoza. ${category.description} Servicio profesional de ortopedia en Ciudad de Mendoza. ¡Consulta disponibilidad!`,
    openGraph: {
      title: `${category.name} en Mendoza | MarketOrtopedia`,
      description: `Alquiler de ${category.name} en Mendoza. ${category.description} La mejor ortopedia en Ciudad de Mendoza.`,
      url: `https://marketortopedia.com.ar/category/${params.slug}`,
      images: [{
        url: category.image,
        width: 800,
        height: 600,
        alt: `${category.name} en alquiler - MarketOrtopedia`
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.name} en Mendoza | MarketOrtopedia`,
      description: `Alquiler de ${category.name} en Mendoza. ${category.description} La mejor ortopedia en Ciudad de Mendoza.`,
      images: [category.image],
    },
    alternates: {
      canonical: `https://marketortopedia.com.ar/category/${params.slug}`,
    },
  }
}

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

  // Schema.org data
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": categoryProducts.map((product, index) => ({
      "@type": "Product",
      "position": index + 1,
      "name": product.name,
      "description": product.description,
      "image": product.image,
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "businessFunction": "LeaseOut"
      },
      "brand": {
        "@type": "Brand",
        "name": "MarketOrtopedia"
      }
    }))
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <Script
        id="schema-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5 text-zinc-600" />
              <span className="text-sm text-zinc-600 hidden lg:inline-block">Volver al inicio</span>
            </Link>
          </div>
          <h1 className="absolute left-1/2 transform -translate-x-1/2 font-bold text-xl lg:static lg:transform-none lg:text-2xl text-zinc-900">{category.name}</h1>
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-zinc-600">
                <MapPin className="h-4 w-4 text-[#00a0e3]" />
                <span className="text-sm">Federico Moreno 950, Ciudad</span>
              </div>
              <div className="flex items-center space-x-2 text-zinc-600">
                <Phone className="h-4 w-4 text-[#00a0e3]" />
                <span className="text-sm">(261) 123-4567</span>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Category Description - Desktop Only */}
        <div className="hidden lg:block mb-12 max-w-4xl mx-auto text-center">
          <p className="text-zinc-600">
            Encuentra los mejores productos ortopédicos para alquiler. Calidad y confianza garantizada.
          </p>
        </div>

        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 max-w-7xl mx-auto">
            {categoryProducts.map((product) => (
              <Link 
                key={product.id}
                href={`/form/${product.id}`} 
                className="group overflow-hidden rounded-sm bg-white shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="aspect-[1/1] relative overflow-hidden">
                  <Image
                    src={product.image || "/cama.webp"}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    priority={product.id === 9 || product.id === 10}
                  />
                </div>
                <div className="p-1.5">
                  <h3 className="font-medium text-[11px] text-zinc-900 group-hover:text-[#00a0e3] transition-colors text-center truncate">
                    {product.name}
                  </h3>
                  <p className="mt-0.5 text-[9px] text-zinc-600 line-clamp-1 text-center">
                    {product.description}
                  </p>
                  <div className="mt-1 flex flex-col items-center">
                    <span className="w-full inline-flex items-center justify-center rounded-sm bg-[#00a0e3] px-1.5 py-0.5 text-[10px] font-medium text-white group-hover:bg-[#0088c2] transition-colors">
                      Alquilar
                    </span>
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

      {/* Desktop Footer */}
      <footer className="hidden lg:block bg-white border-t py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-zinc-600">
              ¿Necesitas ayuda para elegir el producto adecuado? Contáctanos al (261) 123-4567
            </p>
          </div>
        </div>
      </footer>
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
        <div className="mt-2 flex items-center justify-end">
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
  description: string
}

interface Product {
  id: number
  name: string
  description: string
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
    description: "Sillas de ruedas plegables con estructura de aluminio y tapizado resistente",
  },
  {
    id: 2,
    name: "Andadores",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/andador2-z9Ve66NV2ieVOfiaBGnvjcQBTHZCuy.webp",
    slug: "andadores",
    description: "Andadores de aluminio ajustables y plegables",
  },
  {
    id: 3,
    name: "Férulas",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ferula%202-EQJBuk2RvbwwkQr5vFpAfTURzlS730.webp",
    slug: "ferulas",
    description: "Botas ortopédicas para inmovilización y rehabilitación",
  },
  {
    id: 4,
    name: "Inodoros Portátiles",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-5-aa8896f0afa2ce38ad17369552578133-480-0-WfQYqc03KsjDfsAIrH80nyVbToPXGg.webp",
    slug: "inodoros-portatiles",
    description: "Sillas sanitarias ajustables con recipiente extraíble",
  },
  {
    id: 5,
    name: "Grúas",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/web-web-market-f12d3bfdd4a250a80117370692608748-480-0-ilnZAJDraPBEcfraMvgMj9p9nAingz.webp",
    slug: "gruas",
    description: "Grúas para traslado de pacientes con arnés incluido",
  },
  {
    id: 6,
    name: "Muletas",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/web-web-market-0e860da99f331263a317370662945940-480-0-arVwwSqJQk5PEqGqk4wC7N3byM99jV.webp",
    slug: "muletas",
    description: "Par de muletas de aluminio con altura ajustable",
  },
  {
    id: 7,
    name: "Camas",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cama-ortopedica-manual.webp",
    slug: "camas",
    description: "Cama ortopédica con ajuste manual de altura y posición, incluye colchón",
  },
]

const products: Product[] = [
  {
    id: 1,
    name: "Silla de Ruedas Estándar",
    description: "Silla de ruedas plegable con estructura de aluminio y tapizado resistente",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/silla%20plegable%20de%20ruedas%202-lnzKWIDuIiFeXfv11Ulmi4l5B7lX6N.webp",
    category: "sillas-de-ruedas",
  },
  {
    id: 2,
    name: "Silla de Ruedas de Transporte",
    description: "Silla de ruedas ligera ideal para transporte ocasional",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/silla%20de%20ruedas%20plegable%201-7bU1afGNGstQxv6Ake6B203I8dWIX1.webp",
    category: "sillas-de-ruedas",
  },
  {
    id: 3,
    name: "Andador Plegable",
    description: "Andador de aluminio ajustable y plegable",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/andador2-z9Ve66NV2ieVOfiaBGnvjcQBTHZCuy.webp",
    category: "andadores",
  },
  {
    id: 4,
    name: "Andador con Ruedas",
    description: "Andador con ruedas delanteras y tacos antideslizantes",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sin-titulo-1080-x-1400-px-1-6868d4e081dfc1112917324276741159-480-0-3YE866ReOTSXwhQJZCHVoALCCAAKYD.webp",
    category: "andadores",
  },
  {
    id: 5,
    name: "Férula Walker",
    description: "Bota ortopédica para inmovilización y rehabilitación",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ferula%202-EQJBuk2RvbwwkQr5vFpAfTURzlS730.webp",
    category: "ferulas",
  },
  {
    id: 6,
    name: "Inodoro Portátil",
    description: "Silla sanitaria ajustable con recipiente extraíble",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-5-aa8896f0afa2ce38ad17369552578133-480-0-WfQYqc03KsjDfsAIrH80nyVbToPXGg.webp",
    category: "inodoros-portatiles",
  },
  {
    id: 7,
    name: "Grúa de Traslado",
    description: "Grúa para traslado de pacientes con arnés incluido",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/web-web-market-f12d3bfdd4a250a80117370692608748-480-0-ilnZAJDraPBEcfraMvgMj9p9nAingz.webp",
    category: "gruas",
  },
  {
    id: 8,
    name: "Muletas Regulables",
    description: "Par de muletas de aluminio con altura ajustable",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/web-web-market-0e860da99f331263a317370662945940-480-0-arVwwSqJQk5PEqGqk4wC7N3byM99jV.webp",
    category: "muletas",
  },
  {
    id: 9,
    name: "Cama Ortopédica Manual",
    description: "Cama ortopédica con ajuste manual de altura y posición, incluye colchón",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cama-ortopedica-manual.webp",
    category: "camas",
  },
]

