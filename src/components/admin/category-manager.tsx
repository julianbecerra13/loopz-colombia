'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Pencil, Trash2, Loader2, X, FolderTree } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { generateSlug } from '@/lib/utils'
import type { Category } from '@/core/domain/types'

interface CategoryManagerProps {
  initialCategories: Category[]
}

export function CategoryManager({ initialCategories }: CategoryManagerProps) {
  const router = useRouter()
  const [categories, setCategories] = useState(initialCategories)
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Form state
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')

  const resetForm = () => {
    setName('')
    setSlug('')
    setDescription('')
    setIsAdding(false)
    setEditingId(null)
  }

  const handleNameChange = (value: string) => {
    setName(value)
    if (!editingId) {
      setSlug(generateSlug(value))
    }
  }

  const startEdit = (category: Category) => {
    setEditingId(category.id)
    setName(category.name)
    setSlug(category.slug)
    setDescription(category.description || '')
    setIsAdding(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const url = editingId ? `/api/categories/${editingId}` : '/api/categories'
      const method = editingId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, slug, description }),
      })

      if (response.ok) {
        router.refresh()
        resetForm()
        // Refetch categories
        const newData = await fetch('/api/categories').then(r => r.json())
        setCategories(newData)
      } else {
        alert('Error al guardar categoría')
      }
    } catch {
      alert('Error al guardar categoría')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`¿Eliminar la categoría "${name}"? Los productos asociados quedarán sin categoría.`)) {
      return
    }

    try {
      const response = await fetch(`/api/categories/${id}`, { method: 'DELETE' })

      if (response.ok) {
        setCategories(categories.filter(c => c.id !== id))
        router.refresh()
      } else {
        alert('Error al eliminar categoría')
      }
    } catch {
      alert('Error al eliminar categoría')
    }
  }

  return (
    <div className="space-y-6">
      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <Card className="bg-white/5 backdrop-blur-xl border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">{editingId ? 'Editar Categoría' : 'Nueva Categoría'}</CardTitle>
              <Button variant="ghost" size="icon" onClick={resetForm} className="text-gray-400 hover:text-white hover:bg-white/10 rounded-xl">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Nombre *
                  </label>
                  <Input
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="Ej: In-Ear Monitors"
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#00FF88]/50 focus:ring-[#00FF88]/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Slug *
                  </label>
                  <Input
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="ej: in-ear-monitors"
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#00FF88]/50 focus:ring-[#00FF88]/20"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Descripción
                </label>
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descripción breve de la categoría"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#00FF88]/50 focus:ring-[#00FF88]/20"
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" variant="neon" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : null}
                  {editingId ? 'Actualizar' : 'Crear'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm} className="border-white/20 text-gray-300 hover:bg-white/10 hover:text-white">
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Categories List */}
      <Card className="bg-white/5 backdrop-blur-xl border-white/10">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Categorías</CardTitle>
          {!isAdding && !editingId && (
            <Button variant="neon" size="sm" onClick={() => setIsAdding(true)}>
              <Plus className="w-4 h-4 mr-1" />
              Nueva
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {categories.length > 0 ? (
            <div className="space-y-2">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00FF88]/20 to-[#00CC6A]/10 border border-[#00FF88]/30 flex items-center justify-center">
                      <FolderTree className="w-5 h-5 text-[#00FF88]" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{category.name}</p>
                      <p className="text-xs text-gray-500">/{category.slug}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={category.isActive ? 'neon' : 'secondary'}>
                      {category.isActive ? 'Activa' : 'Inactiva'}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => startEdit(category)}
                      className="text-gray-400 hover:text-white hover:bg-white/10 rounded-xl"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(category.id, category.name)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#00FF88]/20 to-[#00CC6A]/10 border border-[#00FF88]/30 flex items-center justify-center">
                <FolderTree className="w-8 h-8 text-[#00FF88]" />
              </div>
              <p className="text-gray-400 mb-4">No hay categorías</p>
              <Button variant="neon" onClick={() => setIsAdding(true)}>
                <Plus className="w-4 h-4 mr-1" />
                Crear primera categoría
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
