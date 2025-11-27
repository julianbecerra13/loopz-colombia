'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/catalog/product-card'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion'
import type { Product } from '@/core/domain/types'

interface FeaturedProductsProps {
  products: Product[]
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="py-24 bg-[#0A1628] border-t border-[#1E3A5F]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <FadeIn className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="text-[#00FF88] font-semibold text-sm uppercase tracking-wider drop-shadow-[0_0_10px_rgba(0,255,136,0.5)]">
              Productos Destacados
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
              Los más populares
            </h2>
          </div>
          <Button variant="outline" asChild className="self-start md:self-auto border-gray-300 border-[#2A4A6F] text-white hover:bg-[#1E3A5F]">
            <Link href="/catalogo" className="gap-2">
              Ver todo el catálogo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </FadeIn>

        {/* Products Grid */}
        {products.length > 0 ? (
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" staggerDelay={0.1}>
            {products.map((product) => (
              <StaggerItem key={product.id}>
                <ProductCard product={product} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">No hay productos destacados disponibles.</p>
          </div>
        )}
      </div>
    </section>
  )
}
