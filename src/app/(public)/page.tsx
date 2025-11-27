import { Hero } from '@/components/landing/hero'
import { Services } from '@/components/landing/services'
import { About } from '@/components/landing/about'
import { FeaturedProducts } from '@/components/landing/featured-products'
import { CTABanner } from '@/components/landing/cta-banner'
import { Contact } from '@/components/landing/contact'
import { ProductRepository } from '@/core/infrastructure/repositories/product.repository'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  // Obtener productos destacados
  const featuredProducts = await ProductRepository.findFeatured(8)

  return (
    <>
      <Hero />
      <Services />
      <FeaturedProducts products={featuredProducts} />
      <About />
      <CTABanner />
      <Contact />
    </>
  )
}
