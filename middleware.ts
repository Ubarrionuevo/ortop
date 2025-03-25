import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Si la ruta comienza con /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader) {
      return new NextResponse(null, {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Panel de Administración"'
        }
      })
    }

    const [type, credentials] = authHeader.split(' ')
    if (type !== 'Basic') {
      return new NextResponse(null, {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Panel de Administración"'
        }
      })
    }

    const [username, password] = Buffer.from(credentials, 'base64').toString().split(':')
    
    if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
      return new NextResponse(null, {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Panel de Administración"'
        }
      })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
} 