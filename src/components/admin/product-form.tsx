'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Loader2, Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ImageUpload } from '@/components/admin/image-upload'
import { generateSlug } from '@/lib/utils'
import type { Product, Category, ProductSpec } from '@/core/domain/types'

interface ProductFormProps {
  product?: Product
  categories: Category[]
}

export function ProductForm({ product, categories }: ProductFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Form state
  const [name, setName] = useState(product?.name || '')
  const [slug, setSlug] = useState(product?.slug || '')
  const [description, setDescription] = useState(product?.description || '')
  const [shortDesc, setShortDesc] = useState(product?.shortDesc || '')
  const [price, setPrice] = useState(product?.price?.toString() || '')
  const [comparePrice, setComparePrice] = useState(product?.comparePrice?.toString() || '')
  const [mainImage, setMainImage] = useState(product?.mainImage || '')
  const [categoryId, setCategoryId] = useState(product?.categoryId || '')
  const [isActive, setIsActive] = useState(product?.isActive ?? true)
  const [isFeatured, setIsFeatured] = useState(product?.isFeatured ?? false)
  const [isNew, setIsNew] = useState(product?.isNew ?? true)
  const [stock, setStock] = useState(product?.stock?.toString() || '0')
  const [videoUrl, setVideoUrl] = useState(product?.videoUrl || '')
  const [specs, setSpecs] = useState<ProductSpec[]>(product?.specs || [])

  // Auto-generate slug from name
  const handleNameChange = (value: string) => {
    setName(value)
    if (!product) {
      setSlug(generateSlug(value))
    }
  }

  // Add new spec
  const addSpec = () => {
    setSpecs([...specs, { name: '', value: '' }])
  }

  // Remove spec
  const removeSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index))
  }

  // Update spec
  const updateSpec = (index: number, field: 'name' | 'value', value: string) => {
    const newSpecs = [...specs]
    newSpecs[index][field] = value
    setSpecs(newSpecs)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const stockNum = parseInt(stock) || 0
    const data = {
      name,
      slug,
      description,
      shortDesc: shortDesc || null,
      price: parseFloat(price),
      comparePrice: comparePrice ? parseFloat(comparePrice) : null,
      mainImage,
      videoUrl: videoUrl || null,
      categoryId,
      isActive,
      isFeatured,
      isNew,
      stock: stockNum,
      inStock: stockNum > 0,
      specs: specs.filter(s => s.name && s.value),
    }

    try {
      const url = product ? `/api/products/${product.id}` : '/api/products'
      const method = product ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        router.push('/admin/productos')
        router.refresh()
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Error al guardar el producto')
      }
    } catch {
      setError('Error al guardar el producto')
    } finally {
      setIsLoading(false)
    }
  }

  const inputClasses = "bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#00FF88]/50 focus:ring-[#00FF88]/20"

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 backdrop-blur-sm">
          {error}
        </div>
      )}

      {/* Basic Info */}
      <Card className="bg-white/5 backdrop-blur-xl border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Información Básica</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Nombre del producto *
              </label>
              <Input
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Ej: KZ ZS10 Pro"
                required
                className={inputClasses}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Slug (URL) *
              </label>
              <Input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="ej: kz-zs10-pro"
                required
                className={inputClasses}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Descripción corta
            </label>
            <Input
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              placeholder="Breve descripción para listados"
              className={inputClasses}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Descripción completa *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción detallada del producto..."
              rows={4}
              required
              className="flex w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF88]/30 focus:border-[#00FF88]/50 resize-none transition-colors"
            />
          </div>
        </CardContent>
      </Card>

      {/* Pricing */}
      <Card className="bg-white/5 backdrop-blur-xl border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Precio</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Precio *
              </label>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                required
                className={inputClasses}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Precio anterior (opcional)
              </label>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={comparePrice}
                onChange={(e) => setComparePrice(e.target.value)}
                placeholder="Para mostrar descuento"
                className={inputClasses}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Images & Video */}
      <Card className="bg-white/5 backdrop-blur-xl border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Imagen y Video</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Imagen principal *
            </label>
            <ImageUpload
              value={mainImage}
              onChange={setMainImage}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              URL del Video (opcional)
            </label>
            <Input
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className={inputClasses}
            />
            <p className="mt-1 text-xs text-gray-400">
              Link de YouTube u otra plataforma para el botón "Ver Video"
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Category & Status */}
      <Card className="bg-white/5 backdrop-blur-xl border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Categoría y Estado</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Categoría *
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
                className="flex h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF88]/30 focus:border-[#00FF88]/50 transition-colors"
              >
                <option value="" className="bg-[#0A1628]">Seleccionar categoría</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id} className="bg-[#0A1628]">
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Stock (cantidad disponible)
              </label>
              <Input
                type="number"
                min="0"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="0"
                className={inputClasses}
              />
              <p className="mt-1 text-xs text-gray-400">
                {parseInt(stock) > 0
                  ? <span className="text-[#00FF88]">✓ En stock ({stock} unidades)</span>
                  : <span className="text-red-400">✗ Sin stock</span>
                }
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white transition-colors">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#00FF88] focus:ring-[#00FF88]/30"
              />
              <span className="text-sm">Activo (visible en catálogo)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white transition-colors">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#00FF88] focus:ring-[#00FF88]/30"
              />
              <span className="text-sm">Destacado</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white transition-colors">
              <input
                type="checkbox"
                checked={isNew}
                onChange={(e) => setIsNew(e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#00FF88] focus:ring-[#00FF88]/30"
              />
              <span className="text-sm">Nuevo</span>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Specs */}
      <Card className="bg-white/5 backdrop-blur-xl border-white/10">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Especificaciones</CardTitle>
          <Button type="button" variant="outline" size="sm" onClick={addSpec} className="border-white/20 text-gray-300 hover:bg-white/10 hover:text-white">
            <Plus className="w-4 h-4 mr-1" />
            Agregar
          </Button>
        </CardHeader>
        <CardContent>
          {specs.length > 0 ? (
            <div className="space-y-3">
              {specs.map((spec, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Input
                    value={spec.name}
                    onChange={(e) => updateSpec(index, 'name', e.target.value)}
                    placeholder="Nombre (ej: Drivers)"
                    className={`flex-1 ${inputClasses}`}
                  />
                  <Input
                    value={spec.value}
                    onChange={(e) => updateSpec(index, 'value', e.target.value)}
                    placeholder="Valor (ej: 5 BA + 1 DD)"
                    className={`flex-1 ${inputClasses}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSpec(index)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 text-center py-4">
              No hay especificaciones. Haz clic en "Agregar" para añadir.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Submit */}
      <div className="flex gap-4">
        <Button
          type="submit"
          variant="neon"
          size="lg"
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
              {product ? 'Actualizar Producto' : 'Crear Producto'}
            </>
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => router.back()}
          className="border-white/20 text-gray-300 hover:bg-white/10 hover:text-white"
        >
          Cancelar
        </Button>
      </div>
    </form>
  )
}
