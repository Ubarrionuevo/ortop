import { NextResponse } from 'next/server'
import { auth } from '@/lib/firebase-admin'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const { idToken } = await request.json()
    
    // Crear una cookie de sesión
    const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 días
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn })
    
    // Establecer la cookie
    cookies().set('session', sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    })

    return NextResponse.json({ status: 'success' })
  } catch (error) {
    console.error('Error al crear la sesión:', error)
    return NextResponse.json({ error: 'Error al crear la sesión' }, { status: 401 })
  }
}

export async function DELETE() {
  try {
    cookies().delete('session')
    return NextResponse.json({ status: 'success' })
  } catch (error) {
    console.error('Error al cerrar la sesión:', error)
    return NextResponse.json({ error: 'Error al cerrar la sesión' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ 
    authenticated: false,
    message: 'No autenticado'
  })
} 