import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { AdminHeader } from '@/components/admin/header'
import { ProductForm } from '@/components/admin/product-form'
import { CategoryRepository } from '@/core/infrastructure/repositories/category.repository'

export const dynamic = 'force-dynamic'

export default async function NewProductPage() {
  const session = await getServerSession()

  if (!session) {
    redirect('/admin/login')
  }

  const categories = await CategoryRepository.findAll()

  return (
    <div>
      <AdminHeader
        title="Nuevo Producto"
        description="Agrega un nuevo producto al catálogo"
      />
      <div className="p-6">
        <ProductForm categories={categories} />
      </div>
    </div>
  )
}
