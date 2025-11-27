'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { FadeIn } from '@/components/ui/motion'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('¡Mensaje enviado! Te contactaremos pronto.')
    setFormData({ name: '', email: '', message: '' })
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'loopzcolombia@gmail.com',
      href: 'mailto:loopzcolombia@gmail.com',
    },
    {
      icon: Phone,
      title: 'Teléfono',
      value: '+57 316 893 3842',
      href: 'tel:+573168933842',
    },
    {
      icon: MapPin,
      title: 'Ubicación',
      value: 'Bucaramanga, Santander',
      href: 'https://maps.google.com/?q=Bucaramanga,Santander,Colombia',
    },
  ]

  return (
    <section id="contacto" className="py-24 bg-white dark:bg-[#0A1628] border-t border-gray-100 dark:border-[#1E3A5F]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <FadeIn className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#00FF88] font-semibold text-sm uppercase tracking-wider drop-shadow-[0_0_10px_rgba(0,255,136,0.5)]">
            Contacto
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A1628] dark:text-white mt-2 mb-4">
            ¿Tienes preguntas?
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Estamos aquí para ayudarte. Contáctanos y un experto te asesorará
            en tu próxima compra de audio.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <FadeIn direction="left" className="space-y-6">
            <h3 className="text-xl font-semibold text-[#0A1628] dark:text-white">
              Información de contacto
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Visita nuestro showroom o contáctanos por cualquiera de estos medios.
              Responderemos lo antes posible.
            </p>

            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-white/5 dark:backdrop-blur-xl border border-gray-200 dark:border-[#00FF88]/30 hover:bg-gray-100 dark:hover:bg-white/10 dark:hover:border-[#00FF88]/50 dark:hover:shadow-[0_0_20px_rgba(0,255,136,0.15)] group transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl border-2 border-gray-200 dark:border-[#00FF88]/30 dark:bg-[#00FF88]/10 group-hover:border-[#00FF88] dark:group-hover:bg-[#00FF88]/20 flex items-center justify-center transition-all duration-300">
                    <item.icon className="w-5 h-5 text-gray-600 dark:text-[#00FF88] group-hover:text-[#00FF88] transition-colors duration-300" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {item.title}
                    </div>
                    <div className="font-medium text-[#0A1628] dark:text-white">
                      {item.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Google Maps */}
            <Card className="overflow-hidden border-gray-100 dark:border-[#00FF88]/30 dark:bg-white/5 dark:backdrop-blur-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126615.95442011647!2d-73.17509868261717!3d7.119473899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e683f9a1f5b80b9%3A0x3ba3c28e5c9db508!2sBucaramanga%2C%20Santander%2C%20Colombia!5e0!3m2!1ses!2sus!4v1701100000000!5m2!1ses!2sus"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </Card>
          </FadeIn>

          {/* Contact Form */}
          <FadeIn direction="right" delay={0.2}>
            <Card className="border-gray-100 dark:border-[#00FF88]/30 dark:bg-white/5 dark:backdrop-blur-xl shadow-sm dark:shadow-[0_0_30px_rgba(0,255,136,0.1)]">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-[#0A1628] dark:text-white mb-6">
                Envíanos un mensaje
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#0A1628] dark:text-white mb-2">
                    Nombre completo
                  </label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Tu nombre"
                    required
                    className="dark:bg-white/5 dark:border-white/20 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-[#00FF88]/50"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#0A1628] dark:text-white mb-2">
                    Correo electrónico
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="tu@email.com"
                    required
                    className="dark:bg-white/5 dark:border-white/20 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-[#00FF88]/50"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#0A1628] dark:text-white mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="¿En qué podemos ayudarte?"
                    rows={4}
                    required
                    className="flex w-full rounded-xl border border-gray-200 dark:border-white/20 bg-transparent dark:bg-white/5 px-3 py-2 text-sm text-[#0A1628] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF88]/50 dark:focus:border-[#00FF88]/50 transition-all duration-200 resize-none"
                  />
                </div>
                <Button type="submit" variant="neon" className="w-full" size="lg">
                  <Send className="w-4 h-4 mr-2" />
                  Enviar mensaje
                </Button>
              </form>
            </CardContent>
          </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
