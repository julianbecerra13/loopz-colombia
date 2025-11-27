'use client'

import { Mail, MapPin, MessageCircle, Clock, Headphones, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FadeIn } from '@/components/ui/motion'

export function Contact() {
  const whatsappNumber = '573168933842'
  const whatsappMessage = encodeURIComponent('¡Hola! Me interesa obtener información sobre sus productos de audio.')
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  const contactInfo = [
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      value: '+57 316 893 3842',
      href: whatsappUrl,
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'loopzcolombia@gmail.com',
      href: 'mailto:loopzcolombia@gmail.com',
    },
    {
      icon: MapPin,
      title: 'Ubicación',
      value: 'Bucaramanga, Santander',
      href: 'https://maps.google.com/?q=Bucaramanga,Santander,Colombia',
    },
  ]

  const benefits = [
    { icon: Clock, text: 'Respuesta en minutos' },
    { icon: Headphones, text: 'Asesoría personalizada' },
    { icon: CheckCircle, text: 'Atención directa' },
  ]

  return (
    <section id="contacto" className="py-24 bg-[#0A1628] border-t border-[#1E3A5F]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <FadeIn className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#00FF88] font-semibold text-sm uppercase tracking-wider drop-shadow-[0_0_10px_rgba(0,255,136,0.5)]">
            Contacto
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
            ¿Tienes preguntas?
          </h2>
          <p className="text-gray-300">
            Estamos aquí para ayudarte. Contáctanos y un experto te asesorará
            en tu próxima compra de audio.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <FadeIn direction="left" className="space-y-6">
            <h3 className="text-xl font-semibold text-white">
              Información de contacto
            </h3>
            <p className="text-gray-300">
              Escríbenos por WhatsApp para una atención rápida y personalizada.
              También puedes contactarnos por email.
            </p>

            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target={item.title === 'WhatsApp' ? '_blank' : undefined}
                  rel={item.title === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-[#00FF88]/30 hover:bg-white/10 hover:border-[#00FF88]/50 hover:shadow-[0_0_20px_rgba(0,255,136,0.15)] group transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl border-2 border-[#00FF88]/30 bg-[#00FF88]/10 group-hover:border-[#00FF88] group-hover:bg-[#00FF88]/20 flex items-center justify-center transition-all duration-300">
                    <item.icon className="w-5 h-5 text-[#00FF88] transition-colors duration-300" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">
                      {item.title}
                    </div>
                    <div className="font-medium text-white">
                      {item.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Google Maps */}
            <Card className="overflow-hidden border-[#00FF88]/30 bg-white/5 backdrop-blur-xl">
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

          {/* WhatsApp CTA */}
          <FadeIn direction="right" delay={0.2}>
            <Card className="border-[#00FF88]/30 bg-white/5 backdrop-blur-xl shadow-[0_0_30px_rgba(0,255,136,0.1)] h-full">
              <CardContent className="p-8 flex flex-col justify-center h-full">
                <div className="text-center">
                  {/* WhatsApp Icon */}
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#25D366] flex items-center justify-center shadow-[0_0_30px_rgba(37,211,102,0.4)]">
                    <svg viewBox="0 0 24 24" className="w-10 h-10 text-white fill-current">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">
                    Escríbenos por WhatsApp
                  </h3>
                  <p className="text-gray-300 mb-8">
                    La forma más rápida de obtener asesoría personalizada sobre nuestros productos de audio.
                  </p>

                  {/* Benefits */}
                  <div className="flex flex-wrap justify-center gap-4 mb-8">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
                        <benefit.icon className="w-4 h-4 text-[#00FF88]" />
                        <span>{benefit.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* WhatsApp Button */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="lg"
                      className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold text-lg py-6 rounded-xl shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] transition-all duration-300"
                    >
                      <svg viewBox="0 0 24 24" className="w-6 h-6 mr-3 fill-current">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Iniciar conversación
                    </Button>
                  </a>

                  <p className="text-xs text-gray-500 mt-4">
                    Horario de atención: Lun - Sáb, 9:00 AM - 7:00 PM
                  </p>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
