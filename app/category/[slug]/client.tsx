'use client';

import { useState, useEffect } from 'react';
import Link from "next/link"
import { ArrowLeft, MapPin, Phone } from "lucide-react"
import Script from 'next/script'
import Image from 'next/image'
import { subscribeToAllPrices } from '@/lib/firebase';
import { categories, baseProducts, productIdMap } from './data';
import { type Prices } from '@/lib/types';

export default function CategoryClient({ slug }: { slug: string }) {
  const [prices, setPrices] = useState<Prices>({});

  // Find the category by slug
  const category = categories.find((cat) => cat.slug === slug) || {
    id: 0,
    name: "Categoría no encontrada",
    image: "",
    description: "",
    slug: ""
  };

  // Get products for this category
  const categoryProducts = baseProducts.filter((product) => product.category === slug);

  useEffect(() => {
    // Suscribirse a cambios en los precios
    const unsubscribe = subscribeToAllPrices((newPrices: Prices) => {
      setPrices(newPrices);
    });

    // Limpiar la suscripción cuando el componente se desmonte
    return () => unsubscribe();
  }, []);

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
        "price": prices[productIdMap[product.id]] || 0,
        "priceCurrency": "ARS",
        "availability": "https://schema.org/InStock",
        "businessFunction": "LeaseOut"
      },
      "brand": {
        "@type": "Brand",
        "name": "MarketOrtopedia"
      }
    }))
  };

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
                    <span className="text-[10px] text-gray-600 mb-1">
                      ${prices[productIdMap[product.id]]?.toFixed(2) || '0.00'}
                    </span>
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