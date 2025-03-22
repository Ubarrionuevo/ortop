"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { baseProducts } from "@/app/category/[slug]/data"
import { subscribeToPrice } from "@/lib/firebase"
import { productIdMap } from "@/app/category/[slug]/data"
import { usePreviewMode } from "@/lib/hooks/usePreviewMode"
import { PreviewOrderDialog } from "@/components/PreviewOrderDialog"

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
}

export default function FormPage({ params }: { params: Promise<{ id: string }> }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const isPreviewMode = usePreviewMode();
  const [formData, setFormData] = useState({
    rentalPeriod: "30dias",
    acceptRequirements: true,
    paymentMethod: "efectivo",
    deliveryMethod: "convenir",
    additionalInfo: "",
  });

  useEffect(() => {
    async function fetchProduct() {
      const { id } = await params;
      const productId = Number.parseInt(id);
      const foundProduct = baseProducts.find((p) => p.id === productId) || {
        id: 0,
        name: "Producto no encontrado",
        description: "",
        image: "",
        category: "",
      };
      setProduct(foundProduct);

      // Suscribirse al precio del producto
      if (foundProduct.id !== 0) {
        const firestoreId = productIdMap[foundProduct.id];
        if (firestoreId) {
          const unsubscribe = subscribeToPrice(firestoreId, (newPrice) => {
            setPrice(newPrice || 0);
          });
          return () => unsubscribe();
        }
      }
    }

    fetchProduct();
  }, [params]);

  if (!product) {
    return <div>Cargando...</div>;
  }

  // Handle form changes
  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Format WhatsApp message
  const formatWhatsAppMessage = () => {
    const message = `Solicitud de Alquiler - MARKET ortopedia:\n\nProducto: ${product.name}\nDuración: 30 días\nPrecio: $${price.toFixed(2)}\n\nForma de Alquiler: ${formData.rentalPeriod === "30dias" ? "Alquiler 30 días" : ""}\n\n ${formData.acceptRequirements ? "Consultar los requisitos para poder alquilar" : ""}\n\nMétodo de Pago: ${formData.paymentMethod === "transferencia" ? "Transferencia" : "Efectivo"}\n\nMétodo de Entrega: ${formData.deliveryMethod === "presencial" ? "Presencial" : "A convenir"}\n\n${formData.additionalInfo ? `Información Adicional: ${formData.additionalInfo}` : ""}`;

    console.log('Mensaje de WhatsApp:', decodeURIComponent(message));
    return encodeURIComponent(message);
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const message = formatWhatsAppMessage()

    if (isPreviewMode) {
      setIsPreviewDialogOpen(true)
      return
    }

    const phoneNumber = "+5492617153857"
    window.open(`whatsapp://send?phone=${phoneNumber}&text=${message}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="container flex h-14 items-center">
          <Link href={`/category/${product.category}`} className="flex items-center space-x-2 ml-6">
            <ArrowLeft className="h-5 w-5 text-zinc-600" />
          </Link>
          <h1 className="flex-1 text-center font-bold text-xl text-zinc">Formulario de Alquiler</h1>
          <div className="w-10"></div> {/* Spacer for balance */}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg p-4 mb-6 flex flex-col sm:flex-row items-center gap-4 shadow-sm">
            <div className="relative w-24 h-24 flex-shrink-0">
              <Image
                src={product.image}
                alt={product.name}
                fill
                style={{ objectFit: 'contain' }}
                sizes="96px"
                priority
                className="rounded-md"
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="font-bold text-lg text-zinc-900">{product.name}</h2>
              <p className="text-zinc-600 text-sm">{product.description}</p>
              <p className="font-bold text-[#00a0e3] mt-1">${price.toFixed(2)}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-lg text-zinc-900">Forma</h3>
            <RadioGroup
              defaultValue="30dias"
              value={formData.rentalPeriod}
              onValueChange={(value) => handleChange("rentalPeriod", value)}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="30dias" id="r1" />
                <Label htmlFor="r1">Alquiler 30 días</Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-medium text-lg text-zinc-900">Precio</h3>
            <div className="flex items-start space-x-2">
              <Checkbox
                id="requirements"
                checked={formData.acceptRequirements}
                onCheckedChange={(checked) => handleChange("acceptRequirements", checked)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor="requirements"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Por mensaje
                </Label>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-medium text-lg text-zinc-900">Método de Pago</h3>
            <RadioGroup
              defaultValue="efectivo"
              value={formData.paymentMethod}
              onValueChange={(value) => handleChange("paymentMethod", value)}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="transferencia" id="p1" />
                <Label htmlFor="p1">Transferencia</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="efectivo" id="p2" />
                <Label htmlFor="p2">Efectivo</Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-medium text-lg text-zinc-900">Método de Entrega</h3>
            <RadioGroup
              defaultValue="convenir"
              value={formData.deliveryMethod}
              onValueChange={(value) => handleChange("deliveryMethod", value)}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="presencial" id="d1" />
                <Label htmlFor="d1">Presencial Entrega en Federico Moreno 950, Ciudad, Mendoza</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="convenir" id="d2" />
                <Label htmlFor="d2">A convenir (costo)</Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-medium text-lg text-zinc-900">Información Adicional</h3>
            <Textarea
              placeholder="Escribe cualquier información adicional aquí..."
              className="bg-white border-zinc-200"
              value={formData.additionalInfo}
              onChange={(e) => handleChange("additionalInfo", e.target.value)}
            />
          </div>

          <div className="bg-white rounded-lg p-4 mt-6 shadow-sm">
            <h3 className="font-medium text-lg mb-2 text-zinc-900">Horario</h3>
            <p className="text-sm text-zinc-600">L a V: 9 a 13 y 16 a 18 hs</p>
            <p className="text-sm text-zinc-600">S: 9 a 12 hs</p>
          </div>

          <Button type="submit" className="w-full bg-[#00a0e3] hover:bg-[#0088c2] text-white">
            <Check className="mr-2 h-4 w-4" /> Enviar Solicitud por WhatsApp
          </Button>
        </form>
      </main>

      <PreviewOrderDialog 
        isOpen={isPreviewDialogOpen}
        onClose={() => setIsPreviewDialogOpen(false)}
        message={formatWhatsAppMessage()}
      />
    </div>
  )
}

// Sample data
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
  {
    id: 10,
    name: "Cama Ortopédica Eléctrica",
    description: "Cama ortopédica con control eléctrico para ajuste de altura y posición, incluye colchón premium",
    price: 45000,
    image: "/cama.webp",
    category: "camas",
  },
]

