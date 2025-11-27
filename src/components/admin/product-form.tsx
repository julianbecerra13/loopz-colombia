'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Loader2, Plus, X, Package, DollarSign, Image as ImageIcon, Settings, Tag } from 'lucide-react'
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
    <form onSubmit={handleSubmit} className="w-full pb-24 lg:pb-0">
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 backdrop-blur-sm mb-6">
          {error}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-4 lg:gap-6">
        {/* En móvil: Imagen primero */}
        <div className="lg:hidden space-y-4">
          {/* Image - Mobile */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2 text-base">
                <ImageIcon className="w-5 h-5 text-[#00FF88]" />
                Imagen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload
                value={mainImage}
                onChange={setMainImage}
              />
            </CardContent>
          </Card>

          {/* Category & Status - Mobile (horizontal) */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardHeader className="pb-2 px-4 pt-4">
                <CardTitle className="text-white flex items-center gap-2 text-sm">
                  <Tag className="w-4 h-4 text-[#00FF88]" />
                  Categoría
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  required
                  className="flex h-9 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF88]/30 transition-colors"
                >
                  <option value="" className="bg-[#0A1628]">Seleccionar...</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id} className="bg-[#0A1628]">
                      {cat.name}
                    </option>
                  ))}
                </select>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardHeader className="pb-2 px-4 pt-4">
                <CardTitle className="text-white text-sm">Estado</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#00FF88] focus:ring-[#00FF88]/30"
                  />
                  <span className="text-xs text-gray-300">Activo</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#00FF88] focus:ring-[#00FF88]/30"
                  />
                  <span className="text-xs text-gray-300">Destacado</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isNew}
                    onChange={(e) => setIsNew(e.target.checked)}
                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#00FF88] focus:ring-[#00FF88]/30"
                  />
                  <span className="text-xs text-gray-300">Nuevo</span>
                </label>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Columna Izquierda - Información Principal */}
        <div className="lg:col-span-2 space-y-4 lg:space-y-6">
          {/* Basic Info */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardHeader className="pb-3 lg:pb-4">
              <CardTitle className="text-white flex items-center gap-2 text-base lg:text-lg">
                <Package className="w-5 h-5 text-[#00FF88]" />
                Información del Producto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 lg:space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
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
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Slug (URL) *
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-xs sm:text-sm hidden sm:inline">/producto/</span>
                  <Input
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="kz-zs10-pro"
                    required
                    className={`flex-1 ${inputClasses}`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
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
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Descripción completa *
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descripción detallada del producto..."
                  rows={4}
                  required
                  className="flex w-full rounded-xl border border-white/10 bg-white/5 px-3 lg:px-4 py-2 lg:py-3 text-sm text-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF88]/30 focus:border-[#00FF88]/50 resize-none transition-colors"
                />
              </div>
            </CardContent>
          </Card>

          {/* Pricing & Stock */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardHeader className="pb-3 lg:pb-4">
              <CardTitle className="text-white flex items-center gap-2 text-base lg:text-lg">
                <DollarSign className="w-5 h-5 text-[#00FF88]" />
                Precio e Inventario
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Precio (COP) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                    <Input
                      type="number"
                      step="1"
                      min="0"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="0"
                      required
                      className={`pl-7 ${inputClasses}`}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Precio anterior
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                    <Input
                      type="number"
                      step="1"
                      min="0"
                      value={comparePrice}
                      onChange={(e) => setComparePrice(e.target.value)}
                      placeholder="Descuento"
                      className={`pl-7 ${inputClasses}`}
                    />
                  </div>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Stock
                  </label>
                  <Input
                    type="number"
                    min="0"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="0"
                    className={inputClasses}
                  />
                  <p className="mt-1 text-xs">
                    {parseInt(stock) > 0
                      ? <span className="text-[#00FF88]">✓ En stock ({stock} uds)</span>
                      : <span className="text-red-400">✗ Sin stock</span>
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Video URL - Mobile */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 lg:hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-base">URL del Video</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://youtube.com/..."
                className={inputClasses}
              />
              <p className="mt-2 text-xs text-gray-500">
                Para el botón "Ver Video" en el hero
              </p>
            </CardContent>
          </Card>

          {/* Specs */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardHeader className="pb-3 lg:pb-4 flex flex-row items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2 text-base lg:text-lg">
                <Settings className="w-5 h-5 text-[#00FF88]" />
                Especificaciones
              </CardTitle>
              <Button type="button" variant="outline" size="sm" onClick={addSpec} className="border-[#00FF88]/30 text-[#00FF88] hover:bg-[#00FF88]/10 hover:text-[#00FF88] text-xs lg:text-sm">
                <Plus className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Agregar</span>
              </Button>
            </CardHeader>
            <CardContent>
              {specs.length > 0 ? (
                <div className="space-y-3">
                  {specs.map((spec, index) => (
                    <div key={index} className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:items-center p-3 rounded-lg bg-white/5 border border-white/5">
                      <Input
                        value={spec.name}
                        onChange={(e) => updateSpec(index, 'name', e.target.value)}
                        placeholder="Nombre (ej: Drivers)"
                        className={`${inputClasses}`}
                      />
                      <Input
                        value={spec.value}
                        onChange={(e) => updateSpec(index, 'value', e.target.value)}
                        placeholder="Valor (ej: 5 BA + 1 DD)"
                        className={`${inputClasses}`}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSpec(index)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl flex-shrink-0 self-end sm:self-auto"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 lg:py-8 border-2 border-dashed border-white/10 rounded-xl">
                  <Settings className="w-6 lg:w-8 h-6 lg:h-8 text-gray-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">
                    No hay especificaciones
                  </p>
                  <p className="text-xs text-gray-500 mt-1 hidden sm:block">
                    Haz clic en "Agregar" para añadir características
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Columna Derecha - Solo Desktop */}
        <div className="hidden lg:block space-y-6">
          {/* Image */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardHeader className="pb-4">
              <CardTitle className="text-white flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[#00FF88]" />
                Imagen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload
                value={mainImage}
                onChange={setMainImage}
              />
            </CardContent>
          </Card>

          {/* Video */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardHeader className="pb-4">
              <CardTitle className="text-white text-base">URL del Video</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://youtube.com/..."
                className={inputClasses}
              />
              <p className="mt-2 text-xs text-gray-500">
                Para el botón "Ver Video" en el hero
              </p>
            </CardContent>
          </Card>

          {/* Category */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardHeader className="pb-4">
              <CardTitle className="text-white flex items-center gap-2">
                <Tag className="w-5 h-5 text-[#00FF88]" />
                Categoría
              </CardTitle>
            </CardHeader>
            <CardContent>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
                className="flex h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF88]/30 focus:border-[#00FF88]/50 transition-colors"
              >
                <option value="" className="bg-[#0A1628]">Seleccionar...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id} className="bg-[#0A1628]">
                    {cat.name}
                  </option>
                ))}
              </select>
            </CardContent>
          </Card>

          {/* Status */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardHeader className="pb-4">
              <CardTitle className="text-white text-base">Estado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <label className="flex items-center gap-3 p-3 rounded-lg bg-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#00FF88] focus:ring-[#00FF88]/30"
                />
                <div>
                  <span className="text-sm font-medium text-white">Activo</span>
                  <p className="text-xs text-gray-500">Visible en el catálogo</p>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-lg bg-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#00FF88] focus:ring-[#00FF88]/30"
                />
                <div>
                  <span className="text-sm font-medium text-white">Destacado</span>
                  <p className="text-xs text-gray-500">Aparece en la landing</p>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-lg bg-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                <input
                  type="checkbox"
                  checked={isNew}
                  onChange={(e) => setIsNew(e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#00FF88] focus:ring-[#00FF88]/30"
                />
                <div>
                  <span className="text-sm font-medium text-white">Nuevo</span>
                  <p className="text-xs text-gray-500">Muestra etiqueta "Nuevo"</p>
                </div>
              </label>
            </CardContent>
          </Card>

          {/* Submit Buttons - Desktop */}
          <div className="space-y-3">
            <Button
              type="submit"
              variant="neon"
              size="lg"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {product ? 'Actualizar' : 'Crear Producto'}
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => router.back()}
              className="w-full border-white/20 text-gray-300 hover:bg-white/10 hover:text-white"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </div>

      {/* Botones fijos en móvil */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#0A1628]/95 backdrop-blur-lg border-t border-white/10 lg:hidden z-50">
        <div className="flex gap-3 max-w-lg mx-auto">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            className="flex-1 border-white/20 text-gray-300 hover:bg-white/10"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="neon"
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                {product ? 'Actualizar' : 'Guardar'}
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  )
}
