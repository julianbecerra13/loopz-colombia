import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { AdminHeader } from '@/components/admin/header'
import { HeroProductSelector } from '@/components/admin/hero-product-selector'
import { ProductRepository } from '@/core/infrastructure/repositories/product.repository'
import { prisma } from '@/core/infrastructure/database/prisma'

export const dynamic = 'force-dynamic'

export default async function HeroConfigPage() {
  const session = await getServerSession()

  if (!session) {
    redirect('/admin/login')
  }

  // Obtener todos los productos activos
  const { data: products } = await ProductRepository.findAll({
    isActive: true,
    pageSize: 100,
  })

  // Obtener configuración actual
  let config = await prisma.siteConfig.findUnique({
    where: { id: 'main' }
  })

  if (!config) {
    config = await prisma.siteConfig.create({
      data: { id: 'main' }
    })
  }

  return (
    <div>
      <AdminHeader
        title="Configurar Hero"
        description="Selecciona el producto que aparecerá en la sección principal de la landing"
      />
      <div className="p-6">
        <HeroProductSelector
          products={products}
          currentHeroProductId={config.heroProductId}
        />
      </div>
    </div>
  )
}
