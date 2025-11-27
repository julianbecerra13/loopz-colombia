import { Suspense } from 'react'
import { ProductGrid } from '@/components/catalog/product-grid'
import { CategoryFilter } from '@/components/catalog/category-filter'
import { SearchBar } from '@/components/catalog/search-bar'
import { Pagination } from '@/components/catalog/pagination'
import { Skeleton } from '@/components/ui/skeleton'
import { ProductRepository } from '@/core/infrastructure/repositories/product.repository'
import { CategoryRepository } from '@/core/infrastructure/repositories/category.repository'

export const dynamic = 'force-dynamic'

interface CatalogoPageProps {
  searchParams: Promise<{
    categoria?: string
    buscar?: string
    pagina?: string
  }>
}

export default async function CatalogoPage({ searchParams }: CatalogoPageProps) {
  const params = await searchParams
  const categoria = params.categoria
  const buscar = params.buscar
  const pagina = parseInt(params.pagina || '1')

  // Obtener categorías y productos en paralelo
  const [categories, categoryData] = await Promise.all([
    CategoryRepository.findAll(),
    categoria ? CategoryRepository.findBySlug(categoria) : null,
  ])

  const { data: products, total, totalPages } = await ProductRepository.findAll({
    categoryId: categoryData?.id,
    search: buscar,
    page: pagina,
    pageSize: 12,
    isActive: true,
  })

  return (
    <section className="py-12 bg-[#0A1628] min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#00FF88]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-[#1E3A5F]/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <span className="text-[#00FF88] font-semibold text-sm uppercase tracking-wider drop-shadow-[0_0_10px_rgba(0,255,136,0.5)]">
            Catálogo
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-2">
            {categoryData ? categoryData.name : 'Todos los Productos'}
          </h1>
          <p className="text-gray-400">
            {total} producto{total !== 1 ? 's' : ''} encontrado{total !== 1 ? 's' : ''}
            {buscar && ` para "${buscar}"`}
          </p>
        </div>

        {/* Filters Row */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Suspense fallback={<Skeleton className="h-10 w-full" />}>
              <SearchBar initialValue={buscar} />
            </Suspense>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <Suspense fallback={<Skeleton className="h-10 w-full" />}>
            <CategoryFilter categories={categories} currentCategory={categoria} />
          </Suspense>
        </div>

        {/* Products Grid */}
        <ProductGrid products={products} />

        {/* Pagination */}
        <Suspense fallback={<Skeleton className="h-10 w-48 mx-auto mt-8" />}>
          <Pagination currentPage={pagina} totalPages={totalPages} />
        </Suspense>
      </div>
    </section>
  )
}
