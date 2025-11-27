'use client'

import { useState, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface SearchBarProps {
  initialValue?: string
}

export function SearchBar({ initialValue = '' }: SearchBarProps) {
  const [query, setQuery] = useState(initialValue)
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSearch = useCallback((searchQuery: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (searchQuery.trim()) {
      params.set('buscar', searchQuery.trim())
    } else {
      params.delete('buscar')
    }

    params.delete('pagina')
    router.push(`/catalogo?${params.toString()}`)
  }, [router, searchParams])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(query)
  }

  const handleClear = () => {
    setQuery('')
    handleSearch('')
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00FF88] drop-shadow-[0_0_4px_rgba(0,255,136,0.8)]" />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar productos..."
          className="pl-10 pr-10 bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-[#00FF88]/50 focus:ring-[#00FF88]/20"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00FF88] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <Button type="submit" variant="neon">
        Buscar
      </Button>
    </form>
  )
}
