'use client'

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useStore } from "@/lib/store/useStore"
import { useEffect } from "react"

interface Category {
  name: string
  image: string
  slug: string
}

export function CategoryGrid() {
  const { categories, isLoading, initializeCategories } = useStore()

  useEffect(() => {
    initializeCategories()
  }, [initializeCategories])

  if (isLoading) {
    return (
      <>
        <div className="hidden lg:grid grid-cols-3 gap-8 max-w-6xl mx-auto">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-gray-100 rounded-lg h-[120px] animate-pulse" />
          ))}
        </div>
        <div className="lg:hidden flex flex-col space-y-3 max-w-3xl mx-auto">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-gray-100 rounded-lg h-[120px] animate-pulse" />
          ))}
        </div>
      </>
    )
  }

  return (
    <>
      <div className="hidden lg:grid grid-cols-3 gap-8 max-w-6xl mx-auto">
        {categories.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
      <div className="lg:hidden flex flex-col space-y-3 max-w-3xl mx-auto">
        {categories.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </>
  )
}

function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="group relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300 w-full h-[120px]"
    >
      <div className="absolute inset-0">
        <img
          src={category.image || "/placeholder.svg"}
          alt={category.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
      </div>
      <div className="relative h-full p-4 flex flex-col justify-between">
        <h3 className="text-lg font-medium text-white">{category.name}</h3>
        <div className="flex justify-end">
          <div className="bg-[#00a0e3] text-white text-sm px-3 py-1 rounded-full flex items-center gap-1 group-hover:bg-[#0088c2] transition-colors">
            Ver más <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  )
} 