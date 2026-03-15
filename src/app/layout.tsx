import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getCurrentUser } from '@/app/actions'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EventHub',
  description: 'Register for events effortlessly.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          {/* We pass a simplified user object to Client Components if needed */}
          <Navigation user={user ? { name: user.name, email: user.email } : null} />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
