'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/#nosotros', label: 'Nosotros' },
  { href: '/#servicios', label: 'Servicios' },
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/#contacto', label: 'Contacto' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-[#0A1628]/95 backdrop-blur-md border-b border-gray-100 dark:border-[#1E3A5F] shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex items-center gap-3 bg-white rounded-xl px-3 py-2 shadow-[0_0_15px_rgba(0,255,136,0.3)] group-hover:shadow-[0_0_25px_rgba(0,255,136,0.5)] transition-shadow">
              <Image
                src="/logocirculo.png"
                alt="Loopz Logo"
                width={44}
                height={44}
                className="object-contain"
              />
              <Image
                src="/logoname.png"
                alt="Loopz Colombia"
                width={75}
                height={20}
                className="object-contain hidden sm:block"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 dark:text-gray-300 hover:text-[#0A1628] dark:hover:text-white transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="neon" asChild>
              <Link href="/catalogo">Ver Productos</Link>
            </Button>
          </div>

          {/* Mobile: Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              className="text-[#0A1628] dark:text-white p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menú"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300',
            isMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
          )}
        >
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 dark:text-gray-300 hover:text-[#0A1628] dark:hover:text-white transition-colors py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-[#1E3A5F]"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 px-4">
              <Button variant="neon" className="w-full" asChild>
                <Link href="/catalogo">Ver Productos</Link>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
