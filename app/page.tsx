"use client"

import { useState, useEffect } from "react"
import { Menu, Search, X, Clock, MapPin, Phone, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Image from "next/image"
import myImage from '../public/cama-ortopedica.jpg';
import { usePreviewMode } from "@/lib/hooks/usePreviewMode"
import { PreviewOrderDialog } from "@/components/PreviewOrderDialog"
import { useStore } from '@/lib/store/useStore'

export default function Home() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { categories, isLoading, initializeCategories } = useStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [isHoursModalOpen, setIsHoursModalOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false)
  const isPreviewMode = usePreviewMode()
  const router = useRouter()

  // Inicializar categorías una sola vez
  useEffect(() => {
    initializeCategories()
  }, [initializeCategories])

  // Función para verificar si el local está abierto
  useEffect(() => {
    const checkIfOpen = () => {
      const now = new Date()
      const day = now.getDay() // 0 es domingo, 1-5 es lunes a viernes, 6 es sábado
      const hour = now.getHours()
      const minutes = now.getMinutes()
      const currentTime = hour + minutes / 60

      // Fines de semana
      if (day === 0) { // Domingo
        return false
      }
      
      if (day === 6) { // Sábado
        return currentTime >= 9 && currentTime < 12
      }

      // Lunes a viernes
      if (day >= 1 && day <= 5) {
        // Horario de mañana: 9 a 13
        if (currentTime >= 9 && currentTime < 13) {
          return true
        }
        // Horario de tarde: 16 a 18
        if (currentTime >= 16 && currentTime < 18) {
          return true
        }
      }

      return false
    }

    // Actualizar el estado cada minuto
    const updateOpenStatus = () => {
      setIsOpen(checkIfOpen())
    }

    updateOpenStatus() // Verificar estado inicial
    const interval = setInterval(updateOpenStatus, 60000) // Actualizar cada minuto

    return () => clearInterval(interval)
  }, [])

  // Function to handle search
  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      return
    }

    // Search through all categories
    const query = searchQuery.toLowerCase()
    const matchingCategories = categories.filter((category) => 
      category.name.toLowerCase().includes(query)
    )

    if (matchingCategories.length > 0) {
      // If we find a matching category, navigate to it
      router.push(`/category/${matchingCategories[0].slug}`)
      setIsSearchOpen(false)
      setSearchQuery("")
      return
    }

    // If no categories match, we could implement product search here
    // For now, just close the search
    setIsSearchOpen(false)
    setSearchQuery("")
  }

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsSearchOpen(false)
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isPreviewMode) {
      setIsPreviewDialogOpen(true)
      return
    }
    window.open("https://web.whatsapp.com/send?phone=5492617153857&text=Hola,%20quiero%20un%20catálogo%20como%20este%20para%20mi%20negocio", "_blank")
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <header className="w-full border-b bg-white text-zinc-900">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Mobile Menu - Only visible on mobile */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-zinc-900">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] bg-white p-0">
                <nav className="flex flex-col p-4">
                  <div className="mt-6 pt-6 border-t border-zinc-200">
                    <div className="flex items-start mb-4">
                      <MapPin className="h-5 w-5 text-[#00a0e3] mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-zinc-900 mb-1">Ubicación</h3>
                        <p className="text-sm text-zinc-600 mb-1">Federico Moreno 950, Ciudad</p>
                        <p className="text-sm text-zinc-600">Mendoza, Argentina</p>
                      </div>
                    </div>

                    <div className="flex items-start mb-4">
                      <Clock className="h-5 w-5 text-[#00a0e3] mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-zinc-900 mb-1">Horarios de Atención</h3>
                        <p className="text-sm text-zinc-600">Lunes a Viernes: 9 a 13 y 16 a 18 hs</p>
                        <p className="text-sm text-zinc-600">Sábados: 9 a 12 hs</p>
                      </div>
                    </div>

                    <div className="flex items-start mb-4">
                      <Phone className="h-5 w-5 text-[#00a0e3] mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-zinc-900 mb-1">Contacto</h3>
                        <p className="text-sm text-zinc-600">Tel: (261) 123-4567</p>
                        <p className="text-sm text-zinc-600">info@marketortopedia.com</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-zinc-200">
                    <a
                      href="#"
                      onClick={handleContactClick}
                      className="block w-full py-3 px-4 bg-[#00a0e3] hover:bg-[#0088c2] text-white text-center font-medium rounded-md transition-colors"
                    >
                      Quiero un catálogo como este para mi negocio
                    </a>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="flex items-center">
              <span className="font-bold text-xl text-zinc-900">MARKET</span>
              <span className="font-bold text-xl text-[#00a0e3]">ortopedia</span>
            </div>
          </Link>

          {/* Desktop Navigation - Only visible on desktop */}
          <nav className="hidden lg:flex items-center justify-center space-x-12">
            <div className="flex items-center space-x-12">
             
             
              
            </div>
          </nav>

          {/* Search */}
          <div className="flex items-center">
            {isSearchOpen ? (
              <div className="relative flex items-center">
                <input
                  type="search"
                  placeholder="Buscar..."
                  className="h-9 w-[200px] rounded-md border border-zinc-200 bg-white px-3 py-1 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#00a0e3]"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch()
                    }
                  }}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 text-zinc-400 hover:text-zinc-900"
                  onClick={() => {
                    setIsSearchOpen(false)
                    setSearchQuery("")
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-400 hover:text-zinc-900"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Status Banner */}
      <Dialog open={isHoursModalOpen} onOpenChange={setIsHoursModalOpen}>
        <DialogTrigger asChild>
          <div className={`${isOpen ? 'bg-green-50 text-green-900' : 'bg-blue-50 text-blue-900'} cursor-pointer hover:bg-opacity-90 transition-colors`}>
            <div className="container mx-auto max-w-4xl py-2 px-4 flex items-center justify-center text-center">
              <Clock className={`h-5 w-5 flex-shrink-0 mr-3 ${isOpen ? 'text-green-500' : 'text-[#00a0e3]'}`} />
              <div>
                <p className="font-medium text-lg">
                  {isOpen ? 'Abierto ahora' : 'En este momento estamos cerrados'}
                </p>
                <p className={`text-sm ${isOpen ? 'text-green-700' : 'text-blue-700'}`}>
                  Hacé click para consultar nuestros horarios
                </p>
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold mb-4">Horarios de Atención</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-blue-50 p-3 rounded-md">
                <h3 className="font-medium text-zinc-900">Lunes a Viernes</h3>
                <p className="text-zinc-600">9:00 a 13:00 hs</p>
                <p className="text-zinc-600">16:00 a 18:00 hs</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-md">
                <h3 className="font-medium text-zinc-900">Sábados</h3>
                <p className="text-zinc-600">9:00 a 12:00 hs</p>
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded-md text-center">
              <h3 className="font-medium text-zinc-900">Domingos y Feriados</h3>
              <p className="text-zinc-600">Cerrado</p>
            </div>
            <div className="pt-2 text-center text-sm text-zinc-500">
              Para consultas fuera de horario, puede enviarnos un mensaje por WhatsApp al (261) 123-4567
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <main className="flex-1 bg-zinc-50">
        {/* Categories */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-zinc-900 text-center">Nuestras Categorías</h2>
            <div className="hidden lg:grid grid-cols-3 gap-8 max-w-6xl mx-auto">
              {isLoading ? (
                // Mostrar skeleton loading
                Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="bg-gray-100 rounded-lg h-[120px] animate-pulse" />
                ))
              ) : (
                categories.map((category) => (
                  <CategoryCard key={category.slug} category={category} />
                ))
              )}
            </div>
            <div className="lg:hidden flex flex-col space-y-3 max-w-3xl mx-auto">
              {isLoading ? (
                // Mostrar skeleton loading
                Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="bg-gray-100 rounded-lg h-[120px] animate-pulse" />
                ))
              ) : (
                categories.map((category) => (
                  <CategoryCard key={category.slug} category={category} />
                ))
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Desktop Footer - Only visible on desktop */}
      <footer className="hidden lg:block bg-white border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div>
              <h3 className="font-bold text-lg mb-4 text-zinc-900">MARKET ortopedia</h3>
              <p className="text-sm text-zinc-600">
                Especialistas en alquiler de equipamiento médico y ortopédico de alta calidad.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-zinc-900">Contacto</h3>
              <div className="space-y-2">
                <p className="text-sm text-zinc-600 flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-[#00a0e3]" />
                  Federico Moreno 950, Ciudad, Mendoza
                </p>
                <p className="text-sm text-zinc-600 flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-[#00a0e3]" />
                  (261) 123-4567
                </p>
                <p className="text-sm text-zinc-600 flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-[#00a0e3]" />
                  L a V: 9 a 13 y 16 a 18 hs | S: 9 a 12 hs
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-zinc-900">¿Tenés un negocio?</h3>
              <p className="text-sm text-zinc-600 mb-4">
                Creamos catálogos personalizados para tu negocio.
              </p>
              <a
                href="#"
                onClick={handleContactClick}
                className="inline-block bg-[#00a0e3] hover:bg-[#0088c2] text-white text-sm px-6 py-2 rounded-md transition-colors"
              >
                Contactanos
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Preview Dialog */}
      <PreviewOrderDialog 
        isOpen={isPreviewDialogOpen}
        onClose={() => setIsPreviewDialogOpen(false)}
        message="Hola, quiero un catálogo como este para mi negocio"
      />
    </div>
  )
}

interface Category {
  name: string
  image: string
  slug: string
}

const categories: Category[] = [
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

