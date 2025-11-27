import Link from 'next/link'
import Image from 'next/image'
import { Eye } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/core/domain/types'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.comparePrice && product.comparePrice > product.price
  const discountPercentage = hasDiscount
    ? Math.round(((product.comparePrice! - product.price) / product.comparePrice!) * 100)
    : 0

  return (
    <Card className="group overflow-hidden bg-white/5 backdrop-blur-sm border-white/10 hover:shadow-xl hover:shadow-[#00FF88]/10 hover:border-[#00FF88]/30 transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-square bg-gradient-to-br from-[#1E3A5F]/50 to-[#0A1628]/50 overflow-hidden">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {product.isNew && (
            <Badge variant="neon">Nuevo</Badge>
          )}
          {hasDiscount && (
            <Badge variant="destructive">-{discountPercentage}%</Badge>
          )}
          {!product.inStock && (
            <Badge variant="secondary">Agotado</Badge>
          )}
        </div>

        {/* Product Image */}
        <div className="absolute inset-0 flex items-center justify-center p-6">
          {product.mainImage ? (
            <Image
              src={product.mainImage}
              alt={product.name}
              fill
              className="object-contain group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#0A1628]/30">
              <svg className="w-16 h-16 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              </svg>
            </div>
          )}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-[#0A1628]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button variant="neon" asChild>
            <Link href={`/producto/${product.slug}`} className="gap-2">
              <Eye className="w-4 h-4" />
              Ver Detalles
            </Link>
          </Button>
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-4">
        {/* Category */}
        {product.category && (
          <span className="text-xs text-[#00FF88] font-medium uppercase tracking-wider drop-shadow-[0_0_6px_rgba(0,255,136,0.5)]">
            {product.category.name}
          </span>
        )}

        {/* Name */}
        <h3 className="font-semibold text-white mt-1 line-clamp-2 group-hover:text-[#00FF88] group-hover:drop-shadow-[0_0_8px_rgba(0,255,136,0.5)] transition-all">
          <Link href={`/producto/${product.slug}`}>
            {product.name}
          </Link>
        </h3>

        {/* Short Description */}
        {product.shortDesc && (
          <p className="text-sm text-gray-400 mt-1 line-clamp-1">
            {product.shortDesc}
          </p>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mt-3">
          <span className="text-xl font-bold text-white">
            {formatPrice(product.price)}
          </span>
          <span className="text-xs text-gray-400 font-medium">COP</span>
          {hasDiscount && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.comparePrice!)}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
