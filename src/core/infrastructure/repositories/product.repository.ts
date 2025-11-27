import { prisma } from '../database/prisma'
import type {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
  ProductFilters,
  PaginatedResponse
} from '@/core/domain/types'

// Función auxiliar para parsear JSON de la BD
function parseProduct(dbProduct: any): Product {
  return {
    ...dbProduct,
    images: dbProduct.images ? JSON.parse(dbProduct.images) : [],
    specs: dbProduct.specs ? JSON.parse(dbProduct.specs) : [],
  }
}

export const ProductRepository = {
  // Obtener todos los productos con filtros y paginación
  async findAll(filters: ProductFilters = {}): Promise<PaginatedResponse<Product>> {
    const {
      categoryId,
      isActive = true,
      isFeatured,
      isNew,
      search,
      page = 1,
      pageSize = 12
    } = filters

    const where: any = {}

    if (isActive !== undefined) where.isActive = isActive
    if (categoryId) where.categoryId = categoryId
    if (isFeatured !== undefined) where.isFeatured = isFeatured
    if (isNew !== undefined) where.isNew = isNew
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
      ]
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: { category: true },
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.product.count({ where }),
    ])

    return {
      data: products.map(parseProduct),
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    }
  },

  // Obtener producto por ID
  async findById(id: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true },
    })
    return product ? parseProduct(product) : null
  },

  // Obtener producto por slug
  async findBySlug(slug: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: { category: true },
    })
    return product ? parseProduct(product) : null
  },

  // Obtener productos destacados
  async findFeatured(limit = 6): Promise<Product[]> {
    const products = await prisma.product.findMany({
      where: { isActive: true, isFeatured: true },
      include: { category: true },
      take: limit,
      orderBy: { createdAt: 'desc' },
    })
    return products.map(parseProduct)
  },

  // Obtener productos nuevos
  async findNew(limit = 6): Promise<Product[]> {
    const products = await prisma.product.findMany({
      where: { isActive: true, isNew: true },
      include: { category: true },
      take: limit,
      orderBy: { createdAt: 'desc' },
    })
    return products.map(parseProduct)
  },

  // Crear producto
  async create(data: CreateProductDTO): Promise<Product> {
    const product = await prisma.product.create({
      data: {
        ...data,
        images: data.images ? JSON.stringify(data.images) : null,
        specs: data.specs ? JSON.stringify(data.specs) : null,
      },
      include: { category: true },
    })
    return parseProduct(product)
  },

  // Actualizar producto
  async update({ id, ...data }: UpdateProductDTO): Promise<Product> {
    const updateData: any = { ...data }
    if (data.images) updateData.images = JSON.stringify(data.images)
    if (data.specs) updateData.specs = JSON.stringify(data.specs)

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
      include: { category: true },
    })
    return parseProduct(product)
  },

  // Eliminar producto
  async delete(id: string): Promise<void> {
    await prisma.product.delete({ where: { id } })
  },

  // Contar productos
  async count(filters: ProductFilters = {}): Promise<number> {
    const where: any = {}
    if (filters.isActive !== undefined) where.isActive = filters.isActive
    if (filters.categoryId) where.categoryId = filters.categoryId
    return prisma.product.count({ where })
  },
}
