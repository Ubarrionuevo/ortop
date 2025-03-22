'use client'

import Link from 'next/link'

export default function AdminLink() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const password = prompt("Ingrese la contraseña de administrador:")
    if (password !== "admin123") {
      e.preventDefault()
      alert("Contraseña incorrecta")
    }
  }

  return (
    <Link 
      href="/admin" 
      className="hover:text-gray-600 transition-colors"
      onClick={handleClick}
    >
      Administración
    </Link>
  )
} 