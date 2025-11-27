'use client'

import { Check } from 'lucide-react'
import { FadeIn, ScaleIn } from '@/components/ui/motion'

const features = [
  'Más de 10 años de experiencia en audio',
  'Distribuidores autorizados de marcas premium',
  'Equipo de expertos audiófilos',
  'Showroom para pruebas de producto',
  'Comunidad activa de entusiastas del audio',
  'Soporte post-venta personalizado',
]

export function About() {
  return (
    <section id="nosotros" className="py-24 bg-white dark:bg-[#0A1628] border-t border-gray-100 dark:border-[#1E3A5F]">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image/Visual Side */}
          <ScaleIn className="relative">
            <div className="relative aspect-square max-w-sm mx-auto">
              {/* Borde decorativo */}
              <div className="absolute inset-0 rounded-3xl border-2 border-dashed border-gray-200 dark:border-[#1E3A5F] transform rotate-3" />

              {/* Main card */}
              <div className="relative bg-white dark:bg-[#1E3A5F] rounded-3xl p-8 h-full flex flex-col justify-center items-center border-2 border-gray-100 dark:border-[#2A4A6F] shadow-lg">
                <div className="w-24 h-24 rounded-full border-4 border-[#00FF88]/30 flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(0,255,136,0.2)]">
                  <span className="text-5xl font-bold text-[#0A1628] dark:text-white">10+</span>
                </div>
                <h3 className="text-xl font-bold text-[#0A1628] dark:text-white mb-2">Años de Experiencia</h3>
                <p className="text-gray-500 dark:text-gray-300 text-center text-sm">
                  Liderando el mercado de audio premium en México
                </p>
              </div>
            </div>

            {/* Floating stat cards */}
            <div className="absolute -bottom-4 -left-4 bg-white dark:bg-[#1E3A5F] rounded-xl p-4 shadow-lg border border-gray-100 dark:border-[#2A4A6F]">
              <div className="text-2xl font-bold text-[#0A1628] dark:text-white">50K+</div>
              <div className="text-sm text-gray-500 dark:text-gray-300">Clientes satisfechos</div>
            </div>
            <div className="absolute -top-4 -right-4 bg-[#00FF88] rounded-xl p-4 shadow-[0_0_30px_rgba(0,255,136,0.5)]">
              <div className="text-2xl font-bold text-[#0A1628]">500+</div>
              <div className="text-sm text-[#0A1628]/70">Productos</div>
            </div>
          </ScaleIn>

          {/* Content Side */}
          <FadeIn direction="right" className="space-y-6">
            <span className="text-[#00FF88] font-semibold text-sm uppercase tracking-wider drop-shadow-[0_0_10px_rgba(0,255,136,0.5)]">
              Sobre Nosotros
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A1628] dark:text-white">
              Pasión por el
              <span className="text-[#00FF88] drop-shadow-[0_0_15px_rgba(0,255,136,0.5)]"> Audio Perfecto</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              En InEars, somos más que una tienda de audio. Somos una comunidad de
              entusiastas dedicados a encontrar el sonido perfecto para cada persona.
              Desde audiófilos experimentados hasta quienes dan sus primeros pasos
              en el mundo del Hi-Fi, estamos aquí para guiarte.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Trabajamos directamente con las mejores marcas del mundo para traerte
              productos de calidad excepcional a precios competitivos, respaldados
              por nuestro servicio experto y garantía extendida.
            </p>

            {/* Features List */}
            <div className="grid sm:grid-cols-2 gap-3 pt-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#00FF88]/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(0,255,136,0.4)]">
                    <Check className="w-3 h-3 text-[#00FF88] drop-shadow-[0_0_4px_rgba(0,255,136,0.8)]" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
