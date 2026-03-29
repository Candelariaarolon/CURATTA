import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/providers'
import Navbar from '@/components/ui/navbar'

export const metadata: Metadata = {
  title: 'CURATTA - Fashion Recommendation',
  description: 'Discover your perfect style with AI-powered fashion recommendations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
