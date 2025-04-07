"use client"

import { useState } from "react"
import { Menu, Search, X, Clock, MapPin, Phone, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { usePreviewMode } from "@/lib/hooks/usePreviewMode"
import { PreviewOrderDialog } from "@/components/PreviewOrderDialog"
import { CategoryGrid } from "@/components/CategoryGrid"
import { StatusBanner } from "@/components/StatusBanner"
import { useStore } from "@/lib/store/useStore"

export default function Home() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false)
  const isPreviewMode = usePreviewMode()
  const router = useRouter()
  const { categories } = useStore()

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      return
    }

    const query = searchQuery.toLowerCase()
    const matchingCategories = categories.filter((category) => 
      category.name.toLowerCase().includes(query)
    )

    if (matchingCategories.length > 0) {
      router.push(`/category/${matchingCategories[0].slug}`)
      setIsSearchOpen(false)
      setSearchQuery("")
      return
    }

    setIsSearchOpen(false)
    setSearchQuery("")
  }

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
      <StatusBanner />

      <main className="flex-1 bg-zinc-50">
        {/* Categories */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-zinc-900 text-center">
              Nuestras Categorías
            </h2>
            <CategoryGrid />
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

