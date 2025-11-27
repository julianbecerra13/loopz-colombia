import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { Plus, Package, Pencil, Trash2 } from 'lucide-react'
import { AdminHeader } from '@/components/admin/header'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { formatPrice } from '@/lib/utils'
import { ProductRepository } from '@/core/infrastructure/repositories/product.repository'
import { DeleteProductButton } from '@/components/admin/delete-product-button'

export const dynamic = 'force-dynamic'

interface ProductsPageProps {
  searchParams: Promise<{ pagina?: string }>
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const session = await getServerSession()

  if (!session) {
    redirect('/admin/login')
  }

  const params = await searchParams
  const page = parseInt(params.pagina || '1')

  const { data: products, total, totalPages } = await ProductRepository.findAll({
    page,
    pageSize: 10,
    isActive: undefined, // Mostrar todos
  })

  return (
    <div>
      <AdminHeader
        title="Productos"
        description={`${total} producto${total !== 1 ? 's' : ''} en el catálogo`}
      />

      <div className="p-6">
        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <div />
          <Button variant="neon" asChild>
            <Link href="/admin/productos/nuevo" className="gap-2">
              <Plus className="w-4 h-4" />
              Nuevo Producto
            </Link>
          </Button>
        </div>

        {/* Products Table */}
        <Card className="bg-white/5 backdrop-blur-xl border-white/10">
          <CardContent className="p-0">
            {products.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 font-medium text-gray-400">Producto</th>
                      <th className="text-left p-4 font-medium text-gray-400">Categoría</th>
                      <th className="text-left p-4 font-medium text-gray-400">Precio</th>
                      <th className="text-left p-4 font-medium text-gray-400">Estado</th>
                      <th className="text-right p-4 font-medium text-gray-400">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden">
                              {product.mainImage ? (
                                <img
                                  src={product.mainImage}
                                  alt={product.name}
                                  className="w-full h-full object-contain"
                                />
                              ) : (
                                <Package className="w-6 h-6 text-gray-500" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-white">{product.name}</p>
                              <p className="text-xs text-gray-500">{product.slug}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-gray-300">
                            {product.category?.name || 'Sin categoría'}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="font-semibold text-white">
                            {formatPrice(product.price)}
                          </span>
                          {product.comparePrice && (
                            <span className="block text-xs text-gray-500 line-through">
                              {formatPrice(product.comparePrice)}
                            </span>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="flex flex-col gap-1">
                            <Badge variant={product.isActive ? 'neon' : 'secondary'}>
                              {product.isActive ? 'Activo' : 'Inactivo'}
                            </Badge>
                            {product.isFeatured && (
                              <Badge variant="outline" className="text-xs border-[#00FF88] text-[#00FF88]">Destacado</Badge>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/10 rounded-xl" asChild>
                              <Link href={`/admin/productos/${product.id}`}>
                                <Pencil className="w-4 h-4" />
                              </Link>
                            </Button>
                            <DeleteProductButton productId={product.id} productName={product.name} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#00FF88]/20 to-[#00CC6A]/10 border border-[#00FF88]/30 flex items-center justify-center">
                  <Package className="w-8 h-8 text-[#00FF88]" />
                </div>
                <p className="text-gray-400 mb-4">No hay productos aún</p>
                <Button variant="neon" asChild>
                  <Link href="/admin/productos/nuevo" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Crear primer producto
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Button
                key={p}
                variant={p === page ? 'default' : 'outline'}
                size="sm"
                asChild
              >
                <Link href={`/admin/productos?pagina=${p}`}>{p}</Link>
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
