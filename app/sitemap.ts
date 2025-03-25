import { MetadataRoute } from 'next'
import { categories } from './category/[slug]/data'
import { products } from './form/[id]/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://marketortopedia.com.ar'

  // Páginas estáticas
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ]

  // Páginas de categorías
  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // Páginas de productos
  const productPages = products.map((product) => ({
    url: `${baseUrl}/form/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  return [...staticPages, ...categoryPages, ...productPages]
} 