import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Check, Truck, Shield, Headphones } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent } from '@/components/ui/card'
import { formatPrice } from '@/lib/utils'
import { ProductRepository } from '@/core/infrastructure/repositories/product.repository'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await ProductRepository.findBySlug(slug)

  if (!product) {
    notFound()
  }

  const hasDiscount = product.comparePrice && product.comparePrice > product.price
  const discountPercentage = hasDiscount
    ? Math.round(((product.comparePrice! - product.price) / product.comparePrice!) * 100)
    : 0

  // Obtener productos relacionados
  const relatedProducts = await ProductRepository.findAll({
    categoryId: product.categoryId,
    isActive: true,
    pageSize: 4,
  })
  const related = relatedProducts.data.filter(p => p.id !== product.id).slice(0, 4)

  return (
    <section className="py-12 bg-[#0A1628] min-h-screen relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#00FF88]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#00FF88]/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 right-0 w-[300px] h-[600px] bg-[#1E3A5F]/30 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Back Button */}
        <Link
          href="/catalogo"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-[#00FF88] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al catálogo
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-[#00FF88]/30 transition-colors">
              {/* Badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {product.isNew && <Badge variant="neon">Nuevo</Badge>}
                {hasDiscount && <Badge variant="destructive">-{discountPercentage}%</Badge>}
                {!product.inStock && <Badge variant="secondary">Agotado</Badge>}
              </div>

              {product.mainImage ? (
                <Image
                  src={product.mainImage}
                  alt={product.name}
                  fill
                  className="object-contain p-8"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Headphones className="w-32 h-32 text-gray-600" />
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                <div className="w-20 h-20 rounded-lg bg-white/10 border-2 border-[#00FF88]/50 shadow-[0_0_10px_rgba(0,255,136,0.3)] flex-shrink-0 overflow-hidden">
                  {product.mainImage && (
                    <Image
                      src={product.mainImage}
                      alt={product.name}
                      width={80}
                      height={80}
                      className="object-contain p-2"
                    />
                  )}
                </div>
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className="w-20 h-20 rounded-lg bg-white/5 border border-white/20 flex-shrink-0 overflow-hidden hover:border-[#00FF88]/50 hover:shadow-[0_0_10px_rgba(0,255,136,0.2)] transition-all cursor-pointer"
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - ${index + 1}`}
                      width={80}
                      height={80}
                      className="object-contain p-2"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category */}
            {product.category && (
              <Link
                href={`/catalogo?categoria=${product.category.slug}`}
                className="text-sm text-[#00FF88] font-medium uppercase tracking-wider hover:underline drop-shadow-[0_0_6px_rgba(0,255,136,0.5)]"
              >
                {product.category.name}
              </Link>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-[#00FF88] drop-shadow-[0_0_10px_rgba(0,255,136,0.4)]">
                {formatPrice(product.price)}
              </span>
              <span className="text-sm text-gray-400 font-medium">COP</span>
              {hasDiscount && (
                <span className="text-xl text-gray-500 line-through">
                  {formatPrice(product.comparePrice!)}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {product.inStock ? (
                <>
                  <div className="w-3 h-3 rounded-full bg-[#00FF88] shadow-[0_0_8px_rgba(0,255,136,0.6)]" />
                  <span className="text-[#00FF88] font-medium">En stock</span>
                </>
              ) : (
                <>
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-red-400 font-medium">Agotado</span>
                </>
              )}
            </div>

            <Separator className="bg-white/10" />

            {/* Description */}
            <div>
              <h3 className="font-semibold text-white mb-2">Descripción</h3>
              <p className="text-gray-400 leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>

            {/* Specs */}
            {product.specs && product.specs.length > 0 && (
              <div>
                <h3 className="font-semibold text-white mb-3">Especificaciones</h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.specs.map((spec, index) => (
                    <div key={index} className="flex justify-between py-2 px-3 bg-white/5 border border-white/10 rounded-lg">
                      <span className="text-sm text-gray-500">{spec.name}</span>
                      <span className="text-sm font-medium text-white">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Separator className="bg-white/10" />

            {/* Contact CTA */}
            <div className="space-y-3">
              <p className="text-sm text-gray-400">
                ¿Interesado en este producto? Contáctanos para más información.
              </p>
              <Button variant="neon" size="xl" className="w-full" asChild>
                <Link href="/#contacto">
                  Solicitar Información
                </Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-[#00FF88] drop-shadow-[0_0_4px_rgba(0,255,136,0.8)]" />
                </div>
                <span className="text-xs text-gray-400">Envío Nacional</span>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#00FF88] drop-shadow-[0_0_4px_rgba(0,255,136,0.8)]" />
                </div>
                <span className="text-xs text-gray-400">Garantía 2 Años</span>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <Check className="w-5 h-5 text-[#00FF88] drop-shadow-[0_0_4px_rgba(0,255,136,0.8)]" />
                </div>
                <span className="text-xs text-gray-400">100% Original</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6">
              Productos <span className="text-[#00FF88] drop-shadow-[0_0_10px_rgba(0,255,136,0.5)]">Relacionados</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="group overflow-hidden bg-white/5 backdrop-blur-sm border-white/10 hover:shadow-xl hover:shadow-[#00FF88]/10 hover:border-[#00FF88]/30 transition-all duration-300">
                  <Link href={`/producto/${relatedProduct.slug}`}>
                    <div className="relative aspect-square bg-gradient-to-br from-[#1E3A5F]/30 to-[#0A1628]/30">
                      {relatedProduct.mainImage ? (
                        <Image
                          src={relatedProduct.mainImage}
                          alt={relatedProduct.name}
                          fill
                          className="object-contain p-4 group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Headphones className="w-12 h-12 text-gray-600" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-white line-clamp-1 group-hover:text-[#00FF88] transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-lg font-bold text-[#00FF88] mt-1 drop-shadow-[0_0_6px_rgba(0,255,136,0.4)]">
                        {formatPrice(relatedProduct.price)} <span className="text-xs text-gray-400 font-medium">COP</span>
                      </p>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
