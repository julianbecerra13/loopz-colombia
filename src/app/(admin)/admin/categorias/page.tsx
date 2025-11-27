import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { FolderTree } from 'lucide-react'
import { AdminHeader } from '@/components/admin/header'
import { Card, CardContent } from '@/components/ui/card'
import { CategoryRepository } from '@/core/infrastructure/repositories/category.repository'
import { CategoryManager } from '@/components/admin/category-manager'

export const dynamic = 'force-dynamic'

export default async function CategoriasPage() {
  const session = await getServerSession()

  if (!session) {
    redirect('/admin/login')
  }

  const categories = await CategoryRepository.findAllAdmin()

  return (
    <div>
      <AdminHeader
        title="Categorías"
        description="Gestiona las categorías de productos"
      />

      <div className="p-6">
        <CategoryManager initialCategories={categories} />
      </div>
    </div>
  )
}
