'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Loader2, Check, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { Product } from '@/core/domain/types'

interface HeroProductSelectorProps {
  products: Product[]
  currentHeroProductId: string | null
}

export function HeroProductSelector({ products, currentHeroProductId }: HeroProductSelectorProps) {
  const router = useRouter()
  const [selectedId, setSelectedId] = useState<string | null>(currentHeroProductId)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSave = async () => {
    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/site-config/hero', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ heroProductId: selectedId }),
      })

      if (response.ok) {
        setMessage('¡Configuración guardada correctamente!')
        router.refresh()
      } else {
        setMessage('Error al guardar la configuración')
      }
    } catch {
      setMessage('Error al guardar la configuración')
    } finally {
      setIsLoading(false)
    }
  }

  const selectedProduct = products.find(p => p.id === selectedId)

  return (
    <div className="space-y-6">
      {/* Preview del producto seleccionado */}
      {selectedProduct && (
        <Card className="bg-gradient-to-br from-[#00FF88]/10 to-[#00FF88]/5 border-[#00FF88]/30">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Producto seleccionado para el Hero</h3>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden border border-[#00FF88]/30">
                {selectedProduct.mainImage ? (
                  <img
                    src={selectedProduct.mainImage}
                    alt={selectedProduct.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <ImageIcon className="w-8 h-8 text-gray-500" />
                )}
              </div>
              <div>
                <p className="font-semibold text-white text-lg">{selectedProduct.name}</p>
                <p className="text-sm text-gray-400">{selectedProduct.category?.name}</p>
                {selectedProduct.videoUrl ? (
                  <p className="text-xs text-[#00FF88] mt-1">✓ Tiene video configurado</p>
                ) : (
                  <p className="text-xs text-yellow-500 mt-1">⚠ Sin video (el botón se deshabilitará)</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Grid de productos */}
      <Card className="bg-white/5 backdrop-blur-xl border-white/10">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Selecciona un producto</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-h-[500px] overflow-y-auto pr-2">
            {products.map((product) => (
              <button
                key={product.id}
                type="button"
                onClick={() => setSelectedId(product.id)}
                className={`relative p-3 rounded-xl border transition-all text-left ${
                  selectedId === product.id
                    ? 'border-[#00FF88] bg-[#00FF88]/10 shadow-[0_0_20px_rgba(0,255,136,0.2)]'
                    : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                }`}
              >
                {selectedId === product.id && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#00FF88] flex items-center justify-center">
                    <Check className="w-3 h-3 text-[#0A1628]" />
                  </div>
                )}
                <div className="w-full aspect-square rounded-lg bg-white/10 mb-2 overflow-hidden">
                  {product.mainImage ? (
                    <img
                      src={product.mainImage}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-gray-600" />
                    </div>
                  )}
                </div>
                <p className="text-sm font-medium text-white truncate">{product.name}</p>
                <p className="text-xs text-gray-400 truncate">{product.category?.name}</p>
                {product.videoUrl && (
                  <span className="inline-block mt-1 text-[10px] text-[#00FF88] bg-[#00FF88]/10 px-1.5 py-0.5 rounded">
                    Video ✓
                  </span>
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Botón guardar */}
      <div className="flex items-center gap-4">
        <Button
          variant="neon"
          size="lg"
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Guardar Configuración
            </>
          )}
        </Button>
        {message && (
          <span className={`text-sm ${message.includes('Error') ? 'text-red-400' : 'text-[#00FF88]'}`}>
            {message}
          </span>
        )}
      </div>
    </div>
  )
}
