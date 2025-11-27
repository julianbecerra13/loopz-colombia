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
    default: 'InEars Store - Audio Premium',
    template: '%s | InEars Store',
  },
  description: 'Tienda de in-ear monitors y equipos de audio premium. Descubre nuestra colección de IEMs, cables, DACs y accesorios para audiófilos.',
  keywords: ['in-ear monitors', 'IEMs', 'audiófilos', 'audio premium', 'DAC', 'cables audio'],
  authors: [{ name: 'InEars Store' }],
  openGraph: {
    title: 'InEars Store - Audio Premium',
    description: 'Tienda de in-ear monitors y equipos de audio premium',
    type: 'website',
    locale: 'es_MX',
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
