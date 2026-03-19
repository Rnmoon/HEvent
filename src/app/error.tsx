'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Unhandled runtime error:', error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-8">
        <svg
          className="w-10 h-10 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">
        Something went wrong!
      </h2>
      <p className="text-gray-400 max-w-md mx-auto mb-10 leading-relaxed">
        We encountered a server-side exception while loading this page. This could be due to a temporary database issue or missing configuration.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => reset()}
          className="px-8 py-3 bg-accent-blue text-black font-bold uppercase tracking-wide rounded-full hover:bg-blue-400 transition transform hover:scale-105"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-8 py-3 bg-white/10 text-white font-bold uppercase tracking-wide rounded-full border border-white/20 hover:bg-white/20 transition backdrop-blur-sm"
        >
          Go Home
        </Link>
      </div>
      {error.digest && (
        <p className="mt-8 text-xs text-gray-600 font-mono">
          Error Digest: {error.digest}
        </p>
      )}
    </div>
  )
}
