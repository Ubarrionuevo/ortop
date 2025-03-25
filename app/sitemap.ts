import { MetadataRoute } from 'next'
import { categories, baseProducts } from './category/[slug]/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://marketortopedia.com.ar'

  // Páginas estáticas
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
  ]

  // Páginas de categorías
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Páginas de productos
  const productPages: MetadataRoute.Sitemap = baseProducts.map((product) => ({
    url: `${baseUrl}/form/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...categoryPages, ...productPages]
} 