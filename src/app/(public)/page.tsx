import { Hero } from '@/components/landing/hero'
import { Services } from '@/components/landing/services'
import { About } from '@/components/landing/about'
import { FeaturedProducts } from '@/components/landing/featured-products'
import { CTABanner } from '@/components/landing/cta-banner'
import { Contact } from '@/components/landing/contact'
import { ProductRepository } from '@/core/infrastructure/repositories/product.repository'
import { prisma } from '@/core/infrastructure/database/prisma'
import type { Product } from '@/core/domain/types'

export const dynamic = 'force-dynamic'

// Función auxiliar para parsear producto
function parseProduct(dbProduct: any): Product {
  return {
    ...dbProduct,
    images: dbProduct.images ? JSON.parse(dbProduct.images) : [],
    specs: dbProduct.specs ? JSON.parse(dbProduct.specs) : [],
  }
}

export default async function HomePage() {
  // Obtener productos destacados
  const featuredProducts = await ProductRepository.findFeatured(8)

  // Obtener producto del hero
  let heroProduct: Product | null = null
  const config = await prisma.siteConfig.findUnique({
    where: { id: 'main' }
  })

  if (config?.heroProductId) {
    const product = await prisma.product.findUnique({
      where: { id: config.heroProductId },
      include: { category: true }
    })
    if (product) {
      heroProduct = parseProduct(product)
    }
  }

  return (
    <>
      <Hero product={heroProduct} />
      <Services />
      <FeaturedProducts products={featuredProducts} />
      <About />
      <CTABanner />
      <Contact />
    </>
  )
}
