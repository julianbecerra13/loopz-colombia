'use client'

import Link from 'next/link'
import { ArrowRight, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FadeIn, ScaleIn } from '@/components/ui/motion'

export function CTABanner() {
  return (
    <section className="py-24 bg-[#0A1628] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0A1628]/5 bg-[#1E3A5F]/30 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00FF88]/5 rounded-full blur-[128px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <FadeIn className="max-w-4xl mx-auto text-center">
          <ScaleIn delay={0.1}>
            <div className="inline-flex items-center gap-2 bg-[#0A1628]/5 bg-[#1E3A5F] border border-[#0A1628]/20 border-[#2A4A6F] rounded-full px-4 py-2 mb-6">
              <Zap className="w-4 h-4 text-[#00FF88] drop-shadow-[0_0_8px_rgba(0,255,136,0.8)]" />
              <span className="text-white text-sm font-medium">Ofertas Especiales</span>
            </div>
          </ScaleIn>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            ¿Listo para mejorar tu
            <span className="text-[#00FF88] drop-shadow-[0_0_20px_rgba(0,255,136,0.5)]"> experiencia de audio</span>?
          </h2>

          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Explora nuestra colección completa de in-ear monitors, cables premium,
            DACs y accesorios. Encuentra el sonido perfecto para ti.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="neon" size="xl" asChild>
              <Link href="/catalogo" className="gap-2">
                Explorar Catálogo
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="border-[#0A1628] border-[#2A4A6F] text-white hover:bg-[#0A1628] hover:bg-[#1E3A5F] hover:text-white"
              asChild
            >
              <Link href="/#contacto">
                Contactar Asesor
              </Link>
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 pt-12 border-t border-[#E2E8F0] border-[#1E3A5F]">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-sm text-gray-400">Original</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">2 Años</div>
              <div className="text-sm text-gray-400">Garantía</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-sm text-gray-400">Soporte</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">Gratis</div>
              <div className="text-sm text-gray-400">Envío +$2000</div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
