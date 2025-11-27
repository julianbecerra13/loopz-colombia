import { redirect, notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { AdminHeader } from '@/components/admin/header'
import { ProductForm } from '@/components/admin/product-form'
import { ProductRepository } from '@/core/infrastructure/repositories/product.repository'
import { CategoryRepository } from '@/core/infrastructure/repositories/category.repository'

export const dynamic = 'force-dynamic'

interface EditProductPageProps {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const session = await getServerSession()

  if (!session) {
    redirect('/admin/login')
  }

  const { id } = await params
  const [product, categories] = await Promise.all([
    ProductRepository.findById(id),
    CategoryRepository.findAll(),
  ])

  if (!product) {
    notFound()
  }

  return (
    <div>
      <AdminHeader
        title="Editar Producto"
        description={product.name}
      />
      <div className="p-6">
        <ProductForm product={product} categories={categories} />
      </div>
    </div>
  )
}
