import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('user_token')?.value
  const { pathname } = request.nextUrl

  // Protected routes
  const isProtectedRoute = 
    pathname.startsWith('/dashboard') || 
    pathname.startsWith('/events/') || 
    pathname.startsWith('/my-events')

  const isIdentifyRoute = pathname === '/identify'

  if (isProtectedRoute && !token) {
    // Redirect to identify page if not identified
    return NextResponse.redirect(new URL('/identify', request.url))
  }

  if (isIdentifyRoute && token) {
    // Redirect to dashboard if already identified
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/events/:path*', '/my-events/:path*', '/identify'],
}
