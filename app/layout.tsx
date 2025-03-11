import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Head from "next/head"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BurgerApp - Comida rápida a domicilio",
  description: "Ordena comida rápida a domicilio - Burgers, Lomos, Wraps y más",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <Head>
        <title>BurgerApp - Comida rápida a domicilio</title>
        <meta name="description" content="Ordena comida rápida a domicilio - Burgers, Lomos, Wraps y más" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

