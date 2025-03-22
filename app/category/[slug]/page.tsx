import { Metadata } from "next"
import { categories } from "./data"
import CategoryClient from "./client"

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

export default function Page({ params }: { params: { slug: string } }) {
  return <CategoryClient slug={params.slug} />
}

