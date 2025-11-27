'use client'

import { Headphones, Shield, Truck, HeadphonesIcon, Wrench, Award } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion'

const services = [
  {
    icon: Headphones,
    title: 'Audio Premium',
    description: 'In-ear monitors con drivers de alta precisión para una experiencia sonora inigualable.',
  },
  {
    icon: Shield,
    title: 'Garantía Extendida',
    description: 'Todos nuestros productos incluyen garantía de 2 años contra defectos de fabricación.',
  },
  {
    icon: Truck,
    title: 'Envío Nacional',
    description: 'Envíos a todo el país con empaque especial para proteger tus equipos.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Asesoría Experta',
    description: 'Nuestro equipo te ayuda a encontrar el IEM perfecto para tus necesidades.',
  },
  {
    icon: Wrench,
    title: 'Servicio Técnico',
    description: 'Reparación y mantenimiento de equipos de audio de todas las marcas.',
  },
  {
    icon: Award,
    title: 'Productos Originales',
    description: '100% productos originales con certificación de autenticidad.',
  },
]

export function Services() {
  return (
    <section id="servicios" className="py-24 bg-white dark:bg-[#0A1628]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <FadeIn className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#00FF88] font-semibold text-sm uppercase tracking-wider drop-shadow-[0_0_10px_rgba(0,255,136,0.5)]">
            Nuestros Servicios
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A1628] dark:text-white mt-2 mb-4">
            ¿Por qué elegirnos?
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Nos especializamos en ofrecer la mejor experiencia de audio con productos
            premium y un servicio al cliente excepcional.
          </p>
        </FadeIn>

        {/* Services Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
          {services.map((service, index) => (
            <StaggerItem key={index}>
              <Card className="group hover:shadow-lg hover:shadow-[#00FF88]/10 hover:border-[#00FF88]/30 transition-all duration-300 border-gray-100 dark:border-[#1E3A5F] dark:bg-[#1E3A5F]/50 h-full">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-xl border-2 border-gray-200 dark:border-[#2A4A6F] flex items-center justify-center mb-4 group-hover:border-[#00FF88] group-hover:bg-[#00FF88]/10 group-hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] transition-all duration-300">
                    <service.icon className="w-7 h-7 text-[#0A1628] dark:text-white group-hover:text-[#00FF88] group-hover:drop-shadow-[0_0_8px_rgba(0,255,136,0.8)] transition-all duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#0A1628] dark:text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
