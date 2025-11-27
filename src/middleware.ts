import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token

    // Si está en login y ya tiene sesión, redirigir al dashboard
    if (pathname === '/admin/login' && token) {
      return NextResponse.redirect(new URL('/admin/dashboard', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl

        // Permitir acceso a la página de login sin autenticación
        if (pathname === '/admin/login') {
          return true
        }

        // Para otras rutas admin, requerir token
        if (pathname.startsWith('/admin')) {
          return !!token
        }

        return true
      },
    },
  }
)

export const config = {
  matcher: ['/admin/:path*'],
}
