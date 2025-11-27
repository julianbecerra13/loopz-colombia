'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import type { Category } from '@/core/domain/types'

interface CategoryFilterProps {
  categories: Category[]
  currentCategory?: string
}

export function CategoryFilter({ categories, currentCategory }: CategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleCategoryChange = (slug: string | null) => {
    const params = new URLSearchParams(searchParams.toString())

    if (slug) {
      params.set('categoria', slug)
    } else {
      params.delete('categoria')
    }

    // Reset to page 1 when changing category
    params.delete('pagina')

    router.push(`/catalogo?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleCategoryChange(null)}
        className={cn(
          'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
          !currentCategory
            ? 'bg-[#00FF88] text-[#0A1628] shadow-[0_0_15px_rgba(0,255,136,0.4)]'
            : 'bg-white/10 text-gray-300 border border-white/20 hover:bg-white/20 hover:border-[#00FF88]/30'
        )}
      >
        Todos
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryChange(category.slug)}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
            currentCategory === category.slug
              ? 'bg-[#00FF88] text-[#0A1628] shadow-[0_0_15px_rgba(0,255,136,0.4)]'
              : 'bg-white/10 text-gray-300 border border-white/20 hover:bg-white/20 hover:border-[#00FF88]/30'
          )}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}
