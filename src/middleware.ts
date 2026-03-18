import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// import { Ratelimit } from '@upstash/ratelimit';
// import { redis } from './lib/redis';

// Create a new ratelimiter, that allows 50 requests per 10 seconds
// const ratelimit = new Ratelimit({
//   redis: redis,
//   limiter: Ratelimit.slidingWindow(50, '10 s'),
//   analytics: true,
// });

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('user_token')?.value
  const { pathname } = request.nextUrl
  
  // Rate limiting (disabled for now due to missing config)
  // const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1'
  // const { success, pending, limit, reset, remaining } = await ratelimit.limit(
  //   `ratelimit_${ip}`
  // )

  // if (!success) {
  //   return new NextResponse('Too Many Requests', {
  //     status: 429,
  //     headers: {
  //       'X-RateLimit-Limit': limit.toString(),
  //       'X-RateLimit-Remaining': remaining.toString(),
  //       'X-RateLimit-Reset': reset.toString(),
  //     },
  //   })
  // }

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

  const response = NextResponse.next()
  
  // Attach rate limit headers
  // response.headers.set('X-RateLimit-Limit', limit.toString())
  // response.headers.set('X-RateLimit-Remaining', remaining.toString())
  // response.headers.set('X-RateLimit-Reset', reset.toString())
  
  return response
}

export const config = {
  matcher: ['/dashboard/:path*', '/events/:path*', '/my-events/:path*', '/identify'],
}
