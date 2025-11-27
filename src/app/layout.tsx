import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Loopz Colombia - Audio Premium',
    template: '%s | Loopz Colombia',
  },
  description: 'Tienda de in-ear monitors y equipos de audio premium en Colombia. Descubre nuestra colección de IEMs, cables, DACs y accesorios para audiófilos.',
  keywords: ['in-ear monitors', 'IEMs', 'audiófilos', 'audio premium', 'DAC', 'cables audio', 'Colombia'],
  authors: [{ name: 'Loopz Colombia' }],
  icons: {
    icon: '/logocirculo.png',
    apple: '/logocirculo.png',
  },
  openGraph: {
    title: 'Loopz Colombia - Audio Premium',
    description: 'Tienda de in-ear monitors y equipos de audio premium en Colombia',
    type: 'website',
    locale: 'es_CO',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
