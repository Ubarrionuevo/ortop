export interface Category {
  id: number;
  name: string;
  image: string;
  slug: string;
  description: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
}

export const categories: Category[] = [
  {
    id: 1,
    name: "Sillas de Ruedas",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/silla%20plegable%20de%20ruedas%202-lnzKWIDuIiFeXfv11Ulmi4l5B7lX6N.webp",
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
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-5-aa8896f0afa2ce38ad17369552578133-480-0-WfQYqc03KsjDfsAIrH80nyVbToPXGg.webp",
    slug: "inodoros-portatiles",
    description: "Sillas sanitarias ajustables con recipiente extraíble",
  },
  {
    id: 5,
    name: "Grúas",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/web-web-market-f12d3bfdd4a250a80117370692608748-480-0-ilnZAJDraPBEcfraMvgMj9p9nAingz.webp",
    slug: "gruas",
    description: "Grúas para traslado de pacientes con arnés incluido",
  },
  {
    id: 6,
    name: "Muletas",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/web-web-market-0e860da99f331263a317370662945940-480-0-arVwwSqJQk5PEqGqk4wC7N3byM99jV.webp",
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
];

export const baseProducts: Product[] = [
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
    description: "Cama ortopédica con ajuste manual de altura y posición, colchón opcional",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cama-ortopedica-manual.webp",
    category: "camas",
  },
];

export const productIdMap: { [key: number]: string } = {
  1: "silla-ruedas-estandar",
  2: "silla-ruedas-transporte",
  3: "andador-plegable",
  4: "andador-ruedas",
  5: "ferula-walker",
  6: "inodoro-portatil",
  7: "grua-traslado",
  8: "muletas-regulables",
  9: "cama-manual",
  10: "cama-electrica"
}; 