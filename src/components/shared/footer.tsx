import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin, Facebook, Instagram } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0A1628] border-t border-[#1E3A5F]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex items-center gap-3 bg-white rounded-xl px-3 py-2 shadow-[0_0_15px_rgba(0,255,136,0.3)]">
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
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-gray-400 text-sm">
              Tecnología de audio premium para los amantes del sonido de alta fidelidad.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/share/1T1becCYm3/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#00FF88] transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/loopz.colombia?igsh=MTNtMzBreDhtNTBwMw==" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#00FF88] transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-[#00FF88] transition-colors text-sm">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/#nosotros" className="text-gray-400 hover:text-[#00FF88] transition-colors text-sm">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/catalogo" className="text-gray-400 hover:text-[#00FF88] transition-colors text-sm">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="/#contacto" className="text-gray-400 hover:text-[#00FF88] transition-colors text-sm">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Categorías</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/catalogo?categoria=in-ear" className="text-gray-400 hover:text-[#00FF88] transition-colors text-sm">
                  In-Ear Monitors
                </Link>
              </li>
              <li>
                <Link href="/catalogo?categoria=cables" className="text-gray-400 hover:text-[#00FF88] transition-colors text-sm">
                  Cables Premium
                </Link>
              </li>
              <li>
                <Link href="/catalogo?categoria=accesorios" className="text-gray-400 hover:text-[#00FF88] transition-colors text-sm">
                  Accesorios
                </Link>
              </li>
              <li>
                <Link href="/catalogo?categoria=dacs" className="text-gray-400 hover:text-[#00FF88] transition-colors text-sm">
                  DACs & Amplificadores
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-[#00FF88] drop-shadow-[0_0_4px_rgba(0,255,136,0.8)]" />
                <a href="mailto:loopzcolombia@gmail.com" className="hover:text-[#00FF88] transition-colors">loopzcolombia@gmail.com</a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-[#00FF88] drop-shadow-[0_0_4px_rgba(0,255,136,0.8)]" />
                <a href="tel:+573168933842" className="hover:text-[#00FF88] transition-colors">+57 316 893 3842</a>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-[#00FF88] mt-0.5 drop-shadow-[0_0_4px_rgba(0,255,136,0.8)]" />
                <span>Colombia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#1E3A5F] mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © Desarrollado por <span className="text-[#00FF88]">Julian Rodriguez</span> · <a href="mailto:becerrarodriguezjulian@gmail.com" className="text-[#00FF88] hover:underline">becerrarodriguezjulian@gmail.com</a>
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-gray-500 hover:text-[#00FF88] transition-colors text-sm">
              Términos y Condiciones
            </Link>
            <Link href="#" className="text-gray-500 hover:text-[#00FF88] transition-colors text-sm">
              Política de Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
