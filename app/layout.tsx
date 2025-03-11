import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Head from "next/head"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MarketOrtopedia - Equipos Ortopedicos de Mendoza",
  description: "MarketOrtopedia es una empresa dedicada al alquiler de equipos ortopedicos de Mendoza, Argentina.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <Head>
        <title>MarketOrtopedia - Equipos Ortopedicos de Mendoz</title>
        <meta name="description" content="MarketOrtopedia es una empresa dedicada al alquiler de equipos ortopedicos de Mendoza" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

