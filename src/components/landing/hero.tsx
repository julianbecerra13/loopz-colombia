'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-[#0A1628]">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Glow izquierdo verde */}
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-[#00FF88]/10 rounded-full blur-[120px]" />
        {/* Glow derecho azul */}
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-[#1E3A5F]/40 rounded-full blur-[120px]" />
        {/* Glow central superior */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00FF88]/5 rounded-full blur-[100px]" />
        {/* Sombras laterales */}
        <div className="absolute top-0 left-0 w-64 h-full bg-gradient-to-r from-[#0A1628] to-transparent" />
        <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-[#0A1628] to-transparent" />
        {/* Glow inferior */}
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-gray-50 dark:bg-[#1E3A5F] border border-gray-200 dark:border-[#2A4A6F] rounded-full px-4 py-2"
            >
              <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse shadow-[0_0_10px_rgba(0,255,136,0.8)]" />
              <span className="text-[#0A1628] dark:text-white text-sm font-medium">Nueva Colección 2025</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0A1628] dark:text-white leading-tight"
            >
              Experimenta el
              <span className="block text-[#00FF88] drop-shadow-[0_0_20px_rgba(0,255,136,0.5)]">Sonido Perfecto</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-xl mx-auto lg:mx-0"
            >
              Descubre nuestra colección premium de in-ear monitors diseñados para audiófilos
              que buscan la máxima fidelidad de audio.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button variant="neon" size="xl" asChild>
                <Link href="/catalogo" className="gap-2">
                  Explorar Catálogo
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" className="border-gray-300 dark:border-[#2A4A6F] text-[#0A1628] dark:text-white hover:bg-gray-50 dark:hover:bg-[#1E3A5F]" asChild>
                <a href="https://www.youtube.com/shorts/WAYYxYtFx_A" target="_blank" rel="noopener noreferrer">
                  <Play className="w-5 h-5 mr-2" />
                  Ver Video
                </a>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-100 dark:border-[#1E3A5F]"
            >
              <div>
                <div className="text-3xl font-bold text-[#0A1628] dark:text-white">500+</div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">Productos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#0A1628] dark:text-white">50K+</div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">Clientes</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#0A1628] dark:text-white">4.9</div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">Rating</div>
              </div>
            </motion.div>
          </div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Círculo decorativo con borde */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-gray-200 dark:border-[#1E3A5F] animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-8 rounded-full border border-gray-100 dark:border-[#2A4A6F]" />

              {/* Center - IEMs Image */}
              <div className="absolute inset-16 rounded-full overflow-hidden shadow-[0_0_40px_rgba(0,255,136,0.3)] border-4 border-[#00FF88]/30">
                <Image
                  src="/inears.jpg"
                  alt="Premium In-Ear Monitors"
                  fill
                  className="object-cover scale-125"
                  priority
                />
              </div>

              {/* Floating Elements */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-[#00FF88]/30 rounded-lg px-3 py-1.5 text-xs text-white animate-float shadow-[0_0_15px_rgba(0,255,136,0.2)]">
                Hi-Res Audio
              </div>
              <div className="absolute bottom-12 left-4 bg-white/10 backdrop-blur-md border border-[#00FF88]/30 rounded-lg px-3 py-1.5 text-xs text-white animate-float shadow-[0_0_15px_rgba(0,255,136,0.2)]" style={{ animationDelay: '1s' }}>
                10 Drivers
              </div>
              <div className="absolute bottom-12 right-4 bg-white/10 backdrop-blur-md border border-[#00FF88]/30 rounded-lg px-3 py-1.5 text-xs text-white animate-float shadow-[0_0_15px_rgba(0,255,136,0.2)]" style={{ animationDelay: '2s' }}>
                MMCX
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 dark:text-gray-500">
        <span className="text-xs">Scroll</span>
        <div className="w-5 h-8 border-2 border-gray-300 dark:border-[#2A4A6F] rounded-full flex justify-center">
          <div className="w-1 h-2 bg-[#00FF88] rounded-full mt-1 animate-bounce shadow-[0_0_8px_rgba(0,255,136,0.8)]" />
        </div>
      </div>
    </section>
  )
}
