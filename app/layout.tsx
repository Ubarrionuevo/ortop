import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Script from 'next/script'

const inter = Inter({ subsets: ["latin"] })

// Schema.org data for the organization
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "MarketOrtopedia - Ortopedia en Mendoza",
  "description": "La mejor ortopedia en Mendoza. Alquiler de equipos ortopédicos con servicio profesional y atención personalizada en Ciudad de Mendoza.",
  "url": "https://marketortopedia.com.ar",
  "logo": "https://marketortopedia.com.ar/icon.png.webp",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Federico Moreno 950",
    "addressLocality": "Ciudad",
    "addressRegion": "Mendoza",
    "postalCode": "5500",
    "addressCountry": "AR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "-32.889458",
    "longitude": "-68.845839"
  },
  "telephone": "+542611234567",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "13:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "16:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "12:00"
    }
  ]
}

export const metadata: Metadata = {
  metadataBase: new URL('https://marketortopedia.com.ar'),
  title: {
    default: "Ortopedia en Mendoza | MarketOrtopedia - Alquiler de Equipos Ortopédicos",
    template: "%s | Ortopedia en Mendoza - MarketOrtopedia"
  },
  description: "La mejor ortopedia en Mendoza. Alquiler de equipos ortopédicos: sillas de ruedas, camas ortopédicas, andadores y muletas. Servicio profesional en Ciudad de Mendoza. ¡Consulta disponibilidad!",
  keywords: ["ortopedia en mendoza", "alquiler ortopedia mendoza", "equipos ortopédicos mendoza", "sillas de ruedas mendoza", "camas ortopédicas mendoza", "andadores mendoza", "muletas mendoza", "ortopedia ciudad mendoza"],
  authors: [{ name: "MarketOrtopedia" }],
  creator: "MarketOrtopedia",
  publisher: "MarketOrtopedia",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: '#00a0e3',
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://marketortopedia.com.ar',
    title: 'MarketOrtopedia - Alquiler de Equipos Ortopédicos en Mendoza',
    description: 'Alquiler de equipos ortopédicos en Mendoza. Sillas de ruedas, camas ortopédicas, andadores y más.',
    siteName: 'MarketOrtopedia',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'MarketOrtopedia - Equipos Ortopédicos en Mendoza'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MarketOrtopedia - Alquiler de Equipos Ortopédicos en Mendoza',
    description: 'Alquiler de equipos ortopédicos en Mendoza. Sillas de ruedas, camas ortopédicas, andadores y más.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'tu-codigo-de-verificacion-google',
  },
  alternates: {
    canonical: 'https://marketortopedia.com.ar',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="canonical" href="https://marketortopedia.com.ar" />
        <meta name="geo.region" content="AR-M" />
        <meta name="geo.placename" content="Mendoza" />
        <meta name="geo.position" content="-32.889458;-68.845839" />
        <meta name="ICBM" content="-32.889458, -68.845839" />
      </head>
      <body className={inter.className}>
        <Script
          id="org-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
      </body>
    </html>
  )
}

