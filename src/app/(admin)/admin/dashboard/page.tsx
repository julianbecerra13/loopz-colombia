import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { Package, FolderTree, Eye, TrendingUp } from 'lucide-react'
import { AdminHeader } from '@/components/admin/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProductRepository } from '@/core/infrastructure/repositories/product.repository'
import { CategoryRepository } from '@/core/infrastructure/repositories/category.repository'
import { formatPrice } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const session = await getServerSession()

  if (!session) {
    redirect('/admin/login')
  }

  // Obtener estadísticas
  const [totalProducts, activeProducts, totalCategories, featuredProducts] = await Promise.all([
    ProductRepository.count({}),
    ProductRepository.count({ isActive: true }),
    CategoryRepository.count(),
    ProductRepository.count({ isActive: true }),
  ])

  const stats = [
    {
      title: 'Total Productos',
      value: totalProducts,
      icon: Package,
      color: 'bg-blue-500',
    },
    {
      title: 'Productos Activos',
      value: activeProducts,
      icon: Eye,
      color: 'bg-green-500',
    },
    {
      title: 'Categorías',
      value: totalCategories,
      icon: FolderTree,
      color: 'bg-purple-500',
    },
    {
      title: 'Destacados',
      value: featuredProducts,
      icon: TrendingUp,
      color: 'bg-[#00FF88]',
    },
  ]

  // Productos recientes
  const recentProducts = await ProductRepository.findAll({ pageSize: 5 })

  return (
    <div>
      <AdminHeader
        title="Dashboard"
        description="Resumen general de tu tienda"
      />

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/5 backdrop-blur-xl border-white/10 hover:border-white/20 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">{stat.title}</p>
                    <p className="text-3xl font-bold text-white mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Products */}
        <Card className="bg-white/5 backdrop-blur-xl border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Productos Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            {recentProducts.data.length > 0 ? (
              <div className="space-y-4">
                {recentProducts.data.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between py-3 border-b border-white/10 last:border-0"
                  >
                    <div className="flex items-center gap-4">
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
                        <p className="text-sm text-gray-400">
                          {product.category?.name || 'Sin categoría'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-white">
                        {formatPrice(product.price)} <span className="text-xs text-gray-400">COP</span>
                      </p>
                      <p className={`text-xs ${product.isActive ? 'text-[#00FF88]' : 'text-gray-500'}`}>
                        {product.isActive ? 'Activo' : 'Inactivo'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-400 py-8">
                No hay productos aún. ¡Crea tu primer producto!
              </p>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:border-[#00FF88]/50 hover:shadow-[0_0_30px_rgba(0,255,136,0.1)] transition-all duration-300 cursor-pointer group">
            <a href="/admin/productos/nuevo">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00FF88]/20 to-[#00CC6A]/10 border border-[#00FF88]/30 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] transition-all">
                  <Package className="w-6 h-6 text-[#00FF88]" />
                </div>
                <div>
                  <p className="font-medium text-white">Nuevo Producto</p>
                  <p className="text-sm text-gray-400">Agregar al catálogo</p>
                </div>
              </CardContent>
            </a>
          </Card>

          <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:border-[#00FF88]/50 hover:shadow-[0_0_30px_rgba(0,255,136,0.1)] transition-all duration-300 cursor-pointer group">
            <a href="/admin/categorias">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00FF88]/20 to-[#00CC6A]/10 border border-[#00FF88]/30 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] transition-all">
                  <FolderTree className="w-6 h-6 text-[#00FF88]" />
                </div>
                <div>
                  <p className="font-medium text-white">Gestionar Categorías</p>
                  <p className="text-sm text-gray-400">Organiza tus productos</p>
                </div>
              </CardContent>
            </a>
          </Card>

          <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:border-[#00FF88]/50 hover:shadow-[0_0_30px_rgba(0,255,136,0.1)] transition-all duration-300 cursor-pointer group">
            <a href="/" target="_blank">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00FF88]/20 to-[#00CC6A]/10 border border-[#00FF88]/30 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] transition-all">
                  <Eye className="w-6 h-6 text-[#00FF88]" />
                </div>
                <div>
                  <p className="font-medium text-white">Ver Tienda</p>
                  <p className="text-sm text-gray-400">Previsualizar sitio</p>
                </div>
              </CardContent>
            </a>
          </Card>
        </div>
      </div>
    </div>
  )
}
