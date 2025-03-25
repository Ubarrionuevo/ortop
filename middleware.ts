import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Si la ruta es /admin/login, permitir acceso
  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next()
  }

  // Si la ruta comienza con /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const session = request.cookies.get('admin_session')

    if (!session) {
      // Redirigir a la página de login
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
} 