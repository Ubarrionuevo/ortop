import Script from 'next/script'
import { products } from "@/data/products"

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id)

  if (!product) {
    return <div>Producto no encontrado</div>
  }

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image,
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "ARS",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "businessFunction": "http://purl.org/goodrelations/v1#LeaseOut"
    },
    "brand": {
      "@type": "Brand",
      "name": "MarketOrtopedia"
    },
    "category": product.category
  }

  return (
    <div>
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      // ... existing code ...
    </div>
  )
} 